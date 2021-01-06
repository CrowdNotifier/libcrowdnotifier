import {Root, Message} from 'protobufjs';
import protoJSON from './messages.json';

export class QRCodeTrace extends Message<QRCodeTrace> {
    // @ts-ignore
    version: number;
    // @ts-ignore
    masterTraceRecord: MasterTrace;
}

export class MasterTrace extends Message<MasterTrace> {
    // @ts-ignore
    masterPublicKey: Uint8Array;
    // @ts-ignore
    masterSecretKeyLocation: Uint8Array;
    // @ts-ignore
    info: Uint8Array;
    // @ts-ignore
    nonce1: Uint8Array;
    // @ts-ignore
    nonce2: Uint8Array;
    // @ts-ignore
    cipherTextHealthAuthority: Uint8Array;
}

export class QRCodeEntry extends Message<QRCodeEntry> {
    // @ts-ignore
    version: number;
    // @ts-ignore
    data: QRCodeContent;
    // @ts-ignore
    masterPublicKey: Uint8Array;
    // @ts-ignore
    entryProof: EntryProof;
}

export class EntryProof extends Message<EntryProof> {
    // @ts-ignore
    nonce1: Uint8Array;
    // @ts-ignore
    nonce2: Uint8Array;
}

export enum EVenueType{
    // eslint-disable-next-line no-unused-vars
    OTHER = 0,
    // eslint-disable-next-line no-unused-vars
    MEETING_ROOM = 1,
    // eslint-disable-next-line no-unused-vars
    CAFETERIA = 2,
    // eslint-disable-next-line no-unused-vars
    PRIVATE_EVENT = 3,
    // eslint-disable-next-line no-unused-vars
    CANTEEN = 4,
    // eslint-disable-next-line no-unused-vars
    LIBRARY = 5,
    // eslint-disable-next-line no-unused-vars
    LECTURE_ROOM = 6,
    // eslint-disable-next-line no-unused-vars
    SHOP = 7,
    // eslint-disable-next-line no-unused-vars
    GYM = 8,
    // eslint-disable-next-line no-unused-vars
    KITCHEN_AREA = 9,
    // eslint-disable-next-line no-unused-vars
    OFFICE_SPACE = 10,
}

export class QRCodeContent extends Message<QRCodeContent> {
    // @ts-ignore
    name: string;
    // @ts-ignore
    location: string;
    // @ts-ignore
    room: string;
    // @ts-ignore
    venueType: EVenueType;

    getVenueTypeStr(): string {
      switch (this.venueType) {
        case EVenueType.OTHER:
          return 'Other';
        case EVenueType.MEETING_ROOM:
          return 'Meeting Room';
        case EVenueType.CAFETERIA:
          return 'Cafeteria';
        case EVenueType.PRIVATE_EVENT:
          return 'Private Event';
        case EVenueType.CANTEEN:
          return 'Canteen';
        case EVenueType.LIBRARY:
          return 'Library';
        case EVenueType.LECTURE_ROOM:
          return 'Lecture Room';
        case EVenueType.SHOP:
          return 'Shop';
        case EVenueType.GYM:
          return 'Gym';
        case EVenueType.KITCHEN_AREA:
          return 'Kitchen Area';
        case EVenueType.OFFICE_SPACE:
          return 'Office Space';
      }
    }
}

export class PreTrace extends Message<PreTrace> {
    // @ts-ignore
    identity: Uint8Array;
    // @ts-ignore
    partialSecretKeyForIdentityOfLocation: Uint8Array;
    // @ts-ignore
    cipherTextHealthAuthority: Uint8Array;
}

export class TraceProof extends Message<TraceProof> {
    // @ts-ignore
    masterPublicKey: Uint8Array;
    // @ts-ignore
    // @ts-ignore
    nonce1: Uint8Array;
    // @ts-ignore
    nonce2: Uint8Array;
}

export class PreTraceWithProof extends Message<PreTraceWithProof> {
    // @ts-ignore
    preTrace: PreTrace;
    // @ts-ignore
    proof: TraceProof;
    // @ts-ignore
    info: Uint8Array;
}

export class Trace extends Message<Trace> {
    // @ts-ignore
    identity: Uint8Array;
    // @ts-ignore
    secretKeyForIdentity: Uint8Array;
}

export class IBEIdentityInternal extends Message<IBEIdentityInternal> {
    // @ts-ignore
    hash: Uint8Array;
    // @ts-ignore
    counter: number;
    // @ts-ignore
    nonce: Uint8Array;
}

export class IBEEncryptionInternal extends Message<IBEEncryptionInternal> {
    // @ts-ignore
    x: Uint8Array;
    // @ts-ignore
    m: Uint8Array;
    // @ts-ignore
    identity: Uint8Array;
}

try {
  const protoRoot = Root.fromJSON(protoJSON);
  protoRoot.lookupType('crowdnotifier_v2.QRCodeTrace').ctor = QRCodeTrace;
  protoRoot.lookupType('crowdnotifier_v2.QRCodeEntry').ctor = QRCodeEntry;
  protoRoot.lookupType('crowdnotifier_v2.MasterTrace').ctor = MasterTrace;
  protoRoot.lookupType('crowdnotifier_v2.EntryProof').ctor = EntryProof;
  protoRoot.lookupType('crowdnotifier_v2.QRCodeContent').ctor = QRCodeContent;
  protoRoot.lookupType('crowdnotifier_v2.PreTrace').ctor = PreTrace;
  protoRoot.lookupType('crowdnotifier_v2.TraceProof').ctor = TraceProof;
  protoRoot.lookupType('crowdnotifier_v2.PreTraceWithProof').ctor =
      PreTraceWithProof;
  protoRoot.lookupType('crowdnotifier_v2.Trace').ctor = Trace;
  protoRoot.lookupType('crowdnotifier_v2.IBEIdentityInternal').ctor =
      IBEIdentityInternal;
  protoRoot.lookupType('crowdnotifier_v2.IBEEncryptionInternal').ctor =
      IBEEncryptionInternal;
} catch (e) {
  throw new Error('couldn\'t load messages.proto: ' + e.toString());
}
