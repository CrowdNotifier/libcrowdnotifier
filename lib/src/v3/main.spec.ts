import { Log } from "../log";
import { waitReady } from "./helpers";
import { testIbePrimitives } from "./ibe_primitives.spec";
import { testGenIdV2 } from "./helpers_v2.spec";
import { testGenIdV3, testHKDFDerivation } from "./helpers_v3.spec";
import { testCrowdNotifierPrimitives } from "./crowd_notifier_primitives.spec";

const log = new Log("v3/main.spec");
log.info(`Starting at: ${new Date()}`);

export async function main() {
  await waitReady();
  testIbePrimitives();
  testHKDFDerivation();
  testGenIdV2();
  testGenIdV3();
  testCrowdNotifierPrimitives();
  log.info("All tests completed successfully");
}

main().catch((e) => {
  log.panic(e);
});
