import {CrowdBackend} from "app/crowdbackend";
import {Log} from "lib/log";
import {Internet} from "app/internet";
import {CryptoHealthAuthority, from_base64, randombytes_buf, to_base64} from "lib/crypto";

/**
 * The HealthAuthorityBackend makes sure that only assigned health authorities can publish
 * codes of trace locations. It uses a public key that the locations use to encrypt their
 * data to, so that only the HealthAuthorityBackend can decrypt the data, if needed.
 */
export class HealthAuthorityBackend {
    static pathGetCrowdCode = "getCrowdCode";
    static pathPostPreTrace = "preTrace";

    private crypto: CryptoHealthAuthority;
    private log: Log;

    constructor(
        private internet: Internet,
        private urlCrowdNotifier,
        public host: string
    ) {
        this.crypto = new CryptoHealthAuthority();
        this.log = new Log(`HABackend`);
        internet.register(new URL(host), this);
        this.log.info("Created");
    }

    pubKey(): Uint8Array {
        return this.crypto.keyPair.publicKey;
    }

    async Get(path: string, search: string): Promise<string> {
        switch (path) {
            case HealthAuthorityBackend.pathGetCrowdCode:
                return this.getCrowdCode(search);
        }
        throw new Error("Path not found");
    }

    async Post(path: string, search: string, data: string): Promise<string> {
        switch (path) {
            case HealthAuthorityBackend.pathPostPreTrace:
                return this.preTrace(search, data);
        }
        throw new Error("Path not found");
    }

    private getCrowdCode(search: string): string {
        const url = new URL("http://localhost/" + search).searchParams;
        const [name, location, start, end] = [
            url.get("name"),
            url.get("location"),
            parseInt(url.get("start")),
            parseInt(url.get("end"))
        ];
        const rand = randombytes_buf(32);
        this.crypto.addCrowdCodes({rand, name, location, start, end});
        return to_base64(rand);
    }

    private async preTrace(search: string, preTrace: string) {
        const crowdCode = new URLSearchParams(search).get("crowdCode");
        this.log.info("Using pre-trace", crowdCode, preTrace);

        const data = this.crypto.createTraceEntry(preTrace, crowdCode);

        const url = new URL(
            `${this.urlCrowdNotifier}/${CrowdBackend.pathPostTrace}`
        );
        return this.internet.post(url, data);
    }
}
