import { SeedMessage } from "./protobuf/index";
import {
  crypto_box_keypair,
  crypto_box_seal_open,
  crypto_hash_sha256,
  crypto_sign_seed_keypair,
  from_base64,
  IKeyPair,
  randombytes_buf,
  to_base64
} from "./sodium";
import { CrowdBackend } from "./crowdbackend";
import { Log } from "./log";
import { Internet } from "./internet";

interface ICrowdCode {
  rand: Uint8Array;
  name: string;
  location: string;
  start: number;
  end: number;
  used?: boolean;
}

export class PurpleBackend {
  static pathGetCrowdCode = "getCrowdCode";
  static pathPostCrowdCode = "crowdCode";

  private kp: IKeyPair;
  private crowdCodes: ICrowdCode[] = [];
  private log: Log;

  constructor(
    private internet: Internet,
    private urlCrowdNotifier,
    public host: string
  ) {
    this.kp = crypto_box_keypair();
    this.log = new Log(`PurpleBackend`);
    internet.register(new URL(host), this);
    this.log.info("Created");
  }

  pubKey(): Uint8Array {
    return this.kp.publicKey;
  }

  private getCrowdCode(search: string): string {
    const url = new URL("http://localhost/" + search).searchParams;
    const [name, location, start, end] = [
      url.get("name"),
      url.get("location"),
      parseInt(url.get("start")),
      parseInt(url.get("end"))
    ];
    const rand = randombytes_buf(32);
    this.crowdCodes.push({ rand, name, location, start, end });
    return to_base64(rand);
  }

  private async useCrowdCode(search: string, qrTrack: string) {
    const crowdCode = new URLSearchParams(search).get("crowdCode");
    this.log.info("Using crowd code", qrTrack);
    const ccodeEntry = this.crowdCodes.find(
      cc => to_base64(cc.rand) === crowdCode
    );
    if (ccodeEntry === undefined) {
      throw new Error("Invalid CrowdCode");
    }
    if (ccodeEntry.used) {
      throw new Error("Already used CrowdCode");
    }

    const msgBuf = crypto_box_seal_open(
      from_base64(qrTrack),
      this.kp.publicKey,
      this.kp.privateKey
    );
    const msg = SeedMessage.decode(msgBuf);
    const seed = crypto_hash_sha256(msgBuf);
    const venueKeypair = crypto_sign_seed_keypair(seed);

    // Wait for contactTracer to authorise the upload

    ccodeEntry.used = true;
    const url = new URL(
      `${this.urlCrowdNotifier}/${CrowdBackend.pathPostTrace}`
    );
    const data = JSON.stringify({
      privKey: venueKeypair.privateKey,
      start: ccodeEntry.start,
      end: ccodeEntry.end
    });
    return this.internet.post(url, data);
  }

  async Get(path: string, search: string): Promise<string> {
    switch (path) {
      case PurpleBackend.pathGetCrowdCode:
        return this.getCrowdCode(search);
    }
    throw new Error("Path not found");
  }

  async Post(path: string, search: string, data: string): Promise<string> {
    switch (path) {
      case PurpleBackend.pathPostCrowdCode:
        return this.useCrowdCode(search, data);
    }
    throw new Error("Path not found");
  }
}
