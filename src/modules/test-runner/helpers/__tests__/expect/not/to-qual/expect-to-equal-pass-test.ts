import { describe, expect, it } from "../../../../..";

describe("Expect not.toEqual Method - Success Cases", () => {
  it("should check if numbers are not equal", () => {
    expect(42).not.toEqual(43);
  });

  it("should check if strings are not equal", () => {
    expect("hello").not.toEqual("world");
  });

  it("should check if booleans are not equal", () => {
    expect(true).not.toEqual(false);
    expect(false).not.toEqual(true);
  });

  it("should check if undefined is not equal to null", () => {
    const undefinedVar = undefined;
    expect(undefinedVar).not.toEqual(null);
  });

  it("should check if NaN is not equal to any value", () => {
    expect(NaN).not.toEqual(42);
  });

  it("should check if objects with different properties are not equal", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    expect(obj1).not.toEqual(obj2);
  });

  it("should check if arrays with different elements are not equal", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    expect(arr1).not.toEqual(arr2);
  });

  it("should check if functions with different definitions are not equal", () => {
    const fn1 = () => {
      return 1;
    };
    const fn2 = () => {
      return 2;
    };
    expect(fn1).not.toEqual(fn2);
  });

  it("should check if dates with different times are not equal", () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2024, 1, 1);
    expect(date1).not.toEqual(date2);
  });

  it("should check if buffers with different contents are not equal", () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("world");
    expect(buffer1).not.toEqual(buffer2);
  });
});
