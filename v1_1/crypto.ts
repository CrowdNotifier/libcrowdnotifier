import {
    crypto_box_keypair,
    crypto_box_seal,
    crypto_box_seal_open,
    crypto_box_seed_keypair,
    crypto_hash_sha256,
    crypto_scalarmult,
    crypto_scalarmult_base,
    from_string,
    IKeyPair,
    randombytes_buf, compare,
    to_string,
    waitReady
} from "../lib/sodium";

export {waitReady}

export interface ILocationData {
    ent: Uint8Array;
    pEnt: Uint8Array;
    tr: tr;
    pTr: pTr;
}

export interface tr {
    sk: Uint8Array,
    r2: Uint8Array
}

export interface pTr {
    r1: Uint8Array,
    r2: Uint8Array
}

export interface IVisit {
    gR: Uint8Array;
    h: Uint8Array;
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

    static genCode(info: string): ILocationData {
        const r1 = randombytes_buf(32);
        const r2 = randombytes_buf(32);
        const seed = this.hashInfo(info, r1, r2);
        const keyPair = crypto_box_seed_keypair(seed);
        return {
            ent: keyPair.publicKey,
            pEnt: r1,
            tr: {sk: keyPair.privateKey, r2},
            pTr: {r1, r2}
        };
    }

    static scan(ent: Uint8Array, pEnt: Uint8Array, info: string, diary = false): IVisit {
        const pk = ent;
        const r1 = pEnt;
        const r = randombytes_buf(32);
        const gR = crypto_scalarmult_base(r);
        const h = crypto_scalarmult(r, pk);
        const infoBuf = from_string(info);
        const t = crypto_hash_sha256(Uint8Array.from([...infoBuf, ...r1]))
        const aux = from_string(diary ? info : "unknown");
        const c = crypto_box_seal(Uint8Array.from([...t, ...aux]), pk)
        return {gR, h, c};
    }

    static verifyTrace(info: string, tr: tr, pTr: pTr): boolean {
        const {sk, r2: r2P} = tr;
        const {r1, r2} = pTr;
        if (compare(r2, r2P) !== 0){
            return false;
        }
        const keyPair = crypto_box_seed_keypair(this.hashInfo(info, r1, r2));
        return compare(sk, keyPair.privateKey) === 0;
    }

    static match(rec: IVisit, tr: tr): (undefined | string) {
        const {sk, r2} = tr;
        const {gR: epk, h, c} = rec;
        if (compare(crypto_scalarmult(sk, epk), h) !== 0){
            return undefined;
        }
        const tAux = crypto_box_seal_open(c, crypto_scalarmult_base(sk), sk)
        const t = tAux.slice(0, 32);
        const aux = tAux.slice(32);
        const skP = crypto_hash_sha256(Uint8Array.from([...t, ...r2]));
        if (compare(sk, skP) !== 0){
            return undefined;
        }
        return to_string(aux);
    }

    static hashInfo(info: string, r1: Uint8Array, r2: Uint8Array): Uint8Array{
        const infoBuf = from_string(info)
        const h1 = crypto_hash_sha256(Uint8Array.from([...infoBuf, ...r1]))
        return crypto_hash_sha256(Uint8Array.from([...h1, ...r2]));
    }
}
