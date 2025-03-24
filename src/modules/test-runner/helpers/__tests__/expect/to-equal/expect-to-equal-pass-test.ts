import { describe, expect, it } from "../../../..";

describe("Expect toEqual Method - Success Cases", () => {
  it("should check if numbers are equal", () => {
    expect(42).toEqual(42);
  });

  it("should check if strings are equal", () => {
    expect("hello").toEqual("hello");
  });

  it("should check if arrays with identical elements are equal", () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });

  it("should check if objects with identical properties are equal", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(obj1).toEqual(obj2);
  });

  it("should check if nested objects are deeply equal", () => {
    const obj1 = { a: { b: { c: 2 } } };
    const obj2 = { a: { b: { c: 2 } } };
    expect(obj1).toEqual(obj2);
  });

  it("should check if arrays with nested objects are equal", () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }];
    const arr2 = [{ a: 1, b: 2 }, { c: 3 }];
    expect(arr1).toEqual(arr2);
  });

  it("should check if booleans are equal", () => {
    expect(true).toEqual(true);
    expect(false).toEqual(false);
  });

  it("should check if undefined is equal to undefined", () => {
    let undefinedVar;
    expect(undefinedVar).toEqual(undefined);
  });

  it("should check if null is equal to null", () => {
    expect(null).toEqual(null);
  });

  it("should check if NaN is equal to NaN using Object.is for strict equality", () => {
    expect(NaN).toEqual(NaN);
  });

  it("should check if objects with different key order are still equal", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 2, a: 1 };
    expect(obj1).toEqual(obj2);
  });

  it("should check if objects with arrays as values are equal", () => {
    const obj1 = { a: [1, 2], b: [3, 4] };
    const obj2 = { a: [1, 2], b: [3, 4] };
    expect(obj1).toEqual(obj2);
  });

  it("should check if functions are equal", () => {
    const fn1 = () => {};
    const fn2 = fn1;
    expect(fn1).toEqual(fn2);
  });

  it("should check if dates are equal", () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 1, 1);
    expect(date1).toEqual(date2);
  });

  it("should check if buffers are equal", () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("hello");
    expect(buffer1).toEqual(buffer2);
  });
});
