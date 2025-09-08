import { schema } from "../../../index";

describe("Validator Any Method", () => {
  it("Should not modify base schema when creating derived any schemas", () => {
    // Base schema
    const baseAnySchema = schema().any();

    // Derived schema applying additional methods
    const derivedAliasSchema = baseAnySchema.alias("value_name");
    const derivedDefaultSchema = baseAnySchema.default("default_value");

    // Valid values to test
    const validValues = [undefined, null, "text", 123, 123n, new Date(), true];

    // --- Base schema should validate all values as-is ---
    for (const value of validValues) {
      expect(baseAnySchema.validate(value)).toBeTruthy();
    }

    // --- Derived alias schema should validate all values ---
    for (const value of validValues) {
      expect(derivedAliasSchema.validate(value)).toBeTruthy();
    }

    // --- Derived default schema should validate all values ---
    for (const value of validValues) {
      expect(derivedDefaultSchema.validate(value)).toBeTruthy();
    }

    // --- Ensure base schema remains unmodified ---
    for (const value of validValues) {
      expect(baseAnySchema.validate(value)).toBeTruthy();
    }
  });

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
