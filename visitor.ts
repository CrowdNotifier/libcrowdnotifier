import {QRCodeContent, QRCodeWrapper} from "./protobuf/index";
import {Log} from "./log";
import {Internet} from "./internet";
import {CryptoLocation, CryptoVisit, from_base64} from "./crypto";

/**
 * The Visitor can visit locations and has methods to poll
 * the crowdBackend and check if any of the location are
 * positive.
 */
export class Visitor {
    private log: Log;
    private visits: CryptoVisit[] = [];

    constructor(
        private internet: Internet,
        public urlCrowdBack: string,
        public name: string
    ) {
        this.log = new Log(`Visitor{${name})`);
        this.log.info("Created");
    }

    /**
     * This stores the necessary information in the internal array.
     * @param qrcode is the entry qrcode of the location
     * @param agenda if the name should appear in the agenda
     * @param entry in seconds since the unix epoch
     * @param departure in seconds since the unix epoch
     */
    addLocation(qrcode: string, agenda: boolean, entry: number, departure: number) {
        const qrBase64 = qrcode.replace(/.*#/, "");
        const qrBuf = from_base64(qrBase64);
        const wrapper = QRCodeWrapper.decode(qrBuf);
        const location: QRCodeContent = wrapper.content;
        if (!CryptoLocation.verifyWrapper(wrapper)) {
            throw new Error("Location QRCode not correct");
        }
        this.visits.push(new CryptoVisit(location, entry, departure, agenda));
        this.log.info("Location accepted:", location.name, location.location);
    }

    async checkExposure(): Promise<string[]> {
        this.log.info("Checking exposure");
        const tracesStr = await this.internet.get(
            new URL(`${this.urlCrowdBack}/getTraces`)
        );
        const traces = JSON.parse(tracesStr);
        const exposures = this.visits.filter(v => v.decryptExposure(traces));
        return exposures.map(exposure => exposure.identity);
    }
}
