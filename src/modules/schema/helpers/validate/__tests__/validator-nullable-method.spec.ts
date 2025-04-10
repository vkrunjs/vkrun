import { schema } from "../../../index";

describe("Validator Nullable Method", () => {
  it("Should be able to validate the nullable and passAll method as equal to true when it is nullable and value is not undefined", () => {
    const objectSchema = schema().string().nullable();

    const sut = objectSchema.test(null, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(1);
    expect(sut.successes).toEqual([
      {
        method: "nullable",
        name: "value_name",
        expect: "the value can be null, but other than undefined",
        received: null,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(null);
    expect(typeof sut.time === "string").toBeTruthy();
  });
});
