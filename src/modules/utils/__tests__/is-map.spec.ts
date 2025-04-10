import { isMap } from "../is-map";

describe("isMap", () => {
  it("should return true only for a Map", () => {
    expect(isMap(new Map())).toBeTruthy();
    expect(
      isMap(
        new Map([
          [1, "one"],
          [2, "two"],
        ]),
      ),
    ).toBeTruthy();
  });

  it("should return false for non-Map values", () => {
    expect(isMap([])).toBeFalsy(); // Array
    expect(isMap({})).toBeFalsy(); // Object
    expect(isMap(new Set())).toBeFalsy(); // Set
    expect(isMap(new WeakMap())).toBeFalsy(); // WeakMap
    expect(isMap(new WeakSet())).toBeFalsy(); // WeakSet
    expect(isMap(null)).toBeFalsy(); // null
    expect(isMap(undefined)).toBeFalsy(); // undefined
    expect(isMap(42)).toBeFalsy(); // Number
    expect(isMap("map")).toBeFalsy(); // String
    expect(isMap(true)).toBeFalsy(); // Boolean
    expect(isMap(() => {})).toBeFalsy(); // Function
    expect(isMap(Symbol("map"))).toBeFalsy(); // Symbol
    expect(isMap(new Int8Array())).toBeFalsy(); // TypedArray
    expect(isMap(new ArrayBuffer(10))).toBeFalsy(); // ArrayBuffer
    expect(isMap(Object.create(null))).toBeFalsy(); // Object without prototype
  });
});
