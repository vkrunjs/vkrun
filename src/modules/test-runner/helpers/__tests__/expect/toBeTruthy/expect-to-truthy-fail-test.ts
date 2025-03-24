import { describe, expect, it } from "../../../..";

describe("Expect toBeTruthy Method - Failure Cases", () => {
  it("should fail when `false` is provided", () => {
    expect(false).toBeTruthy();
  });

  it("should fail when `0` is provided", () => {
    expect(0).toBeTruthy();
  });

  it("should fail when an empty string is provided", () => {
    expect("").toBeTruthy();
  });

  it("should fail when `null` is provided", () => {
    expect(null).toBeTruthy();
  });

  it("should fail when `undefined` is provided", () => {
    expect(undefined).toBeTruthy();
  });

  it("should fail when `NaN` is provided", () => {
    expect(NaN).toBeTruthy();
  });
});
