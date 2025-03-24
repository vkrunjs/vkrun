import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Date Custom Method to Number Types", () => {
  it("should infer a Date to number", () => {
    const customSchema = schema()
      .date()
      .custom<number>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date;
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;
        ctx.success(123);
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date or null to number or null", () => {
    const customSchema = schema()
      .date()
      .nullable()
      .custom<number>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date | null;
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123);
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date, null or undefined to number, null or undefined", () => {
    const customSchema = schema()
      .date()
      .nullable()
      .notRequired()
      .custom<number>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date | null | undefined;
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123);
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
