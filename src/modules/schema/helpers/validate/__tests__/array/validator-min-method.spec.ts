import { schema } from "../../../../../../index";

describe("Validator Array Min Method", () => {
  it("Should not modify base schema when creating derived array schemas with min method", () => {
    // Base schema
    const baseArraySchema = schema().array(schema().any()).min({ min: 2 });

    // Derived schema applying additional methods
    const derivedNullableSchema = baseArraySchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    // Valid values to test
    const validArray = [1, 2];
    const invalidArray = [1]; // below min

    // --- Base schema should validate arrays with at least 2 items and not allow null/undefined ---
    expect(baseArraySchema.validate(validArray)).toBeTruthy();
    expect(baseArraySchema.validate(invalidArray)).toBeFalsy();
    expect(baseArraySchema.validate(null)).toBeFalsy();
    expect(baseArraySchema.validate(undefined)).toBeFalsy();

    // --- Derived schema allows null ---
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(validArray)).toBeTruthy();
    expect(derivedNullableSchema.validate(invalidArray)).toBeFalsy();
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema with notRequired allows null and undefined ---
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(validArray)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(invalidArray)).toBeFalsy();

    // --- Ensure base schema remains unmodified ---
    expect(baseArraySchema.validate(null)).toBeFalsy();
    expect(baseArraySchema.validate(undefined)).toBeFalsy();
    expect(baseArraySchema.validate(invalidArray)).toBeFalsy();
  });

  it("Should be able to validate the min method and return true if the list has the minimum value", () => {
    const sut = schema().array(schema().any()).min({ min: 1 }).validate(["string"]);
    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the min method and return true if the list does not have the minimum value", () => {
    const sut = schema().array(schema().any()).min({ min: 2 }).validate(["string"]);
    expect(sut).toBeFalsy();
  });

  it("Should allow custom error message", () => {
    const value = [false];

    const sut = schema()
      .array(schema().any())
      .min({ min: 2, message: "[valueName] [value] [min] any message!" })
      .test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: [false],
      },
      {
        method: "array",
        name: "value_name",
        expect: "array type",
        received: [false],
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "min",
        type: "invalid value",
        name: "value_name",
        expect: "the list must have the minimum number of items",
        received: [false],
        message: "value_name [false] 2 any message!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });
});
