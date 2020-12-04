import {Log} from "../lib/log";
import {waitReady} from "./crypto";
import {HealthAuthority, Location, Visit} from "./system";

const log = new Log("v2/system.spec");
log.info(`Starting at: ${new Date()}`);

async function main() {
    await waitReady();

    log.info("Setting up backends");
    const urlEntry = "app:entry";
    const urlTrace = "app:trace";
    const healthAuthority = new HealthAuthority();
    const location1 = new Location(healthAuthority.keyPair.publicKey,
        1, "FooBar", "Lausanne", "any");
    const location1qrTrace = location1.getQRtrace(urlTrace);
    const location2 = new Location(healthAuthority.keyPair.publicKey,
        2, "BarMitzva", "Lausanne", "unknown");
    const location2qrTrace = location2.getQRtrace(urlTrace);

    log.info("Creating two visits");
    const counter1 = 1000;
    const visit1 = new Visit(location1.getQRentry(urlEntry), counter1, counter1, true);

    const counter2 = 1001;
    const visit2 = new Visit(location2.getQRentry(urlEntry), counter2, counter2, true);

    log.info("Location 1 got infected during three hours - creating pre-traces");
    const preTrace1_1 = Location.preTrace(location1qrTrace, (counter1-1).toString());
    const preTrace1_2 = Location.preTrace(location1qrTrace, (counter1).toString());
    const preTrace1_3 = Location.preTrace(location1qrTrace, (counter1+1).toString());

    log.info("Location 1 got infected during three hours - creating traces");
    const trace1_1 = healthAuthority.createTraceEntry(preTrace1_1, (counter1-1).toString());
    const trace1_2 = healthAuthority.createTraceEntry(preTrace1_2, (counter1).toString());
    const trace1_3 = healthAuthority.createTraceEntry(preTrace1_3, (counter1+1).toString());
    if (trace1_1 === undefined || trace1_2 === undefined || trace1_3 === undefined){
        throw new Error("Couldn't create the traces");
    }

    log.info("Checking if visit1 gets correctly notified");
    log.assertTrue(!visit1.verifyExposure([trace1_1]), "Shouldn't match counter-1");
    log.assertTrue(visit1.verifyExposure([trace1_2]), "Should match counter");
    log.assertTrue(!visit1.verifyExposure([trace1_3]), "Shouldn't match counter+1");

    log.info("Checking if visit2 gets correctly NOT notified");
    log.assertTrue(!visit2.verifyExposure([trace1_1]), "Shouldn't match visit2");
    log.assertTrue(!visit2.verifyExposure([trace1_2]), "Shouldn't match visit2");
    log.assertTrue(!visit2.verifyExposure([trace1_3]), "Shouldn't match visit2");

    log.info("System check successfully finished!");
}

main().catch(e => {
    log.error(e);
});
