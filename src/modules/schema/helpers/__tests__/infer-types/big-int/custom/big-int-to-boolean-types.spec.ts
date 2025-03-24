import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator BigInt Custom Method to Boolean Types", () => {
  it("should infer a bigint to boolean", () => {
    const customSchema = schema()
      .bigInt()
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint or null to boolean", () => {
    const customSchema = schema()
      .bigInt()
      .nullable()
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint | null;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint, null or undefined to boolean", () => {
    const customSchema = schema()
      .bigInt()
      .nullable()
      .notRequired()
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint | null | undefined;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
