import {loadSync, Message} from "protobufjs";

export class QRCodeTrace extends Message<QRCodeTrace> {
    version: number;
    mtr: MasterTrace;
}

export class QRCodeEntry extends Message<QRCodeEntry> {
    version: number;
    data: LocationData;
}

export class MasterTrace extends Message<MasterTrace> {
    mpk: Uint8Array;
    mskv: Uint8Array;
    mskhEnc: Uint8Array;
    info: string;
    nonce1: Uint8Array;
    nonce2: Uint8Array;
}

export class EntProof extends Message<EntProof> {
    nonce1: Uint8Array;
    nonce2: Uint8Array;
}

export class LocationData extends Message<Location> {
    ent: Uint8Array;
    pEnt: EntProof;
    mtr: MasterTrace;
}

export class PreTrace extends Message<PreTrace> {
    id: Uint8Array;
    mskhEnc: Uint8Array;
    preskid: Uint8Array;
}

export class TraceProof extends Message<TraceProof> {
    mpk: Uint8Array;
    nonce1: Uint8Array;
    nonce2: Uint8Array;
}

export class PreTraceWithProof extends Message<PreTraceWithProof> {
    pretrace: PreTrace;
    proof: TraceProof;
    info: string;
}

export class Trace extends Message<Trace> {
    id: Uint8Array;
    skid: Uint8Array;
}

export class IBEIdInternal1 extends Message<IBEIdInternal1> {
    info: string;
    nonce: Uint8Array;
}

export class IBEIdInternal2 extends Message<IBEIdInternal2> {
    hash: Uint8Array;
    cnt: number;
    nonce: Uint8Array;
}

export class IBEEncInternal extends Message<IBEEncInternal> {
    x: Uint8Array;
    m: Uint8Array;
    id: Uint8Array;
}

const protoRoot = loadSync("v2/messages.proto");
protoRoot.lookupType("crowdnotifier_v2.QRCodeTrace").ctor = QRCodeTrace;
protoRoot.lookupType("crowdnotifier_v2.QRCodeEntry").ctor = QRCodeEntry;
protoRoot.lookupType("crowdnotifier_v2.MasterTrace").ctor = MasterTrace;
protoRoot.lookupType("crowdnotifier_v2.EntProof").ctor = EntProof;
protoRoot.lookupType("crowdnotifier_v2.LocationData").ctor = LocationData;
protoRoot.lookupType("crowdnotifier_v2.PreTrace").ctor = PreTrace;
protoRoot.lookupType("crowdnotifier_v2.TraceProof").ctor = TraceProof;
protoRoot.lookupType("crowdnotifier_v2.PreTraceWithProof").ctor = PreTraceWithProof;
protoRoot.lookupType("crowdnotifier_v2.Trace").ctor = Trace;
protoRoot.lookupType("crowdnotifier_v2.IBEIdInternal1").ctor = IBEIdInternal1;
protoRoot.lookupType("crowdnotifier_v2.IBEIdInternal2").ctor = IBEIdInternal2;
protoRoot.lookupType("crowdnotifier_v2.IBEEncInternal").ctor = IBEEncInternal;
