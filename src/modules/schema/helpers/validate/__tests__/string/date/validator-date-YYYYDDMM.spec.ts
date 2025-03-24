import { schema } from "../../../../../index";
import { AnyError } from "../../../../../../errors";

describe("Validator Date (YYYY-DD-MM and YYYY/DD/MM) Method", () => {
  it("Should be able to validate the date method and return true if the value is of type YYYY-DD-MM date", () => {
    const value = "2000-30-12";

    const sut = schema().string().date({ type: "YYYY-DD-MM" }).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the date method and return true if the value is of type YYYY/DD/MM date", () => {
    const value = "2000/30/12";

    const sut = schema().string().date({ type: "YYYY/DD/MM" }).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the date method and return false if the value is not of type YYYY-DD-MM date", () => {
    const value = "2000-12-30";

    const sut = schema().string().date({ type: "YYYY-DD-MM" }).validate(value);

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the date method and return false if the value is not of type YYYY/DD/MM date", () => {
    const value = "2000/12/30";

    const sut = schema().string().date({ type: "YYYY/DD/MM" }).validate(value);

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the date method when value is promise and return true if the value is of type YYYY-DD-MM date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("2000-30-12");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "YYYY-DD-MM" }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the date method when value is promise and return true if the value is of type YYYY/DD/MM date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve("2000/30/12");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "YYYY/DD/MM" }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the date method when value is promise and return false if the value is not of type YYYY-DD-MM date", async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date());
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "YYYY-DD-MM" }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the date method when value is promise and return false if the value is not of type YYYY/DD/MM date", async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date());
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "YYYY/DD/MM" }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the date method and passedAll to equal true if the value is of type YYYY-DD-MM date", () => {
    const value = "2000-30-12";

    const sut = schema().string().date({ type: "YYYY-DD-MM" }).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "2000-30-12",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "2000-30-12",
      },
      {
        method: "date",
        name: "value_name",
        expect: "YYYY-DD-MM date type",
        received: "2000-30-12",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal true if the value is of type YYYY/DD/MM date", () => {
    const value = "2000/30/12";

    const sut = schema().string().date({ type: "YYYY/DD/MM" }).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "2000/30/12",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "2000/30/12",
      },
      {
        method: "date",
        name: "value_name",
        expect: "YYYY/DD/MM date type",
        received: "2000/30/12",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe("2000/30/12");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal false if the value is not of type YYYY-DD-MM date", () => {
    const value = "2000-02-03T02:00:00.000Z";

    const sut = schema().string().date({ type: "YYYY-DD-MM" }).test(value, "value_name");

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
        expect: "YYYY-DD-MM date type",
        received: "2000-02-03T02:00:00.000Z",
        message: "the date value_name is not in the format YYYY-DD-MM!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal false if the value is not of type YYYY/DD/MM date", () => {
    const value = "2000-02-03T02:00:00.000Z";

    const sut = schema().string().date({ type: "YYYY/DD/MM" }).test(value, "value_name");

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
        expect: "YYYY/DD/MM date type",
        received: "2000-02-03T02:00:00.000Z",
        message: "the date value_name is not in the format YYYY/DD/MM!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type YYYY-DD-MM date", () => {
    const value = undefined;

    const sut = schema().string().date({ type: "YYYY-DD-MM" }).notRequired().test(value, "value_name");

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

  it("Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type YYYY/DD/MM date", () => {
    const value = undefined;

    const sut = schema().string().date({ type: "YYYY/DD/MM" }).notRequired().test(value, "value_name");

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

  it("Should be able to validate the date method and passedAll to equal true if the value is promise of type YYYY-DD-MM date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("2000-30-12");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "YYYY-DD-MM" }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "2000-30-12",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "2000-30-12",
      },
      {
        method: "date",
        name: "value_name",
        expect: "YYYY-DD-MM date type",
        received: "2000-30-12",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe("2000-30-12");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal true if the value is promise of type YYYY/DD/MM date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve("2000/30/12");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "YYYY/DD/MM" }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "2000/30/12",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "2000/30/12",
      },
      {
        method: "date",
        name: "value_name",
        expect: "YYYY/DD/MM date type",
        received: "2000/30/12",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe("2000/30/12");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type YYYY-DD-MM date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("2000-02-03T02:00:00.000Z");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "YYYY-DD-MM" }).testAsync(value(), "value_name");

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
        expect: "YYYY-DD-MM date type",
        received: "2000-02-03T02:00:00.000Z",
        message: "the date value_name is not in the format YYYY-DD-MM!",
      },
    ]);
    expect(sut.value).toBe("2000-02-03T02:00:00.000Z");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type YYYY/DD/MM date", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("2000-02-03T02:00:00.000Z");
        }, 100);
      });
    };

    const sut = await schema().string().date({ type: "YYYY/DD/MM" }).testAsync(value(), "value_name");

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
        expect: "YYYY/DD/MM date type",
        received: "2000-02-03T02:00:00.000Z",
        message: "the date value_name is not in the format YYYY/DD/MM!",
      },
    ]);
    expect(sut.value).toBe("2000-02-03T02:00:00.000Z");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the date method and throw AnyError if the value is not of type YYYY-DD-MM date", () => {
    const value: any = undefined;

    const sut = (): void => schema().string().date({ type: "YYYY-DD-MM" }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the date method and throw AnyError if the value is not of type YYYY/DD/MM date", () => {
    const value: any = undefined;

    const sut = (): void => schema().string().date({ type: "YYYY/DD/MM" }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the date method and throw Error if the value is a promise and is not of type YYYY-DD-MM date", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("string");
        }, 100);
      });
    };

    const sut = async (): Promise<void> =>
      await schema().string().date({ type: "YYYY-DD-MM" }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("the date value_name is not in the format YYYY-DD-MM!");
  });

  it("Should be able to validate the date method and throw Error if the value is a promise and is not of type YYYY/DD/MM date", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("string");
        }, 100);
      });
    };

    const sut = async (): Promise<void> =>
      await schema().string().date({ type: "YYYY/DD/MM" }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("the date value_name is not in the format YYYY/DD/MM!");
  });
});
