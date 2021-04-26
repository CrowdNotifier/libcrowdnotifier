import {
  setupHA,
  setupLocation,
  getVenueInfoFromQrCodeV3,
  getCheckIn,
  genPreTrace,
  genTrace,
  verifyTrace,
  match,
} from './crowd_notifier_primitives';
import {IKeyPair, Log} from '..';
import {ILocationData} from './structs';
import {from_base64, from_string, to_base64} from 'libsodium-wrappers-sumo';
import {crowdnotifier_v3} from './messages';

const Long = require('long');

/**
 * Very simple crypto test for CrowdNotifierPrimitives using the new BNS scheme
 * to avoid having to print new QRcodes after every infection.
 *
 * To run it, write:
 *   npm ci
 *   npm run testv2
 */

// TODO: Implement for v3

const log = new Log('v3/crowd_notifier_primitives.spec');

export function testCrowdNotifierPrimitives() {
  log.name = 'v3/crowd_notifier_primitives.spec';
  log.info(`Starting at: ${new Date()}`);
  const from = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1 hour in the past
  const to = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours in the future
  const healthAuthority = setupHA();

  const infoLocation1 = from_string('FooBar:Lausanne:undefined');
  const qrCodeStrings1 = setupLocation(
      3,
      healthAuthority.publicKey,
      'FooBar',
      'Lausanne',
      from,
      to,
      infoLocation1,
  );
  const location1: ILocationData = {
    qrCodePayload: crowdnotifier_v3.QRCodePayload.decode(
        from_base64(qrCodeStrings1.qrCodePayload),
    ),
    qrCodeTrace: crowdnotifier_v3.QRCodeTrace.decode(
        from_base64(qrCodeStrings1.qrCodeTrace),
    ),
  };

  const infoLocation2 = from_string('BarMitzva:Lausanne:undefined');
  const qrCodeStrings2 = setupLocation(
      3,
      healthAuthority.publicKey,
      'BarMitzva',
      'Lausanne',
      from,
      to,
      infoLocation2,
  );
  const location2: ILocationData = {
    qrCodePayload: crowdnotifier_v3.QRCodePayload.decode(
        from_base64(qrCodeStrings2.qrCodePayload),
    ),
    qrCodeTrace: crowdnotifier_v3.QRCodeTrace.decode(
        from_base64(qrCodeStrings2.qrCodeTrace),
    ),
  };

  simulateVisits(
      healthAuthority,
      location1,
      location2,
      infoLocation1,
      infoLocation2,
  );
}

export function simulateVisits(
    healthAuthority: IKeyPair,
    location1: ILocationData,
    location2: ILocationData,
    infoLocation1: Uint8Array,
    infoLocation2: Uint8Array,
) {
  log.info('Simulating two visits');
  const qrCode1 = to_base64(
      crowdnotifier_v3.QRCodePayload.encode(location1.qrCodePayload).finish(),
  );
  const qrCode2 = to_base64(
      crowdnotifier_v3.QRCodePayload.encode(location2.qrCodePayload).finish(),
  );

  log.info('Creating two users');
  const venueInfo1 = getVenueInfoFromQrCodeV3(qrCode1);
  const starTimeUnconverted1 = location1.qrCodePayload.locationData!
      .startTimestamp!;
  const startTime1: number = Long.isLong(starTimeUnconverted1) ?
        (starTimeUnconverted1 as Long).toNumber() :
        (starTimeUnconverted1 as number);
  const arrivalTime1 = startTime1 + 60 * 60 * 2;
  const departureTime1 = arrivalTime1 + 60 * 60 * 1; // stayed for an hour
  const encryptedVisit1 = getCheckIn(
      arrivalTime1,
      departureTime1,
      venueInfo1,
  );
  log.info(
      'User 1 visited ',
      venueInfo1.description,
      ' from ',
      new Date(arrivalTime1 * 1000).toTimeString(),
      ' to ',
      new Date(departureTime1 * 1000).toTimeString(),
  );
  const venueInfo2 = getVenueInfoFromQrCodeV3(qrCode2);
  const startTimeUnconverted2 = location2.qrCodePayload.locationData!
      .endTimestamp!;
  const startTime2: number = Long.isLong(startTimeUnconverted2) ?
        (startTimeUnconverted2 as Long).toNumber() :
        (startTimeUnconverted2 as number);
  const arrivalTime2 = startTime2 + 60 * 60 * 1;
  const departureTime2 = arrivalTime2 + 60 * 60 * 1;
  const encryptedVisit2 = getCheckIn(
      arrivalTime2,
      departureTime2,
      venueInfo2,
  );
  log.info(
      'User 2 visited ',
      venueInfo2.description,
      ' from ',
      new Date(arrivalTime2 * 1000).toTimeString(),
      ' to ',
      new Date(departureTime2 * 1000).toTimeString(),
  );

  const endTimeUnconverted1 = location1.qrCodePayload.locationData!
      .endTimestamp!;
  const endTime1 = Long.isLong(endTimeUnconverted1) ?
        (endTimeUnconverted1 as Long).toNumber() :
        (endTimeUnconverted1 as number);
  log.info(
      venueInfo1.description,
      ' got infected from ',
      new Date(startTime1 * 1000).toTimeString(),
      ' to ',
      new Date(endTime1 * 1000).toTimeString(),
      ' - creating pre-traces',
  );
  const preTraceEncodingList = genPreTrace(
      location1.qrCodeTrace,
      startTime1,
      endTime1,
  );

  log.info('Creating traces from health authority');
  const preTraceList: Array<crowdnotifier_v3.PreTraceWithProof> = [];
  const traceList: Array<crowdnotifier_v3.Trace> = [];
  preTraceEncodingList.forEach((encoding) => {
    const preTraceWithProof = crowdnotifier_v3.PreTraceWithProof.decode(
        from_base64(encoding),
    );
    const traceEncoding = genTrace(
        preTraceWithProof,
        healthAuthority,
        3,
        'message',
        from_string('FooBar'),
    );
    if (traceEncoding === undefined) {
      throw new Error('Couldn\'t create the traces');
    }
    preTraceList.push(preTraceWithProof);
    traceList.push(
        crowdnotifier_v3.Trace.decode(from_base64(traceEncoding)),
    );
  });

  log.info('Checking pretraces validation');
  preTraceList.forEach((pretrace) => {
    log.assertTrue(
        verifyTrace(pretrace, healthAuthority) !== undefined,
        'Validation shouldn\'t fail!',
    );
  });

  log.info('Checking if user1 gets correctly notified');
  log.assertTrue(
      match(encryptedVisit1, traceList[0]) === undefined,
      'Shouldn\'t match trace 1',
  );
  log.assertTrue(
      match(encryptedVisit1, traceList[1]) === undefined,
      'Shouldn\'t match trace 2',
  );
  const exposure = match(encryptedVisit1, traceList[2]);
  log.assertTrue(
      exposure !== undefined && exposure.message === 'message',
      'Should match trace 3',
  );
  log.info(
      'User 1 was exposed from ',
      new Date(exposure!.startTimestamp * 1000).toTimeString(),
      ' to ',
      new Date(exposure!.endTimestamp * 1000).toTimeString(),
  );

  log.info('Checking if user2 gets correctly NOT notified');
  log.assert(
      match(encryptedVisit2, traceList[0]),
      undefined,
      'Shouldn\'t match user2',
  );
  log.assert(
      match(encryptedVisit2, traceList[1]),
      undefined,
      'Shouldn\'t match user2',
  );
  log.assert(
      match(encryptedVisit2, traceList[2]),
      undefined,
      'Shouldn\'t match user2',
  );
}
