import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Function Custom Method to BigInt Types", () => {
  it("should infer a function to bigint", () => {
    const customSchema = schema()
      .function()
      .custom<bigint>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function;
            success: (value: bigint) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123n);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function or null to bigint", () => {
    const customSchema = schema()
      .function()
      .nullable()
      .custom<bigint>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function | null;
            success: (value: bigint) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123n);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function, null or undefined to bigint", () => {
    const customSchema = schema()
      .function()
      .nullable()
      .notRequired()
      .custom<bigint>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function | null | undefined;
            success: (value: bigint) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123n);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
