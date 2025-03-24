import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator String Equal Method", () => {
  it("Should be able to validate the equal method and return true if the value is equal to the comparison value", () => {
    const valueToCompare = "string";
    const value = valueToCompare;

    const sut = schema().string().equal(valueToCompare).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the equal method and return false if the value is not equal to the comparison value", () => {
    const valueToCompare = "hello";

    const value = "world";

    const sut = schema().string().equal(valueToCompare).validate(value);

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the equal method when value is promise and return true if the value is equal to the comparison value", async () => {
    const valueToCompare = "string";

    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(valueToCompare);
        }, 100);
      });
    };

    const sut = await schema().string().equal(valueToCompare).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the equal method when value is promise and return false if the value is not equal to the comparison value", async () => {
    const valueToCompare = "string";

    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("hello");
        }, 100);
      });
    };

    const sut = await schema().string().equal(valueToCompare).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the equal method and passedAll to equal true if the value is equal to the comparison value", () => {
    const valueToCompare = "string";
    const value = valueToCompare;

    const sut = schema().string().equal(valueToCompare).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "string",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "string",
      },
      {
        method: "equal",
        name: "value_name",
        expect: "string",
        received: "string",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const valueToCompare = "string";
    const value = "hello";

    const sut = schema()
      .string()
      .equal(valueToCompare, { message: "[valueName] [value] [valueToCompare]!" })
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
        received: "hello",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "hello",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "equal",
        type: "invalid value",
        name: "value_name",
        expect: "string",
        received: "hello",
        message: "value_name hello string!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and passedAll to equal false if the value is not equal to the comparison value", () => {
    const valueToCompare = "string";
    const value = "hello";

    const sut = schema().string().equal(valueToCompare).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "hello",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "hello",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "equal",
        type: "invalid value",
        name: "value_name",
        expect: "string",
        received: "hello",
        message: "value does not match!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal and passAll method as equal to true when it is not required and the value is undefined", () => {
    const valueToCompare = "string";
    const value: any = undefined;

    const sut = schema().string().equal(valueToCompare).notRequired().test(value, "value_name");

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

  it("Should be able to validate the equal method and passedAll to equal true if the value is promise and equal to the comparison value", async () => {
    const valueToCompare = "string";

    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("string");
        }, 100);
      });
    };

    const sut = await schema().string().equal(valueToCompare).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "string",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "string",
      },
      {
        method: "equal",
        name: "value_name",
        expect: "string",
        received: "string",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe("string");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and passedAll to equal false if the value is a promise and is not equal to the comparison value", async () => {
    const valueToCompare: any = "string";

    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("hello");
        }, 100);
      });
    };

    const sut = await schema().string().equal(valueToCompare).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "hello",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "hello",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "equal",
        type: "invalid value",
        name: "value_name",
        expect: "string",
        received: "hello",
        message: "value does not match!",
      },
    ]);
    expect(sut.value).toBe("hello");
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and throw AnyError if the value is not equal to the comparison value", () => {
    const valueToCompare = "string";
    const value: any = undefined;

    const sut = (): void => schema().string().equal(valueToCompare).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the equal method and throw Error if the value is a promise and is not of type boolean", async () => {
    const valueToCompare = "string";

    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("hello");
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().string().equal(valueToCompare).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value does not match!");
  });
});
