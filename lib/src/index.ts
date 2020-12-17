import * as v1 from './v1';
import * as v1_1 from './v1_1';
import {
  genCode,
  genPreTrace,
  genTrace,
  IEncryptedData,
  ILocationData,
  LocationData,
  MasterTrace,
  match,
  PreTraceWithProof,
  QRCodeEntry,
  QRCodeTrace,
  scan,
  setupHA,
  Trace,
  verifyTrace,
  waitReady,
} from './v2';
import {Log} from './log';
import mcl from 'mcl-wasm';
import sodium from 'libsodium-wrappers-sumo';

export interface IKeyPair {
    keyType: string;
    privateKey: Uint8Array;
    publicKey: Uint8Array;
}

export {
  // CrowdNotifierPrimitives
  setupHA, genCode, scan, genPreTrace, genTrace, verifyTrace, match,
  waitReady, IEncryptedData,
  // Proto structures needed
  PreTraceWithProof, Trace, QRCodeTrace, QRCodeEntry, LocationData, MasterTrace,
  // Structures
  ILocationData,
  // old versions of the protocol
  v1, v1_1,
  // beloved log-library
  Log,
  // mcl and sodium need to be exported from here, else
  // node will instantiate two versions and will fail.
  mcl, sodium,
};
