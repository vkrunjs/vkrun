import { describe, expect, it } from "../../../../..";

describe("Expect resolves.toBe Method - Failure Cases", () => {
  it("should fail when received is not a promise", async () => {
    await expect(42).resolves.toBe(43);
  });

  it("should fail when promise rejected instead of resolved", async () => {
    await expect(Promise.reject(42)).resolves.toBe(43);
  });

  it("should fail when numbers are not equal", async () => {
    await expect(Promise.resolve(42)).resolves.toBe(43);
  });

  it("should fail when strings are not equal", async () => {
    await expect(Promise.resolve("hello")).resolves.toBe("world");
  });

  it("should fail when booleans are not equal", async () => {
    await expect(Promise.resolve(true)).resolves.toBe(false);
  });

  it("should fail when undefined is not equal to a defined value", async () => {
    const undefinedVar = undefined;
    await expect(Promise.resolve(undefinedVar)).resolves.toBe(42);
  });

  it("should fail when null is not equal to a non-null value", async () => {
    await expect(Promise.resolve(null)).resolves.toBe(42);
  });

  it("should fail when NaN is not equal to a number", async () => {
    await expect(Promise.resolve(NaN)).resolves.toBe(42);
  });

  it("should fail when objects with different references are not equal", async () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    await expect(Promise.resolve(obj1)).resolves.toBe(obj2);
  });

  it("should fail when functions with different references are not equal", async () => {
    const fn1 = async () => {};
    const fn2 = async () => {};
    await expect(Promise.resolve(fn1)).resolves.toBe(fn2);
  });

  it("should fail when arrays with different references are not equal", async () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    await expect(Promise.resolve(arr1)).resolves.toBe(arr2);
  });

  it("should fail when dates with different references are not equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 1, 1);
    await expect(Promise.resolve(date1)).resolves.toBe(date2);
  });

  it("should fail when buffers with different references are not equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("hello");
    await expect(Promise.resolve(buffer1)).resolves.toBe(buffer2);
  });

  it("should fail when symbols with different references are compared", async () => {
    const symbol1 = Symbol("example");
    const symbol2 = Symbol("example");
    await expect(Promise.resolve(symbol1)).resolves.toBe(symbol2);
  });

  it("should fail when two Map objects with the same content are compared", async () => {
    const map1 = new Map();
    const map2 = new Map();
    map1.set("key1", "value1");
    map2.set("key1", "value1");
    await expect(Promise.resolve(map1)).resolves.toBe(map2);
  });

  it("should fail when two WeakMap objects with the same content are compared", async () => {
    const weakMap1 = new WeakMap();
    const weakMap2 = new WeakMap();
    const obj = { key: "content" };
    weakMap1.set(obj, "value");
    weakMap2.set(obj, "value");
    await expect(Promise.resolve(weakMap1)).resolves.toBe(weakMap2);
  });

  it("should fail when two WeakSet objects with the same content are compared", async () => {
    const weakSet1 = new WeakSet();
    const weakSet2 = new WeakSet();
    const obj = { key: "content" };
    weakSet1.add(obj);
    weakSet2.add(obj);
    await expect(Promise.resolve(weakSet1)).resolves.toBe(weakSet2);
  });

  it("should fail when two ArrayBuffer objects with the same content are compared", async () => {
    const buffer1 = new ArrayBuffer(8);
    const buffer2 = new ArrayBuffer(8);
    await expect(Promise.resolve(buffer1)).resolves.toBe(buffer2);
  });

  it("should fail when two BigInt values are compared", async () => {
    const bigInt1 = BigInt(123);
    const bigInt2 = BigInt(124);
    await expect(Promise.resolve(bigInt1)).resolves.toBe(bigInt2);
  });

  it("should reject with correct data", async () => {
    const fetchData = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 5);
      });
    };
    await expect(fetchData).resolves.toBe(false);
  });
});
