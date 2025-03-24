import { describe, expect, it } from "../../../../../..";

describe("Expect rejects.not.toEqual Method - Failure Cases", () => {
  it("should fail when numbers are equal", async () => {
    await expect(Promise.reject(42)).rejects.not.toEqual(42);
  });

  it("should fail when strings are equal", async () => {
    await expect(Promise.reject("hello")).rejects.not.toEqual("hello");
  });

  it("should fail when arrays with identical elements are equal", async () => {
    await expect(Promise.reject([1, 2, 3])).rejects.not.toEqual([1, 2, 3]);
  });

  it("should fail when objects with identical properties are equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    await expect(Promise.reject(obj1)).rejects.not.toEqual(obj2);
  });

  it("should fail when nested objects are deeply equal", async () => {
    const obj1 = { a: { b: { c: 2 } } };
    const obj2 = { a: { b: { c: 2 } } };
    await expect(Promise.reject(obj1)).rejects.not.toEqual(obj2);
  });

  it("should fail when arrays with nested objects are equal", async () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }];
    const arr2 = [{ a: 1, b: 2 }, { c: 3 }];
    await expect(Promise.reject(arr1)).rejects.not.toEqual(arr2);
  });

  it("should fail when booleans are equal", async () => {
    await expect(Promise.reject(true)).rejects.not.toEqual(true);
    await expect(Promise.reject(false)).rejects.not.toEqual(false);
  });

  it("should fail when undefined is equal to undefined", async () => {
    let undefinedVar;
    await expect(Promise.reject(undefinedVar)).rejects.not.toEqual(undefined);
  });

  it("should fail when null is equal to null", async () => {
    await expect(Promise.reject(null)).rejects.not.toEqual(null);
  });

  it("should fail when NaN is equal to NaN using for strict equality", async () => {
    await expect(Promise.reject(NaN)).rejects.not.toEqual(NaN);
  });

  it("should fail when objects with different key order are still equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 2, a: 1 };
    await expect(Promise.reject(obj1)).rejects.not.toEqual(obj2);
  });

  it("should fail when objects with arrays as values are equal", async () => {
    const obj1 = { a: [1, 2], b: [3, 4] };
    const obj2 = { a: [1, 2], b: [3, 4] };
    await expect(Promise.reject(obj1)).rejects.not.toEqual(obj2);
  });

  it("should fail when functions are equal", async () => {
    const fn1 = async () => {};
    const fn2 = fn1;
    await expect(Promise.reject(fn1)).rejects.not.toEqual(fn2);
  });

  it("should fail when dates are equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 1, 1);
    await expect(Promise.reject(date1)).rejects.not.toEqual(date2);
  });

  it("should fail when buffers are equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("hello");
    await expect(Promise.reject(buffer1)).rejects.not.toEqual(buffer2);
  });
});
