import {HealthAuthorityBackend} from "./healthAuthorityBackend";
import {Visitor} from "./visitor";
import {Location} from "./location";
import {CrowdBackend} from "./crowdbackend";
import {HealthAuthority} from "./healthAuthority";
import {Log} from "./log";
import {Internet} from "./internet";
import {waitReady} from "./crypto";

/**
 * This shows a full run of the CrowdNotifier system with the different elements.
 * It simulates a visitor going to a location, which is later registered as s
 * trace location. Then the visitor checks the CrowdBackend and indicates a
 * possible infection.
 */

const log = new Log("main");
log.info(`Starting at: ${new Date()}`);

async function main() {
    await waitReady();

    // Creating internet service
    const internet = new Internet();

    // Setting up backends
    const crowdBack = new CrowdBackend(internet, "https://crowdback.ubique.ch");
    const bit = new HealthAuthorityBackend(
        internet,
        crowdBack.host,
        "https://habackend.admin.ch"
    );

    // Setting up the local health authority
    const doctor = new HealthAuthority(internet, bit.host, "Vaud");

    // Creating locations
    const restaurant = new Location(
        internet,
        bit.host,
        "MontBlanc",
        "Morges",
        "room",
        0,
        bit.pubKey()
    );
    const disco = new Location(
        internet,
        bit.host,
        "D!",
        "Lausanne",
        "main room",
        1,
        bit.pubKey()
    );

    // Creating a client and let her visit restaurant
    const client1 = new Visitor(internet, crowdBack.host, "foo");
    client1.addLocation(restaurant.QRentry(), true, 1000, 1100);

    log.info("Triggering notification");
    const crowdCode = await doctor.getCrowdCode(restaurant, 950, 1050);
    await restaurant.uploadTracing(crowdCode);
    log.info("Exposures:", await client1.checkExposure());
}

main().catch(e => {
    log.error(e);
});
