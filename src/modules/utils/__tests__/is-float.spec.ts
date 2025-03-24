import { isFloat } from "../is-float";

describe("isFloat", () => {
  it("Should return true for float numbers", () => {
    expect(isFloat(3.14)).toBeTruthy();
    expect(isFloat(0.1)).toBeTruthy();
    expect(isFloat(-2.5)).toBeTruthy();
  });

  it("Should return false for non-float numbers", () => {
    expect(isFloat(5)).toBeFalsy();
    expect(isFloat(NaN)).toBeFalsy();
    expect(isFloat(Infinity)).toBeFalsy();
  });

  it("Should return false for non-number values", () => {
    expect(isFloat("3.14")).toBeFalsy();
    expect(isFloat(true)).toBeFalsy();
    expect(isFloat([])).toBeFalsy();
    expect(isFloat({})).toBeFalsy();
    expect(isFloat(null)).toBeFalsy();
    expect(isFloat(undefined)).toBeFalsy();
  });
});
