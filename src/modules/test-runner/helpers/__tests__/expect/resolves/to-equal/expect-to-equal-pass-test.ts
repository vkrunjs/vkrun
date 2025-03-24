import { describe, expect, it } from "../../../../..";

describe("Expect resolves.toEqual Method - Success Cases", () => {
  it("should check if numbers are equal", async () => {
    await expect(Promise.resolve(42)).resolves.toEqual(42);
  });

  it("should check if strings are equal", async () => {
    await expect(Promise.resolve("hello")).resolves.toEqual("hello");
  });

  it("should check if arrays with identical elements are equal", async () => {
    await expect(Promise.resolve([1, 2, 3])).resolves.toEqual([1, 2, 3]);
  });

  it("should check if objects with identical properties are equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    await expect(Promise.resolve(obj1)).resolves.toEqual(obj2);
  });

  it("should check if nested objects are deeply equal", async () => {
    const obj1 = { a: { b: { c: 2 } } };
    const obj2 = { a: { b: { c: 2 } } };
    await expect(Promise.resolve(obj1)).resolves.toEqual(obj2);
  });

  it("should check if arrays with nested objects are equal", async () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }];
    const arr2 = [{ a: 1, b: 2 }, { c: 3 }];
    await expect(Promise.resolve(arr1)).resolves.toEqual(arr2);
  });

  it("should check if booleans are equal", async () => {
    await expect(Promise.resolve(true)).resolves.toEqual(true);
    await expect(Promise.resolve(false)).resolves.toEqual(false);
  });

  it("should check if undefined is equal to undefined", async () => {
    let undefinedVar;
    await expect(Promise.resolve(undefinedVar)).resolves.toEqual(undefined);
  });

  it("should check if null is equal to null", async () => {
    await expect(Promise.resolve(null)).resolves.toEqual(null);
  });

  it("should check if NaN is equal to NaN using Object.is for strict equality", async () => {
    await expect(Promise.resolve(NaN)).resolves.toEqual(NaN);
  });

  it("should check if objects with different key order are still equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 2, a: 1 };
    await expect(Promise.resolve(obj1)).resolves.toEqual(obj2);
  });

  it("should check if objects with arrays as values are equal", async () => {
    const obj1 = { a: [1, 2], b: [3, 4] };
    const obj2 = { a: [1, 2], b: [3, 4] };
    await expect(Promise.resolve(obj1)).resolves.toEqual(obj2);
  });

  it("should check if functions are equal", async () => {
    const fn1 = async () => {};
    const fn2 = fn1;
    await expect(Promise.resolve(fn1)).resolves.toEqual(fn2);
  });

  it("should check if dates are equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 1, 1);
    await expect(Promise.resolve(date1)).resolves.toEqual(date2);
  });

  it("should check if buffers are equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("hello");
    await expect(Promise.resolve(buffer1)).resolves.toEqual(buffer2);
  });
});
