import { describe, expect, it } from "../../../..";

describe("Expect toBe Method - Success Cases", () => {
  it("should check if numbers are equal", () => {
    expect(42).toBe(42);
  });

  it("should check if strings are equal", () => {
    expect("hello").toBe("hello");
  });

  it("should check if booleans are equal", () => {
    expect(true).toBe(true);
    expect(false).toBe(false);
  });

  it("should check if undefined is equal to undefined", () => {
    const undefinedVar = undefined;
    expect(undefinedVar).toBe(undefined);
  });

  it("should check if null is equal to null", () => {
    expect(null).toBe(null);
  });

  it("should check if NaN is equal to NaN using Object.is for strict equality", () => {
    expect(NaN).toBe(NaN);
  });

  it("should check if objects with identical references are equal", () => {
    const obj = { a: 1 };
    expect(obj).toBe(obj);
  });

  it("should check if functions are equal", () => {
    const fn1 = () => {};
    const fn2 = fn1;
    expect(fn1).toBe(fn2);
  });

  it("should check if arrays with identical references are equal", () => {
    const arr = [1, 2, 3];
    expect(arr).toBe(arr);
  });

  it("should check if dates with identical references are equal", () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = date1;
    expect(date1).toBe(date2);
  });

  it("should check if buffers with identical references are equal", () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = buffer1;
    expect(buffer1).toBe(buffer2);
  });

  it("should pass when comparing the same symbol", () => {
    const symbol1 = Symbol("example");
    const symbol2 = symbol1;
    expect(symbol1).toBe(symbol2);
  });

  it("should check if BigInt values with identical references are equal", () => {
    const bigInt1 = BigInt(123);
    const bigInt2 = bigInt1;
    expect(bigInt1).toBe(bigInt2);
  });

  it("should check if Map objects with identical references are equal", () => {
    const map1 = new Map();
    const map2 = map1;
    map1.set("key1", "value1");
    expect(map1).toBe(map2);
  });

  it("should check if Set objects with identical references are equal", () => {
    const set1 = new Set();
    const set2 = set1;
    set1.add("value1");
    expect(set1).toBe(set2);
  });

  it("should check if WeakMap objects with identical references are equal", () => {
    const weakMap1 = new WeakMap();
    const weakMap2 = weakMap1;
    const obj = { key: "content" };
    weakMap1.set(obj, "value");
    expect(weakMap1).toBe(weakMap2);
  });

  it("should check if WeakSet objects with identical references are equal", () => {
    const weakSet1 = new WeakSet();
    const weakSet2 = weakSet1;
    const obj = { key: "content" };
    weakSet1.add(obj);
    expect(weakSet1).toBe(weakSet2);
  });

  it("should check if ArrayBuffer objects with identical references are equal", () => {
    const buffer1 = new ArrayBuffer(8);
    const buffer2 = buffer1;
    expect(buffer1).toBe(buffer2);
  });
});
