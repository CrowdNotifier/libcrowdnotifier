import {
  mcl, sodium,
} from '@c4dt/libcrowdnotifier';
import {
  genOrgStatic,
  genPreTrace,
  IOrganizerData,
  PreTrace, PreTraceWithProof,
  QRCodeTrace,
  TraceProof,
} from '@c4dt/libcrowdnotifier/dist/v2';
import {Room} from '../v2';

/**
 * In the managed setting, one organizer is responsible for more
 * than one room.
 * To make management simple, but still prevent abuse with regard
 * to false notifications, one "Organizer" can create many rooms.
 * While the room creation is not protected in any sense, the
 * notification depends on the usage of a passphrase, or the
 * QREntry code.
 */

/**
 * Organizer is only used in managed mode and allows to have
 * more than one location protected by a master key.
 * When creating an organizer, the IOrganizerPublic data can
 * be stored in a database.
 * The IOrganizerPublic data can then be used to create new
 * rooms without the need for the pass phrase.
 */
export class Organizer {
  constructor(public data: IOrganizerData) {
  }

  /**
   * Creates a new Organizer if the pass phrase is available.
   * @param healthAuthorityPublicKey
   * @param passPhrase
   */
  static fromPassPhrase(healthAuthorityPublicKey: Uint8Array,
      passPhrase: string): Organizer {
    // We want to have at least 256 bits of entropy. Supposing
    // it's base64 encoded, this means 6 bit per character.
    if (passPhrase.length <= 256 / 6) {
      throw new Error('Need at least 43 characters for the passphrase');
    }
    return new Organizer(genOrgStatic(healthAuthorityPublicKey, passPhrase));
  }

  /**
   * Creates a new Organizer from a QRTrace.
   * @param qrTrace
   */
  static fromQRTrace(qrTrace: string): Organizer {
    const qrTrace64 = qrTrace.replace(/^.*#/, '');
    const masterTraceRecordProto =
            QRCodeTrace.decode(sodium.from_base64(qrTrace64)).masterTraceRecord;

    const masterPublicKey = new mcl.G2();
    masterPublicKey.deserialize(masterTraceRecordProto.masterPublicKey);
    const masterSecretKeyLocation = new mcl.Fr();
    masterSecretKeyLocation
        .deserialize(masterTraceRecordProto.masterSecretKeyLocation);

    return new Organizer({
      mskO: masterSecretKeyLocation,
      mpk: masterPublicKey,
      ctxtha: masterTraceRecordProto.cipherTextHealthAuthority,
    });
  }

  /**
   * Creates one or more traces to indicate the presence of a positively
   * tested visitor in this room.
   * For every count (hours since Unix epoch), the call returns one
   * base64-encoded message to be sent to the backend.
   * @param room
   * @param counts
   * @param message - if given, will be added to the pretraces
   */
  preTrace(room: Room, counts: number[], message?: string): string[] {
    const masterTraceRecord = room.getMasterTraceRecord(this);
    const notificationKey = room.entry.data.notificationKey;
    return counts.map((count) => {
      const [preTrace, traceProof] = genPreTrace(masterTraceRecord, count);
      const preTraceProto = new PreTrace({
        identity: preTrace.id,
        cipherTextHealthAuthority: preTrace.ctxtha,
        partialSecretKeyForIdentityOfLocation: preTrace.pskidl.serialize(),
      });
      if (message !== undefined && notificationKey !== undefined) {
        preTraceProto.message = message;
        preTraceProto.notificationKey = notificationKey;
      }
      const traceProofProto = TraceProof.create({
        masterPublicKey: traceProof.mpk.serialize(),
        nonce1: traceProof.nonce1,
        nonce2: traceProof.nonce2,
      });
      return PreTraceWithProof.create({
        preTrace: preTraceProto,
        proof: traceProofProto,
        info: room.infoBinary(),
      });
    }).map((ptwp) =>
      sodium.to_base64(PreTraceWithProof.encode(ptwp).finish(),
      ));
  }
}
