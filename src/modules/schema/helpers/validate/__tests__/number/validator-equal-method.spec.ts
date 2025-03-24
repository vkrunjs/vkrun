import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator Number Equal Method", () => {
  it("Should be able to validate the equal method and return true if the value is equal to the comparison value", () => {
    const valueToCompare = 123;
    const value = valueToCompare;

    const sut = schema().number().equal(valueToCompare).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the equal method and return false if the value is not equal to the comparison value", () => {
    const valueToCompare = 123;
    const value = 321;

    const sut = schema().number().equal(valueToCompare).validate(value);

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the equal method when value is promise and return true if the value is equal to the comparison value", async () => {
    const valueToCompare = 123;

    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(valueToCompare);
        }, 100);
      });
    };

    const sut = await schema().number().equal(valueToCompare).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the equal method when value is promise and return false if the value is not equal to the comparison value", async () => {
    const valueToCompare = 123;

    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(321);
        }, 100);
      });
    };

    const sut = await schema().number().equal(valueToCompare).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the equal method and passedAll to equal true if the value is equal to the comparison value", () => {
    const valueToCompare = 123;
    const value = valueToCompare;

    const sut = schema().number().equal(valueToCompare).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 123,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: 123,
      },
      {
        method: "equal",
        name: "value_name",
        expect: 123,
        received: 123,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const valueToCompare = 123;
    const value = 321;

    const sut = schema().number().equal(valueToCompare, { message: "[valueName] [value]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 321,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: 321,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "equal",
        type: "invalid value",
        name: "value_name",
        expect: 123,
        received: 321,
        message: "value_name 321!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and passedAll to equal false if the value is not equal to the comparison value", () => {
    const valueToCompare = 123;
    const value = 321;

    const sut = schema().number().equal(valueToCompare).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 321,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: 321,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "equal",
        type: "invalid value",
        name: "value_name",
        expect: 123,
        received: 321,
        message: "value does not match!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal and passAll method as equal to true when it is not required and the value is undefined", () => {
    const valueToCompare = 123;
    const value: any = undefined;

    const sut = schema().number().equal(valueToCompare).notRequired().test(value, "value_name");

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
    const valueToCompare = 123;

    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(123);
        }, 100);
      });
    };

    const sut = await schema().number().equal(valueToCompare).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 123,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: 123,
      },
      {
        method: "equal",
        name: "value_name",
        expect: 123,
        received: 123,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(123);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and passedAll to equal false if the value is a promise and is not equal to the comparison value", async () => {
    const valueToCompare = 123;

    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(321);
        }, 100);
      });
    };

    const sut = await schema().number().equal(valueToCompare).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 321,
      },
      {
        method: "number",
        name: "value_name",
        expect: "number type",
        received: 321,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "equal",
        type: "invalid value",
        name: "value_name",
        expect: 123,
        received: 321,
        message: "value does not match!",
      },
    ]);
    expect(sut.value).toBe(321);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and throw AnyError if the value is not equal to the comparison value", () => {
    const valueToCompare = 123;
    const value: any = undefined;

    const sut = (): void => schema().number().equal(valueToCompare).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the equal method and throw Error if the value is a promise and is not of type boolean", async () => {
    const valueToCompare = 123;

    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(321);
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().number().equal(valueToCompare).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value does not match!");
  });
});
