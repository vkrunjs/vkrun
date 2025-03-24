import { describe, expect, it } from "../../../../..";

describe("Expect not.toBe Method - Success Cases", () => {
  it("should check if numbers are not equal", () => {
    expect(42).not.toBe(43);
  });

  it("should check if strings are not equal", () => {
    expect("hello").not.toBe("world");
  });

  it("should check if booleans are not equal", () => {
    expect(true).not.toBe(false);
    expect(false).not.toBe(true);
  });

  it("should check if undefined is not equal to a defined value", () => {
    const undefinedVar = undefined;
    expect(undefinedVar).not.toBe(42);
  });

  it("should check if null is not equal to a non-null value", () => {
    expect(null).not.toBe(42);
  });

  it("should check if NaN is not equal to a number", () => {
    expect(NaN).not.toBe(42);
  });

  it("should check if objects with different references are not equal", () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    expect(obj1).not.toBe(obj2);
  });

  it("should check if functions with different references are not equal", () => {
    const fn1 = () => {};
    const fn2 = () => {};
    expect(fn1).not.toBe(fn2);
  });

  it("should check if arrays with different references are not equal", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(arr1).not.toBe(arr2);
  });

  it("should check if dates with different references are not equal", () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 1, 1);
    expect(date1).not.toBe(date2);
  });

  it("should check if buffers with different references are not equal", () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("hello");
    expect(buffer1).not.toBe(buffer2);
  });
});
