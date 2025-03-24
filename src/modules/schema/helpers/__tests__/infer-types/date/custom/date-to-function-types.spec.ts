import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Date Custom Method to Function Types", () => {
  it("should infer a Date to Function", () => {
    const customSchema = schema()
      .date()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date or null to Function", () => {
    const customSchema = schema()
      .date()
      .nullable()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date | null;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date, null or undefined to Function", () => {
    const customSchema = schema()
      .date()
      .nullable()
      .notRequired()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date | null | undefined;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
