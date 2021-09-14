import * as v1 from './v1';
import * as v1_1 from './v1_1';
import {
  EntryProof,
  genCode,
  genOrgStatic,
  IEncryptedData,
  ILocationData,
  IOrganizerData,
  IOrganizerPublic,
  IMasterTrace,
  QRCodeContent,
  MasterTrace,
  baseG1, baseG2, genId,
  QRCodeEntry,
  scan,
  waitReady,
} from './v2';
import {
  crowdnotifier_v3,

  genPreTrace,
  genTrace,
  match,
  setupHA,
  verifyTrace,
} from './v3';
import {
  genOrgCode,
  genOrgInit,
  recoverOrgMasterSecret,
} from './v2_1';
import {
  crowdnotifier_v4,
  createLocationData,
} from './v4';
import {Log} from './log';
import mcl from 'mcl-wasm';
import sodium from 'libsodium-wrappers-sumo';

export interface IKeyPair {
    keyType: string;
    privateKey: Uint8Array;
    publicKey: Uint8Array;
}

export {
  // Creation of version-4 QRcode
  createLocationData,

  // Proto structures for v4
  crowdnotifier_v4,

  // CrowdNotifierPrimitives
  setupHA, genCode, scan, genOrgStatic,
  genPreTrace, genTrace, verifyTrace, match,

  // Proto structures for v3
  crowdnotifier_v3,

  // Managed CrowdNotifier (v2.1)
  genOrgCode, recoverOrgMasterSecret, genOrgInit,
  // Generic crypto primitives needed
  waitReady, IEncryptedData, baseG1, baseG2, genId,
  // Proto structures for v2
  QRCodeEntry, QRCodeContent, MasterTrace,
  EntryProof,
  // Structures
  ILocationData, IOrganizerData, IOrganizerPublic,
  IMasterTrace,
  // old versions of the protocol
  v1, v1_1,
  // beloved log-library
  Log,
  // mcl and sodium need to be exported from here, else
  // node will instantiate two versions and will fail.
  mcl, sodium,
};
