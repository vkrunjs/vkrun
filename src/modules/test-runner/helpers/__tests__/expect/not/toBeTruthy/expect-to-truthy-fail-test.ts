import { describe, expect, it } from "../../../../..";

describe("Expect not.toBeTruthy Method - Failure Cases", () => {
  it("should fail when `true` is provided", () => {
    expect(true).not.toBeTruthy();
  });

  it("should fail when `1` is provided", () => {
    expect(1).not.toBeTruthy();
  });

  it("should fail when a non-empty string is provided", () => {
    expect("hello").not.toBeTruthy();
  });

  it("should fail when a non-empty array is provided", () => {
    expect([1, 2, 3]).not.toBeTruthy();
  });

  it("should fail when a non-empty object is provided", () => {
    expect({ key: "value" }).not.toBeTruthy();
  });

  it("should fail when a function is provided", () => {
    expect(() => {}).not.toBeTruthy();
  });

  it("should fail when a Date object is provided", () => {
    expect(new Date()).not.toBeTruthy();
  });
});
