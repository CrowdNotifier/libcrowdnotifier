import {Root, Message} from 'protobufjs';
import protoJSON from './messages.json';

export class LocationInfo extends Message<LocationInfo> {
    // @ts-ignore
    version: number;
    // @ts-ignore
    name: string;
    // @ts-ignore
    location: string;
    // @ts-ignore
    room: string;
    // @ts-ignore
    venueType: number;
    // @ts-ignore
    notificationKey: Uint8Array;
}

export class QRCodeContent extends Message<QRCodeContent> {
    // @ts-ignore
    version: number;
    // @ts-ignore
    publicKey: Uint8Array;
    // @ts-ignore
    r1: Uint8Array;
    // @ts-ignore
    info: LocationInfo;
}

export class QRCodeTrace extends Message<QRCodeTrace> {
    // @ts-ignore
    version: number;
    // @ts-ignore
    sk: Uint8Array;
    // @ts-ignore
    r1: Uint8Array;
    // @ts-ignore
    r2: Uint8Array;
    // @ts-ignore
    info: LocationInfo;
}

const protoRoot = Root.fromJSON(protoJSON);
protoRoot.lookupType('crowdnotifier_v1_1.QRCodeContent').ctor = QRCodeContent;
protoRoot.lookupType('crowdnotifier_v1_1.QRCodeTrace').ctor = QRCodeTrace;
protoRoot.lookupType('crowdnotifier_v1_1.LocationInfo').ctor = LocationInfo;
