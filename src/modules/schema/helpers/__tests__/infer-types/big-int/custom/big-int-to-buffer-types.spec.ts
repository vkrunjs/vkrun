import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator BigInt Custom Method to Buffer Types", () => {
  it("should infer a bigint to Buffer", () => {
    const customSchema = schema()
      .bigInt()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint or null to Buffer", () => {
    const customSchema = schema()
      .bigInt()
      .nullable()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint | null;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint, null or undefined to Buffer", () => {
    const customSchema = schema()
      .bigInt()
      .nullable()
      .notRequired()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint | null | undefined;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
