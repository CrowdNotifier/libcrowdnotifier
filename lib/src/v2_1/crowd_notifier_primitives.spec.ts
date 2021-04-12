import {genOrgCode,
  recoverOrgMasterSecret,
  genOrgInit} from './crowd_notifier_primitives';
import {Log} from '..';
import {setupHA} from '../v2/crowd_notifier_primitives';
import {from_string, randombytes_buf} from 'libsodium-wrappers-sumo';
import {simulateVisits} from '../v2/crowd_notifier_primitives.spec';

/**
 * Very simple crypto test for CrowdNotifierPrimitives using the new BNS scheme
 * to avoid having to print new QRcodes after every infection.
 *
 * To run it, write:
 *   npm ci
 *   npm run testv2
 */

const log = new Log('v2_1/crowd_notifier_primitives.spec');

/**
 * Tests the v2.1 managed crowdNotifier protocol
 * This is the new version where the organizer has to store the ctxtha and mpk
 * and then only re-creates the mskO from the passphrase.
 */
export function testCrowdNotifierPrimitivesOrganization() {
  log.name = 'v2_1/crowd_notifier_primitives.spec::organizer';
  log.info(`Starting at: ${new Date()}`);
  const healthAuthority = setupHA();
  const passphrase = Buffer.from(randombytes_buf(32)).toString('hex');
  const organizerSaved = genOrgInit(healthAuthority.publicKey,
      passphrase);
    // Re-create the organizer from saved data, and only use the passphrase to
    // generate the mskO.
  const organizer = {
    mskO: recoverOrgMasterSecret(healthAuthority.publicKey, passphrase),
    ctxtha: organizerSaved.ctxtha,
    mpk: organizerSaved.mpk,
  };
  const infoLocation1 = from_string('FooBar:Lausanne:undefined');
  const location1 = genOrgCode(organizer, infoLocation1);
  const infoLocation2 = from_string('BarMitzva:Lausanne:undefined');
  const location2 = genOrgCode(organizer, infoLocation1);
  simulateVisits(healthAuthority, location1, location2,
      infoLocation1, infoLocation2);
}
