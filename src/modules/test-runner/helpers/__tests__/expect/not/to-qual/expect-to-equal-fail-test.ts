import { describe, expect, it } from "../../../../..";

describe("Expect not.toEqual Method - Failure Cases", () => {
  it("should fail when numbers are equal", () => {
    expect(42).not.toEqual(42);
  });

  it("should fail when strings are equal", () => {
    expect("hello").not.toEqual("hello");
  });

  it("should fail when booleans are equal", () => {
    expect(true).not.toEqual(true);
    expect(false).not.toEqual(false);
  });

  it("should fail when undefined is equal to undefined", () => {
    const undefinedVar = undefined;
    expect(undefinedVar).not.toEqual(undefined);
  });

  it("should fail when null is equal to null", () => {
    expect(null).not.toEqual(null);
  });

  it("should fail when NaN is equal to NaN", () => {
    expect(NaN).not.toEqual(NaN);
  });

  it("should fail when objects with identical references are equal", () => {
    const obj = { a: 1 };
    expect(obj).not.toEqual(obj);
  });

  it("should fail when functions with identical references are equal", () => {
    const fn1 = () => {};
    const fn2 = fn1;
    expect(fn1).not.toEqual(fn2);
  });

  it("should fail when arrays with identical references are equal", () => {
    const arr = [1, 2, 3];
    expect(arr).not.toEqual(arr);
  });

  it("should fail when dates with identical references are equal", () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = date1;
    expect(date1).not.toEqual(date2);
  });

  it("should fail when buffers with identical references are equal", () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = buffer1;
    expect(buffer1).not.toEqual(buffer2);
  });
});
