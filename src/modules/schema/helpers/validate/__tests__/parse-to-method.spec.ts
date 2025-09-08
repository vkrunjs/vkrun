import { schema } from "../../../index";

describe("Schema ParseTo Method", () => {
  // String to ...
  it("Should convert string to number", () => {
    const schemaRef = schema().string().parseTo().number();
    const sut = schemaRef.test("123", "testName");
    expect(sut.value).toEqual(123);
  });

  it("Should convert string to bigInt", async () => {
    const schemaRef = schema().string().parseTo().bigInt();
    const sut = await schemaRef.testAsync("999", "testName");
    expect(sut.value).toEqual(BigInt(999));
  });

  it("Should convert string to boolean", () => {
    const schemaRef = schema().string().parseTo().boolean();
    const sut = schemaRef.test("true", "testName");
    expect(sut.value).toEqual(true);
  });

  it("Should convert string to buffer", () => {
    const schemaRef = schema().string().parseTo().buffer();
    const sut = schemaRef.test("hello", "testName");
    expect(sut.value).toEqual(Buffer.from("hello"));
  });

  it("Should convert string to date", () => {
    const iso = "2025-02-02T16:38:52.660Z";
    const schemaRef = schema().string().parseTo().date();
    const sut = schemaRef.test(iso, "testName");
    expect(sut.value).toEqual(new Date(iso));
  });

  it("Should convert string to object", () => {
    const schemaRef = schema().string().parseTo().object({
      foo: schema().string(),
    });
    const sut = schemaRef.test('{"foo":"bar"}', "testName");
    expect(sut.value).toEqual({ foo: "bar" });
  });

  it("Should convert string to array", () => {
    const schemaRef = schema().string().parseTo().array(schema().string());
    const sut = schemaRef.test('["apple","banana"]', "testName");
    expect(sut.value).toEqual(["apple", "banana"]);
  });

  // Number to ...
  it("Should convert number to string", () => {
    const ref = schema().number().parseTo().string();
    const sut = ref.test(123, "testName");
    expect(sut.value).toEqual("123");
  });

  it("Should convert number to boolean", () => {
    const ref = schema().number().parseTo().boolean();
    expect(ref.test(0, "testName").value).toEqual(false);
    expect(ref.test(1, "testName").value).toEqual(true);
    expect(ref.test(999, "testName").value).toEqual(true);
  });

  it("Should convert number to bigInt", () => {
    const ref = schema().number().parseTo().bigInt();
    const sut = ref.test(999, "testName");
    expect(sut.value).toEqual(BigInt(999));
  });

  it("Should convert number to date", () => {
    const ref = schema().number().parseTo().date();
    const sut = ref.test(0, "testName");
    expect(sut.value).toEqual(new Date(0));

    const sut2 = ref.test(1672531200000, "testName");
    expect(sut2.value).toEqual(new Date(1672531200000));
  });

  // Boolean to ...
  it("Should convert boolean to string", () => {
    const ref = schema().boolean().parseTo().string();

    const sut1 = ref.test(true, "testName");
    expect(sut1.value).toEqual("true");

    const sut2 = ref.test(false, "testName");
    expect(sut2.value).toEqual("false");
  });

  it("Should convert boolean to number", () => {
    const ref = schema().boolean().parseTo().number();

    const sut1 = ref.test(true, "testName");
    expect(sut1.value).toEqual(1);

    const sut2 = ref.test(false, "testName");
    expect(sut2.value).toEqual(0);
  });

  it("Should convert boolean to bigInt", () => {
    const ref = schema().boolean().parseTo().bigInt();

    const sut1 = ref.test(true, "testName");
    expect(sut1.value).toEqual(BigInt(1));

    const sut2 = ref.test(false, "testName");
    expect(sut2.value).toEqual(BigInt(0));
  });

  // BigInt to ...
  it("Should convert BigInt to string", () => {
    const ref = schema().bigInt().parseTo().string();
    const sut = ref.test(BigInt(123), "testName");
    expect(sut.value).toEqual("123");
  });

  it("Should convert BigInt to number", () => {
    const ref = schema().bigInt().parseTo().number();
    const sut = ref.test(BigInt(1672531200000), "testName");
    expect(sut.value).toEqual(1672531200000);
  });

  it("Should convert BigInt to boolean", () => {
    const ref = schema().bigInt().parseTo().boolean();
    expect(ref.test(BigInt(0), "testName").value).toEqual(false);
    expect(ref.test(BigInt(1), "testName").value).toEqual(true);
  });

  // Buffer to ...
  it("Should convert buffer to string", () => {
    const ref = schema().buffer().parseTo().string();
    const sut = ref.test(Buffer.from("hello"), "testName");
    expect(sut.value).toEqual("hello");
  });

  it("Should convert buffer to number", () => {
    const ref = schema().buffer().parseTo().number();
    const sut = ref.test(Buffer.from("123"), "testName");
    expect(sut.value).toEqual(123);
  });

  it("Should convert buffer to bigInt", () => {
    const ref = schema().buffer().parseTo().bigInt();
    const sut = ref.test(Buffer.from("456"), "testName");
    expect(sut.value).toEqual(BigInt(456));
  });

  it("Should convert buffer to boolean", () => {
    const ref = schema().buffer().parseTo().boolean();
    const sut1 = ref.test(Buffer.from("true"), "testName");
    expect(sut1.value).toEqual(true);

    const sut2 = ref.test(Buffer.from("false"), "testName");
    expect(sut2.value).toEqual(true);
  });

  it("Should convert buffer to date", () => {
    const ref = schema().buffer().parseTo().date();
    const sut = ref.test(Buffer.from("2025-01-01"), "testName");
    expect(sut.value).toEqual(new Date("2025-01-01"));
  });

  it("Should convert buffer to object", () => {
    const ref = schema().buffer().parseTo().object({
      foo: schema().string(),
    });
    const sut = ref.test(Buffer.from('{"foo":"bar"}'), "testName");
    expect(sut.value).toEqual({ foo: "bar" });
  });

  it("Should convert buffer to array", () => {
    const ref = schema().buffer().parseTo().array(schema().string());
    const sut = ref.test(Buffer.from('["hello","world"]'), "testName");
    expect(sut.value).toEqual(["hello", "world"]);
  });

  // Date to ...
  it("Should convert date to string", () => {
    const ref = schema().date().parseTo().string();
    const date = new Date("2025-02-02T16:38:52.660Z");
    const sut = ref.test(date, "testName");

    expect(sut.value).toEqual(date.toISOString());
  });

  it("Should convert date to number", () => {
    const ref = schema().date().parseTo().number();
    const date = new Date("2025-02-02T16:38:52.660Z");
    const sut = ref.test(date, "testName");

    expect(sut.value).toEqual(date.getTime());
  });

  it("Should convert date to bigInt", () => {
    const ref = schema().date().parseTo().bigInt();
    const date = new Date("2025-02-02T16:38:52.660Z");
    const sut = ref.test(date, "testName");

    expect(sut.value).toEqual(BigInt(date.getTime()));
  });

  it("Should convert date to boolean", () => {
    const ref = schema().date().parseTo().boolean();

    const date = new Date(0);
    expect(ref.test(date, "testName").value).toEqual(true);

    const date2 = new Date("2025-02-02T16:38:52.660Z");
    expect(ref.test(date2, "testName").value).toEqual(true);
  });

  // Array to ...
  it("Should convert array to string", () => {
    const ref = schema().array(schema().string()).parseTo().string();
    const sut = ref.test(["apple", "banana"], "testName");
    expect(sut.value).toEqual(JSON.stringify(["apple", "banana"]));
  });

  it("Should convert array to boolean", () => {
    const ref = schema().array(schema().any()).parseTo().boolean();

    const sut1 = ref.test([], "testName");
    expect(sut1.value).toEqual(true);

    const sut2 = ref.test(["hello"], "testName");
    expect(sut2.value).toEqual(true);
  });

  it("Should convert array to buffer", () => {
    const ref = schema().array(schema().number()).parseTo().buffer();
    const data = [1, 2];
    const sut = ref.test(data, "testName");
    expect(sut.value).toEqual(Buffer.from(data));
  });

  // object to ...
  it("Should convert object to string", () => {
    const ref = schema()
      .object({
        foo: schema().string(),
      })
      .parseTo()
      .string();

    const sut = ref.test({ foo: "bar" }, "testName");
    expect(sut.value).toBe(JSON.stringify({ foo: "bar" }));
  });

  it("Should convert object to boolean", () => {
    const ref = schema()
      .object({
        foo: schema().string(),
      })
      .parseTo()
      .boolean();

    const sut1 = ref.test({ foo: "bar" }, "testName");
    expect(sut1.value).toEqual(true);
  });

  // Others testes
  it("should return number with multiples parseTo ", () => {
    const exampleSchema = schema().number().parseTo().string().parseTo().number();
    const sut = exampleSchema.test(123, "testName");
    expect(sut.value).toEqual(123);
  });

  it('should return "undefined" as a string when input is undefined', () => {
    const exampleSchema = schema().number().notRequired().parseTo().string().parseTo().number();
    const sut = exampleSchema.test(undefined, "testName");
    expect(sut.value).toEqual("undefined");
  });

  it('should return "null" as a string when input is null using parseTo() with string()', () => {
    const exampleSchema = schema().number().parseTo().string();
    const sut = exampleSchema.test(null, "testName");
    expect(sut.value).toEqual("null");
  });

  it('should return "undefined" as a string when input is undefined using parseTo() with string()', () => {
    const exampleSchema = schema().number().parseTo().string();
    const sut = exampleSchema.test(undefined, "testName");
    expect(sut.value).toEqual("undefined");
  });

  // --- String base schema ---
  it("Should allow multiple parseTo conversions from a string base schema", () => {
    const base = schema().string().parseTo();

    const toNumber = base.number();
    const toBoolean = base.boolean();
    const toBuffer = base.buffer();
    const toDate = base.date();
    const toObject = base.object({ foo: schema().string() });
    const toArray = base.array(schema().string());

    expect(toNumber.test("123", "test").value).toEqual(123);
    expect(toBoolean.test("true", "test").value).toEqual(true);
    expect(toBuffer.test("hello", "test").value).toEqual(Buffer.from("hello"));
    expect(toDate.test("2025-01-01T00:00:00Z", "test").value).toEqual(new Date("2025-01-01T00:00:00Z"));
    expect(toObject.test('{"foo":"bar"}', "test").value).toEqual({ foo: "bar" });
    expect(toArray.test('["a","b"]', "test").value).toEqual(["a", "b"]);

    // Base schema ainda funcional
    expect(base.number().test("456", "test").value).toEqual(456);
  });

  // --- Number base schema ---
  it("Should allow multiple parseTo conversions from a number base schema", () => {
    const base = schema().number().parseTo();

    expect(base.string().test(123, "test").value).toEqual("123");
    expect(base.boolean().test(0, "test").value).toEqual(false);
    expect(base.bigInt().test(999, "test").value).toEqual(BigInt(999));
    expect(base.date().test(0, "test").value).toEqual(new Date(0));

    // Base ainda funcional
    expect(base.string().test(42, "test").value).toEqual("42");
  });

  // --- BigInt base schema ---
  it("Should allow multiple parseTo conversions from a bigInt base schema", () => {
    const base = schema().bigInt().parseTo();

    expect(base.string().test(BigInt(123), "test").value).toEqual("123");
    expect(base.number().test(BigInt(456), "test").value).toEqual(456);
    expect(base.boolean().test(BigInt(0), "test").value).toEqual(false);

    expect(base.string().test(BigInt(999), "test").value).toEqual("999");
  });

  // --- Buffer base schema ---
  it("Should allow multiple parseTo conversions from a buffer base schema", () => {
    const base = schema().buffer().parseTo();

    expect(base.string().test(Buffer.from("abc"), "test").value).toEqual("abc");
    expect(base.number().test(Buffer.from("123"), "test").value).toEqual(123);
    expect(base.bigInt().test(Buffer.from("456"), "test").value).toEqual(BigInt(456));
    expect(base.boolean().test(Buffer.from("true"), "test").value).toEqual(true);
    expect(base.date().test(Buffer.from("2025-01-01"), "test").value).toEqual(new Date("2025-01-01"));
    expect(base.object({ foo: schema().string() }).test(Buffer.from('{"foo":"bar"}'), "test").value).toEqual({ foo: "bar" });
    expect(base.array(schema().string()).test(Buffer.from('["a","b"]'), "test").value).toEqual(["a", "b"]);

    expect(base.string().test(Buffer.from("xyz"), "test").value).toEqual("xyz");
  });

  // --- Date base schema ---
  it("Should allow multiple parseTo conversions from a date base schema", () => {
    const base = schema().date().parseTo();
    const d = new Date("2025-01-01T00:00:00Z");

    expect(base.string().test(d, "test").value).toEqual(d.toISOString());
    expect(base.number().test(d, "test").value).toEqual(d.getTime());
    expect(base.bigInt().test(d, "test").value).toEqual(BigInt(d.getTime()));
    expect(base.boolean().test(d, "test").value).toEqual(true);

    expect(base.string().test(d, "test").value).toEqual(d.toISOString());
  });

  // --- Array base schema ---
  it("Should allow multiple parseTo conversions from an array base schema", () => {
    const base = schema().array(schema().string()).parseTo();

    const arr = ["a", "b"];
    expect(base.string().test(arr, "test").value).toEqual(JSON.stringify(arr));
    expect(base.boolean().test(arr, "test").value).toEqual(true);
    expect(base.buffer().test(arr, "test").value).toEqual(Buffer.from(arr as any));

    expect(base.string().test(arr, "test").value).toEqual(JSON.stringify(arr));
  });

  // --- Object base schema ---
  it("Should allow multiple parseTo conversions from an object base schema", () => {
    const base = schema().object({ foo: schema().string() }).parseTo();
    const obj = { foo: "bar" };

    expect(base.string().test(obj, "test").value).toEqual(JSON.stringify(obj));
    expect(base.boolean().test(obj, "test").value).toEqual(true);

    expect(base.string().test(obj, "test").value).toEqual(JSON.stringify(obj));
  });
});
