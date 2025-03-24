import { isRegExp } from "../is-reg-exp";

describe("isRegExp", () => {
  it("should return true only for a RegExp", () => {
    expect(isRegExp(/abc/)).toBeTruthy();
    expect(isRegExp(new RegExp("abc"))).toBeTruthy();
  });

  it("should return false for non-RegExp values", () => {
    expect(isRegExp("abc")).toBeFalsy(); // String
    expect(isRegExp(42)).toBeFalsy(); // Number
    expect(isRegExp({})).toBeFalsy(); // Object
    expect(isRegExp([])).toBeFalsy(); // Array
    expect(isRegExp(null)).toBeFalsy(); // null
    expect(isRegExp(undefined)).toBeFalsy(); // undefined
    expect(isRegExp(true)).toBeFalsy(); // Boolean
    expect(isRegExp(() => {})).toBeFalsy(); // Function
    expect(isRegExp(new Date())).toBeFalsy(); // Date
    expect(isRegExp(new Map())).toBeFalsy(); // Map
    expect(isRegExp(new Set())).toBeFalsy(); // Set
    expect(isRegExp(Symbol("abc"))).toBeFalsy(); // Symbol
    expect(isRegExp(new Int8Array())).toBeFalsy(); // TypedArray
  });
});
