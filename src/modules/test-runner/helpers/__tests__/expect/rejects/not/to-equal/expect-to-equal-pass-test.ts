import { describe, expect, it } from "../../../../../..";

describe("Expect rejects.not.toEqual Method - Success Cases", () => {
  it("should check if numbers are not equal", async () => {
    await expect(Promise.reject(42)).rejects.not.toEqual(43);
  });

  it("should check if strings are not equal", async () => {
    await expect(Promise.reject("hello")).rejects.not.toEqual("world");
  });

  it("should check if arrays with different elements are not equal", async () => {
    await expect(Promise.reject([1, 2, 3])).rejects.not.toEqual([4, 5, 6]);
  });

  it("should check if objects with different properties are not equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 2, b: 3 };
    await expect(Promise.reject(obj1)).rejects.not.toEqual(obj2);
  });

  it("should check if nested objects are not deeply equal", async () => {
    const obj1 = { a: { b: { c: 2 } } };
    const obj2 = { a: { b: { c: 3 } } };
    await expect(Promise.reject(obj1)).rejects.not.toEqual(obj2);
  });

  it("should check if arrays with different nested objects are not equal", async () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }];
    const arr2 = [{ a: 2, b: 3 }, { c: 4 }];
    await expect(Promise.reject(arr1)).rejects.not.toEqual(arr2);
  });

  it("should check if booleans are not equal", async () => {
    await expect(Promise.reject(true)).rejects.not.toEqual(false);
  });

  it("should check if undefined is not equal to a defined value", async () => {
    const undefinedVar = "defined";
    await expect(Promise.reject(undefinedVar)).rejects.not.toEqual(undefined);
  });

  it("should check if null is not equal to undefined", async () => {
    await expect(Promise.reject(undefined)).rejects.not.toEqual(null);
  });

  it("should check if NaN is not equal to a stringified NaN", async () => {
    await expect(Promise.reject(NaN)).rejects.not.toEqual("NaN");
  });

  it("should check if objects with different key orders are not equal", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, b: 2, a: 1 };
    await expect(Promise.reject(obj1)).rejects.not.toEqual(obj2);
  });

  it("should check if objects with different array values are not equal", async () => {
    const obj1 = { a: [1, 2], b: [3, 4] };
    const obj2 = { a: [4, 5], b: [6, 7] };
    await expect(Promise.reject(obj1)).rejects.not.toEqual(obj2);
  });

  it("should check if functions are not equal", async () => {
    const fn1 = async () => {};
    const fn2 = async () => {
      console.log("hello");
    };
    await expect(Promise.reject(fn1)).rejects.not.toEqual(fn2);
  });

  it("should check if different dates are not equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 2, 1);
    await expect(Promise.reject(date1)).rejects.not.toEqual(date2);
  });

  it("should check if different buffers are not equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("world");
    await expect(Promise.reject(buffer1)).rejects.not.toEqual(buffer2);
  });
});
