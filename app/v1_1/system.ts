import {IKeyPair, sodium, v1_1} from '@c4dt/libcrowdnotifier';

export interface ITrace {
    tr: v1_1.tr;
    start: number;
    end: number;
}

/**
 * The System package uses the crypto but only passes around
 * base64 encoded protobuf messages. This helps to
 * understand which fields need to be serialized / deserialized.
 */

/**
 * HealthAuthority is responsible to keep the private key and
 * to publish the traces of locations that had a positively tested visitor.
 */
export class HealthAuthority {
    public keyPair: IKeyPair;

    constructor() {
      this.keyPair = v1_1.CryptoV1_1.setupHA();
    }

    /**
     * Takes the qrTrace from a location, decrypts it, and
     * returns the trace that needs to be
     * sent to all visitors.
     *
     * @param qrTrace the qr-code from the location
     * @param expectedInfo about the location
     * @param start in seconds since unix epoch
     * @param end in seconds since unix epoch
     */
    createTrace(qrTrace: string, expectedInfo: v1_1.LocationInfo,
        start: number, end: number): ITrace {
      const trace = qrTrace.replace(/^.*#/, '');
      const qrBuf = sodium.crypto_box_seal_open(
          sodium.from_base64(trace),
          this.keyPair.publicKey,
          this.keyPair.privateKey,
      );
      const qrCodeTrace = v1_1.QRCodeTrace.decode(qrBuf);
      // Check against expected info
      const infoBuf = v1_1.LocationInfo.encode(qrCodeTrace.info).finish();
      if (sodium.compare(infoBuf,
          v1_1.LocationInfo.encode(expectedInfo).finish()) !== 0) {
        throw new Error('not the same info');
      }
      const tr = {sk: qrCodeTrace.sk, r2: qrCodeTrace.r2};
      if (!v1_1.CryptoV1_1.verifyTrace(infoBuf, tr,
          {
            r1: qrCodeTrace.r1,
            r2: qrCodeTrace.r2,
          })
      ) {
        throw new Error('trace verification fails');
      }
      return {tr, start, end};
    }
}

/**
 * Location is used by a location owner to create the two QRCodes.
 */
export class Location {
    public data: v1_1.ILocationData;
    public info: v1_1.LocationInfo;
    public infoBuf: Uint8Array;

    constructor(public healthAuthorityPubKey: Uint8Array,
        name: string,
        location: string,
        room: string,
        venueType: number) {
      this.info = new v1_1.LocationInfo({
        version: 1,
        name, location, room, venueType,
        notificationKey: sodium.randombytes_buf(32),
      });
      this.infoBuf = v1_1.LocationInfo.encode(this.info).finish();
      this.data = v1_1.CryptoV1_1.genCode(this.infoBuf);
    }

    /**
     * Returns the base64 encoded protobuf-message for the location owner.
     *
     * @param baseURL - anything - is ignored and removed afterwards.
     */
    getQRtrace(baseURL: string): string {
      const qrct = new v1_1.QRCodeTrace({
        version: 2,
        sk: this.data.tr.sk,
        r1: this.data.pTr.r1,
        r2: this.data.pTr.r2,
        info: this.info,
      });
      const traceBuf = v1_1.QRCodeTrace.encode(qrct).finish();
      const traceEnc =
          sodium.crypto_box_seal(traceBuf, this.healthAuthorityPubKey);
      return `${baseURL}#${sodium.to_base64(traceEnc)}`;
    }

    /**
     * Returns the base64 encoded protobuf-message necessary for
     * visitors to register.
     *
     * @param baseURL - anything - is ignored and removed afterwards.
     */
    getQRentry(baseURL: string): string {
      const qrCodeContent = new v1_1.QRCodeContent({
        version: 2,
        publicKey: this.data.ent,
        r1: this.data.pEnt,
        info: this.info,
      });

      const qrCodeBuf = v1_1.QRCodeContent.encode(qrCodeContent).finish();
      return `${baseURL}#${sodium.to_base64(qrCodeBuf)}`;
    }
}

/**
 * The user has zero or more instances of Visit in his phone.
 */
export class Visit {
    private readonly visit: v1_1.IVisit;
    public info: v1_1.LocationInfo;

    constructor(
        qrCodeEntry: string,
        entry: number,
        departure: number,
    ) {
      const qrBase64 = qrCodeEntry.replace(/^.*#/, '');
      const content = v1_1.QRCodeContent.decode(sodium.from_base64(qrBase64));
      if (content === undefined) {
        throw new Error('didn\'t find \'content\'');
      }
      if (content.version !== 2) {
        throw new Error('Wrong version');
      }
      this.info = content.info;
      const infoBuf = v1_1.LocationInfo.encode(content.info).finish();
      const auxStr = `${entry.toString()}::${departure.toString()}`;
      const aux = Uint8Array.from([...sodium.from_string(auxStr)]);
      this.visit =
          v1_1.CryptoV1_1.scan(content.publicKey, content.r1, infoBuf, aux);
    }

    /**
     * Uses the traces created by the healthAuthority to detect
     * if it has been exposed.
     *
     * @param traces sent by the health authority
     * @return true if at least one of the traces is positive
     */
    verifyExposure(traces: ITrace[]): (undefined | [number, number]) {
      for (const trace of traces) {
        const aux = v1_1.CryptoV1_1.match(this.visit, trace.tr);
        if (aux !== undefined) {
          const [entry, departure] =
              sodium.to_string(aux).split('::').map((str) => parseInt(str));
          if (entry >= trace.start &&
                    departure <= trace.end) {
            return [entry, departure];
          }
        }
      }
      return undefined;
    }
}
