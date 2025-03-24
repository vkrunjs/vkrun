import { schema, InferIn, InferOut, CheckType } from "../../../../../../index";

describe("Validator Alias Method Types", () => {
  it("should infer a object", () => {
    const objectSchema = schema()
      .object({
        string: schema().string().alias("alias key"),
        date: schema().date().alias("alias key"),
        number: schema().number().alias("alias key"),
        bigInt: schema().bigInt().alias("alias key"),
        boolean: schema().boolean().alias("alias key"),
        function: schema().function().alias("alias key"),
        buffer: schema().buffer().alias("alias key"),
        array: schema().array(schema().string()).alias("alias key"),
        any: schema().any().alias("alias key"),
        custom: schema()
          .string()
          .alias("alias key")
          .custom(({ success }) => {
            success("string");
          }),
      })
      .alias("alias object");

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

  it("should infer a object or null", () => {
    const objectSchema = schema()
      .object({
        string: schema().string().nullable().alias("alias key"),
        date: schema().date().nullable().alias("alias key"),
        number: schema().number().nullable().alias("alias key"),
        bigInt: schema().bigInt().nullable().alias("alias key"),
        boolean: schema().boolean().nullable().alias("alias key"),
        function: schema().function().nullable().alias("alias key"),
        buffer: schema().buffer().nullable().alias("alias key"),
        array: schema().array(schema().string().nullable()).nullable().alias("alias key"),
        any: schema().any().alias("alias key"),
        custom: schema()
          .string()
          .alias("alias key")
          .nullable()
          .custom(({ success }) => {
            success("string");
          }),
      })
      .alias("alias object")
      .nullable();

    type ObjectSchemaIn = InferIn<typeof objectSchema>;
    type ObjectSchemaOut = InferOut<typeof objectSchema>;

    type EqualSchemaCheckIn = CheckType<
      ObjectSchemaIn,
      {
        string: string | null;
        date: Date | null;
        number: number | null;
        bigInt: bigint | null;
        boolean: boolean | null;
        function: Function | null;
        buffer: Buffer<ArrayBufferLike> | null;
        array: (string | null)[] | null;
        any: any;
        custom: string | null;
      } | null
    >;

    type EqualSchemaCheckOut = CheckType<
      ObjectSchemaOut,
      {
        string: string | null;
        date: Date | null;
        number: number | null;
        bigInt: bigint | null;
        boolean: boolean | null;
        function: Function | null;
        buffer: Buffer<ArrayBufferLike> | null;
        array: (string | null)[] | null;
        any: any;
        custom: string | null;
      } | null
    >;

    const checkIn: EqualSchemaCheckIn = true;
    const checkOut: EqualSchemaCheckOut = true;
  });

  it("should infer a object, null or undefined", () => {
    const objectSchema = schema()
      .object({
        string: schema().string().nullable().notRequired().alias("alias key"),
        date: schema().date().nullable().notRequired().alias("alias key"),
        number: schema().number().nullable().notRequired().alias("alias key"),
        bigInt: schema().bigInt().nullable().notRequired().alias("alias key"),
        boolean: schema().boolean().nullable().notRequired().alias("alias key"),
        function: schema().function().nullable().notRequired().alias("alias key"),
        buffer: schema().buffer().nullable().notRequired().alias("alias key"),
        array: schema().array(schema().string().nullable().notRequired()).nullable().notRequired().alias("alias key"),
        any: schema().any().alias("alias key"),
        custom: schema()
          .string()
          .alias("alias key")
          .nullable()
          .notRequired()
          .custom(({ success }) => {
            success("string");
          }),
      })
      .alias("alias object")
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
});
