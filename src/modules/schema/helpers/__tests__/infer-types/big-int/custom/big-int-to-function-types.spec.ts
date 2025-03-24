import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator BigInt Custom Method to Function Types", () => {
  it("should infer a bigint to Function", () => {
    const customSchema = schema()
      .bigInt()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint or null to Function", () => {
    const customSchema = schema()
      .bigInt()
      .nullable()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint | null;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint, null or undefined to Function", () => {
    const customSchema = schema()
      .bigInt()
      .nullable()
      .notRequired()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint | null | undefined;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
