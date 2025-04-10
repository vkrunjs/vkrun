import { schema } from "../../../index";

describe("Validator Any Method", () => {
  it("Should be able to return true for any value", () => {
    const validate = (value: any): boolean => {
      return schema().any().validate(value);
    };

    expect(validate(undefined)).toBeTruthy();
    expect(validate(null)).toBeTruthy();
    expect(validate("text")).toBeTruthy();
    expect(validate(123)).toBeTruthy();
    expect(validate(123n)).toBeTruthy();
    expect(validate(new Date())).toBeTruthy();
    expect(validate(true)).toBeTruthy();
  });
});
