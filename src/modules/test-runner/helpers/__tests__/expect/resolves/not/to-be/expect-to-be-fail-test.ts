import { describe, expect, it } from "../../../../../..";

describe("Expect resolves.not.toBe Method - Failure Cases", () => {
  it("should fail when received is a non-promise value", async () => {
    await expect(42).resolves.not.toBe(42);
  });

  it("should fail when the promise is rejected instead of resolved", async () => {
    await expect(Promise.reject(42)).resolves.not.toBe(42);
  });

  it("should fail when the resolved value is the same number", async () => {
    await expect(Promise.resolve(42)).resolves.not.toBe(42);
  });

  it("should fail when the resolved value is the same string", async () => {
    await expect(Promise.resolve("hello")).resolves.not.toBe("hello");
  });

  it("should fail when the resolved value is the same boolean", async () => {
    await expect(Promise.resolve(true)).resolves.not.toBe(true);
  });

  it("should fail when the resolved value is undefined", async () => {
    const undefinedVar = undefined;
    await expect(Promise.resolve(undefinedVar)).resolves.not.toBe(undefinedVar);
  });

  it("should fail when the resolved value is null", async () => {
    await expect(Promise.resolve(null)).resolves.not.toBe(null);
  });

  it("should fail when the resolved value is NaN", async () => {
    await expect(Promise.resolve(NaN)).resolves.not.toBe(NaN);
  });

  it("should fail when the resolved object is the same reference", async () => {
    const obj = { a: 1 };
    await expect(Promise.resolve(obj)).resolves.not.toBe(obj);
  });

  it("should fail when the resolved function is the same reference", async () => {
    const fn = async () => {};
    await expect(Promise.resolve(fn)).resolves.not.toBe(fn);
  });

  it("should fail when the resolved array is the same reference", async () => {
    const arr = [1, 2, 3];
    await expect(Promise.resolve(arr)).resolves.not.toBe(arr);
  });

  it("should fail when the resolved date is the same reference", async () => {
    const date = new Date(2023, 1, 1);
    await expect(Promise.resolve(date)).resolves.not.toBe(date);
  });

  it("should fail when the resolved buffer is the same reference", async () => {
    const buffer = Buffer.from("hello");
    await expect(Promise.resolve(buffer)).resolves.not.toBe(buffer);
  });

  it("should fail when the resolved symbol is the same reference", async () => {
    const symbol = Symbol("example");
    await expect(Promise.resolve(symbol)).resolves.not.toBe(symbol);
  });

  it("should fail when the resolved Map is the same reference", async () => {
    const map = new Map();
    map.set("key1", "value1");
    await expect(Promise.resolve(map)).resolves.not.toBe(map);
  });

  it("should fail when the resolved WeakMap is the same reference", async () => {
    const weakMap = new WeakMap();
    const obj = { key: "content" };
    weakMap.set(obj, "value");
    await expect(Promise.resolve(weakMap)).resolves.not.toBe(weakMap);
  });

  it("should fail when the resolved WeakSet is the same reference", async () => {
    const weakSet = new WeakSet();
    const obj = { key: "content" };
    weakSet.add(obj);
    await expect(Promise.resolve(weakSet)).resolves.not.toBe(weakSet);
  });

  it("should fail when the resolved ArrayBuffer is the same reference", async () => {
    const buffer = new ArrayBuffer(8);
    await expect(Promise.resolve(buffer)).resolves.not.toBe(buffer);
  });

  it("should fail when the resolved BigInt is the same value", async () => {
    const bigInt = BigInt(123);
    await expect(Promise.resolve(bigInt)).resolves.not.toBe(bigInt);
  });

  it("should fail when the promise resolves to the expected value after a delay", async () => {
    const fetchData = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 5);
      });
    };
    await expect(fetchData()).resolves.not.toBe(true);
  });
});
