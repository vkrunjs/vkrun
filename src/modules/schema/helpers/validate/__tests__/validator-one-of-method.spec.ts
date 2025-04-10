import { schema } from "../../../index";

describe("Validator OneOf Method", () => {
  it("Should return true if the value matches one of the schemas or values", () => {
    const value = "hello";
    const comparisonItems = [schema().string(), schema().number()];

    const sut = schema().oneOf(comparisonItems).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should return true if the value matches a static value in the oneOf array", () => {
    const value = 123;
    const comparisonItems = [schema().string(), schema().number()];

    const sut = schema().oneOf(comparisonItems).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should return false if the value does not match any of the schemas or values", () => {
    const value = true;
    const comparisonItems = [schema().string(), schema().number()];

    const sut = schema().oneOf(comparisonItems).validate(value);

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the equal method when value is promise and return true if the value is equal to the comparison value", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("hello");
        }, 100);
      });
    };
    const comparisonItems = [schema().string(), schema().number()];

    const sut = await schema().oneOf(comparisonItems).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the equal method when value is promise and return false if the value is not equal to the comparison value", async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 100);
      });
    };

    const comparisonItems = [schema().string(), schema().number()];

    const sut = await schema().oneOf(comparisonItems).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the equal method and passedAll to equal true if the value is equal to the comparison value", () => {
    const comparisonItems = [schema().string(), schema().number()];
    const value = "hi";

    const sut = schema().oneOf(comparisonItems).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "hi",
      },
      {
        method: "oneOf",
        name: "value_name",
        expect: "value matches",
        received: "hi",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and passedAll to equal false if the value is not equal to the comparison value", () => {
    const comparisonItems = [schema().string(), schema().number()];
    const value = true;

    const sut = schema().oneOf(comparisonItems).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: true,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "oneOf",
        type: "invalid value",
        name: "value_name",
        expect: "value matches",
        received: true,
        message: "value does not have a match!",
      },
    ]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate with custom error message", () => {
    const comparisonItems = [schema().string(), schema().number()];
    const value = true;

    const sut = schema().oneOf(comparisonItems, { message: "any message!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: true,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "oneOf",
        type: "invalid value",
        name: "value_name",
        expect: "value matches",
        received: true,
        message: "any message!",
      },
    ]);
    expect(typeof sut.time === "string").toBeTruthy();
  });
});
