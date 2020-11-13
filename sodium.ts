import * as _sodium from "libsodium-wrappers-sumo";

export interface IKeyPair {
  keyType: string;
  privateKey: Uint8Array;
  publicKey: Uint8Array;
}

/**
 * Helper methods
 */

export function waitReady(): Promise<undefined> {
  return _sodium.ready;
}

export function randombytes_buf(len: number): Uint8Array {
  return _sodium.randombytes_buf(len);
}

export function to_base64(bin: Uint8Array): string {
  return _sodium.to_base64(bin);
}

export function from_base64(str: string): Uint8Array {
  return _sodium.from_base64(str);
}

export function from_string(str: string): Uint8Array {
  return _sodium.from_string(str);
}

export function to_string(buf: Uint8Array): string {
  return _sodium.to_string(buf);
}

export function buf_equals(a: Uint8Array, b: Uint8Array): boolean {
  return to_base64(a) === to_base64(b);
}

/**
 * crypto_* methods
 */

export function crypto_box_keypair(): IKeyPair {
  return _sodium.crypto_box_keypair();
}

export function crypto_secretbox_keygen(): Uint8Array {
  return _sodium.crypto_secretbox_keygen();
}

export function crypto_hash_sha256(msg: Uint8Array): Uint8Array {
  return _sodium.crypto_hash_sha256(msg);
}

export function crypto_sign_ed25519_keypair(): IKeyPair {
  return _sodium.crypto_sign_keypair();
}

export function crypto_sign_keypair(): IKeyPair {
  return _sodium.crypto_sign_keypair();
}

export function crypto_sign_seed_keypair(seed: Uint8Array): IKeyPair {
  return _sodium.crypto_sign_seed_keypair(seed);
}

export function crypto_sign_ed25519_sk_to_curve25519(
  secret: Uint8Array
): Uint8Array {
  return _sodium.crypto_sign_ed25519_sk_to_curve25519(secret);
}

export function crypto_box_seal(
  msg: Uint8Array,
  pubKey: Uint8Array
): Uint8Array {
  return _sodium.crypto_box_seal(msg, pubKey);
}

export function crypto_box_seal_open(
  cipher: Uint8Array,
  pubKey: Uint8Array,
  privKey: Uint8Array
): Uint8Array {
  return _sodium.crypto_box_seal_open(cipher, pubKey, privKey);
}

export function crypto_sign_detached(
  msg: Uint8Array,
  privKey: Uint8Array
): Uint8Array {
  return _sodium.crypto_sign_detached(msg, privKey);
}

export function crypto_sign_verify_detached(
  sig: Uint8Array,
  msg: Uint8Array,
  pubKey: Uint8Array
): boolean {
  return _sodium.crypto_sign_verify_detached(sig, msg, pubKey);
}

export function crypto_scalarmult(
  scalar: Uint8Array,
  point: Uint8Array
): Uint8Array {
  return _sodium.crypto_scalarmult(scalar, point);
}

export function crypto_scalarmult_base(scalar: Uint8Array): Uint8Array {
  return _sodium.crypto_scalarmult_base(scalar);
}

export function crypto_sign_ed25519_pk_to_curve25519(
  pub: Uint8Array
): Uint8Array {
  return _sodium.crypto_sign_ed25519_pk_to_curve25519(pub);
}
