import {CryptoV1, ILocationData, ILocationInfo, ITrace, IVisit} from "./crypto";
import {
    crypto_box_seal,
    crypto_box_seal_open,
    crypto_sign_detached, crypto_sign_verify_detached,
    from_base64, IKeyPair,
    to_base64
} from "../lib/sodium";
import {QRCodeContent, QRCodeWrapper} from "./proto";

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
        this.keyPair = CryptoV1.setupHA();
    }

    /**
     * Takes the qrTrace from a location, decrypts it, and returns the trace that needs to be
     * sent to all visitors.
     *
     * @param qrTrace the qr-code from the location
     * @param start in seconds since unix epoch
     * @param end in seconds since unix epoch
     */
    createTrace(qrTrace: string, start: number, end: number): ITrace {
        const trace = qrTrace.replace(/^.*#/, '');
        const privKey = crypto_box_seal_open(
            from_base64(trace),
            this.keyPair.publicKey,
            this.keyPair.privateKey
        );

        return {privKey, start, end}
    }
}

/**
 * Location is used by a location owner to create the two QRCodes.
 */
export class Location {
    public data: ILocationData;

    constructor(public healthAuthorityPubKey: Uint8Array,
                name: string, location: string, room: string, locationType: number) {
        this.data = CryptoV1.genCode({name, location, room, locationType})
    }

    /**
     * Returns the base64 encoded protobuf-message for the location owner.
     *
     * @param baseURL - anything - is ignored and removed afterwards.
     */
    getQRtrace(baseURL: string): string {
        const traceEnc = crypto_box_seal(this.data.keyPair.privateKey, this.healthAuthorityPubKey);
        return `${baseURL}#${to_base64(traceEnc)}`;
    }

    /**
     * Returns the base64 encoded protobuf-message necessary for visitors to register.
     *
     * @param baseURL - anything - is ignored and removed afterwards.
     */
    getQRentry(baseURL: string): string {
        const {name, location, room, notificationKey} = this.data.seedMessage;
        const keyPair = this.data.keyPair;
        const qrCodeContent = QRCodeContent.create({
            version: 1,
            publicKey: keyPair.publicKey,
            name,
            location,
            room,
            venueType: -1,
            notificationKey
        });
        const signature = crypto_sign_detached(
            QRCodeContent.encode(qrCodeContent).finish(), keyPair.privateKey
        );

        const qrCodeWrapper = QRCodeWrapper.create({
            version: 1,
            content: qrCodeContent,
            signature
        });

        const qrCodeWrapperProtoBufBytes = QRCodeWrapper.encode(
            qrCodeWrapper
        ).finish();
        return `${baseURL}#${to_base64(qrCodeWrapperProtoBufBytes)}`;
    }
}

/**
 * The user has zero or more instances of Visit in his phone.
 */
export class Visit {
    private visit: IVisit;

    constructor(
        qrCodeEntry: string,
        entry: number,
        departure: number,
        diary?: boolean
    ) {
        const qrBase64 = qrCodeEntry.replace(/^.*#/, '');
        const qrEntry = QRCodeWrapper.decode(from_base64(qrBase64));
        if (qrEntry.version === undefined || qrEntry.version !== 1) {
            throw new Error("didn't find 'version'");
        }
        const content: QRCodeContent = qrEntry.content;
        if (content === undefined) {
            throw new Error("didn't find 'content'");
        }
        if (!crypto_sign_verify_detached(qrEntry.signature, QRCodeContent.encode(content).finish(), content.publicKey)){
            throw new Error("signature didn't match");
        }
        const info: ILocationInfo = {
            name: content.name, location: content.location, room: content.room, locationType: content.venueType
        };
        this.visit = CryptoV1.scan(content.publicKey, info, entry, departure, content.notificationKey, diary);
    }

    /**
     * Uses the traces created by the healthAuthority to detect if it has been exposed.
     *
     * @param traces sent by the health authority
     * @return true if at least one of the traces is positive
     */
    verifyExposure(traces: ITrace[]): (undefined | string) {
        for (const trace of traces) {
            const info = CryptoV1.match(this.visit, trace);
            if (info !== undefined) {
                return info;
            }
        }
        return undefined;
    }
}
