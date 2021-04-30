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
  TraceLocation,
  CrowdNotifierData,
  AssociatedData,
  EEventCriticality,
  EVenueType,
  NotifyMeAssociatedData,
  NotifyMeLocationData,
  PreTrace,
  PreTraceWithProof,
  QRCodePayload,
  QRCodeTrace,
  Trace,
  TraceProof,

  setupHA,
  setupLocation,
  match,
  verifyTrace,
  genTrace,
  genPreTrace,
  getCheckIn,
  getVenueInfoFromQrCodeV2,
  getVenueInfoFromQrCodeV3,
} from './v3';
import {
  genOrgCode,
  genOrgInit,
  recoverOrgMasterSecret,
} from './v2_1';
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
  setupHA,
  setupLocation,
  match,
  verifyTrace,
  genTrace,
  genPreTrace,
  getCheckIn,
  getVenueInfoFromQrCodeV2,
  getVenueInfoFromQrCodeV3,
  genCode, scan, genOrgStatic,

  // Proto structures for v3
  TraceLocation,
  CrowdNotifierData,
  AssociatedData,
  EEventCriticality,
  EVenueType,
  NotifyMeAssociatedData,
  NotifyMeLocationData,
  PreTrace,
  PreTraceWithProof,
  QRCodePayload,
  QRCodeTrace,
  Trace,
  TraceProof,

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
