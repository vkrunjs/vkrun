import { isFloat32Array } from "../is-float32-array";

describe("isFloat32Array", () => {
  it("should return true for Float32Array", () => {
    expect(isFloat32Array(new Float32Array([1.1, 2.2, 3.3]))).toBeTruthy();
  });

  it("should return false for non-Float32Array types", () => {
    expect(isFloat32Array([])).toBeFalsy();
    expect(isFloat32Array(new ArrayBuffer(8))).toBeFalsy();
    expect(isFloat32Array("hello")).toBeFalsy();
    expect(isFloat32Array(42)).toBeFalsy();
    expect(isFloat32Array(true)).toBeFalsy();
    expect(isFloat32Array(new Uint8Array([1, 2, 3]))).toBeFalsy();
    expect(isFloat32Array(new Uint32Array([1, 2, 3]))).toBeFalsy();
    expect(isFloat32Array(new Int8Array([1, 2, 3]))).toBeFalsy();
    expect(isFloat32Array(new Int32Array([1, 2, 3]))).toBeFalsy();
    expect(isFloat32Array(new BigUint64Array([1n, 2n, 3n]))).toBeFalsy();
  });
});
