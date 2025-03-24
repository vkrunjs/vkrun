import { isSet } from "../is-set";

describe("isSet", () => {
  it("should return true only for a Set", () => {
    expect(isSet(new Set())).toBeTruthy();
    expect(isSet(new Set([1, 2, 3]))).toBeTruthy();
    expect(isSet(new Set(["a", "b", "c"]))).toBeTruthy();
  });

  it("should return false for non-Set values", () => {
    expect(isSet([])).toBeFalsy(); // Array
    expect(isSet({})).toBeFalsy(); // Object
    expect(isSet(new Map())).toBeFalsy(); // Map
    expect(isSet(new WeakSet())).toBeFalsy(); // WeakSet
    expect(isSet(new WeakMap())).toBeFalsy(); // WeakMap
    expect(isSet(null)).toBeFalsy(); // null
    expect(isSet(undefined)).toBeFalsy(); // undefined
    expect(isSet(42)).toBeFalsy(); // Number
    expect(isSet("set")).toBeFalsy(); // String
    expect(isSet(true)).toBeFalsy(); // Boolean
    expect(isSet(() => {})).toBeFalsy(); // Function
    expect(isSet(Symbol("set"))).toBeFalsy(); // Symbol
    expect(isSet(new Int8Array())).toBeFalsy(); // TypedArray
    expect(isSet(new ArrayBuffer(10))).toBeFalsy(); // ArrayBuffer
    expect(isSet(Object.create(null))).toBeFalsy(); // Object without prototype
  });
});
