import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator MinWord Method", () => {
  it("Should be able to validate the minWord method and return true if the value has the minimum words", () => {
    const value = "Full Name";

    const sut = schema().string().minWord({ min: 2 });

    expect(sut.validate(value)).toBeTruthy();
  });

  it("Should be able to validate the minWord method and return false if list is invalid", () => {
    const invalidList: any[] = ["Full", false, new Date(), 123, null, [], {}, undefined];

    const sut = schema().string().minWord({ min: 2 });

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the minWord method when value is promise and return true if the value has the minimum words", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Full Name");
        }, 100);
      });
    };

    const test = await schema().string().minWord({ min: 2 }).validateAsync(value());

    expect(test).toBeTruthy();
  });

  it("Should be able to validate the minWord method when the value is a promise and return false if the value does not have the minimum words", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Full");
        }, 100);
      });
    };

    const sut = await schema().string().minWord({ min: 2 }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the minWord method and passedAll to equal true if the value has the minimum words", () => {
    const value = "Full Name";

    const sut = schema().string().minWord({ min: 2 }).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "Full Name",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "Full Name",
      },
      {
        method: "minWord",
        name: "value_name",
        expect: "minimum of words",
        received: "Full Name",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the minWord method and passedAll to equal false if the value does not have the minimum words", () => {
    const value = "Full";

    const sut = schema().string().minWord({ min: 2 }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "Full",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "Full",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "minWord",
        type: "invalid value",
        name: "value_name",
        expect: "minimum of words",
        received: "Full",
        message: "value_name must have at least 2 words!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value = "Full";

    const sut = schema().string().minWord({ min: 2, message: "[valueName] [value] [minWord]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "Full",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "Full",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "minWord",
        type: "invalid value",
        name: "value_name",
        expect: "minimum of words",
        received: "Full",
        message: "value_name Full 2!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the minWord and passAll method as equal to true when it is not required and value is undefined", () => {
    const value = undefined;

    const sut = schema().string().minWord({ min: 2 }).notRequired().test(value, "value_name");

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

  it("Should be able to validate the minWord method and passedAll to equal true if value is promise and has the minimum words", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Full Name");
        }, 100);
      });
    };

    const sut = await schema().string().minWord({ min: 2 }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "Full Name",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "Full Name",
      },
      {
        method: "minWord",
        name: "value_name",
        expect: "minimum of words",
        received: "Full Name",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe("Full Name");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the minWord method and passedAll to equal false if value is promise and does not have the minimum words", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Full");
        }, 100);
      });
    };

    const sut = await schema().string().minWord({ min: 2 }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "Full",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "Full",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "minWord",
        type: "invalid value",
        name: "value_name",
        expect: "minimum of words",
        received: "Full",
        message: "value_name must have at least 2 words!",
      },
    ]);
    expect(sut.value).toBe("Full");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the minWord method and throw AnyError if the value has the minimum words", () => {
    const value: any = undefined;

    const sut = (): void => schema().string().minWord({ min: 2 }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the minWord method and throw Error if the value is a promise and does not have the minimum words", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Full");
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().string().minWord({ min: 2 }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must have at least 2 words!");
  });
});
