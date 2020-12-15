import {
  crypto_hash_sha256,
  crypto_secretbox_easy,
  crypto_secretbox_NONCEBYTES,
  crypto_secretbox_open_easy,
  randombytes_buf,
  ready,
} from 'libsodium-wrappers-sumo';
import mcl from 'mcl-wasm';
import {IBEEncInternal} from './proto';
import {baseG2, xor} from './helpers';

/**
 * Cryptographic primitives used in the identity-based encryption (IBE) scheme.
 * This code implements the paper [Security and Anonymity of Identity-Based
 * Encryption with Multiple Trusted Authorities by Kenneth G. Paterson
 * and Sriramkrishnan Srinivasan]
 * (http://www.isg.rhul.ac.uk/~prai175/PatersonS08.pdf)
 */

// The security parameter l is 128 bits,
// so the nonce length will be 2l == 256bits == 32 bytes.
export const NONCE_LENGTH = 32;

export async function waitReady() {
  await new Promise((resolve) => {
    mcl.init(mcl.BLS12_381).then(() => {
      resolve(undefined);
    });
  });
  await ready;
}

export interface IEncryptedData {
    c1: mcl.G2;
    c2: Uint8Array,
    c3: Uint8Array,
    nonce: Uint8Array
}

/**
 * Generate a pair of public and private keys.
 * @return a tuple containing the master public key and the master secret key
 */
export function keyGen(): [mcl.G2, mcl.Fr] {
  const msk = new mcl.Fr();
  msk.setByCSPRNG();

  const mpk = mcl.mul(baseG2(), msk);

  return [mpk, msk];
}

/**
 * Key derivation function.
 * @param msk master secret key
 * @param id identifier
 * @return a key derived for the identifier
 */
export function keyDer(msk: mcl.Fr, id: Uint8Array): mcl.G1 {
  return mcl.mul(h1(id), msk);
}

/**
 * Encrypt a message
 * @param mpk master public key
 * @param id identifier
 * @param m message
 * @return the encrypted message
 */
export function enc(mpk: mcl.G2, id: Uint8Array, m: Uint8Array):
    IEncryptedData {
  const x = randombytes_buf(NONCE_LENGTH);

  const r_raw = h3(x, m, id);

  const r = new mcl.Fr();
  r.setLittleEndianMod(r_raw);

  const c1: mcl.G2 = mcl.mul(baseG2(), r);

  const c2_pair = ht(mcl.pow(mcl.pairing(h1(id), mpk), r));
  const c2 = xor(x, c2_pair);

  const nonce = randombytes_buf(crypto_secretbox_NONCEBYTES);

  const c3 = crypto_secretbox_easy(m, nonce, h4(x));

  return {c1, c2, c3, nonce};
}

/**
 * Decrypt a message.
 * @param id identifier
 * @param skid key derived for the identifier
 * @param ctxt encrypted message
 * @return the decrypted message or undefined if
 * it fails to decrypt the ciphertext, or if the validation fails
 */
export function dec(id: Uint8Array, skid: mcl.G1, ctxt: IEncryptedData):
    Uint8Array | undefined {
  const {c1, c2, c3, nonce} = ctxt;

  const x_p = xor(c2, ht(mcl.pairing(skid, c1)));

  let msg_p;

  try {
    msg_p = crypto_secretbox_open_easy(c3, nonce, h4(x_p));
  } catch (e) {
    return undefined;
  }

  // Additional verification.

  const r_raw = h3(x_p, msg_p, id);

  const r_p = new mcl.Fr();
  r_p.setLittleEndianMod(r_raw);

  const c1_p = mcl.mul(baseG2(), r_p);

  if (!c1.isEqual(c1_p)) {
    return undefined;
  }

  // Check that skid is in G1*
  if (!skid.isValidOrder() || skid.isZero()) {
    return undefined;
  }

  return msg_p;
}

/**
 * Hash a message to an element of G1 in a cryptographically secure manner.
 * @param msg message to hash
 * @return hash of the message
 */
function h1(msg: Uint8Array): mcl.G1 {
  return mcl.hashAndMapToG1(msg);
}

/**
 * Hash an element of GT to a cryptographically secure hash.
 * @param gt_elem element of GT
 * @return hash of the element of GT
 */
function ht(gt_elem: mcl.GT): Uint8Array {
  return crypto_hash_sha256(gt_elem.serialize());
}

/**
 * Hash a message, an identifier and a nonce to a cryptographically secure hash.
 * @param x nonce
 * @param m message
 * @param id identifier
 * @return hash of the values
 */
function h3(x: Uint8Array, m: Uint8Array, id: Uint8Array): Uint8Array {
  const to_hash = IBEEncInternal.encode(
      IBEEncInternal.create({x, m, id}),
  ).finish();
  return crypto_hash_sha256(to_hash);
}

/**
 * Fourth hash function for IBE.
 * @param d message
 * @return sha256 of message
 */
function h4(d: Uint8Array): Uint8Array {
  return crypto_hash_sha256(d);
}
