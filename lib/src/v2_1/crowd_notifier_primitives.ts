import {
  crypto_box_seal,
  from_string, randombytes_buf,
} from 'libsodium-wrappers-sumo';
import {keyGen, NONCE_LENGTH} from '../v2/ibe_primitives';
import mcl from 'mcl-wasm';
import {ILocationData, IOrganizerData} from '../v2/structs';
import {baseG2} from '../v2/helpers';

/**
 * Generates the static part for v2.1 from a pass phrase. The idea is to
 * have a static part that doesn't change, to secure the notifications without
 * having to keep too many keys.
 * @param pkh public key of the health authority
 * @param pp pass phrase, if possible 256 bits entropy or more
 * @deprecated since v2.1 - please use genOrgInit and genOrgFollow
 */
export function genOrgStatic(pkh: Uint8Array, pp: string): IOrganizerData {
  console.warn('This method is deprecated, as it doesn\'t protect ' +
      'against a coercion attack.');
  const mskO = new mcl.Fr();
  mskO.setHashOf(from_string(pp));
  const mpkO = mcl.mul(baseG2(), mskO);

  const mskha = new mcl.Fr();
  mskha.setHashOf(from_string(`healthAuthority:${pp}`));
  const mpkha = mcl.mul(baseG2(), mskha);
  const mpk = mcl.add(mpkO, mpkha);

  const ctxtha = crypto_box_seal(mskha.serialize(), pkh);

  return {mpk, mskO, ctxtha};
}

/**
 * Generates the code for v2.1 with an organization master key.
 * @param org from the genOrgStatic
 * @param info about the room
 * @return the QRCodeContent to be printed in QR codes
 */
export function genOrgCode(org: IOrganizerData, info: Uint8Array):
    ILocationData {
  const nonce1 = randombytes_buf(NONCE_LENGTH);
  const nonce2 = randombytes_buf(NONCE_LENGTH);

  const pEnt = {nonce1, nonce2};
  const mtr = {
    mpk: org.mpk,
    mskl: org.mskO,
    ctxtha: org.ctxtha,
    info, nonce1, nonce2,
  };

  return {ent: org.mpk, pEnt, mtr};
}

/**
 * Generates the static part for v2.1 from a pass phrase. The idea is to
 * have a static part that doesn't change, to secure the notifications without
 * having to keep too many keys.
 * When calling this function, the client will have to store the `ctxtha` and
 * `mpk` for later use, as ctxtha based on a randomly generated key.
 * This protects the client against a coercion attack, where an attacker tries
 * to coerce the client into sending a notification without the health
 * authorities approval.
 * @param pkh public key of the health authority
 * @param pp pass phrase, if possible 256 bits entropy or more
 */
export function genOrgInit(pkh: Uint8Array, pp: string): IOrganizerData {
  const mskO = new mcl.Fr();
  mskO.setHashOf(from_string(pp));
  const mpkO = mcl.mul(baseG2(), mskO);

  const [mpkha, mskha] = keyGen();
  const mpk = mcl.add(mpkO, mpkha);

  const ctxtha = crypto_box_seal(mskha.serialize(), pkh);

  return {mpk, mskO, ctxtha};
}

/**
 * Generates the static part for v2.1 from a pass phrase. The idea is to
 * have a static part that doesn't change, to secure the notifications without
 * having to keep too many keys.
 * This method is called by the client if it already has set up the ctxtha
 * and the mpk keys.
 * @param pkh public key of the health authority
 * @param pp pass phrase, if possible 256 bits entropy or more
 */
export function genOrgFollow(pkh: Uint8Array, pp: string): mcl.Fr {
  const mskO = new mcl.Fr();
  mskO.setHashOf(from_string(pp));
  return mskO;
}
