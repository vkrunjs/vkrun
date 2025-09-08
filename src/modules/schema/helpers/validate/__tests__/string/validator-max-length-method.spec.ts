import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator MaxLength Method", () => {
  it("Should not modify base schema when creating derived schema with maxLength", () => {
    const baseSchema = schema().string();

    const derivedSchema = baseSchema.maxLength({ max: 5 });
    const derivedNotRequired = derivedSchema.notRequired();

    // Base schema validates any string regardless of length
    expect(baseSchema.validate("abc")).toBeTruthy();
    expect(baseSchema.validate("abcdef")).toBeTruthy();
    expect(baseSchema.validate(undefined)).toBeFalsy();

    // Derived schema enforces maxLength
    expect(derivedSchema.validate("abc")).toBeTruthy();
    expect(derivedSchema.validate("abcdef")).toBeFalsy();
    expect(derivedSchema.validate(undefined)).toBeFalsy();

    // Derived schema with notRequired allows undefined
    expect(derivedNotRequired.validate("abc")).toBeTruthy();
    expect(derivedNotRequired.validate("abcdef")).toBeFalsy();
    expect(derivedNotRequired.validate(undefined)).toBeTruthy();

    // Base schema remains unchanged
    expect(baseSchema.validate("abcdef")).toBeTruthy();
    expect(baseSchema.validate(undefined)).toBeFalsy();
  });

  it("Should be able to validate the maxLength method and return true if the value does not exceed the maximum number of characters", () => {
    const value = "abcde";

    const sut = schema().string().maxLength({ max: 5 });

    expect(sut.validate(value)).toBeTruthy();
  });

  it("Should be able to validate the maxLength method and return false if list is invalid", () => {
    const invalidList: any[] = ["abcdef", false, new Date(), 123, null, [], {}, undefined];

    const sut = schema().string().maxLength({ max: 5 });

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the maxLength method when value is promise and return true if the value does not exceed the maximum number of characters", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("abcde");
        }, 100);
      });
    };

    const sut = await schema().string().maxLength({ max: 5 }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the maxLength method when the value is a promise and return true if the value exceed the maximum number of characters", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("abcdef");
        }, 100);
      });
    };

    const sut = await schema().string().maxLength({ max: 5 }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the maxLength method and passedAll to equal true if the value does not exceed the maximum number of characters", () => {
    const value = "abcde";

    const sut = schema().string().maxLength({ max: 5 }).test(value, "value_name");

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
        method: "maxLength",
        name: "value_name",
        expect: "value with a length less than or equal to the limit",
        received: "abcde",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the maxLength method and passedAll to equal false if the value exceed the maximum number of characters", () => {
    const value = "abcdef";

    const sut = schema().string().maxLength({ max: 5 }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "abcdef",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "abcdef",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "maxLength",
        type: "invalid value",
        name: "value_name",
        expect: "value with a length less than or equal to the limit",
        received: "abcdef",
        message: "value_name must have a maximum of 5 characters!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value = "abcdef";

    const sut = schema().string().maxLength({ max: 5, message: "[valueName] [value] [maxLength]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "abcdef",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "abcdef",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "maxLength",
        type: "invalid value",
        name: "value_name",
        expect: "value with a length less than or equal to the limit",
        received: "abcdef",
        message: "value_name abcdef 5!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the maxLength and passAll method as equal to true when it is not required and value is undefined", () => {
    const value = undefined;

    const sut = schema().string().maxLength({ max: 5 }).notRequired().test(value, "value_name");

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

  it("Should be able to validate the maxLength method and passedAll to equal true if value is promise and does not exceed the maximum number of characters", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("abcde");
        }, 100);
      });
    };

    const sut = await schema().string().maxLength({ max: 5 }).testAsync(value(), "value_name");

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
        method: "maxLength",
        expect: "value with a length less than or equal to the limit",
        name: "value_name",
        received: "abcde",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe("abcde");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the maxLength method and passedAll to equal false if value is promise and exceed the maximum number of characters", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("abcdef");
        }, 100);
      });
    };

    const sut = await schema().string().maxLength({ max: 5 }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "abcdef",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "abcdef",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "maxLength",
        type: "invalid value",
        name: "value_name",
        expect: "value with a length less than or equal to the limit",
        received: "abcdef",
        message: "value_name must have a maximum of 5 characters!",
      },
    ]);
    expect(sut.value).toBe("abcdef");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the maxLength method and throw AnyError if the value is undefined", () => {
    const value: any = undefined;

    const sut = (): void => schema().string().maxLength({ max: 5 }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the maxLength method and throw Error if the value is a promise and exceed the maximum number of characters", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("abcdef");
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().string().maxLength({ max: 5 }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must have a maximum of 5 characters!");
  });
});
