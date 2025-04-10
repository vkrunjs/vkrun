import { schema, InferIn, InferOut, CheckType } from "../../../../../../index";

describe("Validator Default Method Types", () => {
  it("should infer a object with default keys", () => {
    const objectSchema = schema().object({
      string: schema().string().default("hello"),
      date: schema().date().default(new Date()),
      number: schema().number().default(123),
      bigInt: schema().bigInt().default(123n),
      boolean: schema().boolean().default(false),
      function: schema()
        .function()
        .default(() => {}),
      buffer: schema().buffer().default(Buffer.from("content")),
      array: schema().array(schema().string()).default(["string"]),
      any: schema().any().default("hello"),
      custom: schema()
        .string()
        .default("string")
        .custom<string>(({ success }) => {
          success("string");
        }),
    });

    type ObjectSchemaIn = InferIn<typeof objectSchema>;
    type ObjectSchemaOut = InferOut<typeof objectSchema>;

    type EqualSchemaCheckIn = CheckType<
      ObjectSchemaIn,
      {
        string: string | undefined;
        date: Date | undefined;
        number: number | undefined;
        bigInt: bigint | undefined;
        boolean: boolean | undefined;
        function: Function | undefined;
        buffer: Buffer<ArrayBufferLike> | undefined;
        array: string[] | undefined;
        any: any;
        custom: string | undefined;
      }
    >;

    type EqualSchemaCheckOut = CheckType<
      ObjectSchemaOut,
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

    const checkIn: EqualSchemaCheckIn = true;
    const checkOut: EqualSchemaCheckOut = true;
  });

  it("should infer a object or null with default keys", () => {
    const objectSchema = schema()
      .object({
        string: schema().string().default("hello").nullable(),
        date: schema().date().default(new Date()).nullable(),
        number: schema().number().default(123).nullable(),
        bigInt: schema().bigInt().default(123n).nullable(),
        boolean: schema().boolean().default(false).nullable(),
        function: schema()
          .function()
          .default(() => {})
          .nullable(),
        buffer: schema().buffer().default(Buffer.from("content")).nullable(),
        array: schema().array(schema().string()).default(["string"]).nullable(),
        any: schema().any().default("hello"),
        custom: schema()
          .string()
          .default("string")
          .nullable()
          .custom<string>(({ success }) => {
            success("string");
          }),
      })
      .nullable();

    type ObjectSchemaIn = InferIn<typeof objectSchema>;
    type ObjectSchemaOut = InferOut<typeof objectSchema>;

    type EqualSchemaCheckIn = CheckType<
      ObjectSchemaIn,
      {
        string: string | null | undefined;
        date: Date | null | undefined;
        number: number | null | undefined;
        bigInt: bigint | null | undefined;
        boolean: boolean | null | undefined;
        function: Function | null | undefined;
        buffer: Buffer | null | undefined;
        array: string[] | null | undefined;
        any: any;
        custom: string | null | undefined;
      } | null
    >;

    type EqualSchemaCheckOut = CheckType<
      ObjectSchemaOut,
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
      } | null
    >;

    const checkIn: EqualSchemaCheckIn = true;
    const checkOut: EqualSchemaCheckOut = true;
  });

  it("should infer a object, null or undefined with default keys", () => {
    const objectSchema = schema()
      .object({
        string: schema().string().nullable().notRequired(),
        date: schema().date().nullable().notRequired(),
        number: schema().number().nullable().notRequired(),
        bigInt: schema().bigInt().nullable().notRequired(),
        boolean: schema().boolean().nullable().notRequired(),
        function: schema().function().nullable().notRequired(),
        buffer: schema().buffer().nullable().notRequired(),
        array: schema().array(schema().string().nullable().notRequired()).nullable().notRequired(),
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
      .notRequired();

    type ObjectSchemaIn = InferIn<typeof objectSchema>;
    type ObjectSchemaOut = InferOut<typeof objectSchema>;

    type EqualSchemaCheckIn = CheckType<
      ObjectSchemaIn,
      | {
          string: string | null | undefined;
          date: Date | null | undefined;
          number: number | null | undefined;
          bigInt: bigint | null | undefined;
          boolean: boolean | null | undefined;
          function: Function | null | undefined;
          buffer: Buffer<ArrayBufferLike> | null | undefined;
          array: (string | null | undefined)[] | null | undefined;
          any: any;
          custom: string | null | undefined;
        }
      | null
      | undefined
    >;

    type EqualSchemaCheckOut = CheckType<
      ObjectSchemaOut,
      | {
          string: string | null | undefined;
          date: Date | null | undefined;
          number: number | null | undefined;
          bigInt: bigint | null | undefined;
          boolean: boolean | null | undefined;
          function: Function | null | undefined;
          buffer: Buffer<ArrayBufferLike> | null | undefined;
          array: (string | null | undefined)[] | null | undefined;
          any: any;
          custom: string | null | undefined;
        }
      | null
      | undefined
    >;

    const checkIn: EqualSchemaCheckIn = true;
    const checkOut: EqualSchemaCheckOut = true;
  });

  it("should infer a object with object default", () => {
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
      .default({
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
      });

    type ObjectSchemaIn = InferIn<typeof objectSchema>;
    type ObjectSchemaOut = InferOut<typeof objectSchema>;

    type EqualSchemaCheckIn = CheckType<
      ObjectSchemaIn,
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

    type EqualSchemaCheckOut = CheckType<
      ObjectSchemaOut,
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

    const checkIn: EqualSchemaCheckIn = true;
    const checkOut: EqualSchemaCheckOut = true;
  });

  it("should infer a object or null with object default", () => {
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
      .nullable()
      .default({
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
      });

    type ObjectSchemaIn = InferIn<typeof objectSchema>;
    type ObjectSchemaOut = InferOut<typeof objectSchema>;

    type EqualSchemaCheckIn = CheckType<
      ObjectSchemaIn,
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
      } | null
    >;

    type EqualSchemaCheckOut = CheckType<
      ObjectSchemaOut,
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
      } | null
    >;

    const checkIn: EqualSchemaCheckIn = true;
    const checkOut: EqualSchemaCheckOut = true;
  });
});
