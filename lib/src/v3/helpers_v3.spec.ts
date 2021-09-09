import {Log} from '../log';
import {deriveNoncesAndNotificationKey, genIdV3,
  toBytesInt32, toBytesInt64} from './helpers';
import {hkdfTestVectors, identityTestVectors} from './testvectors';
const Long = require('long');

const log = new Log('v3/helpers_v3.spec');

// Test the values in the toBytes methods.
export function testToBytes() {
  // Test toBytesInt32
  toBytesInt32(2 ** 31 - 1);
  toBytesInt32(-(2 ** 31));
  log.throws(() => toBytesInt32(2 ** 31), 'Shouldn\'t accept 2**32');
  log.throws(() => toBytesInt32(-(2 ** 31)-1),
      'Shouldn\'t accept -(2**32)-1');

  // Test numbers in toBytesInt64
  toBytesInt64(Number.MAX_SAFE_INTEGER);
  toBytesInt64(Number.MIN_SAFE_INTEGER);
  log.throws(() => toBytesInt64(Number.MAX_SAFE_INTEGER + 1));
  log.throws(() => toBytesInt64(Number.MIN_SAFE_INTEGER - 1));

  // Test bigint in toBytesInt64
  const max64 = (BigInt(1) << BigInt(63)) - BigInt(1);
  const min64 = -(BigInt(1) << BigInt(63));
  const bufMax = toBytesInt64(max64);
  const bufMin = toBytesInt64(min64);
  log.throws(() => toBytesInt64(max64 + BigInt(1)));
  log.throws(() => toBytesInt64(min64 - BigInt(1)));

  // Test Long in toBytesInt64
  toBytesInt64(Long.fromBytesBE(bufMax));
  toBytesInt64(Long.fromBytesBE(bufMin));
  // Cannot check out-of-bounds Long, as it's always 64 bits...
}

// One set of test vectors for the hkdf derivation method.
export function testHKDFDerivation() {
  log.info('Starting at: %s', Date.now().toString());

  for (const tv of hkdfTestVectors) {
    log.info(
        'Verifying deriveNoncesAndNotificationKey for',
        JSON.stringify(tv),
    );
    const cryptoData = deriveNoncesAndNotificationKey(tv.qrCodePayload);
    log.assertTrue(
        Buffer.compare(tv.noncePreId, cryptoData.noncePreId) === 0,
        'Nonce PreId doesn\'t match',
    );
    log.assertTrue(
        Buffer.compare(tv.nonceTimekey, cryptoData.nonceTimekey) === 0,
        'Nonce Timekey doesn\'t match',
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
