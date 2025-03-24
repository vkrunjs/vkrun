import { describe, expect, it } from "../../../../..";

describe("Expect rejects.toEqual Method - Success Cases", () => {
  it("should check if numbers are equal", async () => {
    await expect(Promise.reject(42)).rejects.toEqual(42);
  });

  it("should check if strings are equal", async () => {
    await expect(Promise.reject("hello")).rejects.toEqual("hello");
  });

  it("should check if arrays with identical elements are equal", async () => {
    await expect(Promise.reject([1, 2, 3])).rejects.toEqual([1, 2, 3]);
  });

  it("should check if objects with identical properties are equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    await expect(Promise.reject(obj1)).rejects.toEqual(obj2);
  });

  it("should check if nested objects are deeply equal", async () => {
    const obj1 = { a: { b: { c: 2 } } };
    const obj2 = { a: { b: { c: 2 } } };
    await expect(Promise.reject(obj1)).rejects.toEqual(obj2);
  });

  it("should check if arrays with nested objects are equal", async () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }];
    const arr2 = [{ a: 1, b: 2 }, { c: 3 }];
    await expect(Promise.reject(arr1)).rejects.toEqual(arr2);
  });

  it("should check if booleans are equal", async () => {
    await expect(Promise.reject(true)).rejects.toEqual(true);
    await expect(Promise.reject(false)).rejects.toEqual(false);
  });

  it("should check if undefined is equal to undefined", async () => {
    let undefinedVar;
    await expect(Promise.reject(undefinedVar)).rejects.toEqual(undefined);
  });

  it("should check if null is equal to null", async () => {
    await expect(Promise.reject(null)).rejects.toEqual(null);
  });

  it("should check if NaN is equal to NaN using Object.is for strict equality", async () => {
    await expect(Promise.reject(NaN)).rejects.toEqual(NaN);
  });

  it("should check if objects with different key order are still equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 2, a: 1 };
    await expect(Promise.reject(obj1)).rejects.toEqual(obj2);
  });

  it("should check if objects with arrays as values are equal", async () => {
    const obj1 = { a: [1, 2], b: [3, 4] };
    const obj2 = { a: [1, 2], b: [3, 4] };
    await expect(Promise.reject(obj1)).rejects.toEqual(obj2);
  });

  it("should check if functions are equal", async () => {
    const fn1 = async () => {};
    const fn2 = fn1;
    await expect(Promise.reject(fn1)).rejects.toEqual(fn2);
  });

  it("should check if dates are equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 1, 1);
    await expect(Promise.reject(date1)).rejects.toEqual(date2);
  });

  it("should check if buffers are equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("hello");
    await expect(Promise.reject(buffer1)).rejects.toEqual(buffer2);
  });
});
