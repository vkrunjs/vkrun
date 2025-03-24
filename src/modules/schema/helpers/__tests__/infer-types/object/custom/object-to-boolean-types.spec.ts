import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Object Custom Method to Boolean Types", () => {
  it("should infer a object to boolean", () => {
    const customSchema = schema()
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
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: {
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
            };
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<
      CustomSchemaIn,
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
      }
    >;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a object or null to boolean", () => {
    const customSchema = schema()
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
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: {
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
            } | null;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<
      CustomSchemaIn,
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
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a object, null or undefined to boolean", () => {
    const customSchema = schema()
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
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value:
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
              | undefined;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<
      CustomSchemaIn,
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
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
