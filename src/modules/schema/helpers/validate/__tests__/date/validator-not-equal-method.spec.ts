import { schema } from "../../../../index";

describe("Validator Date NotEqual Method", () => {
  it("Should not modify base schema when creating derived schema with notEqual", () => {
    // Base schema
    const baseDateSchema = schema().date().notEqual(new Date("2020-01-01T00:00:00+02:00"));

    // Derived schemas applying additional methods
    const derivedNullableSchema = baseDateSchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    const validDate = new Date("2020-02-01T00:00:00+02:00");
    const invalidDate = new Date("2020-01-01T00:00:00+02:00");

    // --- Base schema should only validate Date not equal to comparison and not allow null/undefined ---
    expect(baseDateSchema.validate(validDate)).toBeTruthy();
    expect(baseDateSchema.validate(invalidDate)).toBeFalsy();
    expect(baseDateSchema.validate(null)).toBeFalsy();
    expect(baseDateSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema allows null ---
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(validDate)).toBeTruthy();
    expect(derivedNullableSchema.validate(invalidDate)).toBeFalsy();
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema with notRequired allows null and undefined ---
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(validDate)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(invalidDate)).toBeFalsy();

    // --- Ensure base schema remains unmodified ---
    expect(baseDateSchema.validate(null)).toBeFalsy();
    expect(baseDateSchema.validate(undefined)).toBeFalsy();
    expect(baseDateSchema.validate(invalidDate)).toBeFalsy();
    expect(baseDateSchema.validate(validDate)).toBeTruthy();
  });

  it("Should be able to validate the notEqual method and return true if the value is not equal to the comparison value", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value = new Date("2020-02-01T00:00:00+02:00");

    const sut = schema().date().notEqual(valueToCompare).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the notEqual method and return false if the value is equal to the comparison value", () => {
    const stringSchema = schema()
      .date()
      .notEqual(new Date("2020-01-01T00:00:00+02:00"))
      .notEqual(new Date("2020-02-01T00:00:00+02:00"));

    expect(stringSchema.validate(new Date("2020-01-01T00:00:00+02:00"))).toBeFalsy();
    expect(stringSchema.validate(new Date("2020-02-01T00:00:00+02:00"))).toBeFalsy();
  });

  it("Should be able to validate the notEqual method when value is a promise and return true if the value is not equal to the comparison value", async () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");

    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date("2020-02-01T00:00:00+02:00"));
        }, 100);
      });
    };

    const sut = await schema().date().notEqual(valueToCompare).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the notEqual method when value is a promise and return false if the value is equal to the comparison value", async () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");

    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date("2020-01-01T00:00:00+02:00"));
        }, 100);
      });
    };

    const sut = await schema().date().notEqual(valueToCompare).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the notEqual method and passedAll to equal true if the value is not equal to the comparison value", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value = new Date("2020-02-01T00:00:00+02:00");

    const sut = schema().date().notEqual(valueToCompare).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: value,
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: value,
      },
      {
        method: "notEqual",
        name: "value_name",
        expect: "value must not match",
        received: value,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the notEqual method and passedAll to equal false if the value is equal to the comparison value", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value = new Date("2020-01-01T00:00:00+02:00");

    const sut = schema().date().notEqual(valueToCompare).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: value,
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: value,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "notEqual",
        type: "invalid value",
        name: "value_name",
        expect: "value must not match",
        received: value,
        message: "value may not match!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value = new Date("2020-01-01T00:00:00+02:00");

    const sut = schema().date().notEqual(valueToCompare, { message: "[valueName] [value]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2020-01-01T00:00:00+02:00"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2020-01-01T00:00:00+02:00"),
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "notEqual",
        type: "invalid value",
        name: "value_name",
        expect: "value must not match",
        received: new Date("2020-01-01T00:00:00+02:00"),
        message: "value_name 2019/12/31 22:00:00.000!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });
});
