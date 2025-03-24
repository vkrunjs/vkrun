import { describe, expect, it } from "../../../..";

describe("Expect toBeTruthy Method - Success Cases", () => {
  it("should pass when a non-falsy value is provided", () => {
    expect(42).toBeTruthy();
    expect("hello").toBeTruthy();
    expect([]).toBeTruthy();
    expect({}).toBeTruthy();
  });

  it("should pass when `true` is provided", () => {
    expect(true).toBeTruthy();
  });

  it("should pass when a non-empty object is provided", () => {
    const obj = { key: "value" };
    expect(obj).toBeTruthy();
  });

  it("should pass when a non-empty array is provided", () => {
    const arr = [1, 2, 3];
    expect(arr).toBeTruthy();
  });
});
