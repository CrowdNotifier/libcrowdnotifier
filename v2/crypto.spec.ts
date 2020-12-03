import {randombytes_buf, crypto_hash_sha256} from "../lib/sodium";
import * as mcl from "../lib/mcl";

import {CrowdNotifierPrimitives, IBEPrimitives, Helpers, waitReady} from "./crypto";
import {Log} from "../lib/log";

/**
 * Very simple crypto test for the CrowdNotifierPrimitives using the new BNS scheme to avoid having to
 * print new QRcodes after every infection.
 *
 * To run it, write:
 *   npm ci
 *   npm run CrowdNotifierPrimitives
 */

const log = new Log("v2/crypto.spec");
log.info(`Starting at: ${new Date()}`);


function testIbePrimitives() {
    const id = new Uint8Array([1,2,3,4]);
    const msg = new Uint8Array([5,6,7,8,9,10,11,12,13,14,15,1,2,3,4]);
    
    log.info("Start test suite for identity-based encryption (IBE) primitives.");

    log.info("Keys generation");
    const [mpk, mskh, mskv] = IBEPrimitives.keyGen();
    const msk = mcl.add(mskh, mskv);

    log.info("Encrypt");
    const ctxt = IBEPrimitives.enc(mpk, id, msg);

    log.info("Derive key");
    const skid = IBEPrimitives.keyDer(msk, id);

    log.info("Decrypt");
    const msg_dec = IBEPrimitives.dec(id, skid, ctxt);

    log.reject(msg_dec, undefined, "Should be able to decrypt message!")

    log.assert(msg, msg_dec, "Original message and decrypted ciphertext should be equal!")

    log.info("All tests for IBE primitives passed!");
}


function testCrowdNotifierPrimitives() {
    log.info("Setting up backends");
    const HealthAuthority = CrowdNotifierPrimitives.setupHealthAuthority();
    const infoLocation1 = "FooBar:Lausanne:undefined";
    const location1 = CrowdNotifierPrimitives.genCode(infoLocation1, HealthAuthority.publicKey);
    const infoLocation2 = "BarMitzva:Lausanne:undefined";
    const location2 = CrowdNotifierPrimitives.genCode(infoLocation2, HealthAuthority.publicKey);

    log.info("Creating two users");
    const counter1 = 1000;
    const user1Aux = "secret date";
    const user1 = CrowdNotifierPrimitives.scan(location1.ent, location1.pEnt, infoLocation1, counter1, user1Aux);

    const counter2 = 1001;
    const user2Aux = "PARTY!";
    const user2 = CrowdNotifierPrimitives.scan(location2.ent, location2.pEnt, infoLocation2, counter2, user2Aux);

    log.info("Location 1 got infected during three hours - creating pre-traces");
    const [preTrace1_1, tr_proof1] = CrowdNotifierPrimitives.genPreTrace(location1.mtr, counter1-1);
    const [preTrace1_2, tr_proof2] = CrowdNotifierPrimitives.genPreTrace(location1.mtr, counter1);
    const [preTrace1_3, tr_proof3] = CrowdNotifierPrimitives.genPreTrace(location1.mtr, counter1+1);
    log.info("Creating traces from health authority")
    const trace1_1 = CrowdNotifierPrimitives.genTrace(HealthAuthority, preTrace1_1);
    const trace1_2 = CrowdNotifierPrimitives.genTrace(HealthAuthority, preTrace1_2);
    const trace1_3 = CrowdNotifierPrimitives.genTrace(HealthAuthority, preTrace1_3);
    if (trace1_1 === undefined || trace1_2 === undefined || trace1_3 === undefined){
        throw new Error("Couldn't create the traces");
    }

    log.info("Checking if user1 gets correctly notified");
    log.assert(CrowdNotifierPrimitives.match(user1, trace1_1), undefined, "Shouldn't match counter-1");
    log.assert(CrowdNotifierPrimitives.match(user1, trace1_2), user1Aux, "Should match counter");
    log.assert(CrowdNotifierPrimitives.match(user1, trace1_3), undefined, "Shouldn't match counter+1");

    log.info("Checking if user2 gets correctly NOT notified");
    log.assert(CrowdNotifierPrimitives.match(user2, trace1_1), undefined, "Shouldn't match user2");
    log.assert(CrowdNotifierPrimitives.match(user2, trace1_2), undefined, "Shouldn't match user2");
    log.assert(CrowdNotifierPrimitives.match(user2, trace1_3), undefined, "Shouldn't match user2");
}

// Benchmarks functions.

function statistics(arr) {
    // Q&D code found there: https://stackoverflow.com/questions/7343890/standard-deviation-javascript
    const n = arr.length
    const total = arr.reduce((a,b) => a + b)
    const mean = total / n
    const stddev = Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)

    log.info(`total time: ${total} ms`)
    log.info(`mean: ${mean} ms`)
    log.info(`stddev: ${stddev} ms`)
}

function benchmark_fancy_hash() {
    const nr_exp = 1000
    const info_len = 35
    const nonce_len = 32

    const infos = new Array(nr_exp)
    const nonces_1 = new Array(nr_exp)
    const nonces_2 = new Array(nr_exp)

    const times = new Array(nr_exp)

    let t0;
    let t1;
    let dt;

    log.info(`Start fancy hash benchmark with ${nr_exp} experiments.`)


    for (let i = 0; i < nr_exp; ++i) {
        infos[i] = randombytes_buf(info_len)
        nonces_1[i] = randombytes_buf(nonce_len)
        nonces_2[i] = randombytes_buf(nonce_len)
    }

    log.info("Fancy hash function.")

    for (let i = 0; i < nr_exp; ++i) {
        let info = infos[i]
        let nonce1 = nonces_1[i]
        let nonce2 = nonces_2[i]

        t0 = performance.now()

        let buf = new Uint8Array(info.length + nonce1.length)
        buf.set(nonce1)
        buf.set(info, nonce1.length)

        let h1 = crypto_hash_sha256(buf)

        let buf2 = new Uint8Array(h1.length + nonce2.length)
        buf2.set(h1)
        buf2.set(nonce2, h1.length)

        crypto_hash_sha256(buf2)

        t1 = performance.now()
        dt = t1 - t0
        times[i] = dt
    }

    statistics(times)
}

function benchmark_encryption_round() {
    const id_len = 32
    const msg_len = 32
    const nr_exp = 1000

    const ids = new Array(nr_exp)
    const msgs = new Array(nr_exp)
    const skids = new Array(nr_exp)

    const times = new Array(nr_exp)

    let t0;
    let t1;
    let dt;

    log.info(`Start benchmark for encryption round with ${nr_exp} experiments.`)

    const [mpk, msk] = IBEPrimitives.keyGen();

    for (let i = 0; i < nr_exp; ++i) {
        ids[i] = randombytes_buf(id_len)
        msgs[i] = randombytes_buf(msg_len)
        skids[i] = IBEPrimitives.keyDer(msk, ids[i]);
    }

    
    for (let i = 0; i < nr_exp; ++i) {
        let ctxt;
        const id = ids[i]
        t0 = performance.now()
        ctxt = IBEPrimitives.enc(mpk, id, msgs[i]);
        IBEPrimitives.dec(id, skids[i], ctxt);
        t1 = performance.now()
        dt = t1 - t0
        times[i] = dt
    }

    statistics(times)

}

function benchmark_bad_decrypt() {
    const id_len = 32
    const msg_len = 32
    const nr_exp = 1000

    const ids = new Array(nr_exp)
    const msgs = new Array(nr_exp)
    const skids = new Array(nr_exp)

    const times = new Array(nr_exp)

    let t0;
    let t1;
    let dt;

    log.info(`Start benchmark for bad decryption with ${nr_exp} experiments.`)

    const [mpk, msk] = IBEPrimitives.keyGen();
    const [mpk2, msk2] = IBEPrimitives.keyGen();

    for (let i = 0; i < nr_exp; ++i) {
        ids[i] = randombytes_buf(id_len)
        msgs[i] = randombytes_buf(msg_len)
        skids[i] = IBEPrimitives.keyDer(msk2, ids[i]);
    }

    
    for (let i = 0; i < nr_exp; ++i) {
        const id = ids[i]
        const ctxt = IBEPrimitives.enc(mpk, id, msgs[i]);
        t0 = performance.now()
        IBEPrimitives.dec(id, skids[i], ctxt);
        t1 = performance.now()
        dt = t1 - t0
        times[i] = dt
    }

    statistics(times)

}

function benchmark() {
    const id_len = 32
    const msg_len = 32
    const nr_exp = 1000

    const ids = new Array(nr_exp)
    const msgs = new Array(nr_exp)
    const ctxts = new Array(nr_exp)
    const skids = new Array(nr_exp)

    const g1s = new Array(nr_exp)
    const g2s = new Array(nr_exp)

    const t_pair = new Array(nr_exp)
    const t_kg = new Array(nr_exp)
    const t_enc = new Array(nr_exp)
    const t_kd = new Array(nr_exp)
    const t_dec = new Array(nr_exp)

    let t0;
    let t1;
    let dt;

    log.info(`Start benchmark with ${nr_exp} experiments.`)

    for (let i = 0; i < nr_exp; ++i) {
        ids[i] = randombytes_buf(id_len)
        msgs[i] = randombytes_buf(msg_len)

        const f1 = new mcl.Fr();
        f1.setByCSPRNG();
        const g1 = mcl.mul(Helpers.baseG1(), f1);
        g1s[i] = g1

        const f2 = new mcl.Fr();
        f2.setByCSPRNG();
        const g2 = mcl.mul(Helpers.baseG2(), f1);
        g2s[i] = g2
    }

    log.info("Pairing primitive.")

    for (let i = 0; i < nr_exp; ++i) {
        let g1 = g1s[i]
        let g2 = g2s[i]
        t0 = performance.now()
        mcl.pairing(g1, g2)
        t1 = performance.now()
        dt = t1 - t0
        t_pair[i] = dt
    }

    statistics(t_pair)


    log.info("Keys generation.")

    for (let i = 0; i < nr_exp; ++i) {
        t0 = performance.now()
        IBEPrimitives.keyGen()
        t1 = performance.now()
        dt = t1 - t0
        t_kg[i] = dt
    }

    statistics(t_kg)

    const [mpk, msk] = IBEPrimitives.keyGen();


    log.info("Encryption")
    
    for (let i = 0; i < nr_exp; ++i) {
        let ctxt;
        t0 = performance.now()
        ctxt = IBEPrimitives.enc(mpk, ids[i], msgs[i]);
        t1 = performance.now()
        dt = t1 - t0
        ctxts[i] = ctxt
        t_enc[i] = dt
    }

    statistics(t_enc)


    log.info("Key derivation")
    
    for (let i = 0; i < nr_exp; ++i) {
        let skid;
        t0 = performance.now()
        skid = IBEPrimitives.keyDer(msk, ids[i]);
        t1 = performance.now()
        dt = t1 - t0
        skids[i] = skid
        t_kd[i] = dt
    }

    statistics(t_kd)


    log.info("Decryption")
    
    for (let i = 0; i < nr_exp; ++i) {
        t0 = performance.now()
        IBEPrimitives.dec(ids[i], skids[i], ctxts[i]);
        t1 = performance.now()
        dt = t1 - t0
        t_dec[i] = dt
    }

    statistics(t_dec)

}


async function main(){
    await waitReady();

    log.info("Start test suite for crypto.")

    testIbePrimitives();
    testCrowdNotifierPrimitives()

    log.info("Crypto spec successfully finished!");
    
    log.info("Start benchmarks.")

    //benchmark()
    //benchmark_fancy_hash()
    //benchmark_encryption_round()
    //benchmark_bad_decrypt()

    log.info("Benchmarks finished.")

}

main().catch(e => {
    log.error(e);
});
