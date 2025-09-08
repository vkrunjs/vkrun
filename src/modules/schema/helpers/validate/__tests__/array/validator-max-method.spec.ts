import { schema } from "../../../../../../index";

describe("Validator Array Max Method", () => {
  it("Should not modify base schema when creating derived array schemas with max method", () => {
    // Base schema
    const baseArraySchema = schema().array(schema().string()).max({ max: 2 });

    // Derived schema applying additional methods
    const derivedNullableSchema = baseArraySchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    // Valid value to test
    const validArray = ["example", "test"];

    // --- Base schema should validate arrays up to max 2 and not allow null/undefined ---
    expect(baseArraySchema.validate(validArray)).toBeTruthy();
    expect(baseArraySchema.validate(["a", "b", "c"])).toBeFalsy(); // exceeds max
    expect(baseArraySchema.validate(null)).toBeFalsy();
    expect(baseArraySchema.validate(undefined)).toBeFalsy();

    // --- Derived schema allows null ---
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(validArray)).toBeTruthy();
    expect(derivedNullableSchema.validate(["a", "b", "c"])).toBeFalsy(); // still fails max
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema with notRequired allows null and undefined ---
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(validArray)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(["a", "b", "c"])).toBeFalsy(); // max still enforced

    // --- Ensure base schema remains unmodified ---
    expect(baseArraySchema.validate(null)).toBeFalsy();
    expect(baseArraySchema.validate(undefined)).toBeFalsy();
    expect(baseArraySchema.validate(["a", "b", "c"])).toBeFalsy();
  });

  it("Should be able to validate the max method and return true if the list has the maximum value", () => {
    const sut = schema().array(schema().string()).max({ max: 1 }).validate(["string"]);
    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the max method and return true if the list does not have the maximum value", () => {
    const sut = schema().array(schema().string()).max({ max: 2 }).validate(["string", "string", "string"]);
    expect(sut).toBeFalsy();
  });

  it("Should allow custom error message", () => {
    const value = [{ message: "any" }, { message: "any" }];

    const sut = schema()
      .array(schema().any())
      .max({ max: 1, message: "[valueName] [value] [max] any message!" })
      .test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(4);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: [{ message: "any" }, { message: "any" }],
      },
      {
        method: "array",
        name: "value_name",
        expect: "array type",
        received: [{ message: "any" }, { message: "any" }],
      },
      {
        method: "array",
        name: "value_name",
        expect: "array type",
        received: [{ message: "any" }, { message: "any" }],
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "max",
        type: "invalid value",
        name: "value_name",
        expect: "the list must have the maximum number of items",
        received: [{ message: "any" }, { message: "any" }],
        message: 'value_name [{"message":"any"},{"message":"any"}] 1 any message!',
      },
    ]);
    expect(sut.value).toEqual([{ message: "any" }, { message: "any" }]);
    expect(typeof sut.time === "string").toBeTruthy();
  });
});
