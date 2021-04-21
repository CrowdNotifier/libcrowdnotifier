import mcl from "mcl-wasm";
import {
  crypto_box_keypair,
  crypto_hash_sha256,
  crypto_secretbox_easy,
  from_string,
  ready,
} from "libsodium-wrappers-sumo";
import {
  EncryptedVenueVisit,
  CryptoData,
  VenueInfo,
  MessagePayload,
} from "./structs";
import { enc, IEncryptedData } from "src/v2/ibe_primitives";
import { AssociatedData, NotifyMeLocationData } from "./messages";
import { QRCodeContent } from "src/v2";
import { sodium } from "src";

/**
 * New methods and definitions
 */

/**
 * Waits for the mcl and libsodium libraries to be ready.
 */
export async function waitReady() {
  await new Promise((resolve) => {
    mcl.init(mcl.BLS12_381).then(() => {
      resolve(undefined);
    });
  });
  await ready;
}

// from https://github.com/zcash/librustzcash/blob/6e0364cd42a2b3d2b958a54771ef51a8db79dd29/pairing/src/bls12_381/README.md#generators
export function baseG1(): mcl.G1 {
  const base = new mcl.G1();
  base.setStr(
    "1 3685416753713387016781088315183077757961620795782546" +
      "409894578378688607592378376318836054947676345821548104185464507 " +
      "133950654494447647302047137994192122158493387593834962042654373" +
      "6416511423956333506472724655353366534992391756441569"
  );
  return base;
}

// from https://github.com/zcash/librustzcash/blob/6e0364cd42a2b3d2b958a54771ef51a8db79dd29/pairing/src/bls12_381/README.md#generators
export function baseG2(): mcl.G2 {
  const base = new mcl.G2();
  base.setStr(
    "1 3527010695874666181871391160110601448900299527927752" +
      "40219908644239793785735715026873347600343865175952761926303160 " +
      "305914434424421370997125981475378163698647032547664755865937320" +
      "6291635324768958432433509563104347017837885763365758 " +
      "198515060228729193556805452117717163830086897821565573085937866" +
      "5066344726373823718423869104263333984641494340347905 " +
      "927553665492332455747201965776037880757740193453592970025027978" +
      "793976877002675564980949289727957565575433344219582"
  );
  return base;
}

export function xor(a: Uint8Array, b: Uint8Array): Uint8Array {
  if (a.length !== b.length) {
    throw new Error("cannot xor two Uint8Arrays of different length");
  }
  const c = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) {
    c[i] = a[i] ^ b[i];
  }
  return c;
}

/**
 * Generate an identifier.
 * @param info public information
 * @param counter counter
 * @param nonce1 a nonce
 * @param nonce2 an other nonce
 * @return an identifier
 */
export function genId(
  info: Uint8Array,
  counter: number,
  nonce1: Uint8Array,
  nonce2: Uint8Array
): Uint8Array {
  const hash1 = crypto_hash_sha256(Uint8Array.from([...info, ...nonce1]));

  return crypto_hash_sha256(
    Uint8Array.from([...hash1, ...nonce2, ...from_string(counter.toString())])
  );
}

export function genIdV2(
  affectedHour: number,
  venueInfo: VenueInfo
): Uint8Array {
  const hash1: Uint8Array = crypto_hash_sha256(
    Uint8Array.from([
      ...venueInfoToContentBytes(venueInfo),
      ...venueInfo.nonce1,
    ])
  );
  return crypto_hash_sha256(
    Uint8Array.from([
      ...hash1,
      ...venueInfo.nonce2,
      ...from_string(affectedHour.toString()),
    ])
  );
}

export function genIdV3(
  qrCodePayload: Uint8Array,
  interval_start: number
): Uint8Array {
  const cryptoData = deriveNoncesAndNotificationKey(qrCodePayload);
  const preid = crypto_hash_sha256(
    Uint8Array.from([
      ...from_string("CN-PREID"),
      ...qrCodePayload,
      ...cryptoData.nonce1,
    ])
  );
  const duration = 3600; // Currently only one duration is supported
  const id = crypto_hash_sha256(
    Uint8Array.from([
      ...from_string("CN-ID"),
      ...preid,
      ...from_string(duration.toString()),
      ...from_string(interval_start.toString()),
      ...cryptoData.nonce2,
    ])
  );

  return id;
}

/**
 * Derive nonce1, nonce2 and notifykey from the QR code using HKDF
 * @param qrCodePayload as byte array
 * @returns An array containing nonce1, nonce2 and notifykey, in that order
 */
export function deriveNoncesAndNotificationKey(
  qrCodePayload: Uint8Array
): CryptoData {
  // TODO: Check if this works!
  const hkdf = require("futoin-hkdf");
  const ikm = qrCodePayload;
  const length = 96;
  const salt = ""; // salt is empty
  const info = "CrowdNotifier_v3";
  const hash = "SHA-256";
  const derivedBuffer: Uint8Array = hkdf(ikm, length, { salt, info, hash });
  return {
    nonce1: derivedBuffer.slice(0, 32),
    nonce2: derivedBuffer.slice(32, 64),
    notificationKey: derivedBuffer.slice(64, 92),
  };
}

export function getIBECiphertext(
  arrivalTime: number,
  departureTime: number,
  affectedHour: number,
  venueInfo: VenueInfo,
  masterPublicKey: mcl.G2
): IEncryptedData {
  let identity: Uint8Array;
  if (venueInfo.qrCodePayload == undefined) {
    identity = genIdV2(affectedHour, venueInfo);
  } else {
    identity = genIdV3(venueInfo.qrCodePayload, affectedHour * 60 * 60);
  }
  const messagePayload: MessagePayload = {
    arrivalTime: arrivalTime,
    departureTime: departureTime,
    notificationKey: venueInfo.notificationKey,
  };
  return enc(
    masterPublicKey,
    identity,
    from_string(JSON.stringify(messagePayload))
  );
}

export function getAffectedHours(
  arrivalTime: number,
  departureTime: number
): Array<number> {
  const ONE_HOUR_IN_SECONDS = 60 * 60;
  const startHour = Math.floor(arrivalTime / ONE_HOUR_IN_SECONDS);
  const endHour = Math.floor(departureTime / ONE_HOUR_IN_SECONDS);
  const affectedHours = new Array();
  for (let i = startHour; i <= endHour; i++) {
    affectedHours.push(i);
  }
  return affectedHours;
}

/**
 * Helper function to convert from venueInfo, to V2 QRCodeContent, to byte array
 * Note: Assumes countryData corresponds to NotifyMeLocationData!
 * @param venueInfo
 * @returns byte array representing QRCodeContent
 */
function venueInfoToContentBytes(venueInfo: VenueInfo): Uint8Array {
  const notifyMeLocationData = NotifyMeLocationData.decode(
    venueInfo.countryData
  );
  const qrCodeContent = QRCodeContent.create({
    name: venueInfo.description,
    location: venueInfo.address,
    room: notifyMeLocationData.room,
    venueType: notifyMeLocationData.type,
    notificationKey: venueInfo.notificationKey,
    validFrom: venueInfo.validFrom,
    validTo: venueInfo.validTo,
  });
  return QRCodeContent.encode(qrCodeContent).finish();
}

export function encryptAssociatedData(
  secretKey: Uint8Array,
  message: string,
  countryData: Uint8Array,
  nonce: Uint8Array,
  version: number
): Uint8Array {
  const associatedData = AssociatedData.create({
    version: version,
    message: message,
    countryData: countryData,
  });
  const messageBytes: Uint8Array = AssociatedData.encode(
    associatedData
  ).finish();
  const encryptedMessage = crypto_secretbox_easy(
    messageBytes,
    nonce,
    secretKey
  );
  return encryptedMessage;
}
