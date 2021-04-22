import {
  setupHA,
  setupLocation,
  getVenueInfoFromQrCodeV2,
  getVenueInfoFromQrCodeV3,
  getCheckIn,
  genPreTrace,
  genTrace,
  verifyTrace,
  match,
} from "./crowd_notifier_primitives";
import { IKeyPair, Log } from "..";
import { ILocationData } from "./structs";
import { from_base64, from_string, to_string } from "libsodium-wrappers-sumo";
import {
  PreTraceWithProof,
  QRCodePayload,
  QRCodeTrace,
  Trace,
} from "./messages";

/**
 * Very simple crypto test for CrowdNotifierPrimitives using the new BNS scheme
 * to avoid having to print new QRcodes after every infection.
 *
 * To run it, write:
 *   npm ci
 *   npm run testv2
 */

// TODO: Implement for v3

const log = new Log("v3/crowd_notifier_primitives.spec");

export function testCrowdNotifierPrimitives() {
  log.name = "v3/crowd_notifier_primitives.spec";
  log.info(`Starting at: ${new Date()}`);
  const from = new Date();
  const to = new Date(from.getTime() + 3 * 60 * 60 * 1000); // 3 hours in the future
  const healthAuthority = setupHA();

  const infoLocation1 = from_string("FooBar:Lausanne:undefined");
  const qrCodeStrings1 = setupLocation(
    3,
    healthAuthority.publicKey,
    "FooBar",
    "Lausanne",
    from,
    to,
    infoLocation1
  );
  const location1: ILocationData = {
    qrCodePayload: QRCodePayload.decode(
      from_base64(qrCodeStrings1.qrCodePayload)
    ),
    qrCodeTrace: QRCodeTrace.decode(from_base64(qrCodeStrings1.qrCodeTrace)),
  };

  const infoLocation2 = from_string("BarMitzva:Lausanne:undefined");
  const qrCodeStrings2 = setupLocation(
    3,
    healthAuthority.publicKey,
    "BarMitzva",
    "Lausanne",
    from,
    to,
    infoLocation2
  );
  const location2: ILocationData = {
    qrCodePayload: QRCodePayload.decode(
      from_base64(qrCodeStrings2.qrCodePayload)
    ),
    qrCodeTrace: QRCodeTrace.decode(from_base64(qrCodeStrings2.qrCodeTrace)),
  };

  simulateVisits(
    healthAuthority,
    location1,
    location2,
    infoLocation1,
    infoLocation2
  );
}

export function simulateVisits(
  healthAuthority: IKeyPair,
  location1: ILocationData,
  location2: ILocationData,
  infoLocation1: Uint8Array,
  infoLocation2: Uint8Array
) {
  const qrCode1 = to_string(
    QRCodePayload.encode(location1.qrCodePayload).finish()
  );
  const qrCode2 = to_string(
    QRCodePayload.encode(location2.qrCodePayload).finish()
  );

  log.info("Creating two users");
  const venueInfo1 = getVenueInfoFromQrCodeV3(qrCode1);
  const arrivalTime1 =
    location1.qrCodePayload.locationData.startTimestamp + 60 * 60 * 2;
  const departureTime1 = arrivalTime1 + 60 * 60 * 1; // stayed for an hour
  const encryptedVisit1 = getCheckIn(arrivalTime1, departureTime1, venueInfo1);
  const venueInfo2 = getVenueInfoFromQrCodeV3(qrCode2);
  const arrivalTime2 =
    location2.qrCodePayload.locationData.endTimestamp + 60 * 60 * 1;
  const departureTime2 = arrivalTime2 + 60 * 60 * 1;
  const encryptedVisit2 = getCheckIn(arrivalTime2, departureTime2, venueInfo2);

  log.info("Location 1 got infected during three hours - creating pre-traces");
  const preTraceEncodingList = genPreTrace(
    location1.qrCodeTrace,
    location1.qrCodePayload,
    location1.qrCodePayload.locationData.startTimestamp,
    location1.qrCodePayload.locationData.endTimestamp
  );

  log.info("Creating traces from health authority");
  const preTraceList: Array<PreTraceWithProof> = [];
  const traceList: Array<Trace> = [];
  preTraceEncodingList.forEach((encoding) => {
    const preTraceWithProof = PreTraceWithProof.decode(from_base64(encoding));
    const traceEncoding = genTrace(
      preTraceWithProof,
      healthAuthority,
      3,
      "message",
      from_string("FooBar")
    );
    if (traceEncoding === undefined) {
      throw new Error("Couldn't create the traces");
    }
    preTraceList.push(preTraceWithProof);
    traceList.push(Trace.decode(from_base64(traceEncoding)));
  });

  log.info("Checking pretraces validation");
  preTraceList.forEach((pretrace) => {
    log.assertTrue(
      verifyTrace(pretrace, healthAuthority) !== undefined,
      "Validation shouldn't fail!"
    );
  });

  log.info("Checking if user1 gets correctly notified");
  log.assertTrue(
    match(encryptedVisit1, traceList[0]) === undefined,
    "Shouldn't match trace 1"
  );
  log.assertTrue(
    match(encryptedVisit1, traceList[2]) !== undefined,
    "Should match trace 3"
  );

  log.info("Checking if user2 gets correctly NOT notified");
  log.assert(
    match(encryptedVisit2, traceList[0]),
    undefined,
    "Shouldn't match user2"
  );
  log.assert(
    match(encryptedVisit2, traceList[1]),
    undefined,
    "Shouldn't match user2"
  );
  log.assert(
    match(encryptedVisit2, traceList[2]),
    undefined,
    "Shouldn't match user2"
  );
}
