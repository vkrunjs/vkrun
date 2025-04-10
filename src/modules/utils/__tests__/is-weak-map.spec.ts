import { isWeakMap } from "../is-weak-map";

describe("isWeakMap", () => {
  it("should return true for a WeakMap", () => {
    const weakMap = new WeakMap();
    const obj1 = {};
    const obj2 = {};
    weakMap.set(obj1, "value");
    expect(isWeakMap(weakMap)).toBeTruthy();
  });

  it("should return false for a regular Map", () => {
    const map = new Map();
    map.set("key", "value");
    expect(isWeakMap(map)).toBeFalsy();
  });

  it("should return false for a regular object", () => {
    const obj = { key: "value" };
    expect(isWeakMap(obj)).toBeFalsy();
  });

  it("should return false for an array", () => {
    const array = [1, 2, 3];
    expect(isWeakMap(array)).toBeFalsy();
  });

  it("should return false for null", () => {
    const nullValue = null;
    expect(isWeakMap(nullValue)).toBeFalsy();
  });

  it("should return false for undefined", () => {
    const undefinedValue = undefined;
    expect(isWeakMap(undefinedValue)).toBeFalsy();
  });

  it("should return false for a number", () => {
    const number = 42;
    expect(isWeakMap(number)).toBeFalsy();
  });

  it("should return false for a string", () => {
    const string = "Hello World";
    expect(isWeakMap(string)).toBeFalsy();
  });

  it("should return false for a boolean", () => {
    const booleanValue = true;
    expect(isWeakMap(booleanValue)).toBeFalsy();
  });

  it("should return false for a Set", () => {
    const set = new Set([1, 2, 3]);
    expect(isWeakMap(set)).toBeFalsy();
  });

  it("should return false for a WeakSet", () => {
    const weakSet = new WeakSet();
    const obj = {};
    weakSet.add(obj);
    expect(isWeakMap(weakSet)).toBeFalsy();
  });
});
