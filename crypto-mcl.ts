import {
    waitReady as sodiumWaitReady,
    crypto_box_keypair,
    crypto_box_seal,
    crypto_box_seal_open,
    crypto_scalarmult_base,
    crypto_secretbox_keygen,
    from_string,
    IKeyPair,
    randombytes_buf,
    to_base64,
    to_string, crypto_secretbox_easy, crypto_secretbox_open_easy, secretbox_nonce
} from "./sodium";
import * as mcl from "./mcl";

export async function waitReady(){
    await mcl.waitReady();
    await sodiumWaitReady();
}

interface IUserRecord {
    R1: mcl.G2
    Z1: mcl.GT
    R2: mcl.G2
    K: Uint8Array
    c: Uint8Array
    nonce: Uint8Array
}

interface IMasterTrace{
    mskv: mcl.Fr;
    info: string;
    nonce: Uint8Array;
    mskHAEnc: Uint8Array;
}

interface ILocationData {
    // entry information
    ent: mcl.G2;
    // proof for the entry information
    pEnt: Uint8Array;
    // master tracing information for the QRtrace)
    mtr: IMasterTrace;
}

interface IPreTrace{
    Tprime: mcl.G1
    info: string
    nonce: Uint8Array
    ctxt: Uint8Array
}

export class Section7{
    /**
     * Setup for the HealthAuthority - returns a keypair that can be used to encrypt the QRtrack codes.
     */
    static setupHA(): IKeyPair{
        return crypto_box_keypair();
    }

    /**
     * Creates the data necessary for a location owner.
     * @param info is the public info of the location, e.g., name:location:room
     * @param pkH the public key of the health authority
     * @return the LocationData to be printed in 2 (3?) QRcodes
     */
    static genCode(info: string, pkH: Uint8Array): ILocationData{
        const mskv = new mcl.Fr();
        mskv.setByCSPRNG();
        const mskHA = new mcl.Fr();
        mskHA.setByCSPRNG();
        const msk = mcl.add(mskv, mskHA);
        const mpk = mcl.mul(mcl.baseG2(), msk);
        const nonce = randombytes_buf(msk.serialize().byteLength * 2);
        const mskHAEnc = crypto_box_seal(mskHA.serialize(), pkH);
        const mtr = {mskv, info, nonce, mskHAEnc}
        return {ent: mpk, pEnt: nonce, mtr};
    }

    /**
     * Creates a private record for the user to store in her phone.
     * @param entry as presented in the QRentry
     * @param proofEntry as presented in the QRentry
     * @param info as presented in the QRentry
     * @param counter as hours since the unix epoch
     * @param aux free string
     * @return user record to be stored
     */
    static scan(entry: mcl.G2, proofEntry: Uint8Array, info: string, counter: number, aux: string): IUserRecord{
        const r1 = new mcl.Fr();
        r1.setByCSPRNG();
        const r2 = new mcl.Fr();
        r2.setByCSPRNG();
        const k = crypto_secretbox_keygen();
        const nonce = secretbox_nonce();
        const c = crypto_secretbox_easy(from_string(aux), nonce, k);

        const R1 = mcl.mul(mcl.baseG2(), r1);
        const H1inc = this.infoNonceCounter(info, proofEntry, counter);
        const Z1 = mcl.pairing(mcl.mul(H1inc, r1), entry);
        const R2 = mcl.mul(mcl.baseG2(), r2);
        const Z2 = mcl.pairing(mcl.mul(H1inc, r2), entry);
        const K = mcl.xor(k, mcl.hashT(Z2));

        return {R1, Z1, R2, K, c, nonce};
    }

    /**
     * Convenience method to calculate the hash-to-G1 of the info, nonce, and counter.
     * @param info
     * @param nonce
     * @param counter
     */
    static infoNonceCounter(info: string, nonce: Uint8Array, counter: number): mcl.G1 {
        const counterStr = counter.toString();
        const infoNonceCnt = new Uint8Array(info.length + nonce.length + counterStr.length);
        infoNonceCnt.set(from_string(info));
        infoNonceCnt.set(nonce, info.length);
        infoNonceCnt.set(from_string(counterStr), info.length + nonce.length);
        return mcl.hashAndMapToG1(infoNonceCnt);
    }

    /**
     * Generates a pre-trace by the location owner, one for every slot of possible infection.
     * @param mtr master trace record from the location
     * @param cnt hours since the unix epoch
     * @return an IPreTrace for the health authority
     */
    static genPreTrace(mtr: IMasterTrace, cnt: number): IPreTrace{
        const {info, nonce, mskv, mskHAEnc: ctxt} = mtr;
        const Tprime = mcl.mul(this.infoNonceCounter(info, nonce, cnt), mskv);
        return {Tprime, info, nonce, ctxt};
    }

    /**
     * Generates an anonymous trace that can only be used by people having scanned the QRentry code
     * @param skH the health authorities private key
     * @param cnt hours since the unix epoch
     * @param ptr from genPreTrace
     * @param proofPTR is ignored for the moment
     * @return tracing information to be stored
     */
    static genTrace(skH: Uint8Array, cnt: number, ptr: IPreTrace, proofPTR?: Uint8Array): mcl.G1{
        const {Tprime, info, nonce, ctxt} = ptr;
        const mskHA = new mcl.Fr();
        const pkH = crypto_scalarmult_base(skH)
        mskHA.deserialize(crypto_box_seal_open(ctxt, pkH, skH));
        const B = this.infoNonceCounter(info, nonce, cnt);
        return mcl.add(Tprime, mcl.mul(B, mskHA));
    }

    /**
     * Tries to match a user record against a trace.
     * @param rec one of the user records created by scan
     * @param tr one of the traces received by the health authority
     * @return the aux string (if empty will be "") or undefined if no match occurred
     */
    static match(rec: IUserRecord, tr: mcl.G1): (string|undefined){
        const Z1prime = mcl.pairing(tr, rec.R1);
        if (!Z1prime.isEqual(rec.Z1)){
            return undefined;
        }
        try {
            const k = mcl.xor(rec.K, mcl.hashT(mcl.pairing(tr, rec.R2)));
            const aux = crypto_secretbox_open_easy(rec.c, rec.nonce, k);
            return to_string(aux);
        } catch(e){
            console.log("couldn't decrypt: " + e);
            return undefined;
        }
    }
}
