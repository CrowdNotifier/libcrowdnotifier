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

/**
 * New methods and definitions
 */

export function baseG1(): G1 {
    const base = new G1();
    base.mclG1.setStr('1 3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507 1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569')
    return base;
}

export function baseG2(): G2 {
    const base = new G2();
    base.mclG2.setStr('1 352701069587466618187139116011060144890029952792775240219908644239793785735715026873347600343865175952761926303160 3059144344244213709971259814753781636986470325476647558659373206291635324768958432433509563104347017837885763365758 1985150602287291935568054521177171638300868978215655730859378665066344726373823718423869104263333984641494340347905 927553665492332455747201965776037880757740193453592970025027978793976877002675564980949289727957565575433344219582')
    return base;
}

export function hashT(gt: GT): Uint8Array {
    return crypto_hash_sha256(gt.serialize());
}

export function xor(a: Uint8Array, b: Uint8Array): Uint8Array {
    if (a.length !== b.length) {
        throw new Error("cannot xor two Uint8Arrays of different length");
    }
    const c = new Uint8Array(a.length);
    for (let i = 0; i < a.length; i++) {
        c[i] = a[i]^b[i];
    }
    return c;
}
