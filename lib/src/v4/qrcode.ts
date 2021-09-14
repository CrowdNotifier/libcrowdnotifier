import {from_hex, randombytes_buf} from 'libsodium-wrappers-sumo';
import {crowdnotifier_v4} from './messages';
import {waitReady} from '../v2';
import TraceLocation = crowdnotifier_v4.TraceLocation;
import SwissCovidLocationData = crowdnotifier_v4.SwissCovidLocationData;
import CrowdNotifierData = crowdnotifier_v4.CrowdNotifierData;
import QRCodePayload = crowdnotifier_v4.QRCodePayload;
import VenueType = crowdnotifier_v4.VenueType;

const QR_CODE_VERSION = 4;
const SWISSCOVID_LOCATION_DATA_VERSION = 4;
const ONE_MINUTE_IN_MILLIS = 60 * 1000;
const ONE_HOUR_IN_MILLIS = 60 * ONE_MINUTE_IN_MILLIS;
const AUTOMATIC_CHECKOUT_DELAY_MS = 12 * ONE_HOUR_IN_MILLIS;
const CHECKOUT_WARNING_DELAY_MS = 8 * ONE_HOUR_IN_MILLIS;
const REMINDER_DELAY_OPTIONS_MS =
    [30 * ONE_MINUTE_IN_MILLIS, 60 * ONE_MINUTE_IN_MILLIS,
      120 * ONE_MINUTE_IN_MILLIS];
const QR_CODE_VALIDITY_DURATION_MS =
    100000 * 24 * ONE_HOUR_IN_MILLIS; // 100'000 days

const CRYPTOGRAPHIC_SEED_BYTES = 32;

/**
 * Fills the protobuf messages with the necessary information and
 * returns a byte array.
 *
 * @param title of the venue
 * @param publicKeyHex of the health authority
 * @param now starting of validity of the QRcode, msec sinc the UNIX Epoch
 * @return Uint8Array
 */
export async function createLocationData(
    title: string,
    publicKeyHex: string,
    now: number = Date.now(),
) {
  if (title.length > 100) {
    throw new Error('Title can only be up to 100 characters');
  }
  if (publicKeyHex.length != 64) {
    throw new Error('Public key must be 64 characters');
  }
  await waitReady();
  const publicKey = from_hex(publicKeyHex);

  const swissCovidLocationData = SwissCovidLocationData.create({
    version: SWISSCOVID_LOCATION_DATA_VERSION,
    automaticCheckoutDelaylMs: AUTOMATIC_CHECKOUT_DELAY_MS,
    checkoutWarningDelayMs: CHECKOUT_WARNING_DELAY_MS,
    reminderDelayOptionsMs: REMINDER_DELAY_OPTIONS_MS,
    type: VenueType.USER_QR_CODE,
  });
  const swissCovidLocationDataBytes =
      SwissCovidLocationData.encode(swissCovidLocationData).finish();

  const traceLocation = TraceLocation.create({
    version: QR_CODE_VERSION,
    startTimestamp: Math.floor(now / 1000),
    endTimestamp:
        Math.floor((now + QR_CODE_VALIDITY_DURATION_MS) / 1000),
    description: title,
    address: '',
  });

  const crowdNotifierData = CrowdNotifierData.create({
    version: QR_CODE_VERSION,
    cryptographicSeed: randombytes_buf(CRYPTOGRAPHIC_SEED_BYTES),
    publicKey: publicKey,
  });

  const qrCodePayload = QRCodePayload.create({
    version: QR_CODE_VERSION,
    crowdNotifierData: crowdNotifierData,
    locationData: traceLocation,
    countryData: swissCovidLocationDataBytes,
  });
  return QRCodePayload.encode(qrCodePayload).finish();
}
