import { describe, expect, it } from "../../../../..";

describe("Expect rejects.toBe Method - Success Cases", () => {
  it("should pass when received is a rejected promise", async () => {
    await expect(Promise.reject(42)).rejects.toBe(42);
  });

  it("should pass when promise is rejected with correct value", async () => {
    await expect(Promise.reject(42)).rejects.toBe(42);
  });

  it("should pass when numbers are equal", async () => {
    await expect(Promise.reject(42)).rejects.toBe(42);
  });

  it("should pass when strings are equal", async () => {
    await expect(Promise.reject("hello")).rejects.toBe("hello");
  });

  it("should pass when booleans are equal", async () => {
    await expect(Promise.reject(true)).rejects.toBe(true);
    await expect(Promise.reject(false)).rejects.toBe(false);
  });

  it("should pass when undefined is equal to undefined", async () => {
    const undefinedVar = undefined;
    await expect(Promise.reject(undefinedVar)).rejects.toBe(undefined);
  });

  it("should pass when null is equal to null", async () => {
    await expect(Promise.reject(null)).rejects.toBe(null);
  });

  it("should pass when NaN is equal to NaN", async () => {
    await expect(Promise.reject(NaN)).rejects.toBe(NaN);
  });

  it("should pass when objects with identical references are equal", async () => {
    const obj = { a: 1 };
    await expect(Promise.reject(obj)).rejects.toBe(obj);
  });

  it("should pass when functions with identical references are equal", async () => {
    const fn1 = async () => {};
    const fn2 = fn1;
    await expect(Promise.reject(fn1)).rejects.toBe(fn2);
  });

  it("should pass when arrays with identical references are equal", async () => {
    const arr = [1, 2, 3];
    await expect(Promise.reject(arr)).rejects.toBe(arr);
  });

  it("should pass when dates with identical references are equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = date1;
    await expect(Promise.reject(date1)).rejects.toBe(date2);
  });

  it("should pass when buffers with identical references are equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = buffer1;
    await expect(Promise.reject(buffer1)).rejects.toBe(buffer2);
  });

  it("should pass when symbols with identical references are compared", async () => {
    const symbol1 = Symbol("example");
    const symbol2 = symbol1;
    await expect(Promise.reject(symbol1)).rejects.toBe(symbol2);
  });

  it("should pass when two Map objects with the same content are compared", async () => {
    const map = new Map();
    map.set("key1", "value1");
    await expect(Promise.reject(map)).rejects.toBe(map);
  });

  it("should pass when two WeakMap objects with the same content are compared", async () => {
    const weakMap = new WeakMap();
    const obj = { key: "content" };
    weakMap.set(obj, "value");
    await expect(Promise.reject(weakMap)).rejects.toBe(weakMap);
  });

  it("should pass when two WeakSet objects with the same content are compared", async () => {
    const weakSet = new WeakSet();
    const obj = { key: "content" };
    weakSet.add(obj);
    await expect(Promise.reject(weakSet)).rejects.toBe(weakSet);
  });

  it("should pass when two ArrayBuffer objects with the same content are compared", async () => {
    const buffer1 = new ArrayBuffer(8);
    const buffer2 = buffer1;
    await expect(Promise.reject(buffer1)).rejects.toBe(buffer2);
  });

  it("should pass when two BigInt values are compared", async () => {
    const bigInt1 = BigInt(123);
    const bigInt2 = bigInt1;
    await expect(Promise.reject(bigInt1)).rejects.toBe(bigInt2);
  });
});
