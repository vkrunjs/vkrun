import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Boolean Custom Method to Number Types", () => {
  it("should infer a boolean to Date", () => {
    const customSchema = schema()
      .boolean()
      .custom<Date>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean;
            success: (value: Date) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(new Date());
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null to Date", () => {
    const customSchema = schema()
      .boolean()
      .nullable()
      .custom<Date>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean | null;
            success: (value: Date) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(new Date());
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null or undefined to Date", () => {
    const customSchema = schema()
      .boolean()
      .nullable()
      .notRequired()
      .custom<Date>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean | null | undefined;
            success: (value: Date) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(new Date());
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
