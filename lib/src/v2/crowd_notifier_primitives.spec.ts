import {waitReady} from './ibe_primitives';
import {genCode, genPreTrace, genTrace,
  match, scan, setupHA, verifyTrace} from './crowd_notifier_primitives';
import {Log} from '..';
import {from_string} from 'libsodium-wrappers-sumo';

/**
 * Very simple crypto test for CrowdNotifierPrimitives using the new BNS scheme
 * to avoid having to print new QRcodes after every infection.
 *
 * To run it, write:
 *   npm ci
 *   npm run testv2
 */

const log = new Log('v2/crowd_notifier_primitives.spec');
log.info(`Starting at: ${new Date()}`);


function testCrowdNotifierPrimitives() {
  log.info('Setting up backends');
  const HealthAuthority = setupHA();
  const infoLocation1 = from_string('FooBar:Lausanne:undefined');
  const location1 = genCode(HealthAuthority.publicKey, infoLocation1);
  const infoLocation2 = from_string('BarMitzva:Lausanne:undefined');
  const location2 = genCode(HealthAuthority.publicKey, infoLocation1);

  log.info('Creating two users');
  const counter1 = 1000;
  const user1Aux = from_string('secret date');
  const user1 =
      scan(location1.ent, location1.piEnt, infoLocation1, counter1, user1Aux);

  const counter2 = 1001;
  const user2Aux = from_string('PARTY!');
  const user2 =
      scan(location2.ent, location2.piEnt, infoLocation2, counter2, user2Aux);

  log.info('Location 1 got infected during three hours - creating pre-traces');
  const [preTrace1_1, tr_proof1_1] = genPreTrace(location1.mtr, counter1 - 1);
  const [preTrace1_2, tr_proof1_2] = genPreTrace(location1.mtr, counter1);
  const [preTrace1_3, tr_proof1_3] = genPreTrace(location1.mtr, counter1 + 1);

  log.info('Creating traces from health authority');
  const trace1_1 = genTrace(HealthAuthority, preTrace1_1);
  const trace1_2 = genTrace(HealthAuthority, preTrace1_2);
  const trace1_3 = genTrace(HealthAuthority, preTrace1_3);
  if (trace1_1 === undefined ||
      trace1_2 === undefined ||
      trace1_3 === undefined) {
    throw new Error('Couldn\'t create the traces');
  }

  log.info('Checking traces validation');
  log.assertTrue(
      verifyTrace(infoLocation1, counter1 - 1, trace1_1, tr_proof1_1),
      'Trace validation should succeed!');
  log.assertTrue(
      verifyTrace(infoLocation1, counter1, trace1_2, tr_proof1_2),
      'Trace validation should succeed!');
  log.assertTrue(
      verifyTrace(infoLocation1, counter1 + 1, trace1_3, tr_proof1_3),
      'Trace validation should succeed!');

  const tr_proof2 = genPreTrace(location2.mtr, counter1)[1];

  log.assertFalse(
      verifyTrace(infoLocation2, counter1, trace1_2, tr_proof1_2),
      'Trace validation should fail! (invalid location)');
  log.assertFalse(
      verifyTrace(infoLocation1, counter1 - 1, trace1_2, tr_proof1_2),
      'Trace validation should fail! (invalid counter)');
  log.assertFalse(
      verifyTrace(infoLocation1, counter1, trace1_1, tr_proof1_2),
      'Trace validation should fail! (invalid trace)');
  log.assertFalse(
      verifyTrace(infoLocation1, counter1, trace1_2, tr_proof2),
      'Trace validation should fail! (invalid proof)');

  log.info('Checking if user1 gets correctly notified');
  log.assert(match(user1, trace1_1), undefined, 'Shouldn\'t match counter-1');
  log.assert(match(user1, trace1_2), user1Aux, 'Should match counter');
  log.assert(match(user1, trace1_3), undefined, 'Shouldn\'t match counter+1');

  log.info('Checking if user2 gets correctly NOT notified');
  log.assert(match(user2, trace1_1), undefined, 'Shouldn\'t match user2');
  log.assert(match(user2, trace1_2), undefined, 'Shouldn\'t match user2');
  log.assert(match(user2, trace1_3), undefined, 'Shouldn\'t match user2');
}


async function main() {
  await waitReady();

  log.info('Start test suite for crowdnotifier protocol.');

  testCrowdNotifierPrimitives();

  log.info('Crowdnotifier spec successfully finished!');
}


main().catch((e) => {
  log.panic(e);
});
