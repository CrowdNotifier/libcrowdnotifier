import {Message, Root} from 'protobufjs';
import protoJSON from './messages.json';
import {mcl} from '@c4dt/libcrowdnotifier';

export class ProblematicEventWrapper extends Message<ProblematicEventWrapper> {
    // @ts-ignore
    version: number;
    // @ts-ignore
    events: ProblematicEvent[];
}

export class ProblematicEvent extends Message<ProblematicEvent> {
    // @ts-ignore
    identity: Uint8Array;
    // @ts-ignore
    secretKeyForIdentity: Uint8Array;
    // @ts-ignore
    startTime: number;
    // @ts-ignore
    endTime: number;
    // @ts-ignore
    message: Uint8Array;
    // @ts-ignore
    nonce: Uint8Array;

    getSecretKeyForIdentity(): mcl.G1 {
      const skfi = new mcl.G1();
      skfi.deserialize(this.secretKeyForIdentity);
      return skfi;
    }
}

export class EncryptedData extends Message<EncryptedData> {
    // @ts-ignore
    c1: Uint8Array;
    // @ts-ignore
    c2: Uint8Array;
    // @ts-ignore
    c3: Uint8Array;
    // @ts-ignore
    nonce: Uint8Array;

    setC1(c1: mcl.G2) {
      this.c1 = c1.serialize();
    }

    getC1(): mcl.G2 {
      const c1 = new mcl.G2();
      c1.deserialize(this.c1);
      return c1;
    }
}

try {
  const protoRoot = Root.fromJSON(protoJSON);
  protoRoot.lookupType('crowdnotifier_app_v2.ProblematicEventWrapper').ctor =
        ProblematicEventWrapper;
  protoRoot.lookupType('crowdnotifier_app_v2.ProblematicEvent').ctor =
        ProblematicEvent;
  protoRoot.lookupType('crowdnotifier_app_v2.EncryptedData').ctor =
        EncryptedData;
} catch (e) {
  throw new Error('couldn\'t load messages.proto: ' + e.toString());
}
