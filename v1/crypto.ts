import {
    buf_equals,
    crypto_box_keypair,
    crypto_box_seal,
    crypto_box_seal_open,
    crypto_hash_sha256,
    crypto_scalarmult,
    crypto_scalarmult_base,
    crypto_secretbox_keygen,
    crypto_sign_ed25519_pk_to_curve25519,
    crypto_sign_ed25519_sk_to_curve25519,
    crypto_sign_seed_keypair,
    from_string,
    IKeyPair,
    randombytes_buf,
    to_base64,
    to_string,
    waitReady
} from "../lib/sodium";
import {SeedMessage} from "./proto";

export {waitReady}

export interface ITrace {
    privKey: Uint8Array;
    start: number;
    end: number;
}

export interface ILocationInfo {
    name: string;
    location: string;
    room: string;
    locationType: number;
}

export interface ILocationData {
    keyPair: IKeyPair;
    seedMessage: SeedMessage;
}

export interface IVisit {
    ephemeralPublicKey: Uint8Array;
    sharedKey: Uint8Array;
    ciphertext: Uint8Array;
    day: number;
}

/**
 * This structure is as described in the chapter 4 of the white paper
 *   CrowdNotifier: attack model, formalization and properties November 26, 2020
 */
export class CryptoV1 {
    static setupHA(): IKeyPair {
        return crypto_box_keypair();
    }

    static genCode(info: ILocationInfo): ILocationData {
        const {name, location, room} = info;
        const seedMessage = new SeedMessage({
            salt: randombytes_buf(32),
            notificationKey: crypto_secretbox_keygen(),
            name, location, room
        });
        const seedBuf = SeedMessage.encode(seedMessage).finish();
        const seed = crypto_hash_sha256(seedBuf);
        return {
            keyPair: crypto_sign_seed_keypair(seed),
            seedMessage,
        };
    }

    static scan(publicKey: Uint8Array, info: ILocationInfo, entry: number, departure: number,
                notificationKey: Uint8Array, diary = false): IVisit {
        const esk = randombytes_buf(32);
        const ephemeralPublicKey = crypto_scalarmult_base(esk);
        const locationPubCurve = crypto_sign_ed25519_pk_to_curve25519(publicKey);
        const sharedKey = crypto_scalarmult(esk, locationPubCurve);
        const {name, location, room} = info;
        const loc = diary ? "unknown" : `${name}-${location}-${room}`;
        const msg = from_string(
            [entry, departure, to_base64(notificationKey), loc].join("::")
        );
        const pkPrime = crypto_sign_ed25519_pk_to_curve25519(publicKey);
        const ciphertext = crypto_box_seal(msg, pkPrime);
        const day = Math.floor(entry / 86400);
        return {ephemeralPublicKey, sharedKey, ciphertext, day};
    }

    static verifyTrace() {
        throw new Error("does not exist");
    }

    static match(visit: IVisit, exposure: ITrace): (undefined | string) {
        exposure.privKey = Uint8Array.from(Object.values(exposure.privKey));
        const scalar = crypto_sign_ed25519_sk_to_curve25519(exposure.privKey);
        const diffieHellman = crypto_scalarmult(scalar, visit.ephemeralPublicKey);
        if (!buf_equals(visit.sharedKey, diffieHellman)) {
            return undefined;
        }

        const locationScalarCurve = crypto_sign_ed25519_sk_to_curve25519(
            exposure.privKey
        );
        const pubKey = crypto_scalarmult_base(locationScalarCurve);
        const msg = to_string(
            crypto_box_seal_open(visit.ciphertext, pubKey, locationScalarCurve)
        );

        const [entryStr, departureStr, notificationKey, loc] = msg.split("::");
        const [entry, departure] = [parseInt(entryStr), parseInt(departureStr)];
        if (entry > exposure.end || departure < exposure.start) {
            return undefined;
        }
        return msg;
    }
}
