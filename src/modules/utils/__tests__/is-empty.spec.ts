import { isEmpty } from "../is-empty";

describe("isEmpty", () => {
  it("Should return true for empty string", () => {
    expect(isEmpty("")).toBeTruthy();
  });

  it("Should return true for empty array", () => {
    expect(isEmpty([])).toBeTruthy();
  });

  it("Should return true for empty object", () => {
    expect(isEmpty({})).toBeTruthy();
  });

  it("Should return false for non-empty string", () => {
    expect(isEmpty("hello")).toBeFalsy();
  });

  it("Should return false for non-empty array", () => {
    expect(isEmpty([1, 2, 3])).toBeFalsy();
  });

  it("Should return false for non-empty object", () => {
    expect(isEmpty({ key: "value" })).toBeFalsy();
  });
});
