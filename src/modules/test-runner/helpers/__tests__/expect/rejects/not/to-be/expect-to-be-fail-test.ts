import { describe, expect, it } from "../../../../../..";

describe("Expect rejects.not.toBe Method - Failure Cases", () => {
  it("should fail when received is not a promise", async () => {
    await expect(42).rejects.not.toBe(42);
  });

  it("should fail when promise resolved instead of rejected", async () => {
    await expect(Promise.resolve(42)).rejects.not.toBe(42);
  });

  it("should fail when numbers are equal", async () => {
    await expect(Promise.reject(42)).rejects.not.toBe(42);
  });

  it("should fail when strings are equal", async () => {
    await expect(Promise.reject("hello")).rejects.not.toBe("hello");
  });

  it("should fail when booleans are equal", async () => {
    await expect(Promise.reject(true)).rejects.not.toBe(true);
    await expect(Promise.reject(false)).rejects.not.toBe(false);
  });

  it("should fail when undefined is equal to a defined value", async () => {
    const undefinedVar = undefined;
    await expect(Promise.reject(undefinedVar)).rejects.not.toBe(undefinedVar);
  });

  it("should fail when null is equal to a non-null value", async () => {
    await expect(Promise.reject(null)).rejects.not.toBe(null);
  });

  it("should fail when NaN is equal to a number", async () => {
    await expect(Promise.reject(NaN)).rejects.not.toBe(NaN);
  });

  it("should fail when objects with the same reference are equal", async () => {
    const obj1 = { a: 1 };
    const obj2 = obj1;
    await expect(Promise.reject(obj1)).rejects.not.toBe(obj2);
  });

  it("should fail when functions with the same reference are equal", async () => {
    const fn1 = async () => {};
    const fn2 = fn1;
    await expect(Promise.reject(fn1)).rejects.not.toBe(fn2);
  });

  it("should fail when arrays with the same reference are equal", async () => {
    const arr1 = [1, 2, 3];
    const arr2 = arr1;
    await expect(Promise.reject(arr1)).rejects.not.toBe(arr2);
  });

  it("should fail when dates with the same reference are equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = date1;
    await expect(Promise.reject(date1)).rejects.not.toBe(date2);
  });

  it("should fail when buffers with the same reference are equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = buffer1;
    await expect(Promise.reject(buffer1)).rejects.not.toBe(buffer2);
  });

  it("should fail when symbols with the same reference are equal", async () => {
    const symbol1 = Symbol("example");
    const symbol2 = symbol1;
    await expect(Promise.reject(symbol1)).rejects.not.toBe(symbol2);
  });

  it("should fail when two Map objects with the same content are equal", async () => {
    const map1 = new Map();
    const map2 = map1;
    map1.set("key1", "value1");

    await expect(Promise.reject(map1)).rejects.not.toBe(map2);
  });

  it("should fail when two WeakMap objects with the same content are equal", async () => {
    const weakMap1 = new WeakMap();
    const weakMap2 = weakMap1;
    const obj = { key: "content" };
    weakMap1.set(obj, "value");
    await expect(Promise.reject(weakMap1)).rejects.not.toBe(weakMap2);
  });

  it("should fail when two WeakSet objects with the same content are equal", async () => {
    const weakSet1 = new WeakSet();
    const weakSet2 = weakSet1;
    const obj = { key: "content" };
    weakSet1.add(obj);
    await expect(Promise.reject(weakSet1)).rejects.not.toBe(weakSet2);
  });

  it("should fail when two ArrayBuffer objects with the same content are equal", async () => {
    const buffer1 = new ArrayBuffer(8);
    const buffer2 = buffer1;
    await expect(Promise.reject(buffer1)).rejects.not.toBe(buffer2);
  });

  it("should fail when two BigInt values are equal", async () => {
    const bigInt1 = BigInt(123);
    const bigInt2 = bigInt1;
    await expect(Promise.reject(bigInt1)).rejects.not.toBe(bigInt2);
  });

  it("should fail when rejected data is equal to the wrong value", async () => {
    const fetchData = async () => {
      return new Promise((_resolve, reject) => {
        setTimeout(() => {
          reject("true");
        }, 5);
      });
    };

    await expect(fetchData).rejects.not.toBe("true");
  });

  it("should fail when promise rejects with unexpected value", async () => {
    const fetchData = async () => {
      return new Promise((_resolve, reject) => {
        setTimeout(() => {
          reject("false");
        }, 5);
      });
    };

    await expect(fetchData).rejects.not.toBe("false");
  });
});
