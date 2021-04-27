import mcl from 'mcl-wasm';
import {crypto_hash_sha256, crypto_secretbox_easy, from_string} from
  'libsodium-wrappers-sumo';
import {CryptoData, MessagePayload, VenueInfo} from './structs';
import {enc, IEncryptedData} from '../v2/ibe_primitives';
import {crowdnotifier_v3} from './messages';
import {baseG1, baseG2, genId, QRCodeContent as QRCodeContentV2,
  waitReady, xor} from '../v2';

export {waitReady, baseG1, baseG2, xor, genId};

/**
 * New methods and definitions
 */

/**
 * Generates an id for the version 2 QRcodes using the version 3 protobufs.
 *
 * @param affectedHour of the visit
 * @param venueInfo from the QRcode
 */
export function genIdV2(
    affectedHour: number,
    venueInfo: VenueInfo,
): Uint8Array {
  return genId(venueInfoToContentBytes(venueInfo),
      affectedHour,
      venueInfo.nonce1,
      venueInfo.nonce2);
}

/**
 * Generates an id for the version 3 QRcodes
 *
 * @param qrCodePayload from the scanned venue QRcode
 * @param interval_start of the visit
 */
export function genIdV3(
    qrCodePayload: Uint8Array,
    interval_start: number | Long,
): Uint8Array {
  const cryptoData = deriveNoncesAndNotificationKey(qrCodePayload);
  const preid = crypto_hash_sha256(
      Uint8Array.from([
        ...from_string('CN-PREID'),
        ...qrCodePayload,
        ...cryptoData.nonce1,
      ]),
  );
  const duration = 3600; // Currently only one duration is supported
  return crypto_hash_sha256(
      Uint8Array.from([
        ...from_string('CN-ID'),
        ...preid,
        ...toBytesInt32(duration),
        ...toBytesInt64(interval_start), // timestamp might use up to 8 bytes
        ...cryptoData.nonce2,
      ]),
  );
}

/**
 * Converts the given number to a BigEndian binary representation.
 *
 * @param num to be converted
 * @return the BigEndian int32 representation
 */
export function toBytesInt32(num: number): Uint8Array {
  const buf = Buffer.alloc(4);
  // Buffer.writeInt32BE does all the boundary checks
  buf.writeInt32BE(num);
  return buf;
}

/**
 * Converts the given number of type number, Long, or bigint, to a BigEndian
 * binary representation.
 * It throws an error if the value is out of bounds.
 *
 * @param num either a number, Long, or a bigint
 * @returns BigEndian 64-bit integer binary representation of the number
 */
export function toBytesInt64(num: (number | Long | bigint)): Uint8Array {
  if (typeof num === 'number') {
    if (num > Number.MAX_SAFE_INTEGER) {
      throw new Error('This number is not safe to convert to an Int64');
    }
    if (num < Number.MIN_SAFE_INTEGER) {
      throw new Error('This number is not safe to convert to an Int64');
    }
    num = BigInt(num);
  } else if (typeof num === 'bigint') {
    if (num !== BigInt.asIntN(64, num)) {
      throw new Error('This bigint is too big to be converted to an Int64');
    }
  } else {
    console.log(num);
    return Buffer.from(num.toBytesBE());
  }

  const buf = Buffer.alloc(8);
  buf.writeBigInt64BE(num);
  return buf;
}

/**
 * Derive nonce1, nonce2 and notifykey from the QR code using HKDF
 * @param qrCodePayload as byte array
 * @returns An array containing nonce1, nonce2 and notifykey, in that order
 */
export function deriveNoncesAndNotificationKey(
    qrCodePayload: Uint8Array,
): CryptoData {
  const hkdf = require('futoin-hkdf');
  const ikm = qrCodePayload;
  const length = 96;
  const salt = ''; // salt is empty
  const info = 'CrowdNotifier_v3';
  const hash = 'SHA-256';
  const derivedBuffer: Uint8Array = hkdf(ikm, length, {salt, info, hash});
  return {
    nonce1: derivedBuffer.slice(0, 32),
    nonce2: derivedBuffer.slice(32, 64),
    notificationKey: derivedBuffer.slice(64, 96),
  };
}

/**
 * Returns the encrypted ciphertext that will be stored by the visitor.
 *
 * @param arrivalTime
 * @param departureTime
 * @param affectedHour
 * @param venueInfo
 * @param masterPublicKey
 * @return encrypted ciphertext to be stored by the visitor.
 */
export function getIBECiphertext(
    arrivalTime: number,
    departureTime: number,
    affectedHour: number,
    venueInfo: VenueInfo,
    masterPublicKey: mcl.G2,
): IEncryptedData {
  let identity: Uint8Array;
  if (venueInfo.qrCodePayload === undefined) {
    identity = genIdV2(affectedHour, venueInfo);
  } else {
    identity = genIdV3(venueInfo.qrCodePayload, affectedHour * 60 * 60);
  }
  const messagePayload: MessagePayload = {
    arrivalTime: arrivalTime,
    departureTime: departureTime,
    notificationKey: venueInfo.notificationKey,
  };
  const msgPBytes = from_string(JSON.stringify(messagePayload));
  return enc(masterPublicKey, identity, msgPBytes);
}

/**
 * Returns an array of the affected hours, including every hour where the
 * visit is included, even if only partially.
 *
 * @param arrivalTime in seconds of the Unix Epoch
 * @param departureTime in seconds of the Unix Epoch
 * @return an array containing the increasing number of hours
 * since the Unix Epoch
 */
export function getAffectedHours(
    arrivalTime: number,
    departureTime: number,
): Array<number> {
  const ONE_HOUR_IN_SECONDS = 60 * 60;
  const startHour = Math.floor(arrivalTime / ONE_HOUR_IN_SECONDS);
  const endHour = Math.floor(departureTime / ONE_HOUR_IN_SECONDS);
  const affectedHours: Array<number> = [];
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
  const notifyMeLocationData = crowdnotifier_v3.NotifyMeLocationData.decode(
      venueInfo.countryData,
  );
  const qrCodeContent = QRCodeContentV2.create({
    name: venueInfo.description,
    location: venueInfo.address,
    room: notifyMeLocationData.room,
    venueType: notifyMeLocationData.type,
    notificationKey: venueInfo.notificationKey,
    validFrom: venueInfo.validFrom,
    validTo: venueInfo.validTo,
  });
  return QRCodeContentV2.encode(qrCodeContent).finish();
}

/**
 * Encrypts the associated data for the QRcode.
 *
 * @param secretKey
 * @param message
 * @param countryData
 * @param nonce
 * @param version
 * @return encryptedMessage
 */
export function encryptAssociatedData(
    secretKey: Uint8Array,
    message: string,
    countryData: Uint8Array,
    nonce: Uint8Array,
    version: number,
): Uint8Array {
  const associatedData = crowdnotifier_v3.AssociatedData.create({
    version: version,
    message: message,
    countryData: countryData,
  });
  const messageBytes: Uint8Array = crowdnotifier_v3.AssociatedData.encode(
      associatedData,
  ).finish();
  return crypto_secretbox_easy(
      messageBytes,
      nonce,
      secretKey,
  );
}
