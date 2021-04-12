import {Log, waitReady} from '@c4dt/libcrowdnotifier';
import {HealthAuthority, Room} from '../v2';
import {Organizer} from './managed';
import {checkVisits} from '../v2/visits.spec';

const log = new Log('v2_1/managed.spec');
log.info(`Starting at: ${new Date()}`);

const urlEntry = 'app:entry';
const counter1 = 1000;

async function main() {
  await waitReady();

  await testManaged();
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

  await checkVisits(log, counter1, counter1,
      healthAuthority,
      room1.getQRentry(urlEntry), room2.getQRentry(urlEntry),
      preTrace1[0], preTrace1[1], preTrace1[2]);

  log.info('Verified visits without knowing secret ' +
      'HealthAuthority partial key');
}

main().catch((e) => {
  log.panic(e);
});
