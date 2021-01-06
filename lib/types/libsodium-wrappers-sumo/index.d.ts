declare module "libsodium-wrappers-sumo" {
    /**
     * Constants
     */

    export const crypto_secretbox_NONCEBYTES: number;

    /**
     * Helper methods
     */

    export function ready(): Promise<undefined>;

    export function randombytes_buf(len: number): Uint8Array;

    export function to_base64(bin: Uint8Array): string;

    export function from_base64(str: string): Uint8Array;

    export function from_string(str: string): Uint8Array;

    export function to_string(buf: Uint8Array): string;

    export interface IKeyPair {
        keyType: string;
        privateKey: Uint8Array;
        publicKey: Uint8Array;
    }

    /**
     * crypto_* methods
     */


    export function crypto_box_keypair(): IKeyPair;

    export function crypto_secretbox_keygen(): Uint8Array;

    export function crypto_secretbox_easy(msg: Uint8Array, nonce: Uint8Array, key: Uint8Array): Uint8Array;

    export function crypto_secretbox_open_easy(cipher: Uint8Array, nonce: Uint8Array, key: Uint8Array): Uint8Array;

    export function crypto_hash_sha256(msg: Uint8Array): Uint8Array;

    export function crypto_sign_ed25519_keypair(): IKeyPair;

    export function crypto_sign_keypair(): IKeyPair;

    export function crypto_sign_seed_keypair(seed: Uint8Array): IKeyPair;

    export function crypto_sign_ed25519_sk_to_curve25519(
        secret: Uint8Array
    ): Uint8Array;

    export function crypto_box_seal(
        msg: Uint8Array,
        pubKey: Uint8Array
    ): Uint8Array;

    export function crypto_box_seal_open(
        cipher: Uint8Array,
        pubKey: Uint8Array,
        privKey: Uint8Array
    ): Uint8Array;

    export function crypto_box_seed_keypair(seed: Uint8Array): IKeyPair;

    export function crypto_sign_detached(
        msg: Uint8Array,
        privKey: Uint8Array
    ): Uint8Array;

    export function crypto_sign_verify_detached(
        sig: Uint8Array,
        msg: Uint8Array,
        pubKey: Uint8Array
    ): boolean;

    export function crypto_scalarmult(
        scalar: Uint8Array,
        point: Uint8Array
    ): Uint8Array;

    export function crypto_scalarmult_base(scalar: Uint8Array): Uint8Array;

    export function crypto_sign_ed25519_pk_to_curve25519(
        pub: Uint8Array
    ): Uint8Array;

    export function compare(a: Uint8Array, b: Uint8Array): number;
}
