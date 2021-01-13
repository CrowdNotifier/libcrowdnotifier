import {Log, waitReady} from '@c4dt/libcrowdnotifier';
import {HealthAuthority, Location, Visit} from './system';
import {Organizer, Room} from './managed';

const log = new Log('v2/system.spec');
log.info(`Starting at: ${new Date()}`);

const urlEntry = 'app:entry';
const urlTrace = 'app:trace';
const counter1 = 1000;
const counter2 = 1001;

async function main() {
  await waitReady();

  await testSingle();
  await testManaged();
}

async function testSingle() {
  log.info('Setting up backends');
  const healthAuthority = new HealthAuthority();
  const location1 = new Location(healthAuthority.keyPair.publicKey,
      1, 'FooBar', 'Lausanne', 'any');
  const location1qrTrace = location1.getQRtrace(urlTrace);
  const location2 = new Location(healthAuthority.keyPair.publicKey,
      2, 'BarMitzva', 'Lausanne', 'unknown');
  // const location2qrTrace = location2.getQRtrace(urlTrace);

  log.info('Location 1 got infected during three hours - creating pre-traces');
  const preTrace1_1 =
      Location.preTrace(location1qrTrace, (counter1 - 1).toString());
  const preTrace1_2 =
      Location.preTrace(location1qrTrace, (counter1).toString());
  const preTrace1_3 =
      Location.preTrace(location1qrTrace, (counter1 + 1).toString());

  await checkVisits(healthAuthority,
      location1.getQRentry(urlEntry),
      location2.getQRentry(urlEntry),
      preTrace1_1, preTrace1_2, preTrace1_3);
}

async function testManaged() {
  log.info('Setting up backends in managed mode');
  const healthAuthority = new HealthAuthority();
  try {
    Organizer.fromPassPhrase(healthAuthority.keyPair.publicKey,
        'something something');
    log.panic(Error('Short passphrases should be rejected'));
  } catch (e) {
    log.info('Correctly rejected short passphrase');
  }

  const organizer = Organizer.fromPassPhrase(
      healthAuthority.keyPair.publicKey,
      'something something something something something');

  const room1 = Room.fromOrganizerPublic(organizer.data,
      1, 'FooBar', 'Lausanne', 'any');
  const room2 = Room.fromOrganizerPublic(organizer.data,
      2, 'BarMitzva', 'Lausanne', 'unknown');

  const preTrace1 = organizer.preTrace(room1,
      [counter1-1, counter1, counter1+1]);

  await checkVisits(healthAuthority,
      room1.getQRentry(urlEntry), room2.getQRentry(urlEntry),
      preTrace1[0], preTrace1[1], preTrace1[2]);
}

async function checkVisits(healthAuthority: HealthAuthority,
    urlEntry1: string, urlEntry2: string,
    preTrace1_1: string, preTrace1_2: string, preTrace1_3: string) {
  log.info('Creating two visits');
  const visit1 =
      Visit.fromQRCode(urlEntry1, counter1, true);
  const visit2 =
      Visit.fromQRCode(urlEntry2, counter2, true);

  log.info('Location 1 got infected during three hours - creating traces');
  const trace1_1 =
      healthAuthority.createTraceEntry(preTrace1_1, (counter1 - 1).toString());
  const trace1_2 =
      healthAuthority.createTraceEntry(preTrace1_2, (counter1).toString());
  const trace1_3 =
      healthAuthority.createTraceEntry(preTrace1_3, (counter1 + 1).toString());
  if (trace1_1 === undefined ||
      trace1_2 === undefined ||
      trace1_3 === undefined) {
    throw new Error('Couldn\'t create the traces');
  }

  log.info('Checking if visit1 gets correctly notified');
  log.assertTrue(!visit1.verifyExposure([trace1_1]),
      'Shouldn\'t match counter-1');
  log.assertTrue(visit1.verifyExposure([trace1_2]),
      'Should match counter');
  log.assertTrue(!visit1.verifyExposure([trace1_3]),
      'Shouldn\'t match counter+1');

  log.info('Checking if visit2 gets correctly NOT notified');
  log.assertTrue(!visit2.verifyExposure([trace1_1]),
      'Shouldn\'t match visit2');
  log.assertTrue(!visit2.verifyExposure([trace1_2]),
      'Shouldn\'t match visit2');
  log.assertTrue(!visit2.verifyExposure([trace1_3]),
      'Shouldn\'t match visit2');

  log.info('System check successfully finished!');
}

main().catch((e) => {
  log.panic(e);
});
