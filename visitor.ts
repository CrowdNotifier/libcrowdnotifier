import {QRCodeWrapper, IQRCodeContent, QRCodeContent} from "./protobuf/index";
import { crypto_sign_verify_detached, from_base64 } from "./sodium";
import { Visit } from "./visit";
import { Log } from "./log";
import { Internet } from "./internet";

/**
 * The Visitor can visit locations and has methods to poll
 * the crowdBackend and check if any of the location are
 * positive.
 */
export class Visitor {
  private log: Log;
  private visits: Visit[] = [];
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
    const contentBuf = QRCodeContent.encode(QRCodeContent.create(wrapper.content)).finish();
    const location: IQRCodeContent = wrapper.content;
    if (
      !crypto_sign_verify_detached(
        wrapper.signature,
        contentBuf,
        wrapper.content.publicKey
      )
    ) {
      throw new Error("Location QRCode not correct");
    }
    this.visits.push(new Visit(location, entry, departure, agenda));
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
