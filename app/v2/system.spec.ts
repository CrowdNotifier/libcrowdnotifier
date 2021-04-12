import {Log, waitReady} from '@c4dt/libcrowdnotifier';
import {HealthAuthority, Location} from './system';
import {checkVisits} from './visits.spec';

const log = new Log('v2/system.spec');
log.info(`Starting at: ${new Date()}`);

const urlEntry = 'app:entry';
const urlTrace = 'app:trace';
const counter1 = 1000;
const counter2 = 1001;

async function main() {
  await waitReady();

  await testSingle();
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

  await checkVisits(log, counter1, counter2,
      healthAuthority,
      location1.getQRentry(urlEntry),
      location2.getQRentry(urlEntry),
      preTrace1_1, preTrace1_2, preTrace1_3);
}

main().catch((e) => {
  log.panic(e);
});
