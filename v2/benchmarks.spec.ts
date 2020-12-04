import {performance} from "perf_hooks";

import {randombytes_buf, crypto_hash_sha256} from "../lib/sodium";
import * as mcl from "../lib/mcl";

import {IBEPrimitives, Helpers, waitReady} from "./crypto";
import {Log} from "../lib/log";

const log = new Log("v2/benchmarks.spec");
log.info(`Starting at: ${new Date()}`);


// Benchmarks functions.

/**
 * Compute and display statistics about measurements.
 * @param arr array of measured times for which we want to compute statistics
 */
function statistics(arr) {
    // Q&D code inspired from there: https://stackoverflow.com/questions/7343890/standard-deviation-javascript
    const n = arr.length;
    const total = arr.reduce((a,b) => a + b);
    const mean = total / n;
    const stddev = Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);

    log.info(`total time: ${total} ms`);
    log.info(`mean: ${mean} ms`);
    log.info(`stddev: ${stddev} ms`);
}


/**
 * Benchmark performances of H(H(nonce1 || info) || nonce2)
 */
function benchmark_fancy_hash() {
    const info_len = 35;
    const nonce_len = 32;
    const nr_exp = 1000;

    const infos = new Array(nr_exp);
    const nonces_1 = new Array(nr_exp);
    const nonces_2 = new Array(nr_exp);

    const times = new Array(nr_exp);

    log.info(`Start fancy hash benchmark with ${nr_exp} experiments.`);

    for (let i = 0; i < nr_exp; ++i) {
        infos[i] = randombytes_buf(info_len);
        nonces_1[i] = randombytes_buf(nonce_len);
        nonces_2[i] = randombytes_buf(nonce_len);
    }

    log.info("Fancy hash function.");

    for (let i = 0; i < nr_exp; ++i) {
        const info = infos[i];
        const nonce1 = nonces_1[i];
        const nonce2 = nonces_2[i];

        const t0 = performance.now();

        const buf = new Uint8Array(info.length + nonce1.length);
        buf.set(nonce1);
        buf.set(info, nonce1.length);

        const h1 = crypto_hash_sha256(buf);

        const buf2 = new Uint8Array(h1.length + nonce2.length);
        buf2.set(h1);
        buf2.set(nonce2, h1.length);

        // Only measure performances
        const hash = crypto_hash_sha256(buf2);

        const t1 = performance.now();
        times[i] = t1 - t0;

        // Attempt to avoid it getting optimized away by Node.
        hash.set(hash);
    }

    statistics(times);
}


/**
 * Benchmark performances of an encryption followed by a decryption.
 */
function benchmark_encryption_round() {
    const id_len = 32;
    const msg_len = 32;
    const nr_exp = 1000;

    const ids = new Array(nr_exp);
    const msgs = new Array(nr_exp);
    const skids = new Array(nr_exp);

    const times = new Array(nr_exp);

    log.info(`Start benchmark for encryption round with ${nr_exp} experiments.`);

    const [mpk, msk] = IBEPrimitives.keyGen();

    for (let i = 0; i < nr_exp; ++i) {
        ids[i] = randombytes_buf(id_len);
        msgs[i] = randombytes_buf(msg_len);
        skids[i] = IBEPrimitives.keyDer(msk, ids[i]);
    }

    for (let i = 0; i < nr_exp; ++i) {
        const id = ids[i];
        const t0 = performance.now();
        const ctxt = IBEPrimitives.enc(mpk, id, msgs[i]);
        const dec = IBEPrimitives.dec(id, skids[i], ctxt);
        const t1 = performance.now();
        times[i] = t1 - t0;

        // Attempt to avoid it getting optimized away by Node.
        dec.set(dec);
    }

    statistics(times);

}


/**
 * Benchmark performances of a decryption which fails.
 */
function benchmark_bad_decrypt() {
    const id_len = 32;
    const msg_len = 32;
    const nr_exp = 1000;

    const ids = new Array(nr_exp);
    const msgs = new Array(nr_exp);
    const skids = new Array(nr_exp);

    const times = new Array(nr_exp);

    log.info(`Start benchmark for bad decryption with ${nr_exp} experiments.`);

    const mpka = IBEPrimitives.keyGen()[0];
    const mskb = IBEPrimitives.keyGen()[1];

    for (let i = 0; i < nr_exp; ++i) {
        ids[i] = randombytes_buf(id_len);
        msgs[i] = randombytes_buf(msg_len);
        skids[i] = IBEPrimitives.keyDer(mskb, ids[i]);
    }

    for (let i = 0; i < nr_exp; ++i) {
        const id = ids[i];
        const ctxt = IBEPrimitives.enc(mpka, id, msgs[i]);
        const t0 = performance.now();
        const dec = IBEPrimitives.dec(id, skids[i], ctxt);
        const t1 = performance.now();
        times[i] = t1 - t0;

        // Attempt to avoid it getting optimized away by Node.
        log.assert(dec, undefined);
    }

    statistics(times);
}


/**
 * Benchmark performances of pairing primitives, key generation, key derivation,
 * encryption, and decryption.
 */
function benchmark() {
    const id_len = 32;
    const msg_len = 32;
    const nr_exp = 1000;

    const ids = new Array(nr_exp);
    const msgs = new Array(nr_exp);
    const ctxts = new Array(nr_exp);
    const skids = new Array(nr_exp);

    const g1s = new Array(nr_exp);
    const g2s = new Array(nr_exp);

    const t_pair = new Array(nr_exp);
    const t_kg = new Array(nr_exp);
    const t_enc = new Array(nr_exp);
    const t_kd = new Array(nr_exp);
    const t_dec = new Array(nr_exp);

    log.info(`Start benchmark with ${nr_exp} experiments.`);

    for (let i = 0; i < nr_exp; ++i) {
        ids[i] = randombytes_buf(id_len);
        msgs[i] = randombytes_buf(msg_len);

        const f1 = new mcl.Fr();
        f1.setByCSPRNG();
        const g1 = mcl.mul(Helpers.baseG1(), f1);
        g1s[i] = g1;

        const f2 = new mcl.Fr();
        f2.setByCSPRNG();
        const g2 = mcl.mul(Helpers.baseG2(), f1);
        g2s[i] = g2;
    }

    log.info("Pairing primitive.");

    for (let i = 0; i < nr_exp; ++i) {
        const g1 = g1s[i];
        const g2 = g2s[i];
        const t0 = performance.now();
        const gt = mcl.pairing(g1, g2);
        const t1 = performance.now();
        t_pair[i] = t1 - t0;

        // Attempt to avoid it getting optimized away by Node.
        gt.deserialize(gt.serialize());
    }

    statistics(t_pair);

    log.info("Keys generation.");

    for (let i = 0; i < nr_exp; ++i) {
        const t0 = performance.now();
        const keys = IBEPrimitives.keyGen();
        const t1 = performance.now();
        t_kg[i] = t1 - t0;

        // Attempt to avoid it getting optimized away by Node.
        mcl.mul(keys[0], keys[1]);
    }

    statistics(t_kg);

    const [mpk, msk] = IBEPrimitives.keyGen();

    log.info("Encryption");

    for (let i = 0; i < nr_exp; ++i) {
        const t0 = performance.now();
        const ctxt = IBEPrimitives.enc(mpk, ids[i], msgs[i]);
        const t1 = performance.now();
        ctxts[i] = ctxt;
        t_enc[i] = t1 - t0;
    }

    statistics(t_enc);

    log.info("Key derivation");

    for (let i = 0; i < nr_exp; ++i) {
        const t0 = performance.now();
        const skid = IBEPrimitives.keyDer(msk, ids[i]);
        const t1 = performance.now();
        skids[i] = skid;
        t_kd[i] = t1 - t0;
    }

    statistics(t_kd);

    log.info("Decryption");

    for (let i = 0; i < nr_exp; ++i) {
        const t0 = performance.now();
        const dec = IBEPrimitives.dec(ids[i], skids[i], ctxts[i]);
        const t1 = performance.now();
        t_dec[i] = t1 - t0;

        // Attempt to avoid it getting optimized away by Node.
        dec.set(dec);
    }

    statistics(t_dec);
}


async function main(){
    await waitReady();

    log.info("Start benchmarks.");

    benchmark();
    benchmark_fancy_hash();
    benchmark_encryption_round();
    benchmark_bad_decrypt();

    log.info("Benchmarks finished.");
}


main().catch(e => {
    log.error(e);
});
