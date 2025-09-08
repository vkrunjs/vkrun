import { schema } from "../../../index";
import { AnyError } from "../../../../errors";

describe("Validator Buffer Method", () => {
  it("Should not modify base schema when creating derived schema", () => {
    // Base schema
    const baseBufferSchema = schema().buffer();

    // Derived schemas applying additional methods
    const derivedNullableSchema = baseBufferSchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    // Valid value to test
    const validBuffer = Buffer.from("example");

    // --- Base schema should only validate Buffer and not allow null/undefined ---
    expect(baseBufferSchema.validate(validBuffer)).toBeTruthy();
    expect(baseBufferSchema.validate(null)).toBeFalsy();
    expect(baseBufferSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema allows null ---
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(validBuffer)).toBeTruthy();
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema with notRequired allows null and undefined ---
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(validBuffer)).toBeTruthy();

    // --- Ensure base schema remains unmodified ---
    expect(baseBufferSchema.validate(null)).toBeFalsy();
    expect(baseBufferSchema.validate(undefined)).toBeFalsy();
  });

  it("Should be able to validate the buffer method and return true if the value is of type Buffer", () => {
    const value = Buffer.from("test");

    const sut = schema().buffer().validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the buffer method and return false if list is invalid", () => {
    const invalidList: any[] = ["invalid-uuid-57b73598-8764-4ad0-a76a-679bb6640eb1", new Date(), 123, null, [], {}, undefined];

    const sut = schema().buffer();

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the buffer method when value is promise and return true if the value is of type Buffer", async () => {
    const value = async (): Promise<Buffer> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(Buffer.from("test"));
        }, 100);
      });
    };

    const sut = await schema().buffer().validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the buffer method when value is promise and return false if the value is not of type Buffer", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("string");
        }, 100);
      });
    };

    const sut = await schema().buffer().validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the buffer method and passedAll to equal true if the value is of type Buffer", () => {
    const value = Buffer.from("test");

    const sut = schema().buffer().test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: value,
      },
      {
        method: "buffer",
        expect: "buffer type",
        name: "value_name",
        index: undefined,
        received: value,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the buffer method and passedAll to equal false if the value is not of type Buffer", () => {
    const value: any = 1;

    const sut = schema().buffer().test(value, "value_name");

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
        method: "buffer",
        type: "invalid value",
        name: "value_name",
        expect: "buffer type",
        received: 1,
        message: "value_name must be a buffer type!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value: any = 1;

    const sut = schema().buffer({ message: "[valueName] [value]!" }).test(value, "value_name");

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
        method: "buffer",
        type: "invalid value",
        name: "value_name",
        expect: "buffer type",
        received: 1,
        message: "value_name 1!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the buffer method and passAll to equal true when it is not required, undefined value and not of type Buffer", () => {
    const value = undefined;

    const sut = schema().buffer().notRequired().test(value, "value_name");

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

  it("Should be able to validate the buffer method and passedAll to equal true if value is promise of type Buffer", async () => {
    const value = async (): Promise<Buffer> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(Buffer.from("test"));
        }, 100);
      });
    };

    const sut = await schema().buffer().testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: Buffer.from("test"),
      },
      {
        method: "buffer",
        expect: "buffer type",
        name: "value_name",
        received: Buffer.from("test"),
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(Buffer.from("test"));
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the buffer method and passedAll to equal false if value is a promise and is not of type Buffer", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("string");
        }, 100);
      });
    };

    const sut = await schema().buffer().testAsync(value(), "value_name");

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
        method: "buffer",
        type: "invalid value",
        name: "value_name",
        expect: "buffer type",
        received: "string",
        message: "value_name must be a buffer type!",
      },
    ]);
    expect(sut.value).toBe("string");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the buffer method and throw AnyError if the value is not of type Buffer", () => {
    const value: any = undefined;

    const sut = (): void => schema().buffer().throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the buffer method and throw Error if the value is a promise and is not of type Buffer", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().buffer().throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must be a buffer type!");
  });
});
