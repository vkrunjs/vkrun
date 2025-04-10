import { convertToType } from "../convert-to-type";

describe("Parse Data - Convert To Type", () => {
  it("Should convert a valid string representation of an integer to a number", () => {
    const sut = convertToType("123");
    expect(sut).toEqual("123");
  });

  it("Should convert a valid string representation of a floating-point number to a number", () => {
    const sut = convertToType("3.14");
    expect(sut).toEqual("3.14");
  });

  it('Should convert a valid string representation of "true" to boolean true', () => {
    const sut = convertToType("true");
    expect(sut).toEqual(true);
  });

  it('Should convert a valid string representation of "false" to boolean false', () => {
    const sut = convertToType("false");
    expect(sut).toEqual(false);
  });

  it("Should convert a valid ISO8601 date string to a Date object", () => {
    const sut = convertToType("2000-02-03T02:00:00.000Z");
    expect(sut).toEqual(new Date("2000-02-03T02:00:00.000Z"));
  });

  it("Should return the input value if it does not match any of the conversion conditions", () => {
    const sut = convertToType("not-a-valid-value");
    expect(sut).toEqual("not-a-valid-value");
  });

  it("Should convert a large integer string beyond MAX_SAFE_INTEGER to a BigInt", () => {
    const sut = convertToType("1234567890123456789012345678901234567890");
    expect(sut).toEqual("1234567890123456789012345678901234567890");
  });

  it("Should convert a large negative integer string beyond MAX_SAFE_INTEGER to a BigInt", () => {
    const sut = convertToType("-1234567890123456789012345678901234567890");
    expect(sut).toEqual("-1234567890123456789012345678901234567890");
  });

  it("Should not convert a large floating-point string to a BigInt, should return as string", () => {
    const sut = convertToType("1.234567890123456789012345678901234567890e+30");
    expect(sut).toEqual("1.234567890123456789012345678901234567890e+30");
  });

  it("Should not convert a small floating-point string to a BigInt, should return as number", () => {
    const sut = convertToType("1.23");
    expect(sut).toEqual("1.23");
  });

  it("Should return the original string for a value starting with zero and without a decimal point", () => {
    const sut = convertToType("01234567890");
    expect(sut).toEqual("01234567890");
  });

  it("Should return a BigInt for a very large integer string starting with a non-zero digit", () => {
    const sut = convertToType("987654321098765432109876543210");
    expect(sut).toEqual("987654321098765432109876543210");
  });
});
