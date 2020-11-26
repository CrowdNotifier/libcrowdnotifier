import {CryptoV1_1, ILocationData, IVisit, tr} from "./crypto";
import {crypto_box_seal, crypto_box_seal_open, from_base64, IKeyPair, randombytes_buf, to_base64} from "../lib/sodium";
import {QRCodeContent, QRCodeTrace} from "./proto";

export interface ITrace {
    tr: tr;
    start: number;
    end: number;
}

/**
 * The System package uses the crypto but only passes around base64 encoded protobuf messages. This helps to
 * understand which fields need to be serialized / deserialized.
 */

/**
 * HealthAuthority is responsible to keep the private key and to publish the traces of
 * locations that had a positively tested visitor.
 */
export class HealthAuthority {
    public keyPair: IKeyPair;

    constructor() {
        this.keyPair = CryptoV1_1.setupHA();
    }

    /**
     * Takes the qrTrace from a location, decrypts it, and returns the trace that needs to be
     * sent to all visitors.
     *
     * @param qrTrace the qr-code from the location
     * @param info about the location
     * @param start in seconds since unix epoch
     * @param end in seconds since unix epoch
     */
    createTrace(qrTrace: string, info: string, start: number, end: number): ITrace {
        const trace = qrTrace.replace(/^.*#/, '');
        const qrBuf = crypto_box_seal_open(
            from_base64(trace),
            this.keyPair.publicKey,
            this.keyPair.privateKey
        );
        const qrCodeTrace = QRCodeTrace.decode(qrBuf);
        if (qrCodeTrace.info !== info) {
            throw new Error("not the same info");
        }
        const tr = {sk: qrCodeTrace.trSk, r2: qrCodeTrace.trR2};
        if (!CryptoV1_1.verifyTrace(info, tr,
            {
                r1: qrCodeTrace.pTrR1,
                r2: qrCodeTrace.pTrR2,
            })
        ) {
            throw new Error("trace verification fails")
        }
        return {tr, start, end}
    }
}

/**
 * Location is used by a location owner to create the two QRCodes.
 */
export class Location {
    public data: ILocationData;
    public notificationKey = randombytes_buf(32);

    constructor(public healthAuthorityPubKey: Uint8Array,
                public name: string,
                public location: string,
                public room: string,
                public locationType: number) {
        this.data = CryptoV1_1.genCode(this.infoStr());
    }

    static infoStr(name: string, location: string, room: string, locationType: number): string {
        return [name, location, room, locationType.toString()].join("::");
    }

    infoStr(): string {
        return Location.infoStr(this.name, this.location, this.room, this.locationType);
    }

    /**
     * Returns the base64 encoded protobuf-message for the location owner.
     *
     * @param baseURL - anything - is ignored and removed afterwards.
     */
    getQRtrace(baseURL: string): string {
        const qrct = new QRCodeTrace({
            version: 2,
            trSk: this.data.tr.sk,
            trR2: this.data.tr.r2,
            pTrR1: this.data.pTr.r1,
            pTrR2: this.data.pTr.r2,
            info: this.infoStr(),
        });
        const traceBuf = QRCodeTrace.encode(qrct).finish();
        const traceEnc = crypto_box_seal(traceBuf, this.healthAuthorityPubKey);
        return `${baseURL}#${to_base64(traceEnc)}`;
    }

    /**
     * Returns the base64 encoded protobuf-message necessary for visitors to register.
     *
     * @param baseURL - anything - is ignored and removed afterwards.
     */
    getQRentry(baseURL: string): string {
        const qrCodeContent = QRCodeContent.create({
            version: 2,
            publicKey: this.data.ent,
            pEnt: this.data.pEnt,
            name: this.name,
            location: this.location,
            room: this.room,
            venueType: this.locationType,
            notificationKey: this.notificationKey
        });

        const qrCodeBuf = QRCodeContent.encode(qrCodeContent).finish();
        return `${baseURL}#${to_base64(qrCodeBuf)}`;
    }
}

/**
 * The user has zero or more instances of Visit in his phone.
 */
export class Visit {
    private visit: IVisit;

    constructor(
        qrCodeEntry: string,
        public entry: number,
        public departure: number,
        diary?: boolean
    ) {
        const qrBase64 = qrCodeEntry.replace(/^.*#/, '');
        const content = QRCodeContent.decode(from_base64(qrBase64));
        if (content === undefined) {
            throw new Error("didn't find 'content'");
        }
        if (content.version !== 2) {
            throw new Error("Wrong version")
        }
        const infoBuf = Location.infoStr(content.name, content.location, content.room,
            content.venueType);
        this.visit = CryptoV1_1.scan(content.publicKey, content.pEnt, infoBuf, diary);
    }

    /**
     * Uses the traces created by the healthAuthority to detect if it has been exposed.
     *
     * @param traces sent by the health authority
     * @return true if at least one of the traces is positive
     */
    verifyExposure(traces: ITrace[]): (undefined | string) {
        for (const trace of traces) {
            const info = CryptoV1_1.match(this.visit, trace.tr);
            if (info !== undefined) {
                if (this.entry >= trace.start &&
                    this.departure <= trace.end) {
                    return info;
                }
            }
        }
        return undefined;
    }
}
