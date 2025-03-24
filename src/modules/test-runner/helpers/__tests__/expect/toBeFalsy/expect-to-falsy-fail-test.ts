import { describe, expect, it } from "../../../..";

describe("Expect toBeFalsy Method - Failure Cases", () => {
  it("should fail when a truthy value is provided", () => {
    expect(true).toBeFalsy();
  });

  it("should fail when `1` is provided", () => {
    expect(1).toBeFalsy();
  });

  it("should fail when a non-empty string is provided", () => {
    expect("hello").toBeFalsy();
  });

  it("should fail when an empty array is provided", () => {
    expect([1, 2, 3]).toBeFalsy();
  });

  it("should fail when an empty object is provided", () => {
    expect({ key: "value" }).toBeFalsy();
  });

  it("should fail when a function is provided", () => {
    expect(() => {}).toBeFalsy();
  });

  it("should fail when a Date object is provided", () => {
    expect(new Date()).toBeFalsy();
  });
});
