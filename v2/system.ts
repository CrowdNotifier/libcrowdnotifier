import {IEncryptedData} from "./crypto";
import {ILocationData, CrowdNotifierPrimitives} from "./crowdnotifier";
import {from_base64, to_base64} from "../lib/sodium";
import * as mcl from "../lib/mcl";
import {MasterTrace, LocationData, QRCodeEntry, QRCodeTrace, Trace, PreTraceWithProof} from "./proto";

/**
 * The System package uses the crypto but only passes around base64 encoded protobuf messages. This helps to
 * understand which fields need to be serialized / deserialized.
 */

/**
 * HealthAuthority wraps the calls for the health authority from the CrowdNotifierPrimitives
 * namespace.
 */
export class HealthAuthority {
    public keyPair = CrowdNotifierPrimitives.setupHA();

    /**
     * In case of an infection notification, the
     * @param preTraceJSON representation of preTrace
     * @param counts sent by the health authority
     */
    createTraceEntry(preTrace64: string, counts: string): string {
        const preTraceWithProof = PreTraceWithProof.decode(from_base64(preTrace64));
        const preTraceProto = preTraceWithProof.pretrace;
        const traceProofProto = preTraceWithProof.proof;
        const info = preTraceWithProof.info;

        const pskidl = new mcl.G1();
        pskidl.deserialize(preTraceProto.pskidl);
        const mpk = new mcl.G2();
        mpk.deserialize(traceProofProto.mpk);

        const preTrace = {
            id: preTraceProto.id,
            ctxtha: preTraceProto.ctxtha,
            pskidl
        };
        const traceProof = {
            mpk,
            nonce1: traceProofProto.nonce1,
            nonce2: traceProofProto.nonce2
        };

        const count = parseInt(counts);
        const trace = CrowdNotifierPrimitives.genTrace(this.keyPair, preTrace);

        if (trace === undefined) {
            throw new Error("couldn't create a trace.");
        }
        if (!CrowdNotifierPrimitives.verifyTrace(info, count, trace, traceProof)) {
            throw new Error("Invalid trace.");
        }

        const traceProto = {
            id: trace.id,
            skid: trace.skid.serialize()
        };

        const traceSer = Trace.encode(Trace.create(traceProto)).finish();
        return to_base64(traceSer);
    }
}


/**
 * Location is used by a location owner to create the two QRCodes.
 */
export class Location {
    public data: ILocationData;

    constructor(
        healthAuthorityPubKey: Uint8Array,
        locType: number,
        name: string,
        location: string,
        room: string
    ) {
        const infoStr = new TextEncoder().encode([locType, name, location, room].join(":"));
        this.data = CrowdNotifierPrimitives.genCode(healthAuthorityPubKey, infoStr);
    }


    /**
     * preTrace is implemented as a static method, because we suppose that the location owner doesn't have the
     * information necessary anywhere else than in the QRtrace code.
     *
     * TODO: add more than one count
     * @param qrTrace the string from the qrTrace code
     * @param counts currently only a string representing one count - hours since the unix epoch.
     */
    static preTrace(qrTrace: string, counts: string): string {
        const qrTrace64 = qrTrace.replace(/^.*#/, "");
        const mtrProto = QRCodeTrace.decode(from_base64(qrTrace64)).mtr;

        const mpk = new mcl.G2();
        mpk.deserialize(mtrProto.mpk);
        const mskl = new mcl.Fr();
        mskl.deserialize(mtrProto.mskl);

        const mtr = {
            mpk,
            mskl,
            info: mtrProto.info,
            nonce1: mtrProto.nonce1,
            nonce2: mtrProto.nonce2,
            ctxtha: mtrProto.ctxtha
        };
        const count = parseInt(counts);
        const [preTrace, traceProof] = CrowdNotifierPrimitives.genPreTrace(mtr, count);
        const preTraceProto = {
            id: preTrace.id,
            ctxtha: preTrace.ctxtha,
            pskidl: preTrace.pskidl.serialize()
        };
        const traceProofProto = {
            mpk: traceProof.mpk.serialize(),
            nonce1: traceProof.nonce1,
            nonce2: traceProof.nonce2
        };
        const preTraceWithProof = PreTraceWithProof.create({
            pretrace: preTraceProto,
            proof: traceProofProto,
            info: mtrProto.info
        });
        return to_base64(PreTraceWithProof.encode(preTraceWithProof).finish());
    }


    /**
     * Returns the base64 encoded protobuf-message for the location owner.
     *
     * @param baseURL - anything - is ignored and removed afterwards.
     */
    getQRtrace(baseURL: string): string {
        const qrTrace = new QRCodeTrace({
            version: 2,
            mtr: this.protoMTR(),
        });
        return `${baseURL}#${to_base64(QRCodeTrace.encode(qrTrace).finish())}`;
    }


    /**
     * Returns the base64 encoded protobuf-message necessary for visitors to register.
     *
     * @param baseURL - anything - is ignored and removed afterwards.
     */
    getQRentry(baseURL: string): string {
        const mtr = this.protoMTR();
        const data = LocationData.create({
            ent: this.data.ent.serialize(),
            piEnt: this.data.piEnt,
            mtr
        });
        const qrEntry = QRCodeEntry.create({
            version: 2, data
        });
        return `${baseURL}#${to_base64(QRCodeEntry.encode(qrEntry).finish())}`;
    }


    private protoMTR(): MasterTrace {
        return new MasterTrace({
            mpk: this.data.mtr.mpk.serialize(),
            mskl: this.data.mtr.mskl.serialize(),
            info: this.data.mtr.info,
            nonce1: this.data.mtr.nonce1,
            nonce2: this.data.mtr.nonce2,
            ctxtha: this.data.mtr.ctxtha
        });
    }
}

/**
 * The user has zero or more instances of Visit in his phone.
 */
export class Visit {
    public identity: string;
    private data: IEncryptedData;

    constructor(
        qrCodeEntry: string,
        entry: number,
        departure: number,
        diary?: boolean
    ) {
        const qrBase64 = qrCodeEntry.replace(/^.*#/, "");
        const qrEntry = QRCodeEntry.decode(from_base64(qrBase64));
        if (qrEntry.version === undefined || qrEntry.version !== 2) {
            throw new Error("Unknown version of QR code entry.");
        }
        if (qrEntry.data === undefined) {
            throw new Error("Invalid QR code entry.");
        }

        const mpk = new mcl.G2();
        mpk.deserialize(qrEntry.data.mtr.mpk);
        const mskl = new mcl.Fr();
        mskl.deserialize(qrEntry.data.mtr.mskl);
        const ent = new mcl.G2();
        ent.deserialize(qrEntry.data.ent);

        const mtr = {
            mpk,
            mskl,
            info: qrEntry.data.mtr.info,
            nonce1: qrEntry.data.mtr.nonce1,
            nonce2: qrEntry.data.mtr.nonce2,
            ctxtha: qrEntry.data.mtr.ctxtha
        };

        const locationData: ILocationData = {ent, piEnt: qrEntry.data.piEnt, mtr};

        this.data = CrowdNotifierPrimitives.scan(locationData.ent, locationData.piEnt, locationData.mtr.info,
            entry, diary ? locationData.mtr.info : new TextEncoder().encode("anonymous"));
    }

    /**
     * Uses the traces created by the healthAuthority to detect if it has been exposed.
     *
     * @param traces sent by the health authority
     * @return true if at least one of the traces is positive
     */
    verifyExposure(traces: string[]): boolean {
        for (const trace of traces) {
            const trProto = Trace.decode(from_base64(trace));

            const skid = new mcl.G1();
            skid.deserialize(trProto.skid);

            const tr = {id: trProto.id, skid};

            const aux = CrowdNotifierPrimitives.match(this.data, tr);
            if (aux !== undefined) {
                const aux_u = new TextDecoder().decode(aux);
                this.identity = aux_u;
                return true;
            }
        }
        return false;
    }
}
