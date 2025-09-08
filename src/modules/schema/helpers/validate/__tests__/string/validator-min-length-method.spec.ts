import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator MinLength Method", () => {
  it("Should not modify base schema when creating derived schema with minLength", () => {
    // Base schema
    const baseStringSchema = schema().string();

    // Derived schema with minLength
    const derivedMinLengthSchema = baseStringSchema.minLength({ min: 5 });
    const derivedNotRequiredMinLengthSchema = derivedMinLengthSchema.notRequired();

    const validValue = "abcde";

    // Base schema should validate only strings
    expect(baseStringSchema.validate(validValue)).toBeTruthy();
    expect(baseStringSchema.validate("abcd")).toBeTruthy(); // only string type, no minLength
    expect(baseStringSchema.validate(undefined)).toBeFalsy();
    expect(baseStringSchema.validate(null)).toBeFalsy();

    // Derived schema should enforce minLength
    expect(derivedMinLengthSchema.validate(validValue)).toBeTruthy();
    expect(derivedMinLengthSchema.validate("abcd")).toBeFalsy();
    expect(derivedMinLengthSchema.validate(undefined)).toBeFalsy();
    expect(derivedMinLengthSchema.validate(null)).toBeFalsy();

    // Derived schema with notRequired allows undefined
    expect(derivedNotRequiredMinLengthSchema.validate(validValue)).toBeTruthy();
    expect(derivedNotRequiredMinLengthSchema.validate("abcd")).toBeFalsy();
    expect(derivedNotRequiredMinLengthSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredMinLengthSchema.validate(null)).toBeFalsy();

    // Base schema remains unaltered
    expect(baseStringSchema.validate("abcd")).toBeTruthy(); // still does not enforce minLength
    expect(baseStringSchema.validate(undefined)).toBeFalsy();
  });

  it("Should be able to validate the minLength method and return true if the value has the minimum number of characters", () => {
    const value = "abcde";

    const sut = schema().string().minLength({ min: 5 });

    expect(sut.validate(value)).toBeTruthy();
  });

  it("Should be able to validate the minLength method and return false if list is invalid", () => {
    const invalidList: any[] = ["abcd", false, new Date(), 123, null, [], {}, undefined];

    const sut = schema().string().minLength({ min: 5 });

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the minLength method when value is promise and return true if the value has the minimum number of characters", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("abcde");
        }, 100);
      });
    };

    const sut = await schema().string().minLength({ min: 5 }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the minLength method when the value is a promise and return false if the value does not have the minimum number of characters", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("abcd");
        }, 100);
      });
    };

    const sut = await schema().string().minLength({ min: 5 }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the minLength method and passedAll to equal true if the value has the minimum number of characters", () => {
    const value = "abcde";

    const sut = schema().string().minLength({ min: 5 }).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "abcde",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "abcde",
      },
      {
        method: "minLength",
        name: "value_name",
        expect: "value with a length greater than or equal to the limit",
        received: "abcde",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the minLength method and passedAll to equal false if the value does not have the minimum number of characters", () => {
    const value = "abcd";

    const sut = schema().string().minLength({ min: 5 }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "abcd",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "abcd",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "minLength",
        type: "invalid value",
        name: "value_name",
        expect: "value with a length greater than or equal to the limit",
        received: "abcd",
        message: "value_name must have a minimum of 5 characters!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value = "abcd";

    const sut = schema().string().minLength({ min: 5, message: "[valueName] [value] [minLength]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "abcd",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "abcd",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "minLength",
        type: "invalid value",
        name: "value_name",
        expect: "value with a length greater than or equal to the limit",
        received: "abcd",
        message: "value_name abcd 5!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the minLength and passAll method as equal to true when it is not required and value is undefined", () => {
    const value = undefined;

    const sut = schema().string().minLength({ min: 5 }).notRequired().test(value, "value_name");

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

  it("Should be able to validate the minLength method and passedAll to equal true if value is promise and has the minimum number of characters", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("abcde");
        }, 100);
      });
    };

    const sut = await schema().string().minLength({ min: 5 }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "abcde",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "abcde",
      },
      {
        method: "minLength",
        expect: "value with a length greater than or equal to the limit",
        name: "value_name",
        received: "abcde",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe("abcde");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the minLength method and passedAll to equal false if value is promise and does not have the minimum number of characters", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("abcd");
        }, 100);
      });
    };

    const sut = await schema().string().minLength({ min: 5 }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "abcd",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "abcd",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "minLength",
        type: "invalid value",
        name: "value_name",
        expect: "value with a length greater than or equal to the limit",
        received: "abcd",
        message: "value_name must have a minimum of 5 characters!",
      },
    ]);
    expect(sut.value).toBe("abcd");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the minLength method and throw AnyError if the value has the minimum number of characters", () => {
    const value: any = undefined;

    const sut = (): void => schema().string().minLength({ min: 5 }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the minLength method and throw Error if the value is a promise and does not have the minimum number of characters", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("abcd");
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().string().minLength({ min: 5 }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must have a minimum of 5 characters!");
  });
});
