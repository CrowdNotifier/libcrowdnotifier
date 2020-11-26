import {loadSync, Message} from "protobufjs";

export class QRCodeContent extends Message<QRCodeContent> {
    version: number;
    publicKey: Uint8Array;
    name: string;
    location: string;
    room: string;
    venueType: number;
    notificationKey: Uint8Array;
}

export class QRCodeWrapper extends Message<QRCodeWrapper> {
    version: number;
    content: QRCodeContent;
    signature: Uint8Array;
}

export class SeedMessage extends Message<SeedMessage> {
    salt: Uint8Array;
    notificationKey: Uint8Array;
    name: string;
    location: string;
    room: string;
}

const protoRoot = loadSync("v1/messages.proto");
protoRoot.lookupType("crowdnotifier_v1.QRCodeContent").ctor = QRCodeContent;
protoRoot.lookupType("crowdnotifier_v1.QRCodeWrapper").ctor = QRCodeWrapper;
protoRoot.lookupType("crowdnotifier_v1.SeedMessage").ctor = SeedMessage;
