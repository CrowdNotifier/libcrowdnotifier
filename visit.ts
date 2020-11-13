import {Message} from "protobufjs";
import { ITrace } from "./crowdbackend";
import { QRCodeContent } from "./protobuf/index";
import {
  buf_equals,
  crypto_box_seal,
  crypto_box_seal_open,
  crypto_scalarmult,
  crypto_scalarmult_base,
  crypto_sign_ed25519_pk_to_curve25519,
  crypto_sign_ed25519_sk_to_curve25519,
  from_string,
  randombytes_buf,
  to_base64,
  to_string
} from "./sodium";
import { Log } from "./log";

export class Visit {
  public day: number;
  public ephemeralPublicKey: Uint8Array;
  public sharedKey: Uint8Array;
  public ciphertext: Uint8Array;
  public identity: string;
  private log: Log;

  constructor(
    qr: QRCodeContent,
    entry: number,
    departure: number,
    diary?: boolean
  ) {
    const esk = randombytes_buf(32);
    this.ephemeralPublicKey = crypto_scalarmult_base(esk);
    const locationPubCurve = crypto_sign_ed25519_pk_to_curve25519(qr.publicKey);
    this.sharedKey = crypto_scalarmult(esk, locationPubCurve);
    const loc = diary ? "unknown" : `${qr.name}-${qr.location}`;
    const msg = from_string(
      [entry, departure, to_base64(qr.notificationKey), loc].join("::")
    );
    const pkPrime = crypto_sign_ed25519_pk_to_curve25519(qr.publicKey);
    this.ciphertext = crypto_box_seal(msg, pkPrime);
    this.day = Math.floor(entry / 86400);

    this.log = new Log(`Visit{${entry}..${departure}}`);
    this.log.info("Created");
  }

  decryptExposure(traces: ITrace[]): boolean {
    this.log.info("Decrypting exposure for traces");
    const exposure = traces.find(trace => {
      trace.privKey = Uint8Array.from(Object.values(trace.privKey));
      const scalar = crypto_sign_ed25519_sk_to_curve25519(trace.privKey);
      const diffieHellman = crypto_scalarmult(scalar, this.ephemeralPublicKey);
      return buf_equals(this.sharedKey, diffieHellman);
    });
    if (exposure === undefined) {
      this.log.info("No exposure locations found");
      return false;
    }

    this.log.info("Fetching trace info");
    const locationScalarCurve = crypto_sign_ed25519_sk_to_curve25519(
      exposure.privKey
    );
    const pubKey = crypto_scalarmult_base(locationScalarCurve);
    const msg = to_string(
      crypto_box_seal_open(this.ciphertext, pubKey, locationScalarCurve)
    );

    this.log.info("Checking visit time");
    const [entryStr, departureStr, notificationKey, loc] = msg.split("::");
    const [entry, departure] = [parseInt(entryStr), parseInt(departureStr)];
    if (entry > exposure.end || departure < exposure.start) {
      this.log.info("No matching visit times to found exposures");
      return false;
    }
    this.identity = msg;
    return true;
  }
}
