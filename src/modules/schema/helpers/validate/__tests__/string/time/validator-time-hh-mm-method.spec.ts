import { schema } from "../../../../../index";
import { AnyError } from "../../../../../../errors";

describe("Validator Time HH:MM Method", () => {
  it("Should not modify base schema when creating derived schema with time HH:MM", () => {
    const baseSchema = schema().string();
    const derivedSchema = baseSchema.time({ type: "HH:MM" });
    const derivedNotRequired = derivedSchema.notRequired();

    // Base schema should accept any string
    expect(baseSchema.validate("any_string")).toBeTruthy();
    expect(baseSchema.validate("12:34")).toBeTruthy();
    expect(baseSchema.validate(undefined)).toBeFalsy();

    // Derived schema validates time in HH:MM format
    expect(derivedSchema.validate("23:59")).toBeTruthy();
    expect(derivedSchema.validate("invalid_time")).toBeFalsy();
    expect(derivedSchema.validate(undefined)).toBeFalsy();

    // Derived schema with notRequired allows undefined
    expect(derivedNotRequired.validate("00:00")).toBeTruthy();
    expect(derivedNotRequired.validate("invalid_time")).toBeFalsy();
    expect(derivedNotRequired.validate(undefined)).toBeTruthy();

    // Ensure the base schema remains unchanged
    expect(baseSchema.validate("any_string")).toBeTruthy();
    expect(baseSchema.validate(undefined)).toBeFalsy();
  });

  it("Should be able to validate the time method and return true if list is valid", () => {
    const setList = new Set();
    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute <= 59; minute++) {
        setList.add(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
      }
    }

    const completeListOfHoursAndMinutes: any[] = Array.from(setList);

    const sut = schema().string().time({ type: "HH:MM" });

    expect(completeListOfHoursAndMinutes.every((value) => sut.validate(value))).toBeTruthy();
  });

  it("Should be able to validate the time method and return false if list is invalid", () => {
    const invalidList: any[] = ["24:00", "00:60", "invalid-value", false, new Date(), 123, null, [], {}, undefined];

    const sut = schema().string().time({ type: "HH:MM" });

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the time method when value is promise and return true if the value is a valid time format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("13:51");
        }, 100);
      });
    };

    const sut = await schema().string().time({ type: "HH:MM" }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the time method when value is promise and return false if the value is a invalid time format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("13:5");
        }, 100);
      });
    };

    const sut = await schema().string().time({ type: "HH:MM" }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the time method and passedAll to equal true if the value is a valid time format", () => {
    const value = "13:51";

    const sut = schema().string().time({ type: "HH:MM" }).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "13:51",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "13:51",
      },
      {
        method: "time",
        name: "value_name",
        expect: "HH:MM format",
        received: "13:51",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value = "13:5";

    const sut = schema({ message: "[valueName] is required new message!" })
      .string()
      .time({ type: "HH:MM", message: "[valueName] [value] [type]!" })
      .test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "13:5",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "13:5",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "time",
        type: "invalid value",
        name: "value_name",
        expect: "HH:MM format",
        received: "13:5",
        message: "value_name 13:5 HH:MM!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the time method and passedAll to equal false if the value is a invalid time format", () => {
    const value = "13:5";

    const sut = schema().string().time({ type: "HH:MM" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "13:5",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "13:5",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "time",
        type: "invalid value",
        name: "value_name",
        expect: "HH:MM format",
        received: "13:5",
        message: "the time 13:5 is not in the format HH:MM!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the time and passAll method as equal to true when it is not required and value is undefined", () => {
    const value = undefined;

    const sut = schema().string().time({ type: "HH:MM" }).notRequired().test(value, "value_name");

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

  it("Should be able to validate the time method and passedAll to equal true if value is promise in valid time format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("23:59");
        }, 100);
      });
    };

    const sut = await schema().string().time({ type: "HH:MM" }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "23:59",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "23:59",
      },
      {
        method: "time",
        name: "value_name",
        expect: "HH:MM format",
        received: "23:59",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe("23:59");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the time method and passedAll to equal false if value is promise in invalid time format", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    };

    const sut = await schema().string().time({ type: "HH:MM" }).testAsync(value(), "value_name");

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
        method: "string",
        type: "invalid value",
        name: "value_name",
        expect: "string type",
        received: false,
        message: "value_name must be a string type!",
      },
      {
        method: "time",
        type: "invalid value",
        name: "value_name",
        expect: "HH:MM format",
        received: false,
        message: "the time false is not in the format HH:MM!",
      },
    ]);
    expect(sut.value).toBe(false);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the time method and throw AnyError if the value is a valid time format", () => {
    const value: any = undefined;

    const sut = (): void => schema().string().time({ type: "HH:MM" }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the time method and throw Error if the value is a promise and is a invalid time format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("23:60");
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().string().time({ type: "HH:MM" }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("the time 23:60 is not in the format HH:MM!");
  });

  /* eslint-disable */
  it("Should be able to throw an error if the time method received invalid parameter", () => {
    try {
      schema()
        .string()
        // @ts-ignore
        .time(false);
    } catch (error: any) {
      const sut = error;
      expect(sut.message).toEqual("vkrun-schema: time method received invalid parameter!");
    }
  });
  /* eslint-enable */
});
