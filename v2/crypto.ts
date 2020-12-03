import {
    compare,
    crypto_box_keypair,
    crypto_box_seal,
    crypto_box_seal_open,
    crypto_hash_sha256,
    crypto_secretbox_easy,
    crypto_secretbox_open_easy,
    IKeyPair,
    randombytes_buf,
    secretbox_nonce,
    waitReady as sodiumWaitReady
} from "../lib/sodium";
import * as mcl from "../lib/mcl";
import {
    IBEIdInternal1,
    IBEIdInternal2,
    IBEEncInternal
} from "./proto";

// security of 128 bits = 16 bytes
const SECURITY_PARAMETER = 16;

export async function waitReady() {
    await mcl.waitReady();
    await sodiumWaitReady();
}

/**
 * This is the secret information of the location.
 */
export interface IMasterTrace {
    mpk: mcl.G2;
    mskv: mcl.Fr;
    mskhEnc: Uint8Array;
    info: string;
    nonce1: Uint8Array;
    nonce2: Uint8Array;
}

export interface IEntProof {
    nonce1: Uint8Array;
    nonce2: Uint8Array;
}

export interface ILocationData {
    ent: mcl.G2;
    pEnt: IEntProof;
    mtr: IMasterTrace;
}

export interface IPreTrace {
    id: Uint8Array;
    mskhEnc: Uint8Array;
    preskid: mcl.G1;
}

export interface ITraceProof {
    mpk: mcl.G2;
    nonce1: Uint8Array;
    nonce2: Uint8Array;
}

export interface ITrace {
    id: Uint8Array;
    skid: mcl.G1;
}

export interface IEncryptedData {
    c1: mcl.G2;
    c2: Uint8Array,
    c3: Uint8Array,
    nonce: Uint8Array
}

/**
 * Implements the cryptographic protocol in section 4.2 of the CrowdNotifier whitepaper.
 */
export class CrowdNotifierPrimitives {
    
    /**
     * Generate key pair for health authority.
     */
    static setupHealthAuthority(): IKeyPair {
        return crypto_box_keypair();
    }
    

    /**
     * Creates the data necessary for a location owner.
     * @param info public info of the location, e.g., name:location:room
     * @param pkha public key of the health authority 
     * @return the LocationData to be printed in multiple QR codes
     */
    static genCode(info: string, pkha: Uint8Array): ILocationData {
        const [mpk, mskh, mskv] = IBEPrimitives.keyGen();
        const nonce_len = 2 * SECURITY_PARAMETER
        const nonce1 = randombytes_buf(nonce_len);
        const nonce2 = randombytes_buf(nonce_len);
        const mskhEnc = crypto_box_seal(mskh.serialize(), pkha);
        const pEnt = {
            nonce1: nonce1,
            nonce2: nonce2
        };

        const mtr = {
            mpk: mpk,
            mskv: mskv,
            mskhEnc: mskhEnc,
            info: info,
            nonce1: nonce1,
            nonce2: nonce2
        };

        return {
            ent: mpk,
            pEnt: pEnt,
            mtr: mtr
        }   
    }
    

    /**
     * Creates a private record for the user to store in her phone.
     * @param ent as presented in the QRentry
     * @param pEnt as presented in the QRentry
     * @param info as presented in the QRentry
     * @param cnt count of hours since UNIX epoch
     * @param aux free data
     * @return user record to be stored
     */
    static scan(ent: mcl.G2, pEnt: IEntProof, info: string, cnt: number, aux: string): IEncryptedData {
        const aux_u = new TextEncoder().encode(aux);
        const id = IBEPrimitives.genId(info, cnt, pEnt.nonce1, pEnt.nonce2);
        return IBEPrimitives.enc(ent, id, aux_u);
    }


    /**
     * Generates an anonymous trace that can only be used by people having scanned the QRentry code.
     * @param mtr Location owner information
     * @param cnt count of hours since UNIX epoch
     * @return tracing information to be stored
     */
    /*
    static genTraceOld(mtr: IMasterTrace, cnt: number): [ITrace, ITraceProof] {
        const id = IBEPrimitives.genId(mtr.info, cnt, mtr.nonce1, mtr.nonce2);
        const skid = IBEPrimitives.keyDer(mtr.msk, id);
        const tr = {
            id: id,
            skid: skid
        };
        const tr_proof = {
            mpk: mtr.mpk,
            nonce1: mtr.nonce1,
            nonce2: mtr.nonce2
        };
        
        return [tr, tr_proof];
    }
    */


    /**
     * Generates an anonymous trace prior that can only be used by people having scanned the QRentry code.
     * @param mtr master trace
     * @param cnt count of hours since UNIX epoch
     * @returns tracing information prior and proof of tracing information
     */
    static genPreTrace(mtr: IMasterTrace, cnt: number): [IPreTrace, ITraceProof] {
        const id = IBEPrimitives.genId(mtr.info, cnt, mtr.nonce1, mtr.nonce2);
        const preskid = IBEPrimitives.keyDer(mtr.mskv, id);
        const pre_trace = {
            id: id,
            mskhEnc: mtr.mskhEnc,
            preskid: preskid
        };
        const tr_proof = {
            mpk: mtr.mpk,
            nonce1: mtr.nonce1,
            nonce2: mtr.nonce2
        };

        return [pre_trace, tr_proof];
    }

    /**
     * Generates an anonymous trace that can only be used by people having scanned the QRentry code.
     * @param keys_ha key pair of health authority
     * @param pre_trace tracing information prior
     * @return trace information or undefined if we fail to decrypted the pretrace data
     */
    static genTrace(keys_ha: IKeyPair, pre_trace: IPreTrace): ITrace {
        const mskh = new mcl.Fr()
        try {
            const mskh_raw = crypto_box_seal_open(pre_trace.mskhEnc, keys_ha.publicKey, keys_ha.privateKey);
            mskh.deserialize(mskh_raw);
        }
        catch (e) {
            return undefined;
        }
        const preskid = IBEPrimitives.keyDer(mskh, pre_trace.id);

        const skid = mcl.add(pre_trace.preskid, preskid)

        const trace = {
            id: pre_trace.id,
            skid: skid
        };
        
        return trace;
    }
    
    /**
     * Verify that a trace is valid.
     * @param info as presented in the QRentry
     * @param cnt count of hours since UNIX epoch
     * @param tr trace information
     * @param pTr proof of the trace information
     */
    static verifyTrace(info: string, cnt: number, tr: ITrace, pTr: ITraceProof): boolean {
        const id = IBEPrimitives.genId(info, cnt, pTr.nonce1, pTr.nonce2);
        
        if (compare(id, tr.id) !== 0) {
            return false;
        }
        
        const msg_orig = randombytes_buf(2*SECURITY_PARAMETER);
        const msg_enc = IBEPrimitives.enc(pTr.mpk, id, msg_orig);
        const msg_dec = IBEPrimitives.dec(id, tr.skid, msg_enc);
        
        if (compare(msg_orig, msg_dec) !== 0) {
            return false;
        }
        
        return true;
    }


    /**
     * Tries to match a user record against a trace.
     * @param rec one of the user records created by scan
     * @param tr one of the traces received by the health authority
     * @return the data encrypted during the scan if the record match the trace or undefined otherwise
     */
    static match(rec: IEncryptedData, tr: ITrace): (string|undefined) {
        const rec_u = IBEPrimitives.dec(tr.id, tr.skid, rec);
        if (rec_u === undefined) {
            return undefined;
        } 
        return new TextDecoder().decode(rec_u);
    }
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
     * @param msg message
     * @param id identifier
     * @returns hash of the values
     */
    private static h3(x: Uint8Array, msg: Uint8Array, id: Uint8Array): Uint8Array {
        const to_hash = IBEEncInternal.encode(
            IBEEncInternal.create({
                x: x,
                msg: msg,
                id: id
            })
        ).finish();
        return crypto_hash_sha256(to_hash);
    }


    private static h4 = crypto_hash_sha256;


    /**
     * Generate a pair of public and private keys.
     * @returns a tuple containing the master public key and the master secret key 
     */
    static keyGen(): [mcl.G2, mcl.Fr, mcl.Fr] {
        const mskh = new mcl.Fr();
        mskh.setByCSPRNG();

        const mskv = new mcl.Fr();
        mskv.setByCSPRNG();

        const msk = mcl.add(mskh, mskv);

        const mpk = mcl.mul(Helpers.baseG2(), msk);

        return [mpk, mskh, mskv];
    }


    /**
     * Generate an identifier.
     * @param info public information
     * @param cnt counter
     * @param nonce1 a nonce
     * @param nonce2 an other nonce
     * @returns an identifier
     */
    static genId(info: string, cnt: number, nonce1: Uint8Array, nonce2: Uint8Array): Uint8Array {
        
        //id = H(H(info || nonce1) || cnt || nonce2)

        const hash1 = crypto_hash_sha256(
            IBEIdInternal1.encode(
                IBEIdInternal1.create({
                    info: info,
                    nonce: nonce1
                })
            ).finish()
        );

        const id = crypto_hash_sha256(
            IBEIdInternal2.encode(
                IBEIdInternal2.create({
                    hash: hash1,
                    cnt: cnt,
                    nonce: nonce2
                })
            ).finish()
        );

        return id;
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
     * @param msg message
     * @returns the encrypted message
     */
    static enc(mpk: mcl.G2, id: Uint8Array, msg: Uint8Array): IEncryptedData {
        const x = randombytes_buf(32)

        const r_raw = this.h3(x, msg, id);

        const r = new mcl.Fr();
        r.setFromArray(r_raw);

        const c1: mcl.G2 = mcl.mul(Helpers.baseG2(), r);

        const c2_pair = this.ht(mcl.mul(mcl.pairing(this.h1(id), mpk), r));
        const c2 = Helpers.xor(x, c2_pair)

        const nonce = secretbox_nonce();

        const c3 = crypto_secretbox_easy(msg, nonce, this.h4(x));

        return {
            c1: c1,
            c2: c2,
            c3: c3,
            nonce: nonce
        };
    }


    /**
     * Decrypt a message.
     * @param id identifier
     * @param skid key derived for the identifier
     * @param ctxt encrypted message
     * @returns the decrypted message or undefined if we fails to decrypt the ciphertext, or if the validation fails
     */
    static dec(id: Uint8Array, skid: mcl.G1, ctxt: IEncryptedData): Uint8Array|undefined {    
    
        // Extract info from context.
        // const ctxt_proto = IBEEncryptedData.decode(ctxt);
        // const c1 = new mcl.G2();
        // c1.deserialize(ctxt_proto.c1)
        // const c2 = ctxt_proto.c2
        // const c3 = ctxt_proto.c3
        // const nonce = ctxt_proto.nonce
        const {c1,c2,c3,nonce} = ctxt;

        // TODO: Check that skid is in G1*

        const x_p = Helpers.xor(c2, this.ht(mcl.pairing(skid, c1)));

        let msg_p;

        try {
            msg_p = crypto_secretbox_open_easy(c3, nonce, this.h4(x_p));
        }
        catch(e) {
            return undefined;
        }

        // Additional verification.

        const r_raw = this.h3(x_p, msg_p, id);

        const r_p = new mcl.Fr();
        r_p.setFromArray(r_raw);

        const c1_p = mcl.mul(Helpers.baseG2(), r_p);

        if (c1.isEqual(c1_p)) {
            return msg_p;
        }

        return undefined;
    }
}

/**
 * New methods and definitions
 */
export class Helpers {
    // from https://github.com/zcash/librustzcash/blob/6e0364cd42a2b3d2b958a54771ef51a8db79dd29/pairing/src/bls12_381/README.md#generators
    static baseG1(): mcl.G1 {
        const base = new mcl.G1();
        base.mclG1.setStr('1 3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507 1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569')
        return base;
    }

    // from https://github.com/zcash/librustzcash/blob/6e0364cd42a2b3d2b958a54771ef51a8db79dd29/pairing/src/bls12_381/README.md#generators
    static baseG2(): mcl.G2 {
        const base = new mcl.G2();
        base.mclG2.setStr('1 352701069587466618187139116011060144890029952792775240219908644239793785735715026873347600343865175952761926303160 3059144344244213709971259814753781636986470325476647558659373206291635324768958432433509563104347017837885763365758 1985150602287291935568054521177171638300868978215655730859378665066344726373823718423869104263333984641494340347905 927553665492332455747201965776037880757740193453592970025027978793976877002675564980949289727957565575433344219582')
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
}
