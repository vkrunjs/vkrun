import { schema } from "../../../../index";

describe("Validator String NotEqual Method", () => {
  it("Should be able to validate the notEqual method and return true if the value is not equal to the comparison value", () => {
    const valueToCompare = "hello";
    const value = "world";

    const sut = schema().string().notEqual(valueToCompare).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the notEqual method and return false if the value is equal to the comparison value", () => {
    const stringSchema = schema().string().notEqual("hello").notEqual("world");

    expect(stringSchema.validate("hello")).toBeFalsy();
    expect(stringSchema.validate("world")).toBeFalsy();
  });

  it("Should be able to validate the notEqual method when value is a promise and return true if the value is not equal to the comparison value", async () => {
    const valueToCompare = "hello";

    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("world");
        }, 100);
      });
    };

    const sut = await schema().string().notEqual(valueToCompare).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the notEqual method when value is a promise and return false if the value is equal to the comparison value", async () => {
    const valueToCompare = "hello";

    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("hello");
        }, 100);
      });
    };

    const sut = await schema().string().notEqual(valueToCompare).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the notEqual method and passedAll to equal true if the value is not equal to the comparison value", () => {
    const valueToCompare = "hello";
    const value = "world";

    const sut = schema().string().notEqual(valueToCompare).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "world",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "world",
      },
      {
        method: "notEqual",
        name: "value_name",
        expect: "value must not match",
        received: "world",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the notEqual method and passedAll to equal false if the value is equal to the comparison value", () => {
    const valueToCompare = "hello";
    const value = "hello";

    const sut = schema().string().notEqual(valueToCompare).test(value, "value_name");

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
        method: "notEqual",
        type: "invalid value",
        name: "value_name",
        expect: "value must not match",
        received: "hello",
        message: "value may not match!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const valueToCompare = "hello";
    const value = "hello";

    const sut = schema().string().notEqual(valueToCompare, { message: "[valueName] [value]!" }).test(value, "value_name");

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
        method: "notEqual",
        type: "invalid value",
        name: "value_name",
        expect: "value must not match",
        received: "hello",
        message: "value_name hello!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });
});
