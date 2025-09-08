import { schema } from "../../../../../index";
import { AnyError } from "../../../../../../errors";

describe("Validator String Date (DD-MM-YYYY and DD/MM/YYYY) Method", () => {
  it("Should not modify base schema when creating derived schema with date DD-MM-YYYY/DD/MM/YYYY", () => {
    const baseSchema = schema().string();
    const derivedSchema = baseSchema.date({ type: "DD-MM-YYYY" });
    const derivedNotRequired = derivedSchema.notRequired();

    // Base schema should accept any string
    expect(baseSchema.validate("any_string")).toBeTruthy();
    expect(baseSchema.validate("30-12-2000")).toBeTruthy();
    expect(baseSchema.validate(undefined)).toBeFalsy();

    // Derived schema validates DD-MM-YYYY date format
    expect(derivedSchema.validate("30-12-2000")).toBeTruthy();
    expect(derivedSchema.validate("invalid_date")).toBeFalsy();
    expect(derivedSchema.validate(undefined)).toBeFalsy();

    // Derived schema with notRequired allows undefined
    expect(derivedNotRequired.validate("30-12-2000")).toBeTruthy();
    expect(derivedNotRequired.validate("invalid_date")).toBeFalsy();
    expect(derivedNotRequired.validate(undefined)).toBeTruthy();

    // Ensure the base schema remains unchanged
    expect(baseSchema.validate("any_string")).toBeTruthy();
    expect(baseSchema.validate(undefined)).toBeFalsy();
  });

  it("Should be able to validate the date method and return true if the value is of type DD-MM-YYYY date", () => {
    const value = "30-12-2000";

    const sut = schema().string().date({ type: "DD-MM-YYYY" }).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the date method and return true if the value is of type DD/MM/YYYY date", () => {
    const value = "30/12/2000";

    const sut = schema().string().date({ type: "DD/MM/YYYY" }).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the date method and return false if the value is not of type DD-MM-YYYY date", () => {
    const value = "12-30-2000";

    const sut = schema().string().date({ type: "DD-MM-YYYY" }).validate(value);

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the date method and return false if the value is not of type DD/MM/YYYY date", () => {
    const value = "12/30/2000";

    const sut = schema().string().date({ type: "DD/MM/YYYY" }).validate(value);

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the date method when value is promise and return true if the value is of type DD-MM-YYYY date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("30-12-2000");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "DD-MM-YYYY" }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the date method when value is promise and return true if the value is of type DD/MM/YYYY date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve("30/12/2000");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "DD/MM/YYYY" }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the date method when value is promise and return false if the value is not of type DD-MM-YYYY date", async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date());
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "DD-MM-YYYY" }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the date method when value is promise and return false if the value is not of type DD/MM/YYYY date", async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date());
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "DD/MM/YYYY" }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the date method and passedAll to equal true if the value is of type DD-MM-YYYY date", () => {
    const value = "30-12-2000";

    const sut = schema().string().date({ type: "DD-MM-YYYY" }).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "30-12-2000",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "30-12-2000",
      },
      {
        method: "date",
        name: "value_name",
        expect: "DD-MM-YYYY date type",
        received: "30-12-2000",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(typeof sut.time === "string").toBeTruthy();
    expect(sut.value).toEqual(value);
  });

  it("Should be able to validate the date method and passedAll to equal true if the value is of type DD/MM/YYYY date", () => {
    const value = "30/12/2000";

    const sut = schema().string().date({ type: "DD/MM/YYYY" }).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "30/12/2000",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "30/12/2000",
      },
      {
        method: "date",
        name: "value_name",
        expect: "DD/MM/YYYY date type",
        received: "30/12/2000",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal false if the value is not of type DD-MM-YYYY date", () => {
    const value = "2000-02-03T02:00:00.000Z";

    const sut = schema().string().date({ type: "DD-MM-YYYY" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "2000-02-03T02:00:00.000Z",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "2000-02-03T02:00:00.000Z",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "date",
        type: "invalid value",
        name: "value_name",
        expect: "DD-MM-YYYY date type",
        received: "2000-02-03T02:00:00.000Z",
        message: "the date value_name is not in the format DD-MM-YYYY!",
      },
    ]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal false if the value is not of type DD/MM/YYYY date", () => {
    const value = "2000-02-03T02:00:00.000Z";

    const sut = schema().string().date({ type: "DD/MM/YYYY" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "2000-02-03T02:00:00.000Z",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "2000-02-03T02:00:00.000Z",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "date",
        type: "invalid value",
        name: "value_name",
        expect: "DD/MM/YYYY date type",
        received: "2000-02-03T02:00:00.000Z",
        message: "the date value_name is not in the format DD/MM/YYYY!",
      },
    ]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type DD-MM-YYYY date", () => {
    const value = undefined;

    const sut = schema().string().date({ type: "DD-MM-YYYY" }).notRequired().test(value, "value_name");

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

  it("Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type DD/MM/YYYY date", () => {
    const value = undefined;

    const sut = schema().string().date({ type: "DD/MM/YYYY" }).notRequired().test(value, "value_name");

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

  it("Should be able to validate the date method and passedAll to equal true if the value is promise of type DD-MM-YYYY date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("30-12-2000");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "DD-MM-YYYY" }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "30-12-2000",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "30-12-2000",
      },
      {
        method: "date",
        name: "value_name",
        expect: "DD-MM-YYYY date type",
        received: "30-12-2000",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal true if the value is promise of type DD/MM/YYYY date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve("30/12/2000");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "DD/MM/YYYY" }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "30/12/2000",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "30/12/2000",
      },
      {
        method: "date",
        name: "value_name",
        expect: "DD/MM/YYYY date type",
        received: "30/12/2000",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type DD-MM-YYYY date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("2000-02-03T02:00:00.000Z");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "DD-MM-YYYY" }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "2000-02-03T02:00:00.000Z",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "2000-02-03T02:00:00.000Z",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "date",
        type: "invalid value",
        name: "value_name",
        expect: "DD-MM-YYYY date type",
        received: "2000-02-03T02:00:00.000Z",
        message: "the date value_name is not in the format DD-MM-YYYY!",
      },
    ]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type DD/MM/YYYY date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("2000-02-03T02:00:00.000Z");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "DD/MM/YYYY" }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "2000-02-03T02:00:00.000Z",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "2000-02-03T02:00:00.000Z",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "date",
        type: "invalid value",
        name: "value_name",
        expect: "DD/MM/YYYY date type",
        received: "2000-02-03T02:00:00.000Z",
        message: "the date value_name is not in the format DD/MM/YYYY!",
      },
    ]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and throw AnyError if the value is not of type DD-MM-YYYY date", () => {
    const value: any = undefined;

    const sut = (): void => schema().string().date({ type: "DD-MM-YYYY" }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the date method and throw AnyError if the value is not of type DD/MM/YYYY date", () => {
    const value: any = undefined;

    const sut = (): void => schema().string().date({ type: "DD/MM/YYYY" }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the date method and throw Error if the value is a promise and is not of type DD-MM-YYYY date", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("10-30-2000");
        }, 100);
      });
    };

    const sut = async (): Promise<void> =>
      await schema().string().date({ type: "DD-MM-YYYY" }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("the date value_name is not in the format DD-MM-YYYY!");
  });

  it("Should be able to validate the date method and throw Error if the value is a promise and is not of type DD/MM/YYYY date", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("10/30/2020");
        }, 100);
      });
    };

    const sut = async (): Promise<void> =>
      await schema().string().date({ type: "DD/MM/YYYY" }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("the date value_name is not in the format DD/MM/YYYY!");
  });
});
