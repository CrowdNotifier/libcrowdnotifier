import {Section7, waitReady} from "./crypto-mcl";
import {Log} from "./log";

/**
 * Very simple crypto test for the section7 using the new BNS scheme to avoid having to
 * print new QRcodes after every infection.
 *
 * To run it, write:
 *   npm ci
 *   npm run section7
 */

const log = new Log("main");
log.info(`Starting at: ${new Date()}`);


async function main(){
    await waitReady();

    log.info("Setting up backends");
    const HealthAuthority = Section7.setupHA();
    const infoLocation1 = "FooBar:Lausanne:undefined";
    const location1 = Section7.genCode(infoLocation1, HealthAuthority.publicKey);
    const infoLocation2 = "BarMitzva:Lausanne:undefined";
    const location2 = Section7.genCode(infoLocation2, HealthAuthority.publicKey);

    log.info("Creating two users");
    const counter1 = 1000;
    const user1Aux = "secret date";
    const user1 = Section7.scan(location1.ent, location1.pEnt, infoLocation1, counter1, user1Aux);

    const counter2 = 1001;
    const user2Aux = "PARTY!";
    const user2 = Section7.scan(location2.ent, location2.pEnt, infoLocation2, counter2, user2Aux);

    log.info("Location 1 got infected during three hours - creating traces");
    const preTrace1_1 = Section7.genPreTrace(location1.mtr, counter1-1);
    const preTrace1_2 = Section7.genPreTrace(location1.mtr, counter1);
    const preTrace1_3 = Section7.genPreTrace(location1.mtr, counter1+1);
    const trace1_1 = Section7.genTrace(HealthAuthority, counter1-1, preTrace1_1);
    const trace1_2 = Section7.genTrace(HealthAuthority, counter1, preTrace1_2);
    const trace1_3 = Section7.genTrace(HealthAuthority, counter1+1, preTrace1_3);
    if (trace1_1 === undefined || trace1_2 === undefined || trace1_3 === undefined){
        throw new Error("Couldn't create the traces");
    }

    log.info("Checking if user1 gets correctly notified");
    log.assert(Section7.match(user1, trace1_1) === undefined, "Shouldn't match counter-1");
    log.assert(Section7.match(user1, trace1_2) === user1Aux, "Should match counter");
    log.assert(Section7.match(user1, trace1_3) === undefined, "Shouldn't match counter+1");

    log.info("Checking if user2 gets correctly NOT notified");
    log.assert(Section7.match(user2, trace1_1) === undefined, "Shouldn't match user2");
    log.assert(Section7.match(user2, trace1_2) === undefined, "Shouldn't match user2");
    log.assert(Section7.match(user2, trace1_3) === undefined, "Shouldn't match user2");
}

main().catch(e => {
    log.error(e);
});
