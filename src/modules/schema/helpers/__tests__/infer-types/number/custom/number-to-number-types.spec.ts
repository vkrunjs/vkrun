import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Number Custom Method to Number Types", () => {
  it("should infer a number to number", () => {
    const customSchema = schema()
      .number()
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number;
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(ctx.value);
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null to number or null", () => {
    const customSchema = schema()
      .number()
      .nullable()
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number | null;
            success: (value: number | null) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(ctx.value);
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number | null>;
    type CheckValue = CheckType<typeof value, number | null>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null or undefined to number, null or undefined", () => {
    const customSchema = schema()
      .number()
      .nullable()
      .notRequired()
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number | null | undefined;
            success: (value: number | null | undefined) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(ctx.value);
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number | null | undefined>;
    type CheckValue = CheckType<typeof value, number | null | undefined>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
