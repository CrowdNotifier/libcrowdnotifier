import {
  crypto_box_keypair,
  crypto_box_seal,
  crypto_box_seal_open,
  crypto_box_seed_keypair,
  crypto_hash_sha256,
  crypto_scalarmult,
  crypto_scalarmult_base,
  IKeyPair,
  randombytes_buf, compare,
} from 'libsodium-wrappers-sumo';

/**
 * The cryptographic part of the QRcodes that need to be printed
 * by the Location.
 */
export interface ILocationData {
    // Public key of the venue
    ent: Uint8Array;
    // First part of private key
    pEnt: Uint8Array;
    // Private key material to be sent to the health authority
    tr: tr;
    // Private key material to be sent to the health authority
    pTr: pTr;
}

export interface tr {
    // Final private key
    sk: Uint8Array,
    // Second nonce of private key
    r2: Uint8Array
}

export interface pTr {
    // First nonce of private key
    r1: Uint8Array,
    // Second nonce of private key
    r2: Uint8Array
}

/**
 * The record to be stored by a visitor
 */
export interface IVisit {
    // Public commitment to Diffie-Hellman random value
    gR: Uint8Array;
    // Diffie-Hellman key
    h: Uint8Array;
    // Ciphertext containing (t || aux)
    c: Uint8Array;
}

/**
 * This structure is as described in the chapter 4 of the white paper
 *   CrowdNotifier: attack model, formalization and properties November 26, 2020
 */
export class CryptoV1_1 {
  static setupHA(): IKeyPair {
    return crypto_box_keypair();
  }

  /**
     * Creates a code for a new location, given the info.
     * @param info passed as a buffer
     * @return the data necessary to create the QRcodes for the location
     */
  static genCode(info: Uint8Array): ILocationData {
    const r1 = randombytes_buf(32);
    const r2 = randombytes_buf(32);
    const seed = hashInfo(info, r1, r2);
    const keyPair = crypto_box_seed_keypair(seed);
    return {
      ent: keyPair.publicKey,
      pEnt: r1,
      tr: {sk: keyPair.privateKey, r2},
      pTr: {r1, r2},
    };
  }

  /**
     * Encrypts the information for a visit in a privacy-preserving way.
     * @param ent public key of the location
     * @param pEnt entry proof of the location
     * @param info binary representation of the location
     * @param aux visit data - most probably [entry::exit] time
     */
  static scan(ent: Uint8Array,
      pEnt: Uint8Array,
      info: Uint8Array,
      aux: Uint8Array): IVisit {
    const pk = ent;
    const r1 = pEnt;
    const r = randombytes_buf(32);
    const gR = crypto_scalarmult_base(r);
    const h = crypto_scalarmult(r, pk);
    // takes the hash of (info || r1) - this is OK here, as r1 is
    // fixed size.
    const t = crypto_hash_sha256(Uint8Array.from([...info, ...r1]));
    // encrypts the concatenation of (t || aux)
    const c = crypto_box_seal(Uint8Array.from([...t, ...aux]), pk);
    return {gR, h, c};
  }

  /**
     * Lets the HealthAuthority verify a trace received by a location
     * @param info from the location
     * @param tr part of secret key
     * @param pTr part of secret key
     */
  static verifyTrace(info: Uint8Array, tr: tr, pTr: pTr): boolean {
    const {sk, r2: r2P} = tr;
    const {r1, r2} = pTr;
    if (compare(r2, r2P) !== 0) {
      return false;
    }
    const keyPair = crypto_box_seed_keypair(hashInfo(info, r1, r2));
    return compare(sk, keyPair.privateKey) === 0;
  }

  /**
     * Matches the anonymized trace data from the HealthAuthority against an
     * encrypted visit. If successful, returns the auxiliary data.
     * @param rec of the visit
     * @param tr trace data from the HealthAuthority
     */
  static match(rec: IVisit, tr: tr): (undefined | Uint8Array) {
    const {sk, r2} = tr;
    const {gR: epk, h, c} = rec;
    if (compare(crypto_scalarmult(sk, epk), h) !== 0) {
      return undefined;
    }
    const tAux = crypto_box_seal_open(c, crypto_scalarmult_base(sk), sk);
    const t = tAux.slice(0, 32);
    const aux = tAux.slice(32);
    // takes the hash of (t || r2)
    const seed = crypto_hash_sha256(Uint8Array.from([...t, ...r2]));
    const keyPair = crypto_box_seed_keypair(seed);
    if (compare(sk, keyPair.privateKey) !== 0) {
      return undefined;
    }
    return aux;
  }
}

/**
 * Helper method to calculate the hash for the private key
 */
function hashInfo(info: Uint8Array, r1: Uint8Array, r2: Uint8Array):
    Uint8Array {
  // takes the hash of (info || r1)
  const h1 = crypto_hash_sha256(Uint8Array.from([...info, ...r1]));
  // takes the hash of (h1 || r2)
  return crypto_hash_sha256(Uint8Array.from([...h1, ...r2]));
}
