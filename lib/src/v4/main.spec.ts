import {Log} from '../log';
import {createLocationData} from './qrcode';
import {randombytes_buf, to_base64, to_hex} from 'libsodium-wrappers-sumo';
import {waitReady} from '../v2';

const log = new Log('v4/main.spec');
log.info(`Starting at: ${new Date()}`);

export async function main() {
  await waitReady();
  const pubKey = to_hex(randombytes_buf(32));

  // Check correct verification of limits
  await log.asyncThrows(() =>
    createLocationData('title', 'abcd'));
  await log.asyncThrows(() =>
    createLocationData(to_hex(randombytes_buf(51)), pubKey));

  const bytes = await createLocationData('title', pubKey);
  log.assertTrue(to_base64(bytes) !== '');
  log.info('All tests completed successfully');
}

main().catch((e) => {
  log.panic(e);
});
