import { describe, expect, it } from "../../../../..";

describe("Expect not.toBeFalsy Method - Failure Cases", () => {
  it("should fail when a falsy value is provided", () => {
    expect(false).not.toBeFalsy();
  });

  it("should fail when `0` is provided", () => {
    expect(0).not.toBeFalsy();
  });

  it("should fail when an empty string is provided", () => {
    expect("").not.toBeFalsy();
  });

  it("should fail when `null` is provided", () => {
    expect(null).not.toBeFalsy();
  });

  it("should fail when `undefined` is provided", () => {
    expect(undefined).not.toBeFalsy();
  });

  it("should fail when `NaN` is provided", () => {
    expect(NaN).not.toBeFalsy();
  });
});
