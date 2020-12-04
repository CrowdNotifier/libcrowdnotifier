import {IBEPrimitives, waitReady} from "./crypto";
import {Log} from "../lib/log";

/**
 * Very simple crypto test for CrowdNotifierPrimitives using the new BNS scheme to avoid having to
 * print new QRcodes after every infection.
 *
 * To run it, write:
 *   npm ci
 *   npm run testv2
 */

const log = new Log("v2/crypto.spec");
log.info(`Starting at: ${new Date()}`);


function testIbePrimitives() {
    const id = new Uint8Array([1,2,3,4]);
    const msg = new Uint8Array([5,6,7,8,9,10,11,12,13,14,15,1,2,3,4]);

    log.info("Start test suite for identity-based encryption (IBE) primitives.");

    log.info("Keys generation");
    const [mpk, msk] = IBEPrimitives.keyGen();

    log.info("Encrypt");
    const ctxt = IBEPrimitives.enc(mpk, id, msg);

    log.info("Derive key");
    const skid = IBEPrimitives.keyDer(msk, id);

    log.info("Decrypt");
    const msg_dec = IBEPrimitives.dec(id, skid, ctxt);

    log.reject(msg_dec, undefined, "Should be able to decrypt message!");

    log.assert(msg, msg_dec, "Original message and decrypted ciphertext should be equal!");

    log.info("All tests for IBE primitives passed!");
}

async function main(){
    await waitReady();

    log.info("Start test suite for crypto.");

    testIbePrimitives();

    log.info("Crypto spec successfully finished!");
}

main().catch(e => {
    log.error(e);
});
