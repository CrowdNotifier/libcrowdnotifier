import {Root, Message} from 'protobufjs';
import protoJSON from './messages.json';

export class TraceLocation extends Message<TraceLocation> {
  // @ts-ignore
  version: number;
  // @ts-ignore
  descripion: string;
  // @ts-ignore
  address: string;
  // @ts-ignore
  startTimestamp: number; // sec since unix epoch
  // @ts-ignore
  endTimestamp: number; // sec since unix epoch

  getStartTimestamp(): Date {
    return new Date(this.startTimestamp * 1000 || new Date().getTime());
  }

  setStartTimestamp(d: Date) {
    this.startTimestamp = Math.round(d.getTime() / 1000);
  }

  getEndTimestamp(): Date {
    return new Date(this.endTimestamp * 1000 || new Date().getTime());
  }

  setEndTimestamp(d: Date) {
    this.endTimestamp = Math.round(d.getTime() / 1000);
  }
}

export class CrowdNotifierData extends Message<CrowdNotifierData> {
  // @ts-ignore
  version: number;
  // @ts-ignore
  publicKey: Uint8Array;
  // @ts-ignore
  cryptographicSeed: Uint8Array;
  // @ts-ignore
  type: number;
}

export enum EVenueType {
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

export class NotifyMeLocationData extends Message<NotifyMeLocationData> {
  // @ts-ignore
  version: number;
  // @ts-ignore
  type: EVenueType;
  // @ts-ignore
  room: string;

  getVenueTypeStr(): string {
    switch (this.type) {
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

export class QRCodePayload extends Message<QRCodePayload> {
  // @ts-ignore
  version: number;
  // @ts-ignore
  locationData: TraceLocation;
  // @ts-ignore
  crowdNotifierData: CrowdNotifierData;
  // @ts-ignore
  countryData: Uint8Array;
}

export class QRCodeTrace extends Message<QRCodeTrace> {
  // @ts-ignore
  version: number;
  // @ts-ignore
  qrCodePayload: Uint8Array;
  // @ts-ignore
  masterSecretKeyLocation: Uint8Array;
  // @ts-ignore
  cipherTextHealthAuthority: Uint8Array;
}

export class PreTrace extends Message<PreTrace> {
  // @ts-ignore
  identity: Uint8Array;
  // @ts-ignore
  partialSecretKeyForIdentityOfLocation: Uint8Array;
  // @ts-ignore
  cipherTextHealthAuthority: Uint8Array;
  // @ts-ignore
  notificationKey: Uint8Array;
}

export class TraceProof extends Message<TraceProof> {
  // @ts-ignore
  masterPublicKey: Uint8Array;
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
  qrCodePayload: Uint8Array;
  // @ts-ignore
  startTime: number;
  // @ts-ignore
  endTime: number;
  // @ts-ignore
  startOfInterval: number;
}

export enum EEventCriticality {
  // eslint-disable-next-line no-unused-vars
  LOW = 0,
  // eslint-disable-next-line no-unused-vars
  HIGH = 1,
}

export class NotifyMeAssociatedData extends Message<NotifyMeAssociatedData> {
  // @ts-ignore
  version: number;
  // @ts-ignore
  criticality: EEventCriticality;
}

export class AssociatedData extends Message<AssociatedData> {
  // @ts-ignore
  version: number;
  // @ts-ignore
  message: string;
  // @ts-ignore
  countryData: Uint8Array;
}

export class Trace extends Message<Trace> {
  // @ts-ignore
  identity: Uint8Array;
  // @ts-ignore
  secretKeyForIdentity: Uint8Array;
  // @ts-ignore
  startTime: number;
  // @ts-ignore
  endTime: number;
  // @ts-ignore
  nonce: Uint8Array;
  // @ts-ignore
  encryptedAssociatedData: Uint8Array;
}

try {
  const protoRoot = Root.fromJSON(protoJSON);
  protoRoot.lookupType('crowdnotifier_v3.TraceLocation').ctor = TraceLocation;
  protoRoot.lookupType(
      'crowdnotifier_v3.CrowdNotifierData',
  ).ctor = CrowdNotifierData;
  protoRoot.lookupType('crowdnotifier_v3.QRCodePayload').ctor = QRCodePayload;
  protoRoot.lookupType(
      'crowdnotifier_v3.NotifyMeLocationData',
  ).ctor = NotifyMeLocationData;
  protoRoot.lookupType('crowdnotifier_v3.QRCodeTrace').ctor = QRCodeTrace;
  protoRoot.lookupType('crowdnotifier_v3.PreTrace').ctor = PreTrace;
  protoRoot.lookupType('crowdnotifier_v3.TraceProof').ctor = TraceProof;
  protoRoot.lookupType(
      'crowdnotifier_v3.PreTraceWithProof',
  ).ctor = PreTraceWithProof;
  protoRoot.lookupType(
      'crowdnotifier_v3.NotifyMeAssociatedData',
  ).ctor = NotifyMeAssociatedData;
  protoRoot.lookupType('crowdnotifier_v3.AssociatedData').ctor = AssociatedData;
  protoRoot.lookupType('crowdnotifier_v3.Trace').ctor = Trace;
} catch (e) {
  throw new Error('couldn\'t load messages.proto: ' + e.toString());
}
