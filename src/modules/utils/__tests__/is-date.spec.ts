import { isDate } from "../is-date";

describe("isDate", () => {
  it("Should return true for Date object", () => {
    expect(isDate(new Date())).toBeTruthy();
  });

  it("Should return false for non-Date objects", () => {
    expect(isDate("2022-01-01")).toBeFalsy();
    expect(isDate(123456789)).toBeFalsy();
    expect(isDate({})).toBeFalsy();
    expect(isDate([])).toBeFalsy();
    expect(isDate(null)).toBeFalsy();
    expect(isDate(undefined)).toBeFalsy();
  });
});
