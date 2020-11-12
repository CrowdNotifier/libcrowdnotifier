import protobuf from "protobufjs";
import qrMessage from "./qrMessage";
import seedMessage from "./seedMessage";

export interface IQRCodeContent {
  version: number;
  publicKey: Uint8Array;
  name: string;
  location: string;
  room: string;
  venueType: number;
  notificationKey: Uint8Array;
}

const rootQr = protobuf.Root.fromJSON(qrMessage);
export const QRCodeContent = rootQr.lookupType("qrpackage.QRCodeContent");
export const QRCodeWrapper = rootQr.lookupType("qrpackage.QRCodeWrapper");

const rootSeed = protobuf.Root.fromJSON(seedMessage);
export const SeedMessage = rootSeed.lookupType("seedpackage.SeedMessage");
