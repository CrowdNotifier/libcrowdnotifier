// Import stylesheets
import "./style.css";

import {
  crypto_box_keypair,
  crypto_scalarmult,
  crypto_scalarmult_base,
  crypto_sign_ed25519_keypair,
  crypto_sign_ed25519_pk_to_curve25519,
  crypto_sign_ed25519_sk_to_curve25519,
  crypto_sign_keypair,
  randombytes_buf,
  waitReady
} from "./sodium";
import { PurpleBackend } from "./purpleBackend";
import { Client } from "./client";
import { Venue } from "./venue";
import { CrowdBackend } from "./crowdbackend";
import { HealthAuthority } from "./healthAuthority";
import { Log } from "./log";
import { Internet } from "./internet";

/**
 * This shows a full run of the CrowdNotifier system with the different elements.
 */

const log = new Log("main");
log.info(`Starting at: ${new Date()}`);

async function main() {
  await waitReady();

  // Creating internet service
  const internet = new Internet();

  // Setting up backends
  const crowdBack = new CrowdBackend(internet, "https://crowdback.ubique.ch");
  const bit = new PurpleBackend(
    internet,
    crowdBack.host,
    "https://purple.admin.ch"
  );

  // Setting up the local health authority
  const doctor = new HealthAuthority(internet, bit.host, "Vaud");

  // Creating venues
  const venue1 = new Venue(
    internet,
    bit.host,
    "bar",
    "matrix",
    "room",
    0,
    bit.pubKey()
  );
  const venue2 = new Venue(
    internet,
    bit.host,
    "foo-bar",
    "matrix",
    "other room",
    0,
    bit.pubKey()
  );

  // Creating a client and let her visit venue1
  const client1 = new Client(internet, crowdBack.host, "foo");
  client1.addVenue(venue1.QRentry(), true, 1000, 1100);

  log.info("Triggering notification");
  const crowdCode = await doctor.getCrowdCode(venue1, 950, 1050);
  await venue1.uploadTracing(crowdCode);
  log.info("Exposures:", await client1.checkExposure());
}

main().catch(e => {
  log.error(e);
});
