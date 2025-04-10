import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Boolean Custom Method to Boolean Types", () => {
  it("should infer a boolean to boolean", () => {
    const customSchema = schema()
      .boolean()
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(ctx.value);
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null to boolean or null", () => {
    const customSchema = schema()
      .boolean()
      .nullable()
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean | null;
            success: (value: boolean | null) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(ctx.value);
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean | null>;
    type CheckValue = CheckType<typeof value, boolean | null>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null or undefined to boolean, null or undefined", () => {
    const customSchema = schema()
      .boolean()
      .nullable()
      .notRequired()
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean | null | undefined;
            success: (value: boolean | null | undefined) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(ctx.value);
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean | null | undefined>;
    type CheckValue = CheckType<typeof value, boolean | null | undefined>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
