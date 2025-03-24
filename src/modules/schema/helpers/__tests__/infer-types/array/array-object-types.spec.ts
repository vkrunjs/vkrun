import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Array Method Types - Objects", () => {
  it("should accept an array of Objects", () => {
    const arrayObjectSchema = schema().array(
      schema().object({
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
      }),
    );

    type ArrayObjectSchemaIn = InferIn<typeof arrayObjectSchema>;
    type ArrayObjectSchemaOut = InferOut<typeof arrayObjectSchema>;

    type ArrayObjectCheckIn = CheckType<
      ArrayObjectSchemaIn,
      {
        string: string;
        date: Date;
        number: number;
        bigInt: bigint;
        boolean: boolean;
        function: Function;
        buffer: Buffer;
        array: string[];
        any: any;
        custom: string;
      }[]
    >;
    type ArrayObjectCheckOut = CheckType<
      ArrayObjectSchemaOut,
      {
        string: string;
        date: Date;
        number: number;
        bigInt: bigint;
        boolean: boolean;
        function: Function;
        buffer: Buffer;
        array: string[];
        any: any;
        custom: string;
      }[]
    >;

    const checkIn: ArrayObjectCheckIn = true;
    const checkOut: ArrayObjectCheckOut = true;
  });

  it("should accept an array of Objects with an alias", () => {
    const arrayObjectAliasSchema = schema().array(
      schema()
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
        .alias("value name"),
    );

    type ArrayObjectAliasSchemaIn = InferIn<typeof arrayObjectAliasSchema>;
    type ArrayObjectAliasSchemaOut = InferOut<typeof arrayObjectAliasSchema>;

    type ArrayObjectCheckIn = CheckType<
      ArrayObjectAliasSchemaIn,
      {
        string: string;
        date: Date;
        number: number;
        bigInt: bigint;
        boolean: boolean;
        function: Function;
        buffer: Buffer;
        array: string[];
        any: any;
        custom: string;
      }[]
    >;
    type ArrayObjectCheckOut = CheckType<
      ArrayObjectAliasSchemaOut,
      {
        string: string;
        date: Date;
        number: number;
        bigInt: bigint;
        boolean: boolean;
        function: Function;
        buffer: Buffer;
        array: string[];
        any: any;
        custom: string;
      }[]
    >;

    const checkIn: ArrayObjectCheckIn = true;
    const checkOut: ArrayObjectCheckOut = true;
  });

  it("should accept an array of Objects with a default value", () => {
    const arrayObjectDefaultSchema = schema()
      .array(
        schema().object({
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
        }),
      )
      .default([
        {
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
        },
      ]);

    type ArrayObjectDefaultSchemaIn = InferIn<typeof arrayObjectDefaultSchema>;
    type ArrayObjectDefaultSchemaOut = InferOut<typeof arrayObjectDefaultSchema>;

    type ArrayObjectCheckIn = CheckType<
      ArrayObjectDefaultSchemaIn,
      | {
          string: string;
          date: Date;
          number: number;
          bigInt: bigint;
          boolean: boolean;
          function: Function;
          buffer: Buffer;
          array: string[];
          any: any;
          custom: string;
        }[]
      | undefined
    >;
    type ArrayObjectCheckOut = CheckType<
      ArrayObjectDefaultSchemaOut,
      {
        string: string;
        date: Date;
        number: number;
        bigInt: bigint;
        boolean: boolean;
        function: Function;
        buffer: Buffer;
        array: string[];
        any: any;
        custom: string;
      }[]
    >;

    const checkIn: ArrayObjectCheckIn = true;
    const checkOut: ArrayObjectCheckOut = true;
  });

  it("should accept an array of Objects that can contain null", () => {
    const arrayObjectNullableSchema = schema()
      .array(
        schema()
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
          .nullable(),
      )
      .nullable();

    type ArrayObjectNullableSchemaIn = InferIn<typeof arrayObjectNullableSchema>;
    type ArrayObjectNullableSchemaOut = InferOut<typeof arrayObjectNullableSchema>;

    type ArrayObjectCheckIn = CheckType<
      ArrayObjectNullableSchemaIn,
      | ({
          string: string;
          date: Date;
          number: number;
          bigInt: bigint;
          boolean: boolean;
          function: Function;
          buffer: Buffer;
          array: string[];
          any: any;
          custom: string;
        } | null)[]
      | null
    >;
    type ArrayObjectCheckOut = CheckType<
      ArrayObjectNullableSchemaOut,
      | ({
          string: string;
          date: Date;
          number: number;
          bigInt: bigint;
          boolean: boolean;
          function: Function;
          buffer: Buffer;
          array: string[];
          any: any;
          custom: string;
        } | null)[]
      | null
    >;

    const checkIn: ArrayObjectCheckIn = true;
    const checkOut: ArrayObjectCheckOut = true;
  });

  it("should accept an array of Objects that can contain null or undefined", () => {
    const arrayObjectNullableSchema = schema()
      .array(
        schema()
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
          .notRequired(),
      )
      .nullable()
      .notRequired();

    type ArrayObjectNullableSchemaIn = InferIn<typeof arrayObjectNullableSchema>;
    type ArrayObjectNullableSchemaOut = InferOut<typeof arrayObjectNullableSchema>;

    type ArrayObjectCheckIn = CheckType<
      ArrayObjectNullableSchemaIn,
      | (
          | {
              string: string;
              date: Date;
              number: number;
              bigInt: bigint;
              boolean: boolean;
              function: Function;
              buffer: Buffer;
              array: string[];
              any: any;
              custom: string;
            }
          | null
          | undefined
        )[]
      | null
      | undefined
    >;
    type ArrayObjectCheckOut = CheckType<
      ArrayObjectNullableSchemaOut,
      | (
          | {
              string: string;
              date: Date;
              number: number;
              bigInt: bigint;
              boolean: boolean;
              function: Function;
              buffer: Buffer;
              array: string[];
              any: any;
              custom: string;
            }
          | null
          | undefined
        )[]
      | null
      | undefined
    >;

    const checkIn: ArrayObjectCheckIn = true;
    const checkOut: ArrayObjectCheckOut = true;
  });
});
