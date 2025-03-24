import { schema } from "../../../../../../index";

describe("Validator Array Method", () => {
  it("Should validate an array of any schema and return true for a valid array", () => {
    const validateA = schema().array(schema().any()).validate(["string"]);
    const validateB = schema().array(schema().string()).validate(["string"]);

    expect(validateA).toBeTruthy();
    expect(validateB).toBeTruthy();
  });

  it("Should validate an array of numbers and return false for invalid array values", () => {
    const sut = schema()
      .array(schema().number())
      .validate(["string" as any]);

    expect(sut).toBeFalsy();
  });

  it("Should allow array to be optional and validate successfully when undefined", () => {
    const sut = schema().array(schema().number()).notRequired().validate(undefined);

    expect(sut).toBeTruthy();
  });

  it("Should allow array to be nullable and validate successfully when null", () => {
    const sut = schema().array(schema().number()).nullable().validate(null);

    expect(sut).toBeTruthy();
  });

  it("Should validate nested arrays of strings and return true for valid structure", () => {
    const sut = schema()
      .array(schema().array(schema().string()))
      .nullable()
      .validate([["any text"], ["any text"]]);

    expect(sut).toBeTruthy();
  });

  it("Should detect validation errors in nested arrays with invalid values", () => {
    const sut = schema()
      .array(schema().array(schema().string()))
      .nullable()
      .test([[1 as any], ["any text"]], "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: [[1], ["any text"]],
      },
      {
        method: "array",
        name: "value_name",
        expect: "array type",
        received: [[1], ["any text"]],
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "array",
        type: "invalid value",
        name: "value_name",
        index: 0,
        expect: "string type",
        received: 1,
        message: "value_name must be a string type!",
      },
    ]);
    expect(sut.value).toEqual([[1], ["any text"]]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should validate an array of strings and report success with no errors", () => {
    const value = ["any text"];

    const sut = schema().array(schema().string()).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: ["any text"],
      },
      {
        method: "array",
        name: "value_name",
        expect: "array type",
        received: ["any text"],
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error messages for invalid array type", () => {
    const value: any = false;

    const sut = schema().array(schema().any(), { message: "[valueName] [value] any message!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
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
        method: "array",
        type: "invalid value",
        name: "value_name",
        expect: "array type",
        received: false,
        message: "value_name false any message!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error messages for invalid schema values in an array", () => {
    const value: any = [1, 2];

    const sut = schema()
      .array(schema().string({ message: "string custom message!" }))
      .test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(2);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: [1, 2],
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "array",
        type: "invalid value",
        name: "value_name",
        index: 0,
        expect: "string type",
        received: 1,
        message: "string custom message!",
      },
      {
        method: "array",
        type: "invalid value",
        name: "value_name",
        index: 1,
        expect: "string type",
        received: 2,
        message: "string custom message!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should validate arrays of objects with nested schemas and detect errors", () => {
    const sut = schema()
      .array(
        schema().object({
          keyA: schema().string(),
          keyB: schema().string(),
        }),
      )
      .nullable()
      .test(
        [
          {
            keyA: "any string",
            keyB: 1 as any,
          },
        ],
        "value_name",
      );

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: [
          {
            keyA: "any string",
            keyB: 1,
          },
        ],
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "array",
        type: "invalid value",
        name: "keyB",
        index: 0,
        expect: "string type",
        received: 1,
        message: "keyB must be a string type!",
      },
    ]);
    expect(sut.value).toEqual([
      {
        keyA: "any string",
        keyB: 1,
      },
    ]);
    expect(typeof sut.time === "string").toBeTruthy();
  });
});
