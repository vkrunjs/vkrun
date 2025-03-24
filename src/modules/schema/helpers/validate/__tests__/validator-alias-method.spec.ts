import { schema } from "../../../index";

describe("Validator Alias Method", () => {
  it("Should be able to validate the alias method change value name", () => {
    const sut = schema().boolean().alias("new_value_name").test(true, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "new_value_name",
        expect: "value other than undefined",
        received: true,
      },
      {
        method: "boolean",
        name: "new_value_name",
        expect: "boolean type",
        received: true,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(true);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to throw an error if the alias method received invalid parameter", () => {
    try {
      schema()
        .string()
        .alias(false as any);
    } catch (error: any) {
      const sut = error;
      expect(sut.message).toEqual("vkrun-schema: alias method received invalid parameter!");
    }
  });
});
