import {
    compare,
    crypto_box_keypair,
    crypto_box_seal,
    crypto_box_seal_open,
    IKeyPair,
    randombytes_buf
} from "../lib/sodium";
import {IEncryptedData ,IBEPrimitives, NONCE_LENGTH, Helpers} from "./crypto";
import * as mcl from "../lib/mcl";


export interface IMasterTrace {
    mpk: mcl.G2;
    mskl: mcl.Fr;
    info: Uint8Array;
    nonce1: Uint8Array;
    nonce2: Uint8Array;
    ctxtha: Uint8Array;
}

export interface IEntProof {
    nonce1: Uint8Array;
    nonce2: Uint8Array;
}

export interface ILocationData {
    ent: mcl.G2;
    piEnt: IEntProof;
    mtr: IMasterTrace;
}

export interface IPreTrace {
    id: Uint8Array;
    ctxtha: Uint8Array;
    pskidl: mcl.G1;
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


/**
 * Implements the cryptographic protocol in section 4.2 of the CrowdNotifier whitepaper.
 */
export class CrowdNotifierPrimitives {

    /**
     * Generate key pair for health authority.
     */
    static setupHA(): IKeyPair {
        return crypto_box_keypair();
    }


    /**
     * Creates the data necessary for a location owner.
     * @param pkh public key of the health authority
     * @param info public info of the location, e.g., name:location:room
     * @return the LocationData to be printed in multiple QR codes
     */
    static genCode(pkh: Uint8Array, info: Uint8Array): ILocationData {
        const [mpkl, mskl] = IBEPrimitives.keyGen();
        const [mpkha, mskha] = IBEPrimitives.keyGen();
        const mpk = mcl.add(mpkl, mpkha);
        const nonce1 = randombytes_buf(NONCE_LENGTH);
        const nonce2 = randombytes_buf(NONCE_LENGTH);

        const ctxtha = crypto_box_seal(mskha.serialize(), pkh);

        const piEnt = {nonce1, nonce2};
        const mtr = {mpk, mskl, ctxtha, info, nonce1, nonce2};

        return {ent: mpk, piEnt, mtr};
    }


    /**
     * Creates a private record for the user to store in her phone.
     * @param ent as presented in the QRentry
     * @param piEnt as presented in the QRentry
     * @param info as presented in the QRentry
     * @param cnt count of hours since UNIX epoch
     * @param aux free data
     * @return user record to be stored
     */
    static scan(ent: mcl.G2, piEnt: IEntProof, info: Uint8Array, cnt: number, aux: Uint8Array): IEncryptedData {
        const mpk = ent;
        const {nonce1, nonce2} = piEnt;
        const id = Helpers.genId(info, cnt, nonce1, nonce2);
        return IBEPrimitives.enc(mpk, id, aux);
    }


    /**
     * Generates an anonymous trace prior that can only be used by people having scanned the QRentry code.
     * @param mtr master trace
     * @param cnt count of hours since UNIX epoch
     * @returns tracing information prior and proof of tracing information
     */
    static genPreTrace(mtr: IMasterTrace, cnt: number): [IPreTrace, ITraceProof] {
        const id = Helpers.genId(mtr.info, cnt, mtr.nonce1, mtr.nonce2);
        const pskidl = IBEPrimitives.keyDer(mtr.mskl, id);

        const ptr = {id, pskidl, ctxtha: mtr.ctxtha};
        const piTr = {
            mpk: mtr.mpk,
            nonce1: mtr.nonce1,
            nonce2: mtr.nonce2
        };

        return [ptr, piTr];
    }


    /**
     * Generates an anonymous trace that can only be used by people having scanned the QRentry code.
     * @param keys_ha key pair of health authority
     * @param ptr tracing information prior
     * @return trace information or undefined if we fail to decrypted the pretrace data
     */
    static genTrace(keys_ha: IKeyPair, ptr: IPreTrace): ITrace {
        const mskh = new mcl.Fr();
        try {
            // libsodium requires both private and public key to decrypt ctxtha.
            const mskh_raw = crypto_box_seal_open(ptr.ctxtha, keys_ha.publicKey, keys_ha.privateKey);
            mskh.deserialize(mskh_raw);
        } catch (e) {
            return undefined;
        }
        const pskidha = IBEPrimitives.keyDer(mskh, ptr.id);

        const skid = mcl.add(ptr.pskidl, pskidha);

        return {id: ptr.id, skid};
    }


    /**
     * Verify that a trace is valid.
     * @param info as presented in the QRentry
     * @param cnt count of hours since UNIX epoch
     * @param tr trace information
     * @param pTr proof of the trace information
     */
    static verifyTrace(info: Uint8Array, cnt: number, tr: ITrace, piTr: ITraceProof): boolean {
        const id = Helpers.genId(info, cnt, piTr.nonce1, piTr.nonce2);

        if (compare(id, tr.id) !== 0) {
            return false;
        }

        const msg_orig = randombytes_buf(NONCE_LENGTH);
        const msg_enc = IBEPrimitives.enc(piTr.mpk, id, msg_orig);
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
    static match(rec: IEncryptedData, tr: ITrace): (Uint8Array|undefined) {
        return IBEPrimitives.dec(tr.id, tr.skid, rec);
    }
}
