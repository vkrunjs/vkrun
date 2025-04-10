import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Number Custom Method to BigInt Types", () => {
  it("should infer a number to bigint", () => {
    const customSchema = schema()
      .number()
      .custom<bigint>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number;
            success: (value: bigint) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123n);
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null to bigint", () => {
    const customSchema = schema()
      .number()
      .nullable()
      .custom<bigint>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number | null;
            success: (value: bigint) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123n);
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null or undefined to bigint", () => {
    const customSchema = schema()
      .number()
      .nullable()
      .notRequired()
      .custom<bigint>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number | null | undefined;
            success: (value: bigint) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123n);
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
