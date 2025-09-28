import { schema } from "../../../index";
import { AnyError } from "../../../../errors";
import { InferIn, InferOut } from "../../../../types";

describe("Validator Object Method", () => {
  it("Should not modify base schema when creating derived object schema", () => {
    // Base schema
    const baseSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().number(),
    });

    // Derived schema applying additional methods
    const derivedNullableSchema = baseSchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    // Values to test
    const validString = "hello";
    const validNumber = 123;

    // --- Base schema should only validate object with valid keys, not null/undefined ---
    expect(baseSchema.validate({ valueA: validString, valueB: validNumber })).toBeTruthy();
    expect(baseSchema.validate(null)).toBeFalsy();
    expect(baseSchema.validate(undefined)).toBeFalsy();
    expect(baseSchema.validate({ valueA: validString, valueB: "wrong type" as any })).toBeFalsy();

    // --- Derived schema allows null ---
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate({ valueA: validString, valueB: validNumber })).toBeTruthy();
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema with notRequired allows null and undefined ---
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate({ valueA: validString, valueB: validNumber })).toBeTruthy();

    // --- Ensure base schema remains unmodified ---
    expect(baseSchema.validate(null)).toBeFalsy();
    expect(baseSchema.validate(undefined)).toBeFalsy();
  });

  it("Should be able to validate the object method and return true if the value is valid", () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string(),
      }),
    });

    const sut = objectSchema.validate({
      valueA: "any value",
      valueB: true,
      valueC: 123,
      valueD: new Date(),
      valueE: {
        valueF: "any value",
      },
    });

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the object method and return false if the value is invalid", () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string(),
      }),
    });

    const sut = objectSchema.validate({
      valueA: "any value",
      valueB: true,
      valueC: 123,
      valueD: new Date(),
      valueE: false as any,
    });

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the object method when value is promise and return true if the value is valid", async () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date().parseTo().boolean(),
      valueE: schema().object({
        valueF: schema().string(),
      }),
    });

    type B = InferIn<typeof objectSchema>;
    type c = InferOut<typeof objectSchema>;

    const value = async (): Promise<InferIn<typeof objectSchema>> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valueA: "any value",
            valueB: true,
            valueC: 123,
            valueD: new Date(),
            valueE: {
              valueF: "any value",
            },
          });
        }, 100);
      });
    };

    const sut = await objectSchema.validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the object method when value is promise and return false if the value is invalid", async () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string(),
      }),
    });

    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valueA: "any value",
            valueB: true,
            valueC: 123,
            valueD: new Date(),
            valueE: false,
          });
        }, 100);
      });
    };

    const sut = await objectSchema.validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should allow custom error message", () => {
    const objectSchema = schema().object(
      {
        valueA: schema().string(),
      },
      { message: "[valueName] [value]!" },
    );

    const sut = objectSchema.test(undefined as any, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(0);
    expect(sut.failed).toEqual(2);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([]);
    expect(sut.errors).toEqual([
      {
        method: "required",
        type: "missing value",
        name: "value_name",
        expect: "value other than undefined",
        received: "undefined",
        message: "value_name is required!",
      },
      {
        method: "object",
        type: "invalid value",
        name: "value_name",
        expect: "object type",
        received: "undefined",
        message: "value_name undefined!",
      },
    ]);
    expect(sut.value).toEqual(undefined);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the object method and passedAll to equal true if the value is valid", () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string(),
      }),
    });

    const sut = objectSchema.test(
      {
        valueA: "any value",
        valueB: true,
        valueC: 123,
        valueD: new Date("2024-01-28T18:24:55.758Z"),
        valueE: {
          valueF: "any value",
        },
      },
      "value_name",
    );

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(14);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(14);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: {
          valueA: "any value",
          valueB: true,
          valueC: 123,
          valueD: new Date("2024-01-28T18:24:55.758Z"),
          valueE: {
            valueF: "any value",
          },
        },
      },
      {
        method: "object",
        name: "value_name",
        expect: "object type",
        received: {
          valueA: "any value",
          valueB: true,
          valueC: 123,
          valueD: new Date("2024-01-28T18:24:55.758Z"),
          valueE: {
            valueF: "any value",
          },
        },
      },
      {
        method: "required",
        name: "valueA",
        expect: "value other than undefined",
        received: "any value",
      },
      {
        method: "string",
        name: "valueA",
        expect: "string type",
        received: "any value",
      },
      {
        method: "required",
        name: "valueB",
        expect: "value other than undefined",
        received: true,
      },
      {
        method: "boolean",
        name: "valueB",
        expect: "boolean type",
        received: true,
      },
      {
        method: "required",
        name: "valueC",
        expect: "value other than undefined",
        received: 123,
      },
      {
        method: "number",
        name: "valueC",
        expect: "number type",
        received: 123,
      },
      {
        method: "required",
        name: "valueD",
        expect: "value other than undefined",
        received: new Date("2024-01-28T18:24:55.758Z"),
      },
      {
        method: "date",
        name: "valueD",
        expect: "Date type",
        received: new Date("2024-01-28T18:24:55.758Z"),
      },
      {
        method: "required",
        name: "valueE",
        expect: "value other than undefined",
        received: {
          valueF: "any value",
        },
      },
      {
        method: "object",
        name: "valueE",
        expect: "object type",
        received: {
          valueF: "any value",
        },
      },
      {
        method: "required",
        name: "valueF",
        expect: "value other than undefined",
        received: "any value",
      },
      {
        method: "string",
        name: "valueF",
        expect: "string type",
        received: "any value",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual({
      valueA: "any value",
      valueB: true,
      valueC: 123,
      valueD: new Date("2024-01-28T18:24:55.758Z"),
      valueE: {
        valueF: "any value",
      },
    });
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the object method and passedAll to equal false if the value is invalid", () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string(),
      }),
    });

    const sut = objectSchema.test(
      {
        valueA: "any value",
        valueB: true,
        valueC: 123,
        valueD: new Date("2024-01-28T18:24:55.758Z"),
        valueE: false as any,
      },
      "value_name",
    );

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(11);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(12);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: {
          valueA: "any value",
          valueB: true,
          valueC: 123,
          valueD: new Date("2024-01-28T18:24:55.758Z"),
          valueE: false,
        },
      },
      {
        method: "object",
        name: "value_name",
        expect: "object type",
        received: {
          valueA: "any value",
          valueB: true,
          valueC: 123,
          valueD: new Date("2024-01-28T18:24:55.758Z"),
          valueE: false,
        },
      },
      {
        method: "required",
        name: "valueA",
        expect: "value other than undefined",
        received: "any value",
      },
      {
        method: "string",
        name: "valueA",
        expect: "string type",
        received: "any value",
      },
      {
        method: "required",
        name: "valueB",
        expect: "value other than undefined",
        received: true,
      },
      {
        method: "boolean",
        name: "valueB",
        expect: "boolean type",
        received: true,
      },
      {
        method: "required",
        name: "valueC",
        expect: "value other than undefined",
        received: 123,
      },
      {
        method: "number",
        name: "valueC",
        expect: "number type",
        received: 123,
      },
      {
        method: "required",
        name: "valueD",
        expect: "value other than undefined",
        received: new Date("2024-01-28T18:24:55.758Z"),
      },
      {
        method: "date",
        name: "valueD",
        expect: "Date type",
        received: new Date("2024-01-28T18:24:55.758Z"),
      },
      {
        method: "required",
        name: "valueE",
        expect: "value other than undefined",
        received: false,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "object",
        type: "invalid value",
        name: "valueE",
        expect: "object type",
        received: false,
        message: "valueE value must be an object!",
      },
    ]);
    expect(sut.value).toEqual({
      valueA: "any value",
      valueB: true,
      valueC: 123,
      valueD: new Date("2024-01-28T18:24:55.758Z"),
      valueE: false as any,
    });
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the object and passAll method as equal to true when it is not required abd value is undefined", () => {
    const objectSchema = schema()
      .object({
        valueA: schema().string(),
        valueB: schema().boolean(),
        valueC: schema().number(),
        valueD: schema().date(),
        valueE: schema().object({
          valueF: schema().string(),
        }),
      })
      .notRequired();

    const sut = objectSchema.test(undefined, "value_name");

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
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the boolean method and passedAll to equal true if the value is promise and valid", async () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string(),
      }),
    });

    const value = async (): Promise<InferIn<typeof objectSchema>> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valueA: "any value",
            valueB: true,
            valueC: 123,
            valueD: new Date("2024-01-28T18:24:55.758Z"),
            valueE: {
              valueF: "any value",
            },
          });
        }, 100);
      });
    };

    const sut = await objectSchema.testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(14);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(14);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: {
          valueA: "any value",
          valueB: true,
          valueC: 123,
          valueD: new Date("2024-01-28T18:24:55.758Z"),
          valueE: {
            valueF: "any value",
          },
        },
      },
      {
        method: "object",
        name: "value_name",
        expect: "object type",
        received: {
          valueA: "any value",
          valueB: true,
          valueC: 123,
          valueD: new Date("2024-01-28T18:24:55.758Z"),
          valueE: {
            valueF: "any value",
          },
        },
      },
      {
        method: "required",
        name: "valueA",
        expect: "value other than undefined",
        received: "any value",
      },
      {
        method: "string",
        name: "valueA",
        expect: "string type",
        received: "any value",
      },
      {
        method: "required",
        name: "valueB",
        expect: "value other than undefined",
        received: true,
      },
      {
        method: "boolean",
        name: "valueB",
        expect: "boolean type",
        received: true,
      },
      {
        method: "required",
        name: "valueC",
        expect: "value other than undefined",
        received: 123,
      },
      {
        method: "number",
        name: "valueC",
        expect: "number type",
        received: 123,
      },
      {
        method: "required",
        name: "valueD",
        expect: "value other than undefined",
        received: new Date("2024-01-28T18:24:55.758Z"),
      },
      {
        method: "date",
        name: "valueD",
        expect: "Date type",
        received: new Date("2024-01-28T18:24:55.758Z"),
      },
      {
        method: "required",
        name: "valueE",
        expect: "value other than undefined",
        received: {
          valueF: "any value",
        },
      },
      {
        method: "object",
        name: "valueE",
        expect: "object type",
        received: {
          valueF: "any value",
        },
      },
      {
        method: "required",
        name: "valueF",
        expect: "value other than undefined",
        received: "any value",
      },
      {
        method: "string",
        name: "valueF",
        expect: "string type",
        received: "any value",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual({
      valueA: "any value",
      valueB: true,
      valueC: 123,
      valueD: new Date("2024-01-28T18:24:55.758Z"),
      valueE: {
        valueF: "any value",
      },
    });
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the object method and passedAll to equal false if the value is a promise and invalid", async () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string(),
      }),
    });

    const value = async (): Promise<InferIn<typeof objectSchema>> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valueA: "any value",
            valueB: true,
            valueC: 123,
            valueD: new Date("2024-01-28T18:24:55.758Z"),
            valueE: false as any,
          });
        }, 100);
      });
    };

    const sut = await objectSchema.testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(11);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(12);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: {
          valueA: "any value",
          valueB: true,
          valueC: 123,
          valueD: new Date("2024-01-28T18:24:55.758Z"),
          valueE: false,
        },
      },
      {
        method: "object",
        name: "value_name",
        expect: "object type",
        received: {
          valueA: "any value",
          valueB: true,
          valueC: 123,
          valueD: new Date("2024-01-28T18:24:55.758Z"),
          valueE: false,
        },
      },
      {
        method: "required",
        name: "valueA",
        expect: "value other than undefined",
        received: "any value",
      },
      {
        method: "string",
        name: "valueA",
        expect: "string type",
        received: "any value",
      },
      {
        method: "required",
        name: "valueB",
        expect: "value other than undefined",
        received: true,
      },
      {
        method: "boolean",
        name: "valueB",
        expect: "boolean type",
        received: true,
      },
      {
        method: "required",
        name: "valueC",
        expect: "value other than undefined",
        received: 123,
      },
      {
        method: "number",
        name: "valueC",
        expect: "number type",
        received: 123,
      },
      {
        method: "required",
        name: "valueD",
        expect: "value other than undefined",
        received: new Date("2024-01-28T18:24:55.758Z"),
      },
      {
        method: "date",
        name: "valueD",
        expect: "Date type",
        received: new Date("2024-01-28T18:24:55.758Z"),
      },
      {
        method: "required",
        name: "valueE",
        expect: "value other than undefined",
        received: false,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "object",
        type: "invalid value",
        name: "valueE",
        expect: "object type",
        received: false,
        message: "valueE value must be an object!",
      },
    ]);
    expect(sut.value).toEqual({
      valueA: "any value",
      valueB: true,
      valueC: 123,
      valueD: new Date("2024-01-28T18:24:55.758Z"),
      valueE: false as any,
    });
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the object method and throw AnyError if the value is invalid", () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string(),
      }),
    });

    const sut = (): void => objectSchema.throw(undefined as any, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the object method and throw Error if the value is a promise and is not of type object", async () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string(),
      }),
    });

    const value = async (): Promise<InferIn<typeof objectSchema>> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valueA: "any value",
            valueB: true,
            valueC: 123,
            valueD: new Date("2024-01-28T18:24:55.758Z"),
            valueE: false as any,
          });
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await objectSchema.throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("valueE value must be an object!");
  });

  it("Should be able to validate the object method and throw Error if the schema is not of type object", () => {
    try {
      schema().object(null as any);
    } catch (error: any) {
      const sut = error;

      expect(sut.message).toEqual("vkrun-schema: object method received invalid parameter!");
    }
  });

  it("Should be able to validate the object's method and throw Error if the schema has a key with different typing than the Validator class", () => {
    try {
      schema().object({
        valueA: schema().string(),
        valueB: true as any,
      });
    } catch (error: any) {
      const sut = error;

      expect(sut.message).toEqual("vkrun-schema: object method received invalid parameter!");
    }
  });

  it("should not duplicate UUID validation errors when field is notRequired", () => {
    const objScehama = schema()
      .object({
        foo: schema().string().UUID().notRequired(),
      })
      .notRequired();

    const testResult = objScehama.test({ foo: "UUID" });
    const erros = testResult.errors;

    expect(erros).toEqual([
      {
        method: "UUID",
        type: "invalid value",
        name: "foo",
        expect: "format UUID",
        received: "UUID",
        message: "foo must be a UUID type!",
      },
    ]);
  });

  it("should not duplicate UUID validation errors when field is nullable", () => {
    const objScehama = schema()
      .object({
        foo: schema().string().UUID().notRequired(),
      })
      .nullable();

    const testResult = objScehama.test({ foo: "UUID" });
    const erros = testResult.errors;

    expect(erros).toEqual([
      {
        method: "UUID",
        type: "invalid value",
        name: "foo",
        expect: "format UUID",
        received: "UUID",
        message: "foo must be a UUID type!",
      },
    ]);
  });
});
