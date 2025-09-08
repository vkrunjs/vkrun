import { schema } from "../../../index";
import { AnyError } from "../../../../errors";

describe("Validator Boolean Method", () => {
  it("Should not modify base schema when creating derived schema", () => {
    // Base schema
    const baseBooleanSchema = schema().boolean();

    // Derived schema applying additional methods
    const derivedNotRequiredSchema = baseBooleanSchema.notRequired();
    const derivedNullableSchema = derivedNotRequiredSchema.nullable();

    // Valid values to test
    const validBoolean = true;

    // --- Base schema should only validate booleans and not allow null/undefined ---
    expect(baseBooleanSchema.validate(validBoolean)).toBeTruthy();
    expect(baseBooleanSchema.validate(null)).toBeFalsy();
    expect(baseBooleanSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema with notRequired allows undefined ---
    expect(derivedNotRequiredSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredSchema.validate(validBoolean)).toBeTruthy();
    expect(derivedNotRequiredSchema.validate(null)).toBeFalsy();

    // --- Derived schema with nullable allows null and notRequired allows undefined ---
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNullableSchema.validate(validBoolean)).toBeTruthy();

    // --- Ensure base schema remains unmodified ---
    expect(baseBooleanSchema.validate(null)).toBeFalsy();
    expect(baseBooleanSchema.validate(undefined)).toBeFalsy();
  });

  it("Should be able to validate the boolean method and return true if the value is of type boolean", () => {
    const value = true;

    const sut = schema().boolean().validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the boolean method and return false if list is invalid", () => {
    const invalidList: any[] = ["invalid-uuid-57b73598-8764-4ad0-a76a-679bb6640eb1", new Date(), 123, null, [], {}, undefined];

    const sut = schema().boolean();

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the boolean method when value is promise and return true if the value is of type boolean", async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 100);
      });
    };

    const sut = await schema().boolean().validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the boolean method when value is promise and return false if the value is not of type boolean", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("string");
        }, 100);
      });
    };

    const sut = await schema().boolean().validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the boolean method and passedAll to equal true if the value is of type boolean", () => {
    const value = true;

    const sut = schema().boolean().test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: true,
      },
      {
        method: "boolean",
        expect: "boolean type",
        name: "value_name",
        received: true,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the boolean method and passedAll to equal false if the value is not of type boolean", () => {
    const value: any = 1;

    const sut = schema().boolean().test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 1,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "boolean",
        type: "invalid value",
        name: "value_name",
        expect: "boolean type",
        received: 1,
        message: "value_name must be a boolean type!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value: any = 1;

    const sut = schema().boolean({ message: "[valueName] [value]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 1,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "boolean",
        type: "invalid value",
        name: "value_name",
        expect: "boolean type",
        received: 1,
        message: "value_name 1!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the boolean and passAll method as equal to true when it is not required, undefined value and not of type boolean", () => {
    const value = undefined;

    const sut = schema().boolean().notRequired().test(value, "value_name");

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

  it("Should be able to validate the boolean method and passedAll to equal true if the value is promise of type boolean", async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 100);
      });
    };

    const sut = await schema().boolean().testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: true,
      },
      {
        method: "boolean",
        expect: "boolean type",
        name: "value_name",
        received: true,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(true);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the boolean method and passedAll to equal false if the value is a promise and is not of type boolean", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("string");
        }, 100);
      });
    };

    const sut = await schema().boolean().testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "string",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "boolean",
        type: "invalid value",
        name: "value_name",
        expect: "boolean type",
        received: "string",
        message: "value_name must be a boolean type!",
      },
    ]);
    expect(sut.value).toBe("string");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the boolean method and throw AnyError if the value is not of type boolean", () => {
    const value: any = undefined;

    const sut = (): void => schema().boolean().throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the boolean method and throw Error if the value is a promise and is not of type boolean", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().boolean().throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must be a boolean type!");
  });
});
