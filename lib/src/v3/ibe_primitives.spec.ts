import {Log} from '..';
import {dec, enc, keyDer, keyGen} from './ibe_primitives';

/**
 * Very simple crypto test for CrowdNotifierPrimitives using the new
 * BNS scheme to avoid having to print new QRcodes after every infection.
 */

const log = new Log('v2/ibe_primitives.spec');

export function testIbePrimitives() {
  log.info(`Starting at: ${new Date()}`);

  const id = new Uint8Array([1, 2, 3, 4]);
  const msg = new Uint8Array([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    1, 2, 3, 4]);

  log.info('Start test suite for identity-based encryption (IBE) primitives.');

  log.info('Keys generation');
  const [mpk, msk] = keyGen();

  log.info('Encrypt');
  const ctxt = enc(mpk, id, msg);

  log.info('Derive key');
  const skid = keyDer(msk, id);

  log.info('Decrypt');
  const msg_dec = dec(id, skid, ctxt);

  log.reject(msg_dec, undefined, 'Should be able to decrypt message!');

  log.assert(msg, msg_dec,
      'Original message and decrypted ciphertext should be equal!');

  log.info('All tests for IBE primitives passed!');
}
