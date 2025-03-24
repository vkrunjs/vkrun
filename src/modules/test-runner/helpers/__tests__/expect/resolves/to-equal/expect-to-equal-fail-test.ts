import { describe, expect, it } from "../../../../..";

describe("Expect resolves.toEqual Method - Failure Cases", () => {
  it("should fail when numbers are not equal", async () => {
    await expect(Promise.resolve(42)).resolves.toEqual(43);
  });

  it("should fail when strings are not equal", async () => {
    await expect(Promise.resolve("hello")).resolves.toEqual("world");
  });

  it("should fail when arrays with different elements are not equal", async () => {
    await expect(Promise.resolve([1, 2, 3])).resolves.toEqual([4, 5, 6]);
  });

  it("should fail when objects with different properties are not equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 2, b: 3 };
    await expect(Promise.resolve(obj1)).resolves.toEqual(obj2);
  });

  it("should fail when nested objects are not deeply equal", async () => {
    const obj1 = { a: { b: { c: 2 } } };
    const obj2 = { a: { b: { c: 3 } } };
    await expect(Promise.resolve(obj1)).resolves.toEqual(obj2);
  });

  it("should fail when arrays with different nested objects are not equal", async () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }];
    const arr2 = [{ a: 2, b: 3 }, { c: 4 }];
    await expect(Promise.resolve(arr1)).resolves.toEqual(arr2);
  });

  it("should fail when booleans are not equal", async () => {
    await expect(Promise.resolve(true)).resolves.toEqual(false);
  });

  it("should fail when undefined is not equal to undefined", async () => {
    const undefinedVar = "defined";
    await expect(Promise.resolve(undefinedVar)).resolves.toEqual(undefined);
  });

  it("should fail when null is not equal to null", async () => {
    await expect(Promise.resolve(undefined)).resolves.toEqual(null);
  });

  it("should fail when NaN is not equal to NaN using Object.is for strict equality", async () => {
    await expect(Promise.resolve(NaN)).resolves.toEqual("NaN");
  });

  it("should fail when objects with different key orders are not equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, b: 2, a: 1 };
    await expect(Promise.resolve(obj1)).resolves.toEqual(obj2);
  });

  it("should fail when objects with arrays as values are not equal", async () => {
    const obj1 = { a: [1, 2], b: [3, 4] };
    const obj2 = { a: [4, 5], b: [6, 7] };
    await expect(Promise.resolve(obj1)).resolves.toEqual(obj2);
  });

  it("should fail when functions are not equal", async () => {
    const fn1 = async () => {};
    const fn2 = async () => {
      console.log("hello");
    };
    await expect(Promise.resolve(fn1)).resolves.toEqual(fn2);
  });

  it("should fail when dates are not equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 2, 1);
    await expect(Promise.resolve(date1)).resolves.toEqual(date2);
  });

  it("should fail when buffers are not equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("world");
    await expect(Promise.resolve(buffer1)).resolves.toEqual(buffer2);
  });
});
