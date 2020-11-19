import {
    buf_equals,
    crypto_box_keypair,
    crypto_box_seal,
    crypto_box_seal_open,
    crypto_hash_sha256,
    crypto_scalarmult,
    crypto_scalarmult_base,
    crypto_secretbox_keygen,
    crypto_sign_detached,
    crypto_sign_ed25519_pk_to_curve25519,
    crypto_sign_ed25519_sk_to_curve25519,
    crypto_sign_seed_keypair,
    crypto_sign_verify_detached,
    from_string,
    IKeyPair,
    randombytes_buf,
    to_base64,
    to_string,
    waitReady
} from "./sodium";
import {QRCodeContent, QRCodeWrapper, SeedMessage} from "./protobuf";
import {Log} from "./log";
import {ITrace} from "./crowdbackend";

export {waitReady};

export class CryptoHealthAuthority {
    constructor(public keyPair = crypto_box_keypair()) {
    }

    decryptQRTrack(qrTrack: Uint8Array): CryptoLocation {
        const seedMsg = crypto_box_seal_open(
            qrTrack,
            this.keyPair.publicKey,
            this.keyPair.privateKey
        );
        return CryptoLocation.fromSeedMsgBuf(seedMsg);
    }
}

export class CryptoLocation {
    public keyPair: IKeyPair;
    public seedBuf: Uint8Array;

    constructor(name: string, location: string, room: string,
                salt = randombytes_buf(32),
                public notificationKey = crypto_secretbox_keygen()) {
        const seedMessage = SeedMessage.create({
            salt, notificationKey,
            name, location, room
        })
        this.seedBuf = SeedMessage.encode(seedMessage).finish();
        const seed = crypto_hash_sha256(this.seedBuf);
        this.keyPair = crypto_sign_seed_keypair(seed);
    }

    static fromSeedMsgBuf(buf: Uint8Array): CryptoLocation {
        const seedMessage = SeedMessage.decode(buf);
        return new CryptoLocation(seedMessage.name, seedMessage.location, seedMessage.room,
            seedMessage.salt, seedMessage.notificationKey);
    }

    static verifyWrapper(wrapper: QRCodeWrapper): boolean {
        const contentBuf = QRCodeContent.encode(QRCodeContent.create(wrapper.content)).finish();
        return crypto_sign_verify_detached(
            wrapper.signature,
            contentBuf,
            wrapper.content.publicKey
        )
    }

    getQRtrack(healthAuthorityPubKey: Uint8Array): Uint8Array {
        return crypto_box_seal(this.seedBuf, healthAuthorityPubKey);
    }

    getQRentrySignature(content: Uint8Array): Uint8Array {
        return crypto_sign_detached(
            content, this.keyPair.privateKey
        );
    }
}

export class CryptoVisit {
    public day: number;
    public ephemeralPublicKey: Uint8Array;
    public sharedKey: Uint8Array;
    public ciphertext: Uint8Array;
    public identity: string;
    private log: Log;

    constructor(
        qr: QRCodeContent,
        entry: number,
        departure: number,
        diary?: boolean
    ) {
        const esk = randombytes_buf(32);
        this.ephemeralPublicKey = crypto_scalarmult_base(esk);
        const locationPubCurve = crypto_sign_ed25519_pk_to_curve25519(qr.publicKey);
        this.sharedKey = crypto_scalarmult(esk, locationPubCurve);
        const loc = diary ? "unknown" : `${qr.name}-${qr.location}`;
        const msg = from_string(
            [entry, departure, to_base64(qr.notificationKey), loc].join("::")
        );
        const pkPrime = crypto_sign_ed25519_pk_to_curve25519(qr.publicKey);
        this.ciphertext = crypto_box_seal(msg, pkPrime);
        this.day = Math.floor(entry / 86400);

        this.log = new Log(`Visit{${entry}..${departure}}`);
        this.log.info("Created");
    }

    decryptExposure(traces: ITrace[]): boolean {
        this.log.info("Decrypting exposure for traces");
        const exposure = traces.find(trace => {
            trace.privKey = Uint8Array.from(Object.values(trace.privKey));
            const scalar = crypto_sign_ed25519_sk_to_curve25519(trace.privKey);
            const diffieHellman = crypto_scalarmult(scalar, this.ephemeralPublicKey);
            return buf_equals(this.sharedKey, diffieHellman);
        });
        if (exposure === undefined) {
            this.log.info("No exposure locations found");
            return false;
        }

        this.log.info("Fetching trace info");
        const locationScalarCurve = crypto_sign_ed25519_sk_to_curve25519(
            exposure.privKey
        );
        const pubKey = crypto_scalarmult_base(locationScalarCurve);
        const msg = to_string(
            crypto_box_seal_open(this.ciphertext, pubKey, locationScalarCurve)
        );

        this.log.info("Checking visit time");
        const [entryStr, departureStr, notificationKey, loc] = msg.split("::");
        const [entry, departure] = [parseInt(entryStr), parseInt(departureStr)];
        if (entry > exposure.end || departure < exposure.start) {
            this.log.info("No matching visit times to found exposures");
            return false;
        }
        this.identity = msg;
        return true;
    }
}
