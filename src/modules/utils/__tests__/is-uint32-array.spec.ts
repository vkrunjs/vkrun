import { isUint32Array } from "../is-uint32-array";

describe("isUint32Array", () => {
  it("should return true for Uint32Array", () => {
    expect(isUint32Array(new Uint32Array([1, 2, 3]))).toBeTruthy();
  });

  it("should return false for non-Uint32Array types", () => {
    expect(isUint32Array([])).toBeFalsy();
    expect(isUint32Array(new ArrayBuffer(8))).toBeFalsy();
    expect(isUint32Array("hello")).toBeFalsy();
    expect(isUint32Array(42)).toBeFalsy();
    expect(isUint32Array(true)).toBeFalsy();
    expect(isUint32Array(new Float32Array([1, 2, 3]))).toBeFalsy();
    expect(isUint32Array(new Uint8Array([1, 2, 3]))).toBeFalsy();
    expect(isUint32Array(new Int8Array([1, 2, 3]))).toBeFalsy();
    expect(isUint32Array(new Int32Array([1, 2, 3]))).toBeFalsy();
    expect(isUint32Array(new BigUint64Array([1n, 2n, 3n]))).toBeFalsy();
    expect(isUint32Array(new BigInt64Array([1n, 2n, 3n]))).toBeFalsy();
    expect(isUint32Array(new DataView(new ArrayBuffer(8)))).toBeFalsy();
    expect(isUint32Array(new SharedArrayBuffer(8))).toBeFalsy();
  });
});
