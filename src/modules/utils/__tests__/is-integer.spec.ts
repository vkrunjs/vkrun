import { isInteger } from "../is-integer";

describe("isInteger", () => {
  it("Should return true for integer numbers", () => {
    expect(isInteger(5)).toBeTruthy();
    expect(isInteger(0)).toBeTruthy();
    expect(isInteger(-10)).toBeTruthy();
  });

  it("Should return false for non-integer numbers", () => {
    expect(isInteger(3.14)).toBeFalsy();
    expect(isInteger(NaN)).toBeFalsy();
    expect(isInteger(Infinity)).toBeFalsy();
  });

  it("Should return false for non-number values", () => {
    expect(isInteger("5")).toBeFalsy();
    expect(isInteger(true)).toBeFalsy();
    expect(isInteger([])).toBeFalsy();
    expect(isInteger({})).toBeFalsy();
    expect(isInteger(null)).toBeFalsy();
    expect(isInteger(undefined)).toBeFalsy();
  });
});
