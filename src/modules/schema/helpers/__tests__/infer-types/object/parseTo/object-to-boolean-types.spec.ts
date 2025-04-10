import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Object ParseTo Boolean Types", () => {
  it("should infer a object to boolean", () => {
    const objectSchema = schema()
      .object({
        string: schema().string(),
        date: schema().date(),
        number: schema().number(),
        bigInt: schema().bigInt(),
        boolean: schema().boolean(),
        function: schema().function(),
        buffer: schema().buffer(),
        array: schema().array(schema().string()),
        any: schema().any(),
        custom: schema()
          .string()
          .custom(({ success }) => {
            success("string");
          }),
      })
      .parseTo()
      .boolean();
    const value = objectSchema.test({
      string: "string",
      date: new Date(),
      number: 123,
      bigInt: 123n,
      boolean: true,
      function: () => {},
      buffer: Buffer.from("content"),
      array: ["string"],
      any: "any",
      custom: "string",
    }).value;

    type StringSchemaIn = InferIn<typeof objectSchema>;
    type StringSchemaOut = InferOut<typeof objectSchema>;

    type StringSchemaCheckIn = CheckType<
      StringSchemaIn,
      {
        string: string;
        date: Date;
        number: number;
        bigInt: bigint;
        boolean: boolean;
        function: Function;
        buffer: Buffer<ArrayBufferLike>;
        array: string[];
        any: any;
        custom: string;
      }
    >;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a object or null to boolean", () => {
    const objectSchema = schema()
      .object({
        string: schema().string().nullable(),
        date: schema().date().nullable(),
        number: schema().number().nullable(),
        bigInt: schema().bigInt().nullable(),
        boolean: schema().boolean().nullable(),
        function: schema().function().nullable(),
        buffer: schema().buffer().nullable(),
        array: schema().array(schema().string()).nullable(),
        any: schema().any(),
        custom: schema()
          .string()
          .nullable()
          .custom(({ success }) => {
            success("string");
          }),
      })
      .nullable()
      .parseTo()
      .boolean();
    const value = objectSchema.test({
      string: "string",
      date: new Date(),
      number: 123,
      bigInt: 123n,
      boolean: true,
      function: () => {},
      buffer: Buffer.from("content"),
      array: ["string"],
      any: "any",
      custom: "string",
    }).value;

    type StringNullableSchemaIn = InferIn<typeof objectSchema>;
    type StringNullableSchemaOut = InferOut<typeof objectSchema>;

    type StringSchemaCheckIn = CheckType<
      StringNullableSchemaIn,
      {
        string: string | null;
        date: Date | null;
        number: number | null;
        bigInt: bigint | null;
        boolean: boolean | null;
        function: Function | null;
        buffer: Buffer<ArrayBufferLike> | null;
        array: string[] | null;
        any: any;
        custom: string | null;
      } | null
    >;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a object, null, or undefined to boolean", () => {
    const objectSchema = schema()
      .object({
        string: schema().string().nullable().notRequired(),
        date: schema().date().nullable().notRequired(),
        number: schema().number().nullable().notRequired(),
        bigInt: schema().bigInt().nullable().notRequired(),
        boolean: schema().boolean().nullable().notRequired(),
        function: schema().function().nullable().notRequired(),
        buffer: schema().buffer().nullable().notRequired(),
        array: schema().array(schema().string()).nullable().notRequired(),
        any: schema().any(),
        custom: schema()
          .string()
          .nullable()
          .notRequired()
          .custom(({ success }) => {
            success("string");
          }),
      })
      .nullable()
      .notRequired()
      .parseTo()
      .boolean();
    const value = objectSchema.test({
      string: "string",
      date: new Date(),
      number: 123,
      bigInt: 123n,
      boolean: true,
      function: () => {},
      buffer: Buffer.from("content"),
      array: ["string"],
      any: "any",
      custom: "string",
    }).value;

    type StringNullableSchemaIn = InferIn<typeof objectSchema>;
    type StringNullableSchemaOut = InferOut<typeof objectSchema>;

    type StringSchemaCheckIn = CheckType<
      StringNullableSchemaIn,
      | {
          string: string | null | undefined;
          date: Date | null | undefined;
          number: number | null | undefined;
          bigInt: bigint | null | undefined;
          boolean: boolean | null | undefined;
          function: Function | null | undefined;
          buffer: Buffer<ArrayBufferLike> | null | undefined;
          array: string[] | null | undefined;
          any: any;
          custom: string | null | undefined;
        }
      | null
      | undefined
    >;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
