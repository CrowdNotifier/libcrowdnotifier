import {Root, Message} from 'protobufjs';
import protoJSON from './messages.json';

export class QRCodeContent extends Message<QRCodeContent> {
    // @ts-ignore
    version: number;
    // @ts-ignore
    publicKey: Uint8Array;
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

export class QRCodeWrapper extends Message<QRCodeWrapper> {
    // @ts-ignore
    version: number;
    // @ts-ignore
    content: QRCodeContent;
    // @ts-ignore
    signature: Uint8Array;
}

export class SeedMessage extends Message<SeedMessage> {
    // @ts-ignore
    salt: Uint8Array;
    // @ts-ignore
    notificationKey: Uint8Array;
    // @ts-ignore
    name: string;
    // @ts-ignore
    location: string;
    // @ts-ignore
    room: string;
}

const protoRoot = Root.fromJSON(protoJSON);
protoRoot.lookupType('crowdnotifier_v1.QRCodeContent').ctor = QRCodeContent;
protoRoot.lookupType('crowdnotifier_v1.QRCodeWrapper').ctor = QRCodeWrapper;
protoRoot.lookupType('crowdnotifier_v1.SeedMessage').ctor = SeedMessage;
