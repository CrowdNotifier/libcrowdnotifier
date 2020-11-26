import {ILocationData, IUserRecord, Section7} from "./crypto";
import {from_base64, to_base64} from "../lib/sodium";
import * as mcl from "../lib/mcl";
import {LocationData, MasterTrace, PreTrace, QRCodeEntry, QRCodeTrace} from "./proto";

/**
 * The System package uses the crypto but only passes around base64 encoded protobuf messages. This helps to
 * understand which fields need to be serialized / deserialized.
 */

/**
 * HealthAuthority wraps the calls for the health authority from the Section7
 * namespace.
 */
export class HealthAuthority {
    public keyPair = Section7.setupHA();

    /**
     * In case of an infection notification, the
     * @param preTraceJSON representation of preTrace
     * @param counts sent by the health authority
     */
    createTraceEntry(preTrace64: string, counts: string): string {
        const preTraceProto = PreTrace.decode(from_base64(preTrace64));
        const Tprime = new mcl.G1();
        Tprime.deserialize(preTraceProto.Tprime);
        const preTrace = {
            Tprime,
            info: preTraceProto.info,
            nonce: preTraceProto.nonce,
            ctxt: preTraceProto.ctxt,
        }
        const count = parseInt(counts);
        const trace = Section7.genTrace(this.keyPair, count, preTrace);
        if (trace === undefined) {
            throw new Error("couldn't create a trace.")
        }
        return to_base64(trace.serialize());
    }
}

/**
 * Location is used by a location owner to create the two QRCodes.
 */
export class Location {
    public data: ILocationData;

    constructor(healthAuthorityPubKey: Uint8Array,
                locType: number, name: string, location: string, room: string) {
        const infoStr = [locType, name, location, room].join(":");
        this.data = Section7.genCode(infoStr, healthAuthorityPubKey);
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
        const qrTrace64 = qrTrace.replace(/^.*#/, '');
        const mtrProto = QRCodeTrace.decode(from_base64(qrTrace64)).mtr;
        const mskv = new mcl.Fr();
        mskv.deserialize(mtrProto.mskv)
        const mtr = {
            mskv,
            info: mtrProto.info,
            nonce: mtrProto.nonce,
            mskHAEnc: mtrProto.mskHAEnc,
        }
        const count = parseInt(counts);
        const preTrace = Section7.genPreTrace(mtr, count);
        const preTraceProto = PreTrace.create({
            Tprime: preTrace.Tprime.serialize(),
            info: preTrace.info,
            nonce: preTrace.nonce,
            ctxt: preTrace.ctxt,
        })
        return to_base64(PreTrace.encode(preTraceProto).finish());
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
            pEnt: this.data.pEnt,
            mtr
        });
        const qrEntry = QRCodeEntry.create({
            version: 2, data
        });
        return `${baseURL}#${to_base64(QRCodeEntry.encode(qrEntry).finish())}`;
    }

    private protoMTR(): MasterTrace {
        return new MasterTrace({
            mskv: this.data.mtr.mskv.serialize(),
            info: this.data.mtr.info,
            nonce: this.data.mtr.nonce,
            mskHAEnc: this.data.mtr.mskHAEnc,
        });
    }
}

/**
 * The user has zero or more instances of Visit in his phone.
 */
export class Visit {
    public identity: string;
    private data: IUserRecord;

    constructor(
        qrCodeEntry: string,
        entry: number,
        departure: number,
        diary?: boolean
    ) {
        const qrBase64 = qrCodeEntry.replace(/^.*#/, '');
        const qrEntry = QRCodeEntry.decode(from_base64(qrBase64));
        if (qrEntry.version === undefined || qrEntry.version !== 2) {
            throw new Error("didn't find 'version'");
        }
        if (qrEntry.data === undefined) {
            throw new Error("didn't find 'data'");
        }
        const mskv = new mcl.Fr();
        mskv.deserialize(qrEntry.data.mtr.mskv);
        const mtr = {
            mskv,
            info: qrEntry.data.mtr.info,
            nonce: qrEntry.data.mtr.nonce,
            mskHAEnc: qrEntry.data.mtr.mskHAEnc
        };
        const ent = new mcl.G2();
        ent.deserialize(qrEntry.data.ent);
        const locationData: ILocationData = {
            ent: ent,
            pEnt: qrEntry.data.pEnt,
            mtr
        };
        this.data = Section7.scan(locationData.ent, locationData.pEnt, locationData.mtr.info,
            entry, diary ? locationData.mtr.info : "anonymous");
    }

    /**
     * Uses the traces created by the healthAuthority to detect if it has been exposed.
     *
     * @param traces sent by the health authority
     * @return true if at least one of the traces is positive
     */
    verifyExposure(traces: string[]): boolean {
        for (const trace of traces) {
            const tr = new mcl.G1();
            tr.deserialize(from_base64(trace))
            const aux = Section7.match(this.data, tr);
            if (aux !== undefined) {
                this.identity = aux;
                return true;
            }
        }
        return false;
    }
}
