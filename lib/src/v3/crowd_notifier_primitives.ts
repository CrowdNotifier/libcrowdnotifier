import {
  compare,
  crypto_box_keypair,
  crypto_box_seal,
  crypto_box_seal_open,
  to_string,
  IKeyPair,
  randombytes_buf,
  crypto_secretbox_open_easy,
  to_base64,
  from_base64,
  from_string,
} from 'libsodium-wrappers-sumo';
import {
  dec,
  enc,
  IEncryptedData,
  keyDer,
  keyGen,
  NONCE_LENGTH,
} from './ibe_primitives';
import mcl, {Fr, G1, G2} from 'mcl-wasm';
import {
  EncryptedVenueVisit,
  VenueInfo,
  ExposureEvent,
  MessagePayload,
} from './structs';
import {
  TraceLocation,
  CrowdNotifierData,
  QRCodePayload,
  QRCodeTrace,
  NotifyMeLocationData,
  PreTraceWithProof,
  TraceProof,
  PreTrace,
  Trace,
  AssociatedData,
} from './messages';
import {QRCodeEntry as QRCodeEntryV2} from '../v2/proto';
import {Message} from 'protobufjs';
import {
  getAffectedHours,
  getIBECiphertext,
  deriveNoncesAndNotificationKey,
  genIdV3,
  encryptAssociatedData,
} from './helpers';

/**
 * Implements the cryptographic protocol in section B.1 of the
 * CrowdNotifier white paper.
 */

/**
 * Generate key pair for health authority.
 */
export function setupHA(): IKeyPair {
  return crypto_box_keypair();
}

/**
 * Sets up a location:
 * - Generates IBE key pairs
 * - Computes resulting master public key
 * - Computes encrypted master secret key for health authority
 * - Generates seed
 *
 * These values are then encoded into two QR codes:
 * - The entry QR code containing the location, mpk and the seed
 * - The tracing QR code containing the same values as the previous,
 * and additionally masterSecretKeyLocation and ciphertextHealthAuthority
 *
 * Note: This code must be run client-side for security reasons
 * @param version
 * @param pkha public key of the health authority
 * @param description max. 100 characters
 * @param address max. 100 characters
 * @param validFrom timestamp (in seconds)
 * @param validTo timestamp (in seconds)
 * @param countryData byte array containing country-specific location data
 * (e.g. NotifyMeLocationData)
 * @return QRCodePayload (public) and QRCodeTrace (private) as base-64
 * encoded strings
 */
export function setupLocation(
    version: number,
    pkha: Uint8Array,
    description: string,
    address: string,
    validFrom: Date,
    validTo: Date,
    countryData: Uint8Array,
): {
  qrCodePayload: string;
  qrCodeTrace: string;
} {
  // exact semantics TBD
  if (version == undefined) {
    version = 3;
  }

  const traceLocation = TraceLocation.create({
    version: version,
    description: description,
    address: address,
    startTimestamp: Math.round(validFrom.getTime() / 1000),
    endTimestamp: Math.round(validTo.getTime() / 1000),
  });

  // Generate IBE key pairs
  const [mpkl, mskl] = keyGen();
  const [mpkha, mskha] = keyGen();

  // Compute resulting master public key
  const mpk = mcl.add(mpkl, mpkha);

  // Compute encrypted master secret key for health authority
  const ctxtha = crypto_box_seal(mskha.serialize(), pkha);

  // Generate seed
  const seed = randombytes_buf(32);

  const crowdNotifierData = CrowdNotifierData.create({
    version: version,
    publicKey: mpk.serialize(),
    cryptographicSeed: seed,
  });

  const qrCodePayload = QRCodePayload.create({
    version: version,
    locationData: traceLocation,
    crowdNotifierData: crowdNotifierData,
    countryData: countryData,
  });

  const qrCodeTrace = QRCodeTrace.create({
    version: version,
    qrCodePayload: QRCodePayload.encode(qrCodePayload).finish(),
    masterSecretKeyLocation: mskl.serialize(),
    cipherTextHealthAuthority: ctxtha,
  });

  return {
    qrCodePayload: to_base64(QRCodePayload.encode(qrCodePayload).finish()),
    qrCodeTrace: to_base64(QRCodeTrace.encode(qrCodeTrace).finish()),
  };
}

/**
 *
 * @param qrCode
 */
export function getVenueInfoFromQrCodeV2(qrCodeString: string): VenueInfo {
  const qrCodeAsBytes = from_string(qrCodeString);
  const qrCodeEntryV2 = QRCodeEntryV2.decode(qrCodeAsBytes);
  const qrCodeContentV2 = qrCodeEntryV2.data;

  if (
    !qrCodeContentV2.validFrom &&
    Date.now() < qrCodeContentV2.getValidFrom().getTime()
  ) {
    throw new Error('Start timestamp isn\'t valid yet');
  } else if (
    !qrCodeContentV2.validFrom &&
    Date.now() > qrCodeContentV2.getValidTo().getTime()
  ) {
    throw new Error('End timestamp isn\'t valid anymore');
  }

  const notifyMeLocationData = NotifyMeLocationData.create({
    version: 2,
    type: qrCodeContentV2.venueType,
    room: qrCodeContentV2.room,
  });
  const countryData: Uint8Array = NotifyMeLocationData.encode(
      notifyMeLocationData,
  ).finish();

  return {
    description: qrCodeContentV2.name,
    address: qrCodeContentV2.location,
    notificationKey: qrCodeContentV2.notificationKey,
    publicKey: qrCodeEntryV2.masterPublicKey,
    nonce1: qrCodeEntryV2.entryProof.nonce1,
    nonce2: qrCodeEntryV2.entryProof.nonce2,
    validFrom: qrCodeContentV2.validFrom,
    validTo: qrCodeContentV2.validTo,
    qrCodePayload: undefined,
    countryData: countryData,
  };
}

/**
 *
 * @param qrCode
 */
export function getVenueInfoFromQrCodeV3(qrCodeString: string): VenueInfo {
  const qrCodeAsBytes = from_string(qrCodeString);
  const qrCodePayload = QRCodePayload.decode(qrCodeAsBytes);
  if (Date.now() / 1000 < qrCodePayload.locationData.startTimestamp) {
    throw new Error('Start timestamp isn\'t valid yet');
  } else if (Date.now() / 1000 > qrCodePayload.locationData.endTimestamp) {
    throw new Error('End timestamp isn\'t valid anymore');
  }

  const cryptoData = deriveNoncesAndNotificationKey(qrCodeAsBytes);
  return {
    description: qrCodePayload.locationData.descripion,
    address: qrCodePayload.locationData.address,
    notificationKey: cryptoData.notificationKey,
    publicKey: qrCodePayload.crowdNotifierData.publicKey,
    nonce1: cryptoData.nonce1,
    nonce2: cryptoData.nonce2,
    validFrom: qrCodePayload.locationData.startTimestamp,
    validTo: qrCodePayload.locationData.endTimestamp,
    qrCodePayload: qrCodeAsBytes,
    countryData: qrCodePayload.countryData,
  };
}

/**
 * Creates encrypted venue visit to be stored locally on client's device
 * @param arrivalTime in seconds since epoch
 * @param departureTime in seconds since epoch
 * @param venueInfo obtained from either one of the getVenueInfoFrom* methods
 * @returns
 */
export function getCheckIn(
    arrivalTime: number,
    departureTime: number,
    venueInfo: VenueInfo,
): EncryptedVenueVisit {
  const masterPublicKey = new mcl.G2();
  masterPublicKey.deserialize(venueInfo.publicKey);

  const ibeCiphertextEntries: Array<IEncryptedData> = [];
  getAffectedHours(arrivalTime, departureTime).forEach((hour) => {
    ibeCiphertextEntries.push(
        getIBECiphertext(
            arrivalTime,
            departureTime,
            hour,
            venueInfo,
            masterPublicKey,
        ),
    );
  });
  return {
    date: departureTime,
    ibeCiphertextEntries: ibeCiphertextEntries,
  };
}

/**
 * Generates pre-tracing keys to be uploaded to the health authority backend.
 * Called by the location owner.
 * See section 4.5.1 of the specification
 *
 * Note: start- and endtime should be obtained by the app after authentication
 * to the health authority
 *
 * @param qrCodeTrace Private qr code generated during location setup
 * @param startTime time the SARS-CoV-2-positive person entered the location
 * @param endTime time the SARS-CoV-2-positive person exited the location
 * @returns List of pre-tracing keys as base-64 encoded strings
 */
export function genPreTrace(
    qrCodeTrace: QRCodeTrace,
    startTime: number,
    endTime: number,
): Array<string> {

  const qrCodePayload = QRCodePayload.decode(qrCodeTrace.qrCodePayload);

  const mpkl = new G2();
  mpkl.deserialize(qrCodePayload.crowdNotifierData.publicKey);
  const mskl = new Fr();
  mskl.deserialize(qrCodeTrace.masterSecretKeyLocation);
  const cryptoData = deriveNoncesAndNotificationKey(qrCodeTrace.qrCodePayload);

  const traceProof = TraceProof.create({
    masterPublicKey: qrCodePayload.crowdNotifierData.publicKey,
    nonce1: cryptoData.nonce1,
    nonce2: cryptoData.nonce2,
  });

  const preTraceWithProofList: Array<string> = [];
  getAffectedHours(startTime, endTime).forEach((hour) => {
    const startOfInterval = hour * 60 * 60;
    const identity = genIdV3(qrCodeTrace.qrCodePayload, startOfInterval);
    const pskidl = keyDer(mskl, identity);
    const preTrace = PreTrace.create({
      identity: identity,
      partialSecretKeyForIdentityOfLocation: pskidl,
      cipherTextHealthAuthority: qrCodeTrace.cipherTextHealthAuthority,
      notificationKey: cryptoData.notificationKey,
    });

    const preTraceWithProof = PreTraceWithProof.create({
      preTrace: preTrace,
      proof: traceProof,
      qrCodePayload: qrCodeTrace.qrCodePayload,
      startTime: startTime,
      endTime: endTime,
      startOfInterval: startOfInterval,
    });

    preTraceWithProofList.push(
        to_base64(PreTraceWithProof.encode(preTraceWithProof).finish()),
    );
  });
  return preTraceWithProofList;
}

/**
 * Function called by health authority to verify an uploaded pre-trace key
 * and generate a corresponding trace key
 *
 * @param preTraceWithProof
 * @param haKeyPair
 * @param version
 * @param message
 * @param countryData
 * @returns as base-64 encoded string
 */
export function genTrace(
    preTraceWithProof: PreTraceWithProof,
    haKeyPair: IKeyPair,
    version: number,
    message: string,
    countryData: Uint8Array,
): string | undefined {
  const identitySecret = verifyTrace(preTraceWithProof, haKeyPair);
  if (!identitySecret) {
    return undefined;
  }

  const nonce = randombytes_buf(NONCE_LENGTH);
  const encryptedAssociatedData = encryptAssociatedData(
      preTraceWithProof.preTrace.notificationKey,
      message,
      countryData,
      nonce,
      version,
  );
  const trace = Trace.create({
    identity: preTraceWithProof.preTrace.identity,
    secretKeyForIdentity: identitySecret,
    startTime: preTraceWithProof.startTime,
    endTime: preTraceWithProof.endTime,
    nonce: nonce,
    encryptedAssociatedData: encryptedAssociatedData,
  });
  return to_base64(Trace.encode(trace).finish());
}

export function verifyTrace(
    preTraceWithProof: PreTraceWithProof,
    haKeyPair: IKeyPair,
): mcl.G1 | undefined {
  const preTrace = preTraceWithProof.preTrace;
  const traceProof = preTraceWithProof.proof;
  const ctxtha = preTrace.cipherTextHealthAuthority;
  const mskh = new Fr();
  try {
    const mskh_raw = crypto_box_seal_open(
        ctxtha,
        haKeyPair.publicKey,
        haKeyPair.privateKey,
    );
    mskh.deserialize(mskh_raw);
  } catch (e) {
    return undefined;
  }
  const pskidha = keyDer(mskh, preTrace.identity);
  const pskidl = new G1();
  pskidl.deserialize(preTrace.partialSecretKeyForIdentityOfLocation);
  const skid = mcl.add(pskidl, pskidha);
  const identity = genIdV3(
      preTraceWithProof.qrCodePayload,
      preTraceWithProof.startOfInterval,
  );
  if (compare(preTrace.identity, identity) !== 0) {
    return undefined;
  }
  const msg_orig = randombytes_buf(NONCE_LENGTH);
  const mpk = new G2();
  mpk.deserialize(traceProof.masterPublicKey);
  const ctxt = enc(mpk, identity, msg_orig);
  const msg_dec = dec(identity, skid, ctxt);
  if (msg_dec === undefined) {
    return undefined;
  } else {
    return skid;
  }
}

export function match(
    rec: EncryptedVenueVisit,
    tr: Trace,
): ExposureEvent | undefined {
  const skid = new G1();
  skid.deserialize(tr.secretKeyForIdentity);
  let exposure: ExposureEvent | undefined = undefined;
  rec.ibeCiphertextEntries.every((encryptedData: IEncryptedData) => {
    const msgP = dec(tr.identity, skid, encryptedData);
    if (!msgP) {
      return true; // continue
    }
    const messagePayload: MessagePayload = JSON.parse(to_string(msgP));
    if (!messagePayload.notificationKey) {
      return true;
    }
    const decryptedMsg = crypto_secretbox_open_easy(
        messagePayload.notificationKey,
        tr.encryptedAssociatedData,
        tr.nonce,
    );
    const associatedData = AssociatedData.decode(decryptedMsg);
    exposure = {
      id: rec.id,
      startTimestamp: messagePayload.arrivalTime,
      endTimestamp: messagePayload.departureTime,
      message: associatedData.message,
      countryData: associatedData.countryData,
    };
    return false; // break
  });
  return exposure;
}
