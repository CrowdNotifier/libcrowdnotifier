declare module "mcl-wasm" {

    export const BN254 = 0;
    export const BN381_1 = 1;
    export const BN381_2 = 2;
    export const BN462 = 3;
    export const BN_SNARK1 = 4;
    export const BLS12_381 = 5;

    export function init(b: number): Promise<undefined>;

    export function add(a: Fr, b: Fr): Fr;
    export function add(a: G1, b: G1): G1;
    export function add(a: G2, b: G2): G2;
    export function add(a: GT, b: GT): GT;

    export function mul(a: Fr, b: Fr): Fr;
    export function mul(a: G1, b: Fr): G1;
    export function mul(a: G2, b: Fr): G2;
    export function mul(a: GT, b: Fr): GT;

    export function pow(a: GT, b: Fr): GT;

    export function hashAndMapToG1(s: string | Uint8Array): G1;

    export function pairing(g1: G1, g2: G2): GT;

    class common {
        deserializeHexStr(s: string): void;

        serializeToHexStr(): string;

        dump(msg: string): void;

        clear(): void;
    }

    class basicFG extends common {
        deserialize(s: Uint8Array): void;

        serialize(): Uint8Array;

        setStr(s: string, base?: number): void;

        getStr(base: number): void;

        isZero(): boolean;

        isEqual(rhs: basicFG): boolean;
    }

    class basicF extends basicFG {
        isOne(): boolean;

        setLittleEndian(s: Uint8Array): void;

        setLittleEndianMod(s: Uint8Array): void;

        setBigEndianMod(s: Uint8Array): void;

        setByCSPRNG(): void;

        setInt(x: number): void;

        setHashOf(s: Uint8Array): void;
    }

    class group extends basicFG {
        normalize(): void;

        isValid(): boolean;

        isValidOrder(): boolean;

        setHashOf(s: Uint8Array): void;

        getX(): number[];

        getY(): number[];

        getZ(): number[];

        setX(v: number[]): void;

        setY(v: number[]): void;

        setZ(v: number[]): void;
    }

    export class Fr extends basicF {
        setByCSPRNG(): void;
    }

    export class Fp extends basicF {
    }

    export class G1 extends group {
    }

    export class G2 extends group {
    }

    export class GT extends group {
    }
}
