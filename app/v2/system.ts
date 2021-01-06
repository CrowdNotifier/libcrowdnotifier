import {
  genCode, genPreTrace, genTrace, IEncryptedData, ILocationData,
  QRCodeContent,
  MasterTrace, match,
  mcl,
  PreTrace, TraceProof, PreTraceWithProof,
  QRCodeEntry, QRCodeTrace, scan,
  setupHA,
  sodium,
  Trace, verifyTrace,
} from '@c4dt/libcrowdnotifier';

/**
 * The System package uses the crypto but only passes around
 * base64 encoded protobuf messages. This helps to
 * understand which fields need to be serialized / deserialized.
 */

/**
 * HealthAuthority wraps the calls for the health authority from
 * libcrowdnotifier namespace.
 */
export class HealthAuthority {
    public keyPair = setupHA();

    /**
     * In case of an infection notification, the
     * @param preTrace64 representation of preTrace
     * @param counts sent by the health authority
     */
    createTraceEntry(preTrace64: string, counts: string): string {
      const preTraceWithProof =
          PreTraceWithProof.decode(sodium.from_base64(preTrace64));
      const preTraceProto = preTraceWithProof.preTrace;
      const traceProofProto = preTraceWithProof.proof;
      const info = preTraceWithProof.info;

      const partialSecretKeyForIdentityOfLocation = new mcl.G1();
      partialSecretKeyForIdentityOfLocation
          .deserialize(preTraceProto.partialSecretKeyForIdentityOfLocation);
      const masterPublicKey = new mcl.G2();
      masterPublicKey.deserialize(traceProofProto.masterPublicKey);

      const preTrace = {
        id: preTraceProto.identity,
        ctxtha: preTraceProto.cipherTextHealthAuthority,
        pskidl: partialSecretKeyForIdentityOfLocation,
      };
      const traceProof = {
        mpk: masterPublicKey,
        nonce1: traceProofProto.nonce1,
        nonce2: traceProofProto.nonce2,
      };

      const count = parseInt(counts);
      const trace = genTrace(this.keyPair, preTrace);

      if (trace === undefined) {
        throw new Error('couldn\'t create a trace.');
      }
      if (!verifyTrace(info, count, trace, traceProof)) {
        throw new Error('Invalid trace.');
      }

      const traceProto = {
        identity: trace.id,
        secretKeyForIdentity: trace.skid.serialize(),
      };

      const traceSer = Trace.encode(Trace.create(traceProto)).finish();
      return sodium.to_base64(traceSer);
    }
}


/**
 * Location is used by a location owner to create the two QRCodes.
 */
export class Location {
    public data: ILocationData;

    constructor(
        healthAuthorityPubKey: Uint8Array,
        public venueType: number,
        public name: string,
        public location: string,
        public room: string,
    ) {
      const infoBinary =
          Location.info_to_binary(venueType, name, location, room);
      this.data = genCode(healthAuthorityPubKey, infoBinary);
    }

    static info_to_binary(
        venueType: number,
        name: string,
        location: string,
        room: string,
    ): Uint8Array {
      return sodium.from_string([venueType, name, location, room].join(':'));
    }

    static binary_to_info(bin: Uint8Array): string[] {
      return sodium.to_string(bin).split('::');
    }


    /**
     * preTrace is implemented as a static method,
     * because we suppose that the location owner doesn't have the
     * information necessary anywhere else than in the QRtrace code.
     *
     * TODO: add more than one count
     * @param qrTrace the string from the qrTrace code
     * @param counts currently only a string representing one count -
     * hours since the unix epoch.
     */
    static preTrace(qrTrace: string, counts: string): string {
      const qrTrace64 = qrTrace.replace(/^.*#/, '');
      const masterTraceRecordProto =
          QRCodeTrace.decode(sodium.from_base64(qrTrace64)).masterTraceRecord;

      const masterPublicKey = new mcl.G2();
      masterPublicKey.deserialize(masterTraceRecordProto.masterPublicKey);
      const masterSecretKeyLocation = new mcl.Fr();
      masterSecretKeyLocation
          .deserialize(masterTraceRecordProto.masterSecretKeyLocation);

      const masterTraceRecord = {
        mpk: masterPublicKey,
        mskl: masterSecretKeyLocation,
        info: masterTraceRecordProto.info,
        nonce1: masterTraceRecordProto.nonce1,
        nonce2: masterTraceRecordProto.nonce2,
        ctxtha: masterTraceRecordProto.cipherTextHealthAuthority,
      };
      const count = parseInt(counts);
      const [preTrace, traceProof] = genPreTrace(masterTraceRecord, count);
      const preTraceProto = PreTrace.create({
        identity: preTrace.id,
        cipherTextHealthAuthority: preTrace.ctxtha,
        partialSecretKeyForIdentityOfLocation: preTrace.pskidl.serialize(),
      });
      const traceProofProto = TraceProof.create({
        masterPublicKey: traceProof.mpk.serialize(),
        nonce1: traceProof.nonce1,
        nonce2: traceProof.nonce2,
      });
      const preTraceWithProof = PreTraceWithProof.create({
        preTrace: preTraceProto,
        proof: traceProofProto,
        info: masterTraceRecordProto.info,
      });
      return sodium.to_base64(PreTraceWithProof
          .encode(preTraceWithProof).finish());
    }


    /**
     * Returns the base64 encoded protobuf-message for the location owner.
     *
     * @param baseURL - anything - is ignored and removed afterwards.
     */
    getQRtrace(baseURL: string): string {
      const qrTrace = new QRCodeTrace({
        version: 2,
        masterTraceRecord: this.protoMTR(),
      });
      return `${baseURL}#`+
          `${sodium.to_base64(QRCodeTrace.encode(qrTrace).finish())}`;
    }


    /**
     * Returns the base64 encoded protobuf-message necessary for
     * visitors to register.
     *
     * @param baseURL - anything - is ignored and removed afterwards.
     */
    getQRentry(baseURL: string): string {
      const data = QRCodeContent.create({
        name: this.name,
        location: this.location,
        room: this.room,
        venueType: this.venueType,
      });
      const qrEntry = QRCodeEntry.create({
        version: 2,
        data,
        masterPublicKey: this.data.ent.serialize(),
        entryProof: this.data.pEnt,
      });
      return `${baseURL}#`+
          `${sodium.to_base64(QRCodeEntry.encode(qrEntry).finish())}`;
    }


    private protoMTR(): MasterTrace {
      return new MasterTrace({
        masterPublicKey: this.data.mtr.mpk.serialize(),
        masterSecretKeyLocation: this.data.mtr.mskl.serialize(),
        info: this.data.mtr.info,
        nonce1: this.data.mtr.nonce1,
        nonce2: this.data.mtr.nonce2,
        cipherTextHealthAuthority: this.data.mtr.ctxtha,
      });
    }
}

/**
 * The user has zero or more instances of Visit in his phone.
 */
export class Visit {
    public identity = 'undefined';
    private readonly data: IEncryptedData;

    constructor(
        qrCodeEntry: string,
        entryTime: number,
        diary?: boolean,
    ) {
      const qrBase64 = qrCodeEntry.replace(/^.*#/, '');
      const qrEntry = QRCodeEntry.decode(sodium.from_base64(qrBase64));
      if (qrEntry.version === undefined || qrEntry.version !== 2) {
        throw new Error('Unknown version of QR code entry.');
      }
      if (qrEntry.data === undefined) {
        throw new Error('Invalid QR code entry.');
      }

      const masterPublicKey = new mcl.G2();
      masterPublicKey.deserialize(qrEntry.masterPublicKey);

      const info = Location.info_to_binary(qrEntry.data.venueType,
          qrEntry.data.name, qrEntry.data.location, qrEntry.data.room);
      this.data = scan(masterPublicKey,
          qrEntry.entryProof,
          info,
          entryTime,
          diary ? info : sodium.from_string('anonymous'));
    }

    /**
     * Uses the traces created by the healthAuthority to detect if
     * it has been exposed.
     *
     * @param traces sent by the health authority
     * @return true if at least one of the traces is positive
     */
    verifyExposure(traces: string[]): boolean {
      for (const trace of traces) {
        const trProto = Trace.decode(sodium.from_base64(trace));

        const secretKeyForIdentity = new mcl.G1();
        secretKeyForIdentity.deserialize(trProto.secretKeyForIdentity);

        const tr = {id: trProto.identity, skid: secretKeyForIdentity};

        const aux = match(this.data, tr);
        if (aux !== undefined) {
          this.identity = sodium.to_string(aux);
          return true;
        }
      }
      return false;
    }
}
