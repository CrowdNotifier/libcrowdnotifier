import {Log} from '../log';
import {
  genIdV3,
  deriveNoncesAndNotificationKey,
  toBytesInt32,
  toBytesInt64,
} from './helpers';
import {identityTestVectors, hkdfTestVectors} from './testvectors';

const log = new Log('v3/helpers_v3.spec');

// One set of test vectors for the hkdf derivation method.
export function testHKDFDerivation() {
  log.info('Starting at: %s', Date.now().toString());

  for (const tv of hkdfTestVectors) {
    log.info(
        'Verifying deriveNoncesAndNotificationKey for %s',
        JSON.stringify(tv),
    );
    const cryptoData = deriveNoncesAndNotificationKey(tv.qrCodePayload);
    log.assertTrue(
        Buffer.compare(tv.nonce1, cryptoData.nonce1) === 0,
        'Nonce 1 doesn\'t match',
    );
    log.assertTrue(
        Buffer.compare(tv.nonce2, cryptoData.nonce2) === 0,
        'Nonce 2 doesn\'t match',
    );
    log.assertTrue(
        Buffer.compare(tv.notificationKey, cryptoData.notificationKey) ===
                0,
        'NotificationKeys don\'t match',
    );
  }
}

// One set of test vectors for the genIdV3 method.
export function testGenIdV3() {
  log.info(`Starting at: ${new Date()}`);
  log.info('Verifying int to byte array conversion.');
  const expectedDurationBytes = Uint8Array.from([0, 0, 14, 16]);
  log.assertTrue(
      Buffer.compare(expectedDurationBytes, toBytesInt32(3600)) === 0,
      'duration has wrong value',
  );

  for (const tv of identityTestVectors) {
    const actualIntervalBytes = toBytesInt64(tv.startOfInterval);
    log.assertTrue(
        Buffer.compare(tv.startOfIntervalBytes, actualIntervalBytes) === 0,
        'interval has wrong value:\n',
        'expected: ',
        tv.startOfIntervalBytes,
        '\nactual: ',
        actualIntervalBytes,
    );

    log.info('Verifying genIdV3 for', JSON.stringify(tv));
    const id = genIdV3(tv.qrCodePayload, tv.startOfInterval);
    log.assertTrue(id.length === tv.identity.length, 'id has wrong length');
    log.assertTrue(
        Buffer.compare(id, tv.identity) === 0,
        'Wrong value for id',
    );
  }
}
