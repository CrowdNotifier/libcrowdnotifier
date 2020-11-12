import {
  randombytes_buf,
  crypto_secretbox_keygen,
  crypto_hash_sha256,
  crypto_sign_seed_keypair,
  crypto_box_seal,
  to_base64,
  crypto_sign_detached,
  IKeyPair
} from "./sodium";
import { HealthAuthorityBackend } from "healthAuthorityBackend";
import { SeedMessage, QRCodeContent, QRCodeWrapper } from "./protobuf/index";
import { Log } from "./log";
import { Internet } from "./internet";

/**
 * The Location class represents either a restaurant, a happening, or any other gathering of
 * people. It holds the necessary data to create the two QRcodes - one in case of an infaction,
 * and one for the clients to scan.
 *
 * Furthermore it has methods to interact with the cantonal doctor.
 */
export class Location {
  private notificationKey: Uint8Array;
  private salt: Uint8Array;
  private seedBuf: Uint8Array;
  private seed: Uint8Array;
  public keypair: IKeyPair;
  private qrCodeContentBuf: Uint8Array;
  private log: Log;

  constructor(
    private internet: Internet,
    private urlPurple: string,
    public name: string,
    public location: string,
    public room: string,
    public venueType: number,
    public healthAuthorityPubKey: Uint8Array
  ) {
    this.salt = randombytes_buf(32);
    this.notificationKey = crypto_secretbox_keygen();
    const seedMessage = SeedMessage.create({
      salt: this.salt,
      notificationKey: this.notificationKey,
      name: name,
      location: location,
      room: room
    });
    this.seedBuf = SeedMessage.encode(seedMessage).finish();
    this.seed = crypto_hash_sha256(this.seedBuf);
    this.keypair = crypto_sign_seed_keypair(this.seed);

    this.qrCodeContentBuf = QRCodeContent.encode(
      QRCodeContent.create({
        version: 1,
        publicKey: this.keypair.publicKey,
        name: name,
        location: location,
        room: room,
        venueType: venueType,
        notificationKey: this.notificationKey
      })
    ).finish();

    this.log = new Log(`Venue{${name}:${location}}`);
    this.log.info("Created");
  }

  /**
   * The QRentry code is printed and shown at the entrance to all visitors.
   */
  QRentry(): string {
    const qrCodeContentSignature = crypto_sign_detached(
      this.qrCodeContentBuf,
      this.keypair.privateKey
    );

    const qrCodeWrapper = QRCodeWrapper.create({
      version: 1,
      content: this.qrCodeContentBuf,
      signature: qrCodeContentSignature
    });

    const qrCodeWrapperProtoBufBytes = QRCodeWrapper.encode(
      qrCodeWrapper
    ).finish();
    const protoBufBase64 = to_base64(qrCodeWrapperProtoBufBytes);
    const qrStr = `store:crowdNotifier#${protoBufBase64}`;
    this.log.info("QREntry:", qrStr);
    return qrStr;
  }

  /**
   * The QRtrack code is private and only has to be revealed to the health authority
   * in case of a trace location event.
   */
  private QRtrack(): string {
    const msg = crypto_box_seal(this.seedBuf, this.healthAuthorityPubKey);
    const qrStr = to_base64(msg);
    this.log.info("QRTrack:", qrStr);
    return qrStr;
  }

  async uploadTracing(crowdCode: string) {
    this.log.info("Uploading tracing for", crowdCode);
    const url = new URL(`${this.urlPurple}/${HealthAuthorityBackend.pathPostCrowdCode}`);
    url.searchParams.set("crowdCode", crowdCode);
    return this.internet.post(url, this.QRtrack());
  }
}
