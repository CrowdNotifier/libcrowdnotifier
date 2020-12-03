import {HealthAuthorityBackend} from "app/healthAuthorityBackend";
import {QRCodeContent, QRCodeWrapper} from "v1";
import {Log} from "lib/log";
import {Internet} from "app/internet";
import {Message} from "protobufjs";
import {CryptoLocation, to_base64} from "lib/crypto";

/**
 * The Location class represents either a restaurant, a happening, or any other gathering of
 * people. It holds the necessary data to create the two QRcodes - one in case of an infaction,
 * and one for the clients to scan.
 *
 * Furthermore it has methods to interact with the cantonal doctor.
 */
export class Location {
    private log: Log;
    private crypto: CryptoLocation;

    constructor(
        private internet: Internet,
        private urlHealthAuthority: string,
        public name: string,
        public location: string,
        public room: string,
        public locType: number,
        public healthAuthorityPubKey: Uint8Array
    ) {
        this.crypto = new CryptoLocation(healthAuthorityPubKey,
            locType, name, location, room)
        this.log = new Log(`Location{${name}:${location}}`);
        this.log.info("Created");
    }

    /**
     * The QRentry code is printed and shown at the entrance to all visitors.
     */
    QRentry(): string {
        const qrCodeBytes = this.crypto.getQRentry();
        const protoBufBase64 = to_base64(qrCodeBytes);
        const qrStr = `store:crowdNotifier#${protoBufBase64}`;
        this.log.info("QREntry scanned");
        return qrStr;
    }

    async uploadTracing(crowdCode: string) {
        this.log.info("Uploading tracing for", crowdCode);
        const url = new URL(`${this.urlHealthAuthority}/${HealthAuthorityBackend.pathPostPreTrace}`);
        url.searchParams.set("crowdCode", crowdCode);
        return this.internet.post(url, this.crypto.preTrace(crowdCode));
    }

    /**
     * The QRtrack code is private and only has to be revealed to the health authority
     * in case of a trace location event.
     */
    private QRtrack(): string {
        const qrStr = to_base64(this.crypto.getQRtrace(this.healthAuthorityPubKey));
        this.log.info("QRTrack:", qrStr);
        return qrStr;
    }
}
