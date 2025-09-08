import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator Date (default) Method", () => {
  it("Should not modify base schema when creating derived schema", () => {
    // Base schema
    const baseDateSchema = schema().date();

    // Derived schemas applying additional methods
    const derivedNullableSchema = baseDateSchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    // Valid value to test
    const validDate = new Date();

    // --- Base schema should only validate Date and not allow null/undefined ---
    expect(baseDateSchema.validate(validDate)).toBeTruthy();
    expect(baseDateSchema.validate(null)).toBeFalsy();
    expect(baseDateSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema allows null ---
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(validDate)).toBeTruthy();
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema with notRequired allows null and undefined ---
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(validDate)).toBeTruthy();

    // --- Ensure base schema remains unmodified ---
    expect(baseDateSchema.validate(null)).toBeFalsy();
    expect(baseDateSchema.validate(undefined)).toBeFalsy();
  });

  it("Should be able to validate the date method and return true if list is valid", () => {
    const validList = [
      new Date(),
      new Date("2020-01-01T00:00:00+02:00"),
      new Date("2020-01-01T00:00:00.123+02:00"),
      new Date("2020-01-01T00:00:00.123+0200"),
      new Date("2020-01-01T00:00:00Z"),
    ];

    const sut = schema().date();

    expect(validList.every((value) => sut.validate(value))).toBeTruthy();
  });

  it("Should be able to validate the date method and return false if list is invalid", () => {
    const validList: any[] = [undefined, null, "invalid", 1, true, false];

    const sut = schema().date();

    expect(validList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the date method and return false if the value is not of type default date", () => {
    const value = "27/11/21";

    const sut = schema().date().validate(value);

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the date method when value is promise and return true if the value is of type default date", async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date());
        }, 100);
      });
    };

    const sut = await schema().date().validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the date method when value is promise and return false if the value is not of type default date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("27/11/21");
        }, 100);
      });
    };

    const sut = await schema().date().validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the date method and passedAll to equal true if the value is of type default date", () => {
    const value = new Date("2000-02-03T02:00:00.000Z");

    const sut = schema().date().test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2000-02-03T02:00:00.000Z"),
      },
      {
        method: "date",
        expect: "Date type",
        name: "value_name",
        received: new Date("2000-02-03T02:00:00.000Z"),
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal false if the value is not of type default date", () => {
    const value = "27/11/21";

    const sut = schema().date().test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "27/11/21",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "date",
        type: "invalid value",
        name: "value_name",
        expect: "Date type",
        received: "27/11/21",
        message: "value_name must be a Date type!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value = "27/11/21";

    const sut = schema().date({ message: "[valueName] [value] any message" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "27/11/21",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "date",
        type: "invalid value",
        name: "value_name",
        expect: "Date type",
        received: "27/11/21",
        message: "value_name 27/11/21 any message",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type default date", () => {
    const value = undefined;

    const sut = schema().date().notRequired().test(value, "value_name");

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

  it("Should be able to validate the date method and passedAll to equal true if the value is promise of type default date", async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date("2000-02-03T02:00:00.000Z"));
        }, 100);
      });
    };

    const sut = await schema().date().testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2000-02-03T02:00:00.000Z"),
      },
      {
        method: "date",
        expect: "Date type",
        name: "value_name",
        received: new Date("2000-02-03T02:00:00.000Z"),
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(new Date("2000-02-03T02:00:00.000Z"));
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type default date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("27/11/21");
        }, 100);
      });
    };

    const sut = await schema().date().testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "27/11/21",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "date",
        type: "invalid value",
        name: "value_name",
        expect: "Date type",
        received: "27/11/21",
        message: "value_name must be a Date type!",
      },
    ]);
    expect(sut.value).toBe("27/11/21");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and throw AnyError if the value is not of type default date", () => {
    const value: any = undefined;

    const sut = (): void => schema().date().throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the date method and throw Error if the value is a promise and is not of type default date", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().date().throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must be a Date type!");
  });

  /* eslint-disable */
  it("Should be able to throw an error if the date method received invalid parameter", () => {
    try {
      // @ts-ignore
      schema().date(false);
    } catch (error: any) {
      const sut = error;
      expect(sut.message).toEqual("vkrun-schema: date method received invalid parameter!");
    }
  });
  /* eslint-enable */
});
