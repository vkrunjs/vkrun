import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Date Custom Method to Array Types", () => {
  it("should infer a Date to Date[]", () => {
    const customSchema = schema()
      .date()
      .custom<Date[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date;
            success: (value: Date[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success([new Date()]);
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date[]>;
    type CheckValue = CheckType<typeof value, Date[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date or null to Date[]", () => {
    const customSchema = schema()
      .date()
      .nullable()
      .custom<Date[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date | null;
            success: (value: Date[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success([new Date()]);
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date[]>;
    type CheckValue = CheckType<typeof value, Date[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date, null or undefined to Date[]", () => {
    const customSchema = schema()
      .date()
      .nullable()
      .notRequired()
      .custom<Date[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Date | null | undefined;
            success: (value: Date[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success([new Date()]);
      });
    const value = customSchema.test(new Date()).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Date | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date[]>;
    type CheckValue = CheckType<typeof value, Date[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
