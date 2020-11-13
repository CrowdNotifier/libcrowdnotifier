import {Message, Properties, Root} from "protobufjs";
import qrMessage from "./qrMessage";
import seedMessage from "./seedMessage";

export class QRCodeContent extends Message<QRCodeContent> {
    version: number;
    publicKey: Uint8Array;
    name: string;
    location: string;
    room: string;
    venueType: number;
    notificationKey: Uint8Array;

    constructor(props?: Properties<QRCodeContent>) {
        super(props);
    }
}

export class QRCodeWrapper extends Message<QRCodeWrapper> {
    fields: number;
    content: QRCodeContent;
    signature: Uint8Array;

    constructor(props?: Properties<QRCodeWrapper>) {
        super(props);
    }
}

export class SeedMessage extends Message<SeedMessage> {
    salt: Uint8Array;
    notificationKey: Uint8Array;
    name: string;
    location: string;
    room: string;

    constructor(props?: Properties<QRCodeWrapper>) {
        super(props);
    }
}


Root.fromJSON(qrMessage).lookupType("qrpackage.QRCodeContent").ctor = QRCodeContent;
Root.fromJSON(qrMessage).lookupType("qrpackage.QRCodeWrapper").ctor = QRCodeWrapper;
Root.fromJSON(seedMessage).lookupType("seedpackage.SeedMessage").ctor = SeedMessage;
