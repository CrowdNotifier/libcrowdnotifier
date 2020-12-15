import {Root, Message} from 'protobufjs';
import protoJSON from './messages.json';

export class QRCodeTrace extends Message<QRCodeTrace> {
    // @ts-ignore
    version: number;
    // @ts-ignore
    mtr: MasterTrace;
}

export class QRCodeEntry extends Message<QRCodeEntry> {
    // @ts-ignore
    version: number;
    // @ts-ignore
    data: LocationData;
}

export class MasterTrace extends Message<MasterTrace> {
    // @ts-ignore
    mpk: Uint8Array;
    // @ts-ignore
    mskl: Uint8Array;
    // @ts-ignore
    info: Uint8Array;
    // @ts-ignore
    nonce1: Uint8Array;
    // @ts-ignore
    nonce2: Uint8Array;
    // @ts-ignore
    ctxtha: Uint8Array;
}

export class EntProof extends Message<EntProof> {
    // @ts-ignore
    nonce1: Uint8Array;
    // @ts-ignore
    nonce2: Uint8Array;
}

export class LocationData extends Message<LocationData> {
    // @ts-ignore
    ent: Uint8Array;
    // @ts-ignore
    piEnt: EntProof;
    // @ts-ignore
    mtr: MasterTrace;
}

export class PreTrace extends Message<PreTrace> {
    // @ts-ignore
    id: Uint8Array;
    // @ts-ignore
    pskidl: Uint8Array;
    // @ts-ignore
    ctxtha: Uint8Array;
}

export class TraceProof extends Message<TraceProof> {
    // @ts-ignore
    mpk: Uint8Array;
    // @ts-ignore
    // @ts-ignore
    nonce1: Uint8Array;
    // @ts-ignore
    nonce2: Uint8Array;
}

export class PreTraceWithProof extends Message<PreTraceWithProof> {
    // @ts-ignore
    pretrace: PreTrace;
    // @ts-ignore
    proof: TraceProof;
    // @ts-ignore
    info: Uint8Array;
}

export class Trace extends Message<Trace> {
    // @ts-ignore
    id: Uint8Array;
    // @ts-ignore
    skid: Uint8Array;
}

export class IBEIdInternal1 extends Message<IBEIdInternal1> {
    // @ts-ignore
    info: Uint8Array;
    // @ts-ignore
    nonce: Uint8Array;
}

export class IBEIdInternal2 extends Message<IBEIdInternal2> {
    // @ts-ignore
    hash: Uint8Array;
    // @ts-ignore
    cnt: number;
    // @ts-ignore
    nonce: Uint8Array;
}

export class IBEEncInternal extends Message<IBEEncInternal> {
    // @ts-ignore
    x: Uint8Array;
    // @ts-ignore
    m: Uint8Array;
    // @ts-ignore
    id: Uint8Array;
}

try {
  const protoRoot = Root.fromJSON(protoJSON);
  protoRoot.lookupType('crowdnotifier_v2.QRCodeTrace').ctor = QRCodeTrace;
  protoRoot.lookupType('crowdnotifier_v2.QRCodeEntry').ctor = QRCodeEntry;
  protoRoot.lookupType('crowdnotifier_v2.MasterTrace').ctor = MasterTrace;
  protoRoot.lookupType('crowdnotifier_v2.EntProof').ctor = EntProof;
  protoRoot.lookupType('crowdnotifier_v2.LocationData').ctor = LocationData;
  protoRoot.lookupType('crowdnotifier_v2.PreTrace').ctor = PreTrace;
  protoRoot.lookupType('crowdnotifier_v2.TraceProof').ctor = TraceProof;
  protoRoot.lookupType('crowdnotifier_v2.PreTraceWithProof').ctor =
      PreTraceWithProof;
  protoRoot.lookupType('crowdnotifier_v2.Trace').ctor = Trace;
  protoRoot.lookupType('crowdnotifier_v2.IBEIdInternal1').ctor = IBEIdInternal1;
  protoRoot.lookupType('crowdnotifier_v2.IBEIdInternal2').ctor = IBEIdInternal2;
  protoRoot.lookupType('crowdnotifier_v2.IBEEncInternal').ctor = IBEEncInternal;
} catch (e) {
  throw new Error('couldn\'t load messages.proto: ' + e.toString());
}
