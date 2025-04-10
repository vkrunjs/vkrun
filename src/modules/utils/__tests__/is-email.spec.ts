import { isEmail } from "../is-email";

describe("isEmail", () => {
  it("Should return true for valid email formats", () => {
    const validEmails = ["any_email@domain.com", "any-email@domain.com", "any.email@domain.com", "any_123_email@domain.com"];

    validEmails.forEach((email) => {
      expect(isEmail(email)).toBeTruthy();
    });
  });

  it("Should return false for invalid email formats", () => {
    const invalidEmails = [
      "any_email@.com",
      "any_email@domain",
      "any_email@domain.c",
      "any_+_email@domain.com",
      "any_#_email@domain.com",
      "any_$_email@domain.com",
      "any_%_email@domain.com",
      "any_ˆ_email@domain.com",
      "any_&_email@domain.com",
      "any_*_email@domain.com",
      "any_(_email@domain.com",
      "any_)_email@domain.com",
      "any_,_email@domain.com",
      'any_"_email@domain.com',
      "any_'_email@domain.com",
      "any_;_email@domain.com",
      "any_:_email@domain.com",
      "any_[_email@domain.com",
      "any_]_email@domain.com",
      "any_{_email@domain.com",
      "any_}_email@domain.com",
      "any_\\_email@domain.com",
      "any_/_email@domain.com",
      "any_?_email@domain.com",
      "any_<_email@domain.com",
      "any_>_email@domain.com",
      "any_/_email@domain.com",
      false,
      new Date(),
      null,
      123,
      [],
      {},
      undefined,
    ];

    invalidEmails.forEach((email) => {
      expect(isEmail(email)).toBeFalsy();
    });
  });

  it("Should return false for empty string", () => {
    expect(isEmail("")).toBeFalsy();
  });

  it("Should return false for null", () => {
    expect(isEmail(null)).toBeFalsy();
  });

  it("Should return false for undefined", () => {
    expect(isEmail(undefined)).toBeFalsy();
  });

  it("Should return false for number", () => {
    expect(isEmail(123)).toBeFalsy();
  });

  it("Should return false for array", () => {
    expect(isEmail([1, 2, 3])).toBeFalsy();
  });

  it("Should return false for object", () => {
    expect(isEmail({ key: "value" })).toBeFalsy();
  });
});
