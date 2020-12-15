import mcl from 'mcl-wasm';

export interface IMasterTrace {
    mpk: mcl.G2;
    mskl: mcl.Fr;
    info: Uint8Array;
    nonce1: Uint8Array;
    nonce2: Uint8Array;
    ctxtha: Uint8Array;
}

export interface IEntProof {
    nonce1: Uint8Array;
    nonce2: Uint8Array;
}

export interface ILocationData {
    ent: mcl.G2;
    piEnt: IEntProof;
    mtr: IMasterTrace;
}

export interface IPreTrace {
    id: Uint8Array;
    ctxtha: Uint8Array;
    pskidl: mcl.G1;
}

export interface ITraceProof {
    mpk: mcl.G2;
    nonce1: Uint8Array;
    nonce2: Uint8Array;
}

export interface ITrace {
    id: Uint8Array;
    skid: mcl.G1;
}
