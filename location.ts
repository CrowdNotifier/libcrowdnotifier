import {HealthAuthorityBackend} from "./healthAuthorityBackend";
import {QRCodeContent, QRCodeWrapper} from "./protobuf/index";
import {Log} from "./log";
import {Internet} from "./internet";
import {Message} from "protobufjs";
import {CryptoLocation, to_base64} from "./crypto";

/**
 * The Location class represents either a restaurant, a happening, or any other gathering of
 * people. It holds the necessary data to create the two QRcodes - one in case of an infaction,
 * and one for the clients to scan.
 *
 * Furthermore it has methods to interact with the cantonal doctor.
 */
export class Location {
    private qrCodeContent: Message;
    private log: Log;
    private crypto: CryptoLocation;

    constructor(
        private internet: Internet,
        private urlPurple: string,
        public name: string,
        public location: string,
        public room: string,
        public locType: number,
        public healthAuthorityPubKey: Uint8Array
    ) {
        this.crypto = new CryptoLocation(name, location, room)

        this.qrCodeContent = QRCodeContent.create({
            version: 1,
            publicKey: this.crypto.keyPair.publicKey,
            name: name,
            location: location,
            room: room,
            venueType: locType,
            notificationKey: this.crypto.notificationKey
        });

        this.log = new Log(`Location{${name}:${location}}`);
        this.log.info("Created");
    }

    /**
     * The QRentry code is printed and shown at the entrance to all visitors.
     */
    QRentry(): string {
        const signature = this.crypto.getQRentrySignature(QRCodeContent.encode(this.qrCodeContent).finish());
        const qrCodeWrapper = QRCodeWrapper.create({
            version: 1,
            content: this.qrCodeContent,
            signature
        });

        const qrCodeWrapperProtoBufBytes = QRCodeWrapper.encode(
            qrCodeWrapper
        ).finish();
        const protoBufBase64 = to_base64(qrCodeWrapperProtoBufBytes);
        const qrStr = `store:crowdNotifier#${protoBufBase64}`;
        this.log.info("QREntry:", qrStr);
        return qrStr;
    }

    async uploadTracing(crowdCode: string) {
        this.log.info("Uploading tracing for", crowdCode);
        const url = new URL(`${this.urlPurple}/${HealthAuthorityBackend.pathPostCrowdCode}`);
        url.searchParams.set("crowdCode", crowdCode);
        return this.internet.post(url, this.QRtrack());
    }

    /**
     * The QRtrack code is private and only has to be revealed to the health authority
     * in case of a trace location event.
     */
    private QRtrack(): string {
        const qrStr = to_base64(this.crypto.getQRtrack(this.healthAuthorityPubKey));
        this.log.info("QRTrack:", qrStr);
        return qrStr;
    }
}
