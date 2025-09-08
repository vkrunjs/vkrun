import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator BigInt Method", () => {
  it("Should not modify base schema when creating derived schema", () => {
    // Base schema
    const baseBigIntSchema = schema().bigInt();

    // Derived schema applying additional methods
    const derivedNullableSchema = baseBigIntSchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    // Valid value to test
    const validBigInt = 123n;

    // --- Base schema should only validate bigint and not allow null/undefined ---
    expect(baseBigIntSchema.validate(validBigInt)).toBeTruthy();
    expect(baseBigIntSchema.validate(null)).toBeFalsy();
    expect(baseBigIntSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema allows null ---
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(validBigInt)).toBeTruthy();
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema with notRequired allows null and undefined ---
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(validBigInt)).toBeTruthy();

    // --- Ensure base schema remains unmodified ---
    expect(baseBigIntSchema.validate(null)).toBeFalsy();
    expect(baseBigIntSchema.validate(undefined)).toBeFalsy();
  });

  it("Should be able to validate the bigInt method and return true if the value is of type bigint", () => {
    const value = 1n;

    const sut = schema().bigInt().validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate all sub methods of bigInt method and return true if the value is valid", () => {
    // bigInt > min
    expect(schema().bigInt().min({ min: 1n }).validate(1n)).toBeTruthy();

    // bigInt > min > max > ...
    expect(schema().bigInt().min({ min: 1n }).max({ max: 2n }).validate(1n)).toBeTruthy();
    expect(schema().bigInt().min({ min: 1n }).max({ max: 2n }).positive().validate(1n)).toBeTruthy();
    expect(schema().bigInt().min({ min: -2n }).max({ max: -1n }).negative().validate(-1n)).toBeTruthy();

    // bigInt > min > positive > ...
    expect(schema().bigInt().min({ min: 1n }).positive().validate(1n)).toBeTruthy();
    expect(schema().bigInt().min({ min: 1n }).positive().max({ max: 2n }).validate(1n)).toBeTruthy();

    // bigInt > min > negative > ...
    expect(schema().bigInt().min({ min: -2n }).negative().validate(-1n)).toBeTruthy();
    expect(schema().bigInt().min({ min: -2n }).negative().max({ max: -1n }).validate(-1n)).toBeTruthy();

    // bigInt > max
    expect(schema().bigInt().max({ max: 2n }).validate(1n)).toBeTruthy();

    // bigInt > max > max > ...
    expect(schema().bigInt().max({ max: 2n }).min({ min: 1n }).validate(1n)).toBeTruthy();
    expect(schema().bigInt().max({ max: 2n }).min({ min: 1n }).positive().validate(1n)).toBeTruthy();
    expect(schema().bigInt().max({ max: -1n }).min({ min: -2n }).negative().validate(-1n)).toBeTruthy();

    // bigInt > max > positive > ...
    expect(schema().bigInt().max({ max: 2n }).positive().validate(1n)).toBeTruthy();
    expect(schema().bigInt().max({ max: 2n }).positive().min({ min: 1n }).validate(1n)).toBeTruthy();

    // bigInt > max > negative > ...
    expect(schema().bigInt().max({ max: -1n }).negative().validate(-1n)).toBeTruthy();
    expect(schema().bigInt().max({ max: -1n }).negative().min({ min: -2n }).validate(-1n)).toBeTruthy();

    // bigInt > positive
    expect(schema().bigInt().positive().validate(1n)).toBeTruthy();

    // bigInt > positive > min > ...
    expect(schema().bigInt().positive().min({ min: 1n }).validate(1n)).toBeTruthy();
    expect(schema().bigInt().positive().min({ min: 1n }).max({ max: 2n }).validate(1n)).toBeTruthy();

    // bigInt > positive > max > ...
    expect(schema().bigInt().positive().max({ max: 2n }).validate(1n)).toBeTruthy();
    expect(schema().bigInt().positive().max({ max: 2n }).min({ min: 1n }).validate(1n)).toBeTruthy();

    // bigInt > negative
    expect(schema().bigInt().negative().validate(-1n)).toBeTruthy();

    // bigInt > negative > min > ...
    expect(schema().bigInt().negative().min({ min: -2n }).validate(-1n)).toBeTruthy();
    expect(schema().bigInt().negative().min({ min: -2n }).max({ max: -1n }).validate(-1n)).toBeTruthy();

    // bigInt > negative > max > ...
    expect(schema().bigInt().negative().max({ max: -1n }).validate(-1n)).toBeTruthy();
    expect(schema().bigInt().negative().max({ max: -1n }).min({ min: -2n }).validate(-1n)).toBeTruthy();
  });

  it("Should be able to validate the bigInt method and return false if list is invalid", () => {
    const invalidList: any[] = [
      "invalid-uuid-57b73598-8764-4ad0-a76a-679bb6640eb1",
      false,
      new Date(),
      null,
      [],
      {},
      undefined,
    ];

    const sut = schema().bigInt();

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the bigInt method when value is promise and return true if the value is of type bigint", async () => {
    const value = async (): Promise<bigint> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1n);
        }, 100);
      });
    };

    const sut = await schema().bigInt().validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the bigInt method when value is promise and return false if the value is not of type bigint", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    };

    const sut = await schema().bigInt().validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the bigInt method and passedAll to equal true if the value is of type bigint", () => {
    const value = 1n;

    const sut = schema().bigInt().test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 1n,
      },
      {
        method: "bigInt",
        expect: "bigint type",
        name: "value_name",
        received: 1n,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the bigInt method and passedAll to equal false if the value is not of type bigint", () => {
    const value: any = false;

    const sut = schema().bigInt().test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
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
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value: any = false;

    const sut = schema().bigInt({ message: "[valueName] [value]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
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
        message: "value_name false!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the bigInt method and passAll method as equal to true when it is not required, undefined value and not of type bigint", () => {
    const value = undefined;

    const sut = schema().bigInt().notRequired().test(value, "value_name");

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

  it("Should be able to validate the bigInt method and passedAll to equal true if the value is promise of type bigint", async () => {
    const value = async (): Promise<bigint> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1n);
        }, 100);
      });
    };

    const sut = await schema().bigInt().testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 1n,
      },
      {
        method: "bigInt",
        expect: "bigint type",
        name: "value_name",
        received: 1n,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(1n);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the bigInt method and passedAll to equal false if the value is a promise and is not of type bigint", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    };

    const sut = await schema().bigInt().testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
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
    ]);
    expect(sut.value).toEqual(false);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the bigInt method and throw AnyError if the value is not of type bigint", () => {
    const value: any = undefined;

    const sut = (): void => schema().bigInt().throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the bigInt method and throw Error if the value is a promise and is not of type bigint", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().bigInt().throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must be a bigint type!");
  });
});
