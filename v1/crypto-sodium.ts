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
} from "lib/sodium";
import {QRCodeContent, QRCodeWrapper, SeedMessage} from "protobuf";
import {Log} from "lib/log";
import {ITrace} from "app/crowdbackend";

export {waitReady};

/**
 * The table definition of the database of the HealthAuthorityBackend.
 */
interface ICrowdCode {
    rand: Uint8Array;
    name: string;
    location: string;
    start: number;
    end: number;
    used?: boolean;
}

export class CryptoHealthAuthority {
    public crowdCodes: ICrowdCode[] = [];

    constructor(public keyPair = crypto_box_keypair()) {
    }

    createTraceEntry(qrTrack: Uint8Array, count?: number, ptr?: any): string {
        const ccodeEntry = this.crowdCodes.find(
            cc => to_base64(cc.rand) === preTrace
        );
        if (ccodeEntry === undefined) {
            throw new Error("Invalid CrowdCode");
        }
        if (ccodeEntry.used) {
            throw new Error("Already used CrowdCode");
        }
        ccodeEntry.used = true;

        const seedMsgBuf = crypto_box_seal_open(
            qrTrack,
            this.keyPair.publicKey,
            this.keyPair.privateKey
        );
        const seedMessage = SeedMessage.decode(seedMsgBuf);
        return "";
    }

    addCrowdCodes(icc: ICrowdCode){
        this.crowdCodes.push(icc);
    }
}

export class CryptoLocation {
    public keyPair: IKeyPair;
    public seedBuf: Uint8Array;
    private salt = randombytes_buf(32);
    public notificationKey = crypto_secretbox_keygen();
    private qrCodeContent: QRCodeContent;

    constructor(healthAuthorityPubKey: Uint8Array,
                locType: number, name: string, location: string, room: string) {
        const seedMessage = SeedMessage.create({
            salt: this.salt, notificationKey: this.notificationKey,
            name, location, room
        })
        this.seedBuf = SeedMessage.encode(seedMessage).finish();
        const seed = crypto_hash_sha256(this.seedBuf);
        this.keyPair = crypto_sign_seed_keypair(seed);

        this.qrCodeContent = new QRCodeContent({
            version: 1,
            publicKey: this.keyPair.publicKey,
            name: name,
            location: location,
            room: room,
            venueType: locType,
            notificationKey: this.notificationKey
        });

        const wrapper = QRCodeWrapper.decode(qrBuf);
        const location: QRCodeContent = wrapper.content;
        if (!CryptoLocation.verifyWrapper(wrapper)) {
            throw new Error("Location QRCode not correct");
        }
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

    getQRtrace(healthAuthorityPubKey: Uint8Array): Uint8Array {
        return crypto_box_seal(this.seedBuf, healthAuthorityPubKey);
    }

    getQRentry(content: Uint8Array): Uint8Array {
        const signature = crypto_sign_detached(
            content, this.keyPair.privateKey
        );
        const qrCodeWrapper = QRCodeWrapper.create({
            version: 1,
            content: this.qrCodeContent,
            signature
        });

        return QRCodeWrapper.encode(
            qrCodeWrapper
        ).finish();
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
