import { isNotEmpty } from "../is-not-empty";

describe("isNotEmpty", () => {
  it("Should return false for empty string", () => {
    expect(isNotEmpty("")).toBeFalsy();
  });

  it("Should return true for non-empty string", () => {
    expect(isNotEmpty("hello")).toBeTruthy();
  });

  it("Should return false for empty array", () => {
    expect(isNotEmpty([])).toBeFalsy();
  });

  it("Should return true for non-empty array", () => {
    expect(isNotEmpty([1, 2, 3])).toBeTruthy();
  });

  it("Should return false for empty object", () => {
    expect(isNotEmpty({})).toBeFalsy();
  });

  it("Should return true for non-empty object", () => {
    expect(isNotEmpty({ key: "value" })).toBeTruthy();
  });
});
