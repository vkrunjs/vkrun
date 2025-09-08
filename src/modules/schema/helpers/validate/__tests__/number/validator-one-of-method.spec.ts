import { schema } from "../../../../index";

describe("Validator Number OneOf Method", () => {
  it("Should not modify base schema when creating derived schema with oneOf, nullable and notRequired", () => {
    // Base schema
    const baseNumberSchema = schema().number();

    // Derived schemas
    const derivedOneOfSchema = baseNumberSchema.oneOf([123, 321]);
    const derivedNullableSchema = derivedOneOfSchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    // Valid value
    const validValue = 123;
    const invalidValue = 2;

    // --- Base schema only validates numbers, not null/undefined ---
    expect(baseNumberSchema.validate(validValue)).toBeTruthy();
    expect(baseNumberSchema.validate(null)).toBeFalsy();
    expect(baseNumberSchema.validate(undefined)).toBeFalsy();
    expect(baseNumberSchema.validate(invalidValue)).toBeTruthy(); // 2 is number, but not in oneOf yet

    // --- Derived schema with oneOf ---
    expect(derivedOneOfSchema.validate(validValue)).toBeTruthy();
    expect(derivedOneOfSchema.validate(invalidValue)).toBeFalsy();
    expect(derivedOneOfSchema.validate(null)).toBeFalsy();
    expect(derivedOneOfSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema oneOf + nullable ---
    expect(derivedNullableSchema.validate(validValue)).toBeTruthy();
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();
    expect(derivedNullableSchema.validate(invalidValue)).toBeFalsy();

    // --- Derived schema oneOf + nullable + notRequired ---
    expect(derivedNotRequiredNullableSchema.validate(validValue)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(invalidValue)).toBeFalsy();

    // --- Ensure base schema is unchanged ---
    expect(baseNumberSchema.validate(null)).toBeFalsy();
    expect(baseNumberSchema.validate(undefined)).toBeFalsy();
    expect(baseNumberSchema.validate(invalidValue)).toBeTruthy(); // still only checks for number type
  });

  it("Should return true if the value matches one of the schemas or values", () => {
    const value = 123;
    const comparisonItems = [123, 321];

    const sut = schema().number().oneOf(comparisonItems).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should return false if the value not matches a static value in the oneOf array", () => {
    const value = 2;
    const comparisonItems = [123, 321];

    const sut = schema().number().oneOf(comparisonItems).validate(value);

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the equal method when value is promise and return true if the value is equal to the comparison value", async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(123);
        }, 100);
      });
    };
    const comparisonItems = [123, 321];

    const sut = await schema().number().oneOf(comparisonItems).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to test and promise value", async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(321);
        }, 100);
      });
    };

    const comparisonItems = [123, 321];

    const sut = await schema().number().oneOf(comparisonItems).parseAsync(value());

    expect(sut).toEqual(321);
  });

  it("Should be able to validate the equal method when value is promise and return false if the value is not equal to the comparison value", async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, 100);
      });
    };

    const comparisonItems = [123, 321];

    const sut = await schema().number().oneOf(comparisonItems).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to test and parse value", () => {
    const comparisonItems = [123, 321];
    const value = 123;
    const sut = schema().number().oneOf(comparisonItems).parse(value);
    expect(sut).toEqual(123);
  });

  it("Should be able to validate the equal method and passedAll to equal true if the value is equal to the comparison value", () => {
    const comparisonItems = [123, 321];
    const value = 123;

    const sut = schema().number().oneOf(comparisonItems).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 123,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: 123,
      },
      {
        method: "oneOf",
        name: "value_name",
        expect: "value matches",
        received: 123,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(123);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and passedAll to equal false if the value is not equal to the comparison value", () => {
    const comparisonItems = [123, 321];
    const value = 2;

    const sut = schema().number().oneOf(comparisonItems).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 2,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: 2,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "oneOf",
        type: "invalid value",
        name: "value_name",
        expect: "value matches",
        received: 2,
        message: "value does not have a match!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });
});
