import { describe, expect, it } from "../../../../../..";

describe("Expect resolves.not.toEqual Method - Failure Cases", () => {
  it("should fail when numbers are equal", async () => {
    await expect(Promise.resolve(42)).resolves.not.toEqual(42);
  });

  it("should fail when strings are equal", async () => {
    await expect(Promise.resolve("hello")).resolves.not.toEqual("hello");
  });

  it("should fail when arrays with identical elements are equal", async () => {
    await expect(Promise.resolve([1, 2, 3])).resolves.not.toEqual([1, 2, 3]);
  });

  it("should fail when objects with identical properties are equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    await expect(Promise.resolve(obj1)).resolves.not.toEqual(obj2);
  });

  it("should fail when nested objects are deeply equal", async () => {
    const obj1 = { a: { b: { c: 2 } } };
    const obj2 = { a: { b: { c: 2 } } };
    await expect(Promise.resolve(obj1)).resolves.not.toEqual(obj2);
  });

  it("should fail when arrays with identical nested objects are equal", async () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }];
    const arr2 = [{ a: 1, b: 2 }, { c: 3 }];
    await expect(Promise.resolve(arr1)).resolves.not.toEqual(arr2);
  });

  it("should fail when booleans are equal", async () => {
    await expect(Promise.resolve(true)).resolves.not.toEqual(true);
  });

  it("should fail when undefined is equal to undefined", async () => {
    const undefinedVar = undefined;
    await expect(Promise.resolve(undefinedVar)).resolves.not.toEqual(undefined);
  });

  it("should fail when null is equal to null", async () => {
    await expect(Promise.resolve(null)).resolves.not.toEqual(null);
  });

  it("should fail when NaN is compared with NaN using Object.is", async () => {
    await expect(Promise.resolve(NaN)).resolves.not.toEqual(NaN);
  });

  it("should fail when objects with same key orders are equal", async () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 3 };
    await expect(Promise.resolve(obj1)).resolves.not.toEqual(obj2);
  });

  it("should fail when objects with arrays as values are equal", async () => {
    const obj1 = { a: [1, 2], b: [3, 4] };
    const obj2 = { a: [1, 2], b: [3, 4] };
    await expect(Promise.resolve(obj1)).resolves.not.toEqual(obj2);
  });

  it("should fail when functions are the same reference", async () => {
    const fn1 = async () => {};
    const fn2 = fn1;
    await expect(Promise.resolve(fn1)).resolves.not.toEqual(fn2);
  });

  it("should fail when dates are equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = date1;
    await expect(Promise.resolve(date1)).resolves.not.toEqual(date2);
  });

  it("should fail when buffers are equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = buffer1;
    await expect(Promise.resolve(buffer1)).resolves.not.toEqual(buffer2);
  });
});
