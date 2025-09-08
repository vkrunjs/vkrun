import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator Negative BigInt Method", () => {
  it("Should not modify base schema when creating derived schema with negative", () => {
    // Base schema
    const baseBigIntSchema = schema().bigInt().negative();

    // Derived schemas applying additional methods
    const derivedNullableSchema = baseBigIntSchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    // Valid negative value
    const validNegative = -5n;

    // --- Base schema should only validate negative bigint and not allow null/undefined/positive ---
    expect(baseBigIntSchema.validate(validNegative)).toBeTruthy();
    expect(baseBigIntSchema.validate(null)).toBeFalsy();
    expect(baseBigIntSchema.validate(undefined)).toBeFalsy();
    expect(baseBigIntSchema.validate(5n)).toBeFalsy(); // positive value

    // --- Derived schema allows null ---
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(validNegative)).toBeTruthy();
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();
    expect(derivedNullableSchema.validate(5n)).toBeFalsy(); // positive value

    // --- Derived schema with notRequired allows null and undefined ---
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(validNegative)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(5n)).toBeFalsy(); // positive value

    // --- Ensure base schema remains unmodified ---
    expect(baseBigIntSchema.validate(null)).toBeFalsy();
    expect(baseBigIntSchema.validate(undefined)).toBeFalsy();
    expect(baseBigIntSchema.validate(5n)).toBeFalsy(); // positive value
  });

  it("Should be able to validate the negative method and return true if the value is negative", () => {
    expect(schema().bigInt().negative().validate(-1n)).toBeTruthy();

    expect(schema().bigInt().min({ min: -10n }).max({ max: -1n }).negative().validate(-5n)).toBeTruthy();
    expect(schema().bigInt().min({ min: -10n }).negative().validate(-4n)).toBeTruthy();

    expect(schema().bigInt().max({ max: -1n }).min({ min: -10n }).negative().validate(-5n)).toBeTruthy();
    expect(schema().bigInt().max({ max: -1n }).negative().validate(-4n)).toBeTruthy();
  });

  it("Should be able to validate the negative method and return false if list is invalid", () => {
    const invalidList: any[] = [5.5, 6n, "-1", false, new Date(), null, [], {}, undefined];

    const sut = schema().bigInt().negative();

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the negative method when value is promise and return true if the value is negative", async () => {
    const value = async (): Promise<bigint> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(-1n);
        }, 100);
      });
    };

    const sut = await schema().bigInt().negative().validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the negative method when value is promise and return false if the value is positive", async () => {
    const value = async (): Promise<bigint> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1n);
        }, 100);
      });
    };

    const sut = await schema().bigInt().negative().validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the negative method and passedAll to equal true if the value is negative", () => {
    const value = -1n;

    const sut = schema().bigInt().negative().test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: -1n,
      },
      {
        method: "bigInt",
        name: "value_name",
        expect: "bigint type",
        received: -1n,
      },
      {
        method: "negative",
        name: "value_name",
        expect: "negative bigint",
        received: -1n,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the negative method and passedAll to equal false if the value is negative", () => {
    const value = 4n;

    const sut = schema().bigInt().negative().test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 4n,
      },
      {
        method: "bigInt",
        name: "value_name",
        expect: "bigint type",
        received: 4n,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "negative",
        type: "invalid value",
        name: "value_name",
        expect: "negative bigint",
        received: 4n,
        message: "value_name must be negative!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value = 4n;

    const sut = schema().bigInt().negative({ message: "[valueName] [value]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 4n,
      },
      {
        method: "bigInt",
        name: "value_name",
        expect: "bigint type",
        received: 4n,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "negative",
        type: "invalid value",
        name: "value_name",
        expect: "negative bigint",
        received: 4n,
        message: "value_name 4n!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the negative and passAll method as equal to true when it is not required", () => {
    const value = undefined;

    const sut = schema().bigInt().negative().notRequired().test(value, "value_name");

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
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the negative and passAll method as equal to true when it is nullable", () => {
    const value = null;

    const sut = schema().bigInt().negative().nullable().test(value, "value_name");

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
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the negative method and passedAll to equal true if the value is promise with a smaller bigint than the reference", async () => {
    const value = async (): Promise<bigint> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(-1n);
        }, 100);
      });
    };

    const sut = await schema().bigInt().negative().testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: -1n,
      },
      {
        method: "bigInt",
        expect: "bigint type",
        name: "value_name",
        received: -1n,
      },
      {
        method: "negative",
        expect: "negative bigint",
        name: "value_name",
        received: -1n,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(-1n);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the negative method and passedAll to equal false if the value is a promise and is not bigint", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    };

    const sut = await schema().bigInt().negative().testAsync(value(), "value_name");

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
        method: "bigInt",
        type: "invalid value",
        name: "value_name",
        expect: "bigint type",
        received: false,
        message: "value_name must be a bigint type!",
      },
      {
        method: "negative",
        type: "invalid value",
        name: "value_name",
        expect: "negative bigint",
        received: false,
        message: "value_name must be negative!",
      },
    ]);
    expect(sut.value).toEqual(false);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the negative method and throw AnyError if the value is not bigint", () => {
    const value: any = undefined;

    const sut = (): void => schema().bigInt().negative().throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the negative method and throw Error if the value is a promise and is not bigint", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("1");
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().bigInt().negative().throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must be a bigint type!");
  });
});
