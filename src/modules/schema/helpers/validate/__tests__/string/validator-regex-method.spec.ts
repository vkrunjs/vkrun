import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator Regex Method", () => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  it("Should be able to validate the regex method and return true if list is valid", () => {
    const validList = ["any_email@domain.com", "any-email@domain.com", "any.email@domain.com", "any_123_email@domain.com"];

    const sut = schema().string().regex({ regExp: regex });

    expect(validList.every((value) => sut.validate(value))).toBeTruthy();
  });

  it("Should be able to validate the regex method and return false if list is invalid", () => {
    const invalidList: any[] = [
      "any_email@.com",
      "any_email@domain",
      "any_email@domain.c",
      "any_+_email@domain.com",
      "any_#_email@domain.com",
      "any_$_email@domain.com",
      "any_%_email@domain.com",
      "any_ˆ_email@domain.com",
      "any_&_email@domain.com",
      "any_*_email@domain.com",
      "any_(_email@domain.com",
      "any_)_email@domain.com",
      "any_,_email@domain.com",
      'any_"_email@domain.com',
      "any_'_email@domain.com",
      "any_;_email@domain.com",
      "any_:_email@domain.com",
      "any_[_email@domain.com",
      "any_]_email@domain.com",
      "any_{_email@domain.com",
      "any_}_email@domain.com",
      "any_\\_email@domain.com",
      "any_/_email@domain.com",
      "any_?_email@domain.com",
      "any_<_email@domain.com",
      "any_>_email@domain.com",
      "any_/_email@domain.com",
      false,
      new Date(),
      null,
      123,
      [],
      {},
      undefined,
    ];

    const sut = schema().string().regex({ regExp: regex });

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the regex method when value is promise and return true if the value is a valid regex format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("any_email@domain.com");
        }, 100);
      });
    };

    const sut = await schema().string().regex({ regExp: regex }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the regex method when value is promise and return false if the value is a invalid regex format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("any_email@domain");
        }, 100);
      });
    };

    const sut = await schema().string().regex({ regExp: regex }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the regex method and passedAll to equal true if the value is a valid regex format", () => {
    const value = "any_email@domain.com";

    const sut = schema().string().regex({ regExp: regex }).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "any_email@domain.com",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "any_email@domain.com",
      },
      {
        method: "regex",
        name: "value_name",
        expect: "regex format",
        received: "any_email@domain.com",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the regex method and passedAll to equal false if the value is a invalid regex format", () => {
    const value: any = false;

    const sut = schema().string().regex({ regExp: regex }).test(value, "value_name");

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
        method: "regex",
        type: "invalid value",
        name: "value_name",
        expect: "regex format",
        received: false,
        message: "value does not match!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the email and passAll method as equal to true when it is not required and value is undefined", () => {
    const value = undefined;

    const sut = schema().string().regex({ regExp: regex }).notRequired().test(value, "value_name");

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

  it("Should be able to validate the regex method and passedAll to equal true if value is promise in valid regex format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("any_email@domain.com");
        }, 100);
      });
    };

    const sut = await schema().string().regex({ regExp: regex }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "any_email@domain.com",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "any_email@domain.com",
      },
      {
        method: "regex",
        expect: "regex format",
        name: "value_name",
        received: "any_email@domain.com",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe("any_email@domain.com");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the regex method and passedAll to equal false if value is promise in invalid regex format", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    };

    const sut = await schema().string().regex({ regExp: regex }).testAsync(value(), "value_name");

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
        method: "regex",
        type: "invalid value",
        name: "value_name",
        expect: "regex format",
        received: false,
        message: "value does not match!",
      },
    ]);
    expect(sut.value).toBe(false);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the regex method and throw AnyError if the value is a valid regex format", () => {
    const value: any = undefined;

    const sut = (): void => schema().string().regex({ regExp: regex }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the regex method and throw Error if the value is a promise and is a invalid regex format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("any_email@domain");
        }, 100);
      });
    };

    const sut = async (): Promise<void> =>
      await schema()
        .string()
        .regex({
          regExp: regex,
          message: "email [value] is invalid!",
        })
        .throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("email any_email@domain is invalid!");
  });

  it("Sh invalid", async () => {
    const customRegexSchema = schema().string().regex({
      regExp: /^\d+$/,
      message: "[valueName] must match the pattern [regExp], but got [value]",
    });

    const test = customRegexSchema.test("abc", "user_id");
    console.log(test.errors[0].message);
    // "user_id must match the pattern /^\\d+$/, but got abc"
  });
});
