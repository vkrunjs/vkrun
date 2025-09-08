import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator Positive Method", () => {
  it("Should not modify base schema when creating derived schema with positive, nullable and notRequired", () => {
    // Base schema
    const baseNumberSchema = schema().number();

    // Derived schemas
    const derivedPositiveSchema = baseNumberSchema.positive();
    const derivedNullableSchema = derivedPositiveSchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    // Valid value
    const validNumber = 10;

    // --- Base schema only validates numbers, not null/undefined ---
    expect(baseNumberSchema.validate(validNumber)).toBeTruthy();
    expect(baseNumberSchema.validate(null)).toBeFalsy();
    expect(baseNumberSchema.validate(undefined)).toBeFalsy();
    expect(baseNumberSchema.validate(-5)).toBeTruthy(); // negative still valid

    // --- Derived schema positive ---
    expect(derivedPositiveSchema.validate(validNumber)).toBeTruthy();
    expect(derivedPositiveSchema.validate(-5)).toBeFalsy();
    expect(derivedPositiveSchema.validate(null)).toBeFalsy();
    expect(derivedPositiveSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema positive + nullable ---
    expect(derivedNullableSchema.validate(validNumber)).toBeTruthy();
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();
    expect(derivedNullableSchema.validate(-5)).toBeFalsy();

    // --- Derived schema positive + nullable + notRequired ---
    expect(derivedNotRequiredNullableSchema.validate(validNumber)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(-5)).toBeFalsy();

    // --- Ensure base schema is unchanged ---
    expect(baseNumberSchema.validate(null)).toBeFalsy();
    expect(baseNumberSchema.validate(undefined)).toBeFalsy();
    expect(baseNumberSchema.validate(-5)).toBeTruthy();
  });

  it("Should be able to validate the positive method and return true if the value is positive", () => {
    expect(schema().number().positive().validate(1)).toBeTruthy();

    expect(schema().number().float().min({ min: 1 }).max({ max: 2 }).positive().validate(1.5)).toBeTruthy();
    expect(schema().number().float().min({ min: 1 }).positive().validate(1.5)).toBeTruthy();
    expect(schema().number().float().max({ max: 2 }).min({ min: 1 }).positive().validate(1.5)).toBeTruthy();
    expect(schema().number().float().max({ max: 2 }).positive().validate(1.5)).toBeTruthy();
    expect(schema().number().float().positive().validate(1.5)).toBeTruthy();

    expect(schema().number().integer().min({ min: 1 }).max({ max: 2 }).positive().validate(2)).toBeTruthy();
    expect(schema().number().integer().min({ min: 1 }).positive().validate(2)).toBeTruthy();
    expect(schema().number().integer().max({ max: 2 }).min({ min: 1 }).positive().validate(2)).toBeTruthy();
    expect(schema().number().integer().max({ max: 2 }).positive().validate(2)).toBeTruthy();
    expect(schema().number().integer().positive().validate(2)).toBeTruthy();

    expect(schema().number().min({ min: 1 }).float().max({ max: 5 }).positive().validate(4.5)).toBeTruthy();
    expect(schema().number().min({ min: 1 }).float().positive().validate(4.5)).toBeTruthy();
    expect(schema().number().min({ min: 1 }).integer().max({ max: 5 }).positive().validate(5)).toBeTruthy();
    expect(schema().number().min({ min: 1 }).integer().positive().validate(5)).toBeTruthy();
    expect(schema().number().min({ min: 1 }).max({ max: 5 }).float().positive().validate(4.5)).toBeTruthy();
    expect(schema().number().min({ min: 1 }).max({ max: 5 }).integer().positive().validate(5)).toBeTruthy();
    expect(schema().number().min({ min: 1 }).max({ max: 5 }).positive().validate(5)).toBeTruthy();
    expect(schema().number().min({ min: 1 }).positive().validate(4.5)).toBeTruthy();

    expect(schema().number().max({ max: 5 }).float().min({ min: 1 }).positive().validate(4.5)).toBeTruthy();
    expect(schema().number().max({ max: 5 }).float().positive().validate(4.5)).toBeTruthy();
    expect(schema().number().max({ max: 5 }).integer().min({ min: 1 }).positive().validate(5)).toBeTruthy();
    expect(schema().number().max({ max: 5 }).integer().positive().validate(5)).toBeTruthy();
    expect(schema().number().max({ max: 5 }).min({ min: 1 }).float().positive().validate(4.5)).toBeTruthy();
    expect(schema().number().max({ max: 5 }).min({ min: 1 }).integer().positive().validate(5)).toBeTruthy();
    expect(schema().number().max({ max: 5 }).min({ min: 1 }).positive().validate(5)).toBeTruthy();
    expect(schema().number().max({ max: 5 }).positive().validate(4.5)).toBeTruthy();
  });

  it("Should be able to validate the positive method and return false if list is invalid", () => {
    const invalidList: any[] = [-5.5, -6, "-1", false, new Date(), null, [], {}, undefined];

    const sut = schema().number().positive();

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the positive method when value is promise and return true if the value is positive", async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 100);
      });
    };

    const sut = await schema().number().positive().validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the positive method when value is promise and return false if the value is negative", async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(-1);
        }, 100);
      });
    };

    const sut = await schema().number().positive().validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the positive method and passedAll to equal true if the value is positive", () => {
    const value = 1;

    const sut = schema().number().positive().test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 1,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: 1,
      },
      {
        method: "positive",
        name: "value_name",
        expect: "positive number",
        received: 1,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the positive method and passedAll to equal false if the value is negative", () => {
    const value = -4.5;

    const sut = schema().number().positive().test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: -4.5,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: -4.5,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "positive",
        type: "invalid value",
        name: "value_name",
        expect: "positive number",
        received: -4.5,
        message: "value_name must be positive!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value = -4.5;

    const sut = schema().number().positive({ message: "[valueName] [value]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: -4.5,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: -4.5,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "positive",
        type: "invalid value",
        name: "value_name",
        expect: "positive number",
        received: -4.5,
        message: "value_name -4.5!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the positive and passAll method as equal to true when it is not required", () => {
    const value = undefined;

    const sut = schema().number().positive().notRequired().test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(1);
    expect(sut.successes).toEqual([
      {
        method: "notRequired",
        name: "value_name",
        expect: "value is not required and of any type",
        received: "undefined",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the positive and passAll method as equal to true when it is nullable", () => {
    const value = null;

    const sut = schema().number().positive().nullable().test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(1);
    expect(sut.successes).toEqual([
      {
        method: "nullable",
        name: "value_name",
        expect: "the value can be null, but other than undefined",
        received: null,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the positive method and passedAll to equal true if the value is promise with a smaller number than the reference", async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 100);
      });
    };

    const sut = await schema().number().positive().testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 1,
      },
      {
        method: "number",
        expect: "number type",
        name: "value_name",
        received: 1,
      },
      {
        method: "positive",
        expect: "positive number",
        name: "value_name",
        received: 1,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(1);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the positive method and passedAll to equal false if the value is a promise and is not number", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    };

    const sut = await schema().number().positive().testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(2);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: false,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "number",
        type: "invalid value",
        name: "value_name",
        expect: "number type",
        received: false,
        message: "value_name must be a number type!",
      },
      {
        method: "positive",
        type: "invalid value",
        name: "value_name",
        expect: "positive number",
        received: false,
        message: "value_name must be positive!",
      },
    ]);
    expect(sut.value).toBe(false);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the positive method and throw AnyError if the value is not number", () => {
    const value: any = undefined;

    const sut = (): void => schema().number().positive().throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the positive method and throw Error if the value is a promise and is not number", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("1.5");
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().number().positive().throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must be a number type!");
  });
});
