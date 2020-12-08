import {
    crypto_hash_sha256,
    crypto_secretbox_easy,
    crypto_secretbox_open_easy,
    randombytes_buf,
    secretbox_nonce,
    waitReady as sodiumWaitReady
} from "../lib/sodium";
import * as mcl from "../lib/mcl";
import {
    IBEEncInternal,
    IBEIdInternal1,
    IBEIdInternal2
} from "./proto";


// The security parameter l is 128 bits,
// so the nonce length will be 2l == 256bits == 32 bytes.
export const NONCE_LENGTH = 32;


export async function waitReady() {
    await mcl.waitReady();
    await sodiumWaitReady();
}


export interface IEncryptedData {
    c1: mcl.G2;
    c2: Uint8Array,
    c3: Uint8Array,
    nonce: Uint8Array
}


/**
 * Cryptographic primitives used in the identity-based encryption (IBE) scheme.
 */
export class IBEPrimitives {

    /**
     * Hash a message to an element of G1 in a cryptographically secure manner.
     * @param msg message to hash
     * @returns hash of the message
     */
    private static h1(msg: Uint8Array): mcl.G1 {
        return mcl.hashAndMapToG1(msg);
    }


    /**
     * Hash an element of GT to a cryptographically secure hash.
     * @param gt_elem element of GT
     * @returns hash of the element of GT
     */
    private static ht(gt_elem: mcl.GT): Uint8Array {
        return crypto_hash_sha256(gt_elem.serialize());
    }


    /**
     * Hash a message, an identifier and a nonce to a cryptographically secure hash.
     * @param x nonce
     * @param m message
     * @param id identifier
     * @returns hash of the values
     */
    private static h3(x: Uint8Array, m: Uint8Array, id: Uint8Array): Uint8Array {
        const to_hash = IBEEncInternal.encode(
            IBEEncInternal.create({x, m, id})
        ).finish();
        return crypto_hash_sha256(to_hash);
    }


    private static h4 = crypto_hash_sha256;


    /**
     * Generate a pair of public and private keys.
     * @returns a tuple containing the master public key and the master secret key
     */
    static keyGen(): [mcl.G2, mcl.Fr] {
        const msk = new mcl.Fr();
        msk.setByCSPRNG();

        const mpk = mcl.mul(Helpers.baseG2(), msk);

        return [mpk, msk];
    }


    /**
     * Key derivation function.
     * @param msk master secret key
     * @param id identifier
     * @returns a key derived for the identifier
     */
    static keyDer(msk: mcl.Fr, id: Uint8Array): mcl.G1 {
        return mcl.mul(this.h1(id), msk);
    }


    /**
     * Encrypt a message
     * @param mpk master public key
     * @param id identifier
     * @param m message
     * @returns the encrypted message
     */
    static enc(mpk: mcl.G2, id: Uint8Array, m: Uint8Array): IEncryptedData {
        const x = randombytes_buf(NONCE_LENGTH);

        const r_raw = this.h3(x, m, id);

        const r = new mcl.Fr();
        r.setLittleEndianMod(r_raw);

        const c1: mcl.G2 = mcl.mul(Helpers.baseG2(), r);

        const c2_pair = this.ht(mcl.pow(mcl.pairing(this.h1(id), mpk), r));
        const c2 = Helpers.xor(x, c2_pair);

        const nonce = secretbox_nonce();

        const c3 = crypto_secretbox_easy(m, nonce, this.h4(x));

        return {c1, c2, c3, nonce};
    }


    /**
     * Decrypt a message.
     * @param id identifier
     * @param skid key derived for the identifier
     * @param ctxt encrypted message
     * @returns the decrypted message or undefined if we fails to decrypt the ciphertext, or if the validation fails
     */
    static dec(id: Uint8Array, skid: mcl.G1, ctxt: IEncryptedData): Uint8Array|undefined {

        const {c1,c2,c3,nonce} = ctxt;

        const x_p = Helpers.xor(c2, this.ht(mcl.pairing(skid, c1)));

        let msg_p;

        try {
            msg_p = crypto_secretbox_open_easy(c3, nonce, this.h4(x_p));
        } catch(e) {
            return undefined;
        }

        // Additional verification.

        const r_raw = this.h3(x_p, msg_p, id);

        const r_p = new mcl.Fr();
        r_p.setLittleEndianMod(r_raw);

        const c1_p = mcl.mul(Helpers.baseG2(), r_p);

        if (!c1.isEqual(c1_p)) {
            return undefined;
        }

        // Check that skid is in G1*
        if (!skid.isValidOrder() || skid.isZero()) {
            return undefined;
        }

        return msg_p;
    }
}

/**
 * New methods and definitions
 */
export class Helpers {
    // from https://github.com/zcash/librustzcash/blob/6e0364cd42a2b3d2b958a54771ef51a8db79dd29/pairing/src/bls12_381/README.md#generators
    static baseG1(): mcl.G1 {
        const base = new mcl.G1();
        base.mclG1.setStr("1 3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507 1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569");
        return base;
    }


    // from https://github.com/zcash/librustzcash/blob/6e0364cd42a2b3d2b958a54771ef51a8db79dd29/pairing/src/bls12_381/README.md#generators
    static baseG2(): mcl.G2 {
        const base = new mcl.G2();
        base.mclG2.setStr("1 352701069587466618187139116011060144890029952792775240219908644239793785735715026873347600343865175952761926303160 3059144344244213709971259814753781636986470325476647558659373206291635324768958432433509563104347017837885763365758 1985150602287291935568054521177171638300868978215655730859378665066344726373823718423869104263333984641494340347905 927553665492332455747201965776037880757740193453592970025027978793976877002675564980949289727957565575433344219582");
        return base;
    }


    static hashT(gt: mcl.GT): Uint8Array {
        return crypto_hash_sha256(gt.serialize());
    }


    static xor(a: Uint8Array, b: Uint8Array): Uint8Array {
        if (a.length !== b.length) {
            throw new Error("cannot xor two Uint8Arrays of different length");
        }
        const c = new Uint8Array(a.length);
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i]^b[i];
        }
        return c;
    }


    /**
     * Generate an identifier.
     * @param info public information
     * @param cnt counter
     * @param nonce1 a nonce
     * @param nonce2 an other nonce
     * @returns an identifier
     */
    static genId(info: Uint8Array, cnt: number, nonce1: Uint8Array, nonce2: Uint8Array): Uint8Array {
        const hash1 = crypto_hash_sha256(
            IBEIdInternal1.encode(
                IBEIdInternal1.create({info, nonce: nonce1})
            ).finish()
        );

        const id = crypto_hash_sha256(
            IBEIdInternal2.encode(
                IBEIdInternal2.create({hash: hash1, cnt, nonce: nonce2})
            ).finish()
        );

        return id;
    }
}
