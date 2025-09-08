import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator Min Number Method", () => {
  it("Should not modify base schema when creating derived schemas with min, nullable and notRequired", () => {
    const baseSchema = schema().number();

    // Criando schemas derivados
    const minSchema = baseSchema.min({ min: 5 });
    const nullableSchema = minSchema.nullable();
    const notRequiredSchema = nullableSchema.notRequired();

    const validValue = 5;
    const invalidValue = 4;

    // --- Base schema apenas valida number ---
    expect(baseSchema.validate(validValue)).toBeTruthy();
    expect(baseSchema.validate(null)).toBeFalsy();
    expect(baseSchema.validate(undefined)).toBeFalsy();
    expect(baseSchema.validate(invalidValue)).toBeTruthy(); // base schema não conhece min ainda

    // --- Schema com min ---
    expect(minSchema.validate(validValue)).toBeTruthy();
    expect(minSchema.validate(invalidValue)).toBeFalsy();
    expect(minSchema.validate(null)).toBeFalsy();
    expect(minSchema.validate(undefined)).toBeFalsy();

    // --- Schema min + nullable ---
    expect(nullableSchema.validate(validValue)).toBeTruthy();
    expect(nullableSchema.validate(null)).toBeTruthy();
    expect(nullableSchema.validate(undefined)).toBeFalsy();
    expect(nullableSchema.validate(invalidValue)).toBeFalsy();

    // --- Schema min + nullable + notRequired ---
    expect(notRequiredSchema.validate(validValue)).toBeTruthy();
    expect(notRequiredSchema.validate(null)).toBeTruthy();
    expect(notRequiredSchema.validate(undefined)).toBeTruthy();
    expect(notRequiredSchema.validate(invalidValue)).toBeFalsy();

    // --- Garantir que o schema base não foi modificado ---
    expect(baseSchema.validate(null)).toBeFalsy();
    expect(baseSchema.validate(undefined)).toBeFalsy();
    expect(baseSchema.validate(invalidValue)).toBeTruthy();
  });

  it("Should be able to validate the min method and return true if the value is greater than or equal to the reference", () => {
    expect(schema().number().min({ min: 5 }).validate(5)).toBeTruthy();
    expect(schema().number().min({ min: 1 }).max({ max: 5 }).validate(5)).toBeTruthy();
    expect(schema().number().float().max({ max: 5 }).validate(4.9)).toBeTruthy();
    expect(schema().number().float().min({ min: 1 }).max({ max: 5 }).validate(4.9)).toBeTruthy();
    expect(schema().number().integer().max({ max: 5 }).validate(5)).toBeTruthy();
    expect(schema().number().integer().min({ min: 1 }).max({ max: 5 }).validate(5)).toBeTruthy();
    expect(schema().number().negative().max({ max: -1 }).validate(-5)).toBeTruthy();
    expect(schema().number().negative().min({ min: -5 }).max({ max: -1 }).validate(-5)).toBeTruthy();
    expect(schema().number().positive().max({ max: 5 }).validate(5)).toBeTruthy();
    expect(schema().number().positive().min({ min: 1 }).max({ max: 5 }).validate(5)).toBeTruthy();
  });

  it("Should be able to validate the min method and return false if list is invalid", () => {
    const invalidList: any[] = [5.5, 6, "1", false, new Date(), null, [], {}, undefined];

    const sut = schema().number().min({ min: 7 });

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the min method when value is promise and return true if the value is greater than or equal to the reference", async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 100);
      });
    };

    const sut = await schema().number().min({ min: 1 }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the min method when value is promise and return false if the value is greater than to the reference", async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 100);
      });
    };

    const sut = await schema().number().min({ min: 5 }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the min method and passedAll to equal true if the value is value greater than or equal to the reference", () => {
    const value = 1;

    const sut = schema().number().min({ min: 1 }).test(value, "value_name");

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
        method: "min",
        name: "value_name",
        expect: "value greater than or equal to the reference",
        received: 1,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and passedAll to equal false if the value is greater than to the reference", () => {
    const value = 4.5;

    const sut = schema().number().min({ min: 5 }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 4.5,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: 4.5,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "min",
        type: "invalid value",
        name: "value_name",
        expect: "value greater than or equal to the reference",
        received: 4.5,
        message: "value_name must be greater than or equal to 5!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value = 4.5;

    const sut = schema().number().min({ min: 5, message: "[valueName] [value] [min]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 4.5,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: 4.5,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "min",
        type: "invalid value",
        name: "value_name",
        expect: "value greater than or equal to the reference",
        received: 4.5,
        message: "value_name 4.5 5!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min and passAll method as equal to true when it is not required", () => {
    const value = undefined;

    const sut = schema().number().min({ min: 5 }).notRequired().test(value, "value_name");

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

  it("Should be able to validate the min and passAll method as equal to true when it is nullable", () => {
    const value = null;

    const sut = schema().number().min({ min: 5 }).nullable().test(value, "value_name");

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

  it("Should be able to validate the min method and passedAll to equal true if the value is promise with a smaller number than the reference", async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 100);
      });
    };

    const sut = await schema().number().min({ min: 1 }).testAsync(value(), "value_name");

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
        method: "min",
        expect: "value greater than or equal to the reference",
        name: "value_name",
        received: 1,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(1);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and passedAll to equal false if the value is a promise and is not number", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    };

    const sut = await schema().number().min({ min: 5 }).testAsync(value(), "value_name");

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
        method: "min",
        type: "invalid value",
        name: "value_name",
        expect: "value greater than or equal to the reference",
        received: false,
        message: "value_name must be greater than or equal to 5!",
      },
    ]);
    expect(sut.value).toBe(false);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and throw AnyError if the value is not number", () => {
    const value: any = undefined;

    const sut = (): void => schema().number().min({ min: 5 }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the min method and throw Error if the value is a promise and is not number", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("1.5");
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().number().min({ min: 5 }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must be a number type!");
  });
});
