import { schema } from "../../../../index";

describe("Validator Number NotEqual Method", () => {
  it("Should be able to validate the notEqual method and return true if the value is not equal to the comparison value", () => {
    const valueToCompare = 321;
    const value = 123;

    const sut = schema().number().notEqual(valueToCompare).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the notEqual method and return false if the value is equal to the comparison value", () => {
    const numberSchema = schema().number().notEqual(321).notEqual(123);

    expect(numberSchema.validate(321)).toBeFalsy();
    expect(numberSchema.validate(123)).toBeFalsy();
  });

  it("Should be able to validate the notEqual method when value is a promise and return true if the value is not equal to the comparison value", async () => {
    const valueToCompare = 321;

    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(123);
        }, 100);
      });
    };

    const sut = await schema().number().notEqual(valueToCompare).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the notEqual method when value is a promise and return false if the value is equal to the comparison value", async () => {
    const valueToCompare = 321;

    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(321);
        }, 100);
      });
    };

    const sut = await schema().number().notEqual(valueToCompare).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the notEqual method and passedAll to equal true if the value is not equal to the comparison value", () => {
    const valueToCompare = 321;
    const value = 123;

    const sut = schema().number().notEqual(valueToCompare).test(value, "value_name");

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
        method: "notEqual",
        name: "value_name",
        expect: "value must not match",
        received: 123,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the notEqual method and passedAll to equal false if the value is equal to the comparison value", () => {
    const valueToCompare = 321;
    const value = 321;

    const sut = schema().number().notEqual(valueToCompare).test(value, "value_name");

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
        method: "notEqual",
        type: "invalid value",
        name: "value_name",
        expect: "value must not match",
        received: 321,
        message: "value may not match!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const valueToCompare = 321;
    const value = 321;

    const sut = schema().number().notEqual(valueToCompare, { message: "[valueName] [value]!" }).test(value, "value_name");

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
        method: "notEqual",
        type: "invalid value",
        name: "value_name",
        expect: "value must not match",
        received: 321,
        message: "value_name 321!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });
});
