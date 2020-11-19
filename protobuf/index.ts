import {Message, Properties, Root} from "protobufjs";
import qrMessage from "./qrMessage";
import seedMessage from "./seedMessage";
import commitment from "./commitment";

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
    fields: number;
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

export class CommitmentMessage extends Message<CommitmentMessage>{
    info: string;
    nonce: Uint8Array;
    counter: number;
}

Root.fromJSON(qrMessage).lookupType("qrpackage.QRCodeContent").ctor = QRCodeContent;
Root.fromJSON(qrMessage).lookupType("qrpackage.QRCodeWrapper").ctor = QRCodeWrapper;
Root.fromJSON(seedMessage).lookupType("seedpackage.SeedMessage").ctor = SeedMessage;
Root.fromJSON(commitment).lookupType("commitment.CommitmentMessage").ctor = CommitmentMessage;
