import { isSharedArrayBuffer } from "../is-shared-array-buffer";

describe("isSharedArrayBuffer", () => {
  it("should return true for SharedArrayBuffer", () => {
    const sab = new SharedArrayBuffer(8);
    expect(isSharedArrayBuffer(sab)).toBeTruthy();
  });

  it("should return false for non-SharedArrayBuffer types", () => {
    expect(isSharedArrayBuffer(new ArrayBuffer(8))).toBeFalsy();
    expect(isSharedArrayBuffer("hello")).toBeFalsy();
    expect(isSharedArrayBuffer(42)).toBeFalsy();
    expect(isSharedArrayBuffer(true)).toBeFalsy();
    expect(isSharedArrayBuffer(new Float32Array([1, 2, 3]))).toBeFalsy();
    expect(isSharedArrayBuffer(new Uint32Array([1, 2, 3]))).toBeFalsy();
    expect(isSharedArrayBuffer(new Uint8Array([1, 2, 3]))).toBeFalsy();
    expect(isSharedArrayBuffer(new Int8Array([1, 2, 3]))).toBeFalsy();
    expect(isSharedArrayBuffer(new Int32Array([1, 2, 3]))).toBeFalsy();
    expect(isSharedArrayBuffer(new BigUint64Array([1n, 2n, 3n]))).toBeFalsy();
    expect(isSharedArrayBuffer(new BigInt64Array([1n, 2n, 3n]))).toBeFalsy();
    expect(isSharedArrayBuffer(new DataView(new ArrayBuffer(8)))).toBeFalsy();
    expect(isSharedArrayBuffer({})).toBeFalsy();
    expect(isSharedArrayBuffer([])).toBeFalsy();
  });
});
