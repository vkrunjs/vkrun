import { describe, expect, it } from "../../../../../..";

describe("Expect resolves.not.toEqual Method - Success Cases", () => {
  it("should check if numbers are not equal", async () => {
    await expect(Promise.resolve(42)).resolves.not.toEqual(43);
  });

  it("should check if strings are not equal", async () => {
    await expect(Promise.resolve("hello")).resolves.not.toEqual("world");
  });

  it("should check if arrays with different elements are not equal", async () => {
    await expect(Promise.resolve([1, 2, 3])).resolves.not.toEqual([4, 5, 6]);
  });

  it("should check if objects with different properties are not equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 2, b: 3 };
    await expect(Promise.resolve(obj1)).resolves.not.toEqual(obj2);
  });

  it("should check if nested objects are not deeply equal", async () => {
    const obj1 = { a: { b: { c: 2 } } };
    const obj2 = { a: { b: { c: 3 } } };
    await expect(Promise.resolve(obj1)).resolves.not.toEqual(obj2);
  });

  it("should check if arrays with nested objects are not equal", async () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }];
    const arr2 = [{ a: 2, b: 3 }, { c: 4 }];
    await expect(Promise.resolve(arr1)).resolves.not.toEqual(arr2);
  });

  it("should check if booleans are not equal", async () => {
    await expect(Promise.resolve(true)).resolves.not.toEqual(false);
    await expect(Promise.resolve(false)).resolves.not.toEqual(true);
  });

  it("should check if undefined is not equal to a defined value", async () => {
    let undefinedVar;
    await expect(Promise.resolve(undefinedVar)).resolves.not.toEqual("defined");
  });

  it("should check if null is not equal to undefined", async () => {
    await expect(Promise.resolve(null)).resolves.not.toEqual(undefined);
  });

  it("should check if NaN is not equal to a string 'NaN'", async () => {
    await expect(Promise.resolve(NaN)).resolves.not.toEqual("NaN");
  });

  it("should check if objects with different key orders are not equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, b: 2, a: 1 };
    await expect(Promise.resolve(obj1)).resolves.not.toEqual(obj2);
  });

  it("should check if objects with arrays as values are not equal", async () => {
    const obj1 = { a: [1, 2], b: [3, 4] };
    const obj2 = { a: [4, 5], b: [6, 7] };
    await expect(Promise.resolve(obj1)).resolves.not.toEqual(obj2);
  });

  it("should check if functions are not equal", async () => {
    const fn1 = async () => {};
    const fn2 = async () => {
      console.log("hello");
    };
    await expect(Promise.resolve(fn1)).resolves.not.toEqual(fn2);
  });

  it("should check if dates are not equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 2, 1);
    await expect(Promise.resolve(date1)).resolves.not.toEqual(date2);
  });

  it("should check if buffers are not equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("world");
    await expect(Promise.resolve(buffer1)).resolves.not.toEqual(buffer2);
  });
});
