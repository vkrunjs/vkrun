import { isWeakSet } from "../is-weak-set";

describe("isWeakSet", () => {
  it("should return true for a WeakSet", () => {
    const weakSet = new WeakSet();
    const obj1 = {};
    const obj2 = {};
    weakSet.add(obj1);
    weakSet.add(obj2);
    expect(isWeakSet(weakSet)).toBeTruthy();
  });

  it("should return false for a regular Set", () => {
    const set = new Set([1, 2, 3]);
    expect(isWeakSet(set)).toBeFalsy();
  });

  it("should return false for a regular object", () => {
    const obj = { key: "value" };
    expect(isWeakSet(obj)).toBeFalsy();
  });

  it("should return false for an array", () => {
    const array = [1, 2, 3];
    expect(isWeakSet(array)).toBeFalsy();
  });

  it("should return false for null", () => {
    const nullValue = null;
    expect(isWeakSet(nullValue)).toBeFalsy();
  });

  it("should return false for undefined", () => {
    const undefinedValue = undefined;
    expect(isWeakSet(undefinedValue)).toBeFalsy();
  });

  it("should return false for a number", () => {
    const number = 42;
    expect(isWeakSet(number)).toBeFalsy();
  });

  it("should return false for a string", () => {
    const string = "Hello World";
    expect(isWeakSet(string)).toBeFalsy();
  });

  it("should return false for a boolean", () => {
    const booleanValue = true;
    expect(isWeakSet(booleanValue)).toBeFalsy();
  });

  it("should return false for a WeakMap", () => {
    const weakMap = new WeakMap();
    const obj = {};
    weakMap.set(obj, "value");
    expect(isWeakSet(weakMap)).toBeFalsy();
  });
});
