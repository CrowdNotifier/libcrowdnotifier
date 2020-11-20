import * as mcl from "mcl-wasm";
import {crypto_hash_sha256} from "./sodium";

export function waitReady(): Promise<undefined> {
    return new Promise((resolve) => {
        mcl.init(mcl.BLS12_381).then(() => {
            resolve();
        })
    });
}

export function add<T extends Fr | G1 | G2 | GT>(a: T, b: T): any {
    if (a instanceof Fr && b instanceof Fr) {
        return new Fr(mcl.add(a.mclFr, b.mclFr));
    }
    if (a instanceof G1 && b instanceof G1) {
        return new G1(mcl.add(a.mclG1, b.mclG1));
    }
    if (a instanceof G2 && b instanceof G2) {
        return new G2(mcl.add(a.mclG2, b.mclG2));
    }
    if (a instanceof GT && b instanceof GT) {
        return new GT(mcl.add(a.mclGT, b.mclGT));
    }
}

export function mul(a: Fr | G1 | G2 | GT, b: Fr): any {
    if (a instanceof Fr) {
        return new Fr(mcl.mul(a.mclFr, b.mclFr))
    }
    if (a instanceof G1) {
        return new G1(mcl.mul(a.mclG1, b.mclFr))
    }
    if (a instanceof G2) {
        return new G2(mcl.mul(a.mclG2, b.mclFr))
    }
    if (a instanceof GT) {
        return new GT(mcl.mul(a.mclGT, b.mclFr))
    }
    throw new Error("Cannot use this as input type")
}

export function hashAndMapToG1(s: string | Uint8Array): G1 {
    return new G1(mcl.hashAndMapToG1(s));
}

export function pairing(g1: G1, g2: G2): GT {
    return new GT(mcl.pairing(g1.mclG1, g2.mclG2))
}

export class G1 {
    constructor(public mclG1 = new mcl.G1()) {
    }

    serialize(): Uint8Array {
        return this.mclG1.serialize();
    }

    deserialize(buf: Uint8Array){
        this.mclG1.deserialize(buf);
    }

    isEqual(other: G1): boolean{
        return this.mclG1.isEqual(other.mclG1);
    }
}

export class G2 {
    constructor(public mclG2 = new mcl.G2()) {
    }

    serialize(): Uint8Array {
        return this.mclG2.serialize();
    }

    deserialize(buf: Uint8Array){
        this.mclG2.deserialize(buf);
    }

    isEqual(other: G2): boolean{
        return this.mclG2.isEqual(other.mclG2);
    }
}

export class GT {
    constructor(public mclGT = new mcl.GT()) {
    }

    serialize(): Uint8Array {
        return this.mclGT.serialize();
    }

    deserialize(buf: Uint8Array){
        this.mclGT.deserialize(buf);
    }

    isEqual(other: GT): boolean{
        return this.mclGT.isEqual(other.mclGT);
    }
}

export class Fr {
    constructor(public mclFr = new mcl.Fr()) {
    }

    setByCSPRNG() {
        this.mclFr.setByCSPRNG();
    }

    serialize(): Uint8Array {
        return this.mclFr.serialize();
    }

    deserialize(buf: Uint8Array){
        this.mclFr.deserialize(buf);
    }
}
