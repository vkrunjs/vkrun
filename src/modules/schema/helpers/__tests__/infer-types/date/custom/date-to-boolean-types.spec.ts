import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Date Custom Method to Boolean Types", () => {
  it("should infer a Date to boolean", () => {
    const customSchema = schema()
      .date()
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date or null to boolean", () => {
    const customSchema = schema()
      .date()
      .nullable()
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date | null;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date, null or undefined to boolean", () => {
    const customSchema = schema()
      .date()
      .nullable()
      .notRequired()
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date | null | undefined;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
