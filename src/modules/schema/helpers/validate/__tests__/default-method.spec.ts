import { schema } from "../../../index";

describe("Schema Default Method", () => {
  it("Should handle default for string", () => {
    // Without default
    expect(schema().string().test(undefined).value).toBeUndefined();

    // With default but valid input
    expect(schema().string().default("321").test("123").value).toEqual("123");

    // With default and undefined input
    expect(schema().string().default("321").minLength({ min: 1 }).test(undefined).value).toEqual("321");
  });

  it("Should handle default for number", () => {
    // Without default
    expect(schema().number().test(undefined).value).toBeUndefined();

    // With default but valid input
    expect(schema().number().default(321).test(123).value).toEqual(123);

    // With default and undefined input
    expect(schema().number().default(321).min({ min: 1 }).test(undefined).value).toEqual(321);
  });

  it("Should handle default for boolean", () => {
    // Without default
    expect(schema().boolean().test(undefined).value).toBeUndefined();

    // With default but valid input
    expect(schema().boolean().default(true).test(false).value).toBe(false);

    // With default and undefined input
    expect(schema().boolean().default(true).test(undefined).value).toBe(true);
  });

  it("Should handle default for bigInt", () => {
    // Without default
    expect(schema().bigInt().test(undefined).value).toBeUndefined();

    // With default but valid input
    expect(schema().bigInt().default(321n).test(123n).value).toEqual(123n);

    // With default and undefined input
    expect(schema().bigInt().default(321n).test(undefined).value).toEqual(321n);
  });

  it("Should handle default for function", () => {
    const defaultFn = () => "default";
    const realFn = () => "real";

    // Without default
    expect(schema().function().test(undefined).value).toBeUndefined();

    // With default but valid input
    expect(schema().function().default(defaultFn).test(realFn).value).toBe(realFn);

    // With default and undefined input
    expect(schema().function().default(defaultFn).test(undefined).value).toBe(defaultFn);
  });

  it("Should handle default for buffer", () => {
    const defaultBuf = Buffer.from("default");
    const realBuf = Buffer.from("real");

    // Without default
    expect(schema().buffer().test(undefined).value).toBeUndefined();

    // With default but valid input
    expect(schema().buffer().default(defaultBuf).test(realBuf).value).toBe(realBuf);

    // With default and undefined input
    expect(schema().buffer().default(defaultBuf).test(undefined).value).toBe(defaultBuf);
  });

  it("Should handle default for date", () => {
    const defaultDate = new Date("2025-01-01T00:00:00Z");
    const realDate = new Date("2024-12-31T15:45:00Z");

    // Without default
    expect(schema().date().test(undefined).value).toBeUndefined();

    // With default but valid input
    expect(schema().date().default(defaultDate).test(realDate).value).toBe(realDate);

    // With default and undefined input
    expect(schema().date().default(defaultDate).test(undefined).value).toBe(defaultDate);
  });

  it("Should handle default for object", () => {
    const objSchema = { field: schema().string().minLength({ min: 1 }) };
    const defaultObj = { field: "some val" };
    const realObj = { field: "hello" };

    // Without default
    expect(schema().object(objSchema).test(undefined).value).toBeUndefined();

    // With default but valid input
    expect(schema().object(objSchema).default(defaultObj).test(realObj).value).toBe(realObj);

    // With default and undefined input
    expect(schema().object(objSchema).default(defaultObj).test(undefined).value).toBe(defaultObj);
  });

  it("Should handle default for array", () => {
    // We define a schema for array items
    const itemSchema = schema().object({ field: schema().string().minLength({ min: 1 }) });

    // Our sample values
    const arrSchema = [{ field: "hello" }]; // This is the "real" input
    const defaultArr = [{ field: "some val" }];

    // Without default
    expect(schema().array(itemSchema).test(undefined).value).toBeUndefined();

    // With default but valid input
    expect(schema().array(itemSchema).default(defaultArr).test(arrSchema).value).toBe(arrSchema);

    // With default and undefined input
    expect(schema().array(itemSchema).default(defaultArr).test(undefined).value).toBe(defaultArr);
  });
});
