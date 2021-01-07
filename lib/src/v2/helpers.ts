import mcl from 'mcl-wasm';
import {crypto_hash_sha256, from_string} from 'libsodium-wrappers-sumo';

/**
 * New methods and definitions
 */

// from https://github.com/zcash/librustzcash/blob/6e0364cd42a2b3d2b958a54771ef51a8db79dd29/pairing/src/bls12_381/README.md#generators
export function baseG1(): mcl.G1 {
  const base = new mcl.G1();
  base.setStr('1 3685416753713387016781088315183077757961620795782546' +
            '409894578378688607592378376318836054947676345821548104185464507 ' +
            '133950654494447647302047137994192122158493387593834962042654373' +
            '6416511423956333506472724655353366534992391756441569');
  return base;
}


// from https://github.com/zcash/librustzcash/blob/6e0364cd42a2b3d2b958a54771ef51a8db79dd29/pairing/src/bls12_381/README.md#generators
export function baseG2(): mcl.G2 {
  const base = new mcl.G2();
  base.setStr('1 3527010695874666181871391160110601448900299527927752' +
            '40219908644239793785735715026873347600343865175952761926303160 ' +
            '305914434424421370997125981475378163698647032547664755865937320' +
            '6291635324768958432433509563104347017837885763365758 ' +
            '198515060228729193556805452117717163830086897821565573085937866' +
            '5066344726373823718423869104263333984641494340347905 ' +
            '927553665492332455747201965776037880757740193453592970025027978' +
            '793976877002675564980949289727957565575433344219582');
  return base;
}


export function xor(a: Uint8Array, b: Uint8Array): Uint8Array {
  if (a.length !== b.length) {
    throw new Error('cannot xor two Uint8Arrays of different length');
  }
  const c = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) {
    c[i] = a[i] ^ b[i];
  }
  return c;
}


/**
  * Generate an identifier.
  * @param info public information
  * @param counter counter
  * @param nonce1 a nonce
  * @param nonce2 an other nonce
  * @return an identifier
  */
export function genId(info: Uint8Array,
    counter: number,
    nonce1: Uint8Array,
    nonce2: Uint8Array): Uint8Array {
  const hash1 = crypto_hash_sha256(
      Uint8Array.from([...info, ...nonce1]) );

  return crypto_hash_sha256(Uint8Array.from(
      [...hash1, ...nonce2, ...from_string(counter.toString())]));
}
