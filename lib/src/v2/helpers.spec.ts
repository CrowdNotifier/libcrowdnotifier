import {Log} from '../log';
import {genId} from './helpers';
import {from_string} from 'libsodium-wrappers-sumo';

const log = new Log('v2/helpers.spec');
log.info(`Starting at: ${new Date()}`);

interface testVector {
    nonce1Hex: string,
    nonce2Hex: string,
    info: string,
    counter: number,
    genIdHex: string
}

// One set of test vectors for the genId method.
export function testGenId() {
  const testVectors: testVector[] = [
    {
      nonce1Hex:
            '983698f1d60535414bdd45ea6d6394d096bfaac29604d330d1c46f60d6525f20',
      nonce2Hex:
        '5f227555daf25fdb35034742a79d42d9d65df82d24e290b96f96641cdc8855a6',
      info: 'EPFL::BS::BS086::0',
      counter: 447528, // Midnight of 2021-01-20
      genIdHex:
        '2ae4194bc6e97d9110123b945328907812bb74bed401149fdf16c264d9a12809',
    },
    {
      nonce1Hex:
            'a03bf5511f8b30af1471d0ac745a56cea4a2fc58eb350f91da78889c1cd14718',
      nonce2Hex:
        'ee3e9ff6633024a309f77c01807db31dc0c7fc0cbe9af9c49e415dd673606492',
      info: 'EPFL::BS::BS140::0',
      counter: 447529, // 1AM of 2021-01-20
      genIdHex:
        '8de01da9933b14e4541b68d4b0d6fca4fb4c3e50020c6061df4943bf753bc519',
    },
    {
      nonce1Hex:
            'cc0ef29b2b7b98d79ac770543900fd8232d03779eeff287782f755f9f8896cd1',
      nonce2Hex:
        '1641d110723df1e7af410e20fd5af00978b79894acf6c30ab8918860fa3aa919',
      info: 'EPFL::BS::BS225::0',
      counter: 447530, // 2AM of 2021-01-20
      genIdHex:
        '529fc3193e04e96539a8a384abfa8bf1c728497642149b6a0edbaed9fa46cfa4',
    },
    {
      nonce1Hex:
            'b4efc7059802f40d02e27c82e163bc0a8cbebef3bcfb1482734d0a7ed4ffda63',
      nonce2Hex:
        'de559977c294a23a4c0db992bb4835328f0915c4bd74adc0c646efa75b1469df',
      info: 'EPFL::BS::BS102::0',
      counter: 447531, // 2AM of 2021-01-20
      genIdHex:
        'ad3acd01f6645b08c37881878fbe4caa644188f3f4d41ce33c4ba535fa1884ec',
    },
  ];

  for (const tv of testVectors) {
    log.info('Verifying genId for', JSON.stringify(tv));
    log.assertTrue(Buffer.compare(
        genId(
            from_string(tv.info),
            tv.counter,
            Buffer.from(tv.nonce1Hex, 'hex'),
            Buffer.from(tv.nonce2Hex, 'hex'),
        ),
        Buffer.from(tv.genIdHex, 'hex')) === 0,
    'Wrong value for id');
  }
}
