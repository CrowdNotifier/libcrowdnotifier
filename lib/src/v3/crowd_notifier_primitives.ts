import {
  compare,
  crypto_box_keypair,
  crypto_box_seal,
  crypto_box_seal_open,
  crypto_secretbox_NONCEBYTES,
  crypto_secretbox_open_easy,
  from_base64,
  from_string,
  IKeyPair,
  randombytes_buf,
  to_base64,
  to_string,
} from 'libsodium-wrappers-sumo';
import {dec, enc, IEncryptedData, keyDer, keyGen, NONCE_LENGTH} from
  '../v2/ibe_primitives';
import mcl from 'mcl-wasm';
import {EncryptedVenueVisit, ExposureEvent, MessagePayload, VenueInfo} from
  './structs';
import {crowdnotifier_v3} from './messages';
import {QRCodeEntry as QRCodeEntryV2} from '../v2/proto';
import {
  deriveNoncesAndNotificationKey,
  encryptAssociatedData,
  genIdV3,
  getAffectedHours,
  getIBECiphertext,
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
    version: number | undefined,
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
  if (version === undefined) {
    version = 3;
  }

  if (description.length > 100) {
    throw new Error('Description cannot be longer than 100 characters');
  }
  if (address.length > 100) {
    throw new Error('Address cannot be longer than 100 characters');
  }

  const traceLocation = crowdnotifier_v3.TraceLocation.create({
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

  const crowdNotifierData = crowdnotifier_v3.CrowdNotifierData.create({
    version: version,
    publicKey: mpk.serialize(),
    cryptographicSeed: seed,
  });

  const qrCodePayload = crowdnotifier_v3.QRCodePayload.create({
    version: version,
    locationData: traceLocation,
    crowdNotifierData: crowdNotifierData,
    countryData: countryData,
  });

  const qrCodeTrace = crowdnotifier_v3.QRCodeTrace.create({
    version: version,
    qrCodePayload: crowdnotifier_v3.QRCodePayload.encode(
        qrCodePayload,
    ).finish(),
    masterSecretKeyLocation: mskl.serialize(),
    cipherTextHealthAuthority: ctxtha,
  });

  return {
    qrCodePayload: to_base64(
        crowdnotifier_v3.QRCodePayload.encode(qrCodePayload).finish(),
    ),
    qrCodeTrace: to_base64(
        crowdnotifier_v3.QRCodeTrace.encode(qrCodeTrace).finish(),
    ),
  };
}

/**
 * Compatibility method to correctly create the information from a
 * version-2 QRcode.
 *
 * @param qrCodeString the binary representation of the data in the QRcode.
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

  const notifyMeLocationData = crowdnotifier_v3.NotifyMeLocationData.create({
    version: 2,
    type: Object.values(crowdnotifier_v3.VenueType).indexOf(
        qrCodeContentV2.getVenueTypeStr(),
    ),
    room: qrCodeContentV2.room,
  });
  const countryData: Uint8Array = crowdnotifier_v3.NotifyMeLocationData.encode(
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
 * Parses a version 3 QRcode and returns the VenueInfo.
 *
 * @param qrCodeString base64 representation of the protobuf data
 * in the QRcode, with an eventual URL part already stripped away.
 */
export function getVenueInfoFromQrCodeV3(qrCodeString: string): VenueInfo {
  const qrCodeAsBytes = from_base64(qrCodeString);
  const qrCodePayload = crowdnotifier_v3.QRCodePayload.decode(qrCodeAsBytes);
  if (
    !(
      qrCodePayload.locationData &&
            qrCodePayload.crowdNotifierData &&
            qrCodePayload.locationData.description &&
            qrCodePayload.locationData.address &&
            qrCodePayload.locationData.startTimestamp &&
            qrCodePayload.locationData.endTimestamp &&
            qrCodePayload.crowdNotifierData.publicKey
    )
  ) {
    throw new Error('qrCodePayload contained undefined or null fields');
  }
  if (Date.now() / 1000 < qrCodePayload.locationData.startTimestamp) {
    throw new Error('Start timestamp isn\'t valid yet');
  } else if (Date.now() / 1000 > qrCodePayload.locationData.endTimestamp) {
    throw new Error('End timestamp isn\'t valid anymore');
  }

  const cryptoData = deriveNoncesAndNotificationKey(qrCodeAsBytes);
  return {
    description: qrCodePayload.locationData.description,
    address: qrCodePayload.locationData.address,
    notificationKey: cryptoData.notificationKey,
    publicKey: qrCodePayload.crowdNotifierData.publicKey,
    nonce1: cryptoData.noncePreId,
    nonce2: cryptoData.nonceTimekey,
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

  const ibeCiphertextEntries = getAffectedHours(arrivalTime, departureTime)
      .map((hour) =>
        getIBECiphertext(
            arrivalTime,
            departureTime,
            hour,
            venueInfo,
            masterPublicKey,
        ),
      );

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
    qrCodeTrace: crowdnotifier_v3.QRCodeTrace,
    startTime: number,
    endTime: number,
): Array<string> {
  const qrCodePayload = crowdnotifier_v3.QRCodePayload.decode(
      qrCodeTrace.qrCodePayload,
  );
  if (
    !(
      qrCodePayload.crowdNotifierData &&
            qrCodePayload.crowdNotifierData.publicKey
    )
  ) {
    throw new Error('Couldn\'t read publickey from qrCodePayload');
  }
  const mpkl = new mcl.G2();
  mpkl.deserialize(qrCodePayload.crowdNotifierData.publicKey);
  const mskl = new mcl.Fr();
  mskl.deserialize(qrCodeTrace.masterSecretKeyLocation);
  const cryptoData = deriveNoncesAndNotificationKey(
      qrCodeTrace.qrCodePayload,
  );

  const traceProof = crowdnotifier_v3.TraceProof.create({
    masterPublicKey: qrCodePayload.crowdNotifierData.publicKey,
    nonce1: cryptoData.noncePreId,
    nonce2: cryptoData.nonceTimekey,
  });

  return getAffectedHours(startTime, endTime).map((hour) => {
    const startOfInterval = hour * 60 * 60;
    const identity = genIdV3(qrCodeTrace.qrCodePayload, startOfInterval);
    const pskidl = keyDer(mskl, identity);
    const preTrace = crowdnotifier_v3.PreTrace.create({
      identity: identity,
      partialSecretKeyForIdentityOfLocation: pskidl.serialize(),
      cipherTextHealthAuthority: qrCodeTrace.cipherTextHealthAuthority,
      notificationKey: cryptoData.notificationKey,
    });

    const preTraceWithProof = crowdnotifier_v3.PreTraceWithProof.create({
      preTrace: preTrace,
      proof: traceProof,
      qrCodePayload: qrCodeTrace.qrCodePayload,
      startTime: startTime,
      endTime: endTime,
      startOfInterval: startOfInterval,
    });

    return to_base64(
        crowdnotifier_v3.PreTraceWithProof.encode(
            preTraceWithProof,
        ).finish(),
    );
  });
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
    preTraceWithProof: crowdnotifier_v3.PreTraceWithProof,
    haKeyPair: IKeyPair,
    version: number,
    message: string,
    countryData: Uint8Array,
): string | undefined {
  const identitySecret = verifyTrace(preTraceWithProof, haKeyPair);
  if (!identitySecret) {
    return undefined;
  }

  const nonce = randombytes_buf(crypto_secretbox_NONCEBYTES);
  const encryptedAssociatedData = encryptAssociatedData(
        preTraceWithProof.preTrace!.notificationKey!,
        message,
        countryData,
        nonce,
        version,
  );
  const trace = crowdnotifier_v3.Trace.create({
    identity: preTraceWithProof.preTrace!.identity,
    secretKeyForIdentity: identitySecret.serialize(),
    startTime: preTraceWithProof.startTime,
    endTime: preTraceWithProof.endTime,
    nonce: nonce,
    encryptedAssociatedData: encryptedAssociatedData,
  });
  return to_base64(crowdnotifier_v3.Trace.encode(trace).finish());
}

/**
 * Verifies that a given trace is valid, given a keypair from a HealthAuthority.
 *
 * @param preTraceWithProof from the location-organizer
 * @param haKeyPair secret keypair from the health authority
 */
export function verifyTrace(
    preTraceWithProof: crowdnotifier_v3.PreTraceWithProof,
    haKeyPair: IKeyPair,
): mcl.G1 | undefined {
  const preTrace = preTraceWithProof.preTrace;
  const traceProof = preTraceWithProof.proof;
  if (
    !(
      preTrace &&
            traceProof &&
            preTraceWithProof.startOfInterval &&
            preTrace.identity &&
            preTrace.partialSecretKeyForIdentityOfLocation &&
            preTrace.cipherTextHealthAuthority &&
            preTrace.notificationKey &&
            traceProof.masterPublicKey &&
            traceProof.nonce1 &&
            traceProof.nonce2
    )
  ) {
    throw new Error('PreTraceWithProof contained undefined fields');
  }

  // Get the encrypted data fromt he pretrace-proof, which allowed the
  // location owner to be exempt from coercion.
  const ctxtha = preTrace.cipherTextHealthAuthority;
  const mskh = new mcl.Fr();
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

  // Check that the pre-trace is valid by verifying the identity is correct.
  const pskidha = keyDer(mskh, preTrace.identity);
  const pskidl = new mcl.G1();
  pskidl.deserialize(preTrace.partialSecretKeyForIdentityOfLocation);
  const skid = mcl.add(pskidl, pskidha);
  const identity = genIdV3(
      preTraceWithProof.qrCodePayload,
      preTraceWithProof.startOfInterval,
  );
  if (compare(preTrace.identity, identity) !== 0) {
    return undefined;
  }

  // Verify that the identity itself has been correctly encrypted
  // by the location owner.
  const msg_orig = randombytes_buf(NONCE_LENGTH);
  const mpk = new mcl.G2();
  mpk.deserialize(traceProof.masterPublicKey);
  const ctxt = enc(mpk, identity, msg_orig);
  const msg_dec = dec(identity, skid, ctxt);
  if (msg_dec === undefined) {
    return undefined;
  } else {
    return skid;
  }
}

/**
 * For the visitor, check if a given encrypted visit matches a trace received
 * from the server.
 *
 * @param rec is the locally stored encrypted visit
 * @param tr comes from the server
 */
export function match(
    rec: EncryptedVenueVisit,
    tr: crowdnotifier_v3.Trace,
): ExposureEvent | undefined {
  const skid = new mcl.G1();
  skid.deserialize(tr.secretKeyForIdentity);

  // Returns the first element that can be successfully converted
  // to an ExposureEvent.
  // if none of the elements match, `undefined` is returned.
  return rec.ibeCiphertextEntries
      .reduce((previous: ExposureEvent | undefined,
          encryptedData: IEncryptedData) => {
        if (previous !== undefined) {
          return previous;
        }
        const msgP = dec(tr.identity, skid, encryptedData);
        if (!msgP) {
          return undefined;
        }
        const msgParsed = JSON.parse(to_string(msgP));
        const messagePayload: MessagePayload = msgParsed;
        if (!messagePayload.notificationKey) {
          return undefined;
        }

        // This is required due to the way JSON stringifies UInt8Arrays
        const nkey = Uint8Array.from(msgParsed.notificationKey.data);
        const decryptedMsg = crypto_secretbox_open_easy(
            tr.encryptedAssociatedData,
            tr.nonce,
            nkey,
        );
        const associatedData = crowdnotifier_v3.AssociatedData.decode(
            decryptedMsg,
        );

        return {
          id: rec.id,
          startTimestamp: messagePayload.arrivalTime,
          endTimestamp: messagePayload.departureTime,
          message: associatedData.message,
          countryData: associatedData.countryData,
        };
      },
      undefined);
}
