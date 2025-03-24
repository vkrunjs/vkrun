import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Boolean Custom Method to BigInt Types", () => {
  it("should infer a boolean to bigint", () => {
    const customSchema = schema()
      .boolean()
      .custom<bigint>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean;
            success: (value: bigint) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123n);
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null to bigint", () => {
    const customSchema = schema()
      .boolean()
      .nullable()
      .custom<bigint>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean | null;
            success: (value: bigint) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123n);
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null or undefined to bigint", () => {
    const customSchema = schema()
      .boolean()
      .nullable()
      .notRequired()
      .custom<bigint>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean | null | undefined;
            success: (value: bigint) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123n);
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
