import {loadSync, Message} from "protobufjs";

export class QRCodeTrace extends Message<QRCodeTrace> {
    version: number;
    mtr: MasterTrace;
}

export class QRCodeEntry extends Message<QRCodeEntry> {
    version: number;
    data: LocationData;
}

export class LocationData extends Message<LocationData> {
    ent: Uint8Array;
    pEnt: Uint8Array;
    mtr: MasterTrace;
}

export class MasterTrace extends Message<MasterTrace> {
    mskv: Uint8Array;
    info: string;
    nonce: Uint8Array;
    mskHAEnc: Uint8Array;
}

export class Commitment extends Message<Commitment> {
    info: string;
    nonce: Uint8Array;
    counter: number;
}

export class PreTrace extends Message<PreTrace> {
    Tprime: Uint8Array;
    info: string;
    nonce: Uint8Array;
    ctxt: Uint8Array;
}

const protoRoot = loadSync("v2/messages.proto");
protoRoot.lookupType("crowdnotifier_v2.QRCodeTrace").ctor = QRCodeTrace;
protoRoot.lookupType("crowdnotifier_v2.QRCodeEntry").ctor = QRCodeEntry;
protoRoot.lookupType("crowdnotifier_v2.LocationData").ctor = LocationData;
protoRoot.lookupType("crowdnotifier_v2.MasterTrace").ctor = MasterTrace;
protoRoot.lookupType("crowdnotifier_v2.Commitment").ctor = Commitment;
protoRoot.lookupType("crowdnotifier_v2.PreTrace").ctor = PreTrace;
