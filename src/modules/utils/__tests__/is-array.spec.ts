import { isArray } from "../is-array";

describe("isArray", () => {
  it("Should return true for an array", () => {
    expect(isArray([])).toBeTruthy();
    expect(isArray([1, 2, 3])).toBeTruthy();
    expect(isArray(["a", "b", "c"])).toBeTruthy();
  });

  it("Should return false for non-array values", () => {
    expect(isArray(undefined)).toBeFalsy();
    expect(isArray(null)).toBeFalsy();
    expect(isArray(42)).toBeFalsy();
    expect(isArray("array")).toBeFalsy();
    expect(isArray({})).toBeFalsy();
    expect(isArray({ length: 0 })).toBeFalsy();
    expect(isArray(new Set())).toBeFalsy();
    expect(isArray(new Map())).toBeFalsy();
    expect(isArray(() => {})).toBeFalsy();
  });

  it("Should return false for non-common arrays like Uint8Array", () => {
    const uint8Array = new Uint8Array([1, 2, 3]);
    expect(isArray(uint8Array)).toBeFalsy();

    const int8Array = new Int8Array([1, 2, 3]);
    expect(isArray(int8Array)).toBeFalsy();
  });
});
