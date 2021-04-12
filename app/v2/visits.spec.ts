import {Log} from '@c4dt/libcrowdnotifier';
import {HealthAuthority, Visit} from './system';

export async function checkVisits(
    log: Log, counter1: number, counter2: number,
    healthAuthority: HealthAuthority,
    urlEntry1: string, urlEntry2: string,
    preTrace1_1: string, preTrace1_2: string, preTrace1_3: string) {
  log.info('Creating two visits');
  const visit1 =
        Visit.fromQRCode(urlEntry1, counter1, true);
  const visit2 =
        Visit.fromQRCode(urlEntry2, counter2, true);

  log.info('Location 1 got infected during three hours - creating traces');
  const trace1_1 =
        healthAuthority.createTraceEntry(preTrace1_1,
            (counter1 - 1).toString());
  const trace1_2 =
        healthAuthority.createTraceEntry(preTrace1_2,
            (counter1).toString());
  const trace1_3 =
        healthAuthority.createTraceEntry(preTrace1_3,
            (counter1 + 1).toString());
  if (trace1_1 === undefined ||
        trace1_2 === undefined ||
        trace1_3 === undefined) {
    throw new Error('Couldn\'t create the traces');
  }

  log.info('Checking if visit1 gets correctly notified');
  log.assertTrue(!visit1.verifyExposure([trace1_1]),
      'Shouldn\'t match counter-1');
  log.assertTrue(visit1.verifyExposure([trace1_2]),
      'Should match counter');
  log.assertTrue(!visit1.verifyExposure([trace1_3]),
      'Shouldn\'t match counter+1');

  log.info('Checking if visit2 gets correctly NOT notified');
  log.assertTrue(!visit2.verifyExposure([trace1_1]),
      'Shouldn\'t match visit2');
  log.assertTrue(!visit2.verifyExposure([trace1_2]),
      'Shouldn\'t match visit2');
  log.assertTrue(!visit2.verifyExposure([trace1_3]),
      'Shouldn\'t match visit2');

  log.info('System check successfully finished!');
}

