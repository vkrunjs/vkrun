import { schema } from "../../../index";

describe("Validator Required Method", () => {
  it("Should allow custom required error message for string validation", () => {
    const sut = schema({ message: "[valueName] is required new message!" })
      .string()
      .test(undefined as any, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(0);
    expect(sut.failed).toEqual(2);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([]);
    expect(sut.errors).toEqual([
      {
        method: "required",
        type: "missing value",
        name: "value_name",
        expect: "value other than undefined",
        received: "undefined",
        message: "value_name is required new message!",
      },
      {
        method: "string",
        type: "invalid value",
        name: "value_name",
        expect: "string type",
        received: "undefined",
        message: "value_name must be a string type!",
      },
    ]);
    expect(typeof sut.time === "string").toBeTruthy();
  });
});
