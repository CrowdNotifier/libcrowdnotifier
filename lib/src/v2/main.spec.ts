import {Log} from '../log';
import {waitReady} from '.';
import {testIbePrimitives} from './ibe_primitives.spec';
import {testGenId} from './helpers.spec';
import {
  testCrowdNotifierPrimitives,
  testCrowdNotifierPrimitivesOrganization,
} from './crowd_notifier_primitives.spec';

const log = new Log('v2/main.spec');
log.info(`Starting at: ${new Date()}`);

export async function main() {
  await waitReady();
  testIbePrimitives();
  testGenId();
  testCrowdNotifierPrimitives();
  testCrowdNotifierPrimitivesOrganization();
  log.info('All tests completed successfully');
}

main().catch((e) => {
  log.panic(e);
});
