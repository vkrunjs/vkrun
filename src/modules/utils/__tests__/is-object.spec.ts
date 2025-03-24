import { isObject } from "../is-object";

describe("isObject", () => {
  it("Should return true for object", () => {
    expect(isObject({})).toBeTruthy();
  });

  it("Should return true for non-empty object", () => {
    expect(isObject({ a: 1 })).toBeTruthy();
  });

  it("Should return true for object with nested objects", () => {
    expect(isObject({ a: { b: 2 } })).toBeTruthy();
  });

  it("Should return false for array", () => {
    expect(isObject([1, 2, 3])).toBeFalsy();
  });

  it("Should return false for string", () => {
    expect(isObject("hello")).toBeFalsy();
  });

  it("Should return false for number", () => {
    expect(isObject(123)).toBeFalsy();
  });

  it("Should return false for boolean", () => {
    expect(isObject(true)).toBeFalsy();
  });

  it("Should return false for null", () => {
    expect(isObject(null)).toBeFalsy();
  });

  it("Should return false for undefined", () => {
    expect(isObject(undefined)).toBeFalsy();
  });

  it("Should return false for function", () => {
    expect(isObject(() => {})).toBeFalsy();
  });

  it("Should return false for symbol", () => {
    expect(isObject(Symbol("test"))).toBeFalsy();
  });
});
