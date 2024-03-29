import mcl from 'mcl-wasm';
import {IEncryptedData} from '../v2';
import {crowdnotifier_v3} from './messages';

export interface IOrganizerData extends IOrganizerPublic {
    mskO: mcl.Fr;
}

export interface IOrganizerPublic {
    mpk: mcl.G2;
    ctxtha: Uint8Array;
}

export interface IMasterTrace {
    mpk: mcl.G2;
    mskl: mcl.Fr;
    info: Uint8Array;
    nonce1: Uint8Array;
    nonce2: Uint8Array;
    ctxtha: Uint8Array;
}

export interface IEntryProof {
    nonce1: Uint8Array;
    nonce2: Uint8Array;
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

export interface ILocationData {
    qrCodePayload: crowdnotifier_v3.QRCodePayload;
    qrCodeTrace: crowdnotifier_v3.QRCodeTrace;
}

export interface ITrace {
    id: Uint8Array;
    skid: mcl.G1;
}

export interface VenueInfo {
    description: string;
    address: string;
    notificationKey?: Uint8Array;
    publicKey: Uint8Array;
    nonce1: Uint8Array;
    nonce2: Uint8Array;
    validFrom?: number | Long; // seconds since epoch
    validTo?: number | Long; // seconds since epoch
    qrCodePayload?: Uint8Array;
    countryData: Uint8Array;
}

export interface CryptoData {
    noncePreId: Uint8Array;
    nonceTimekey: Uint8Array;
    notificationKey: Uint8Array;
}

export interface MessagePayload {
    arrivalTime: number; // in seconds since epoch
    departureTime: number; // in seconds since epoch
    notificationKey?: Uint8Array;
}

export interface EncryptedVenueVisit {
    id?: number;
    date: number; // in seconds since epoch
    ibeCiphertextEntries: Array<IEncryptedData>;
}

export interface ExposureEvent {
    id?: number;
    startTimestamp: number; // in seconds since epoch
    endTimestamp: number; // in seconds since epoch
    message: string;
    countryData: Uint8Array;
}
