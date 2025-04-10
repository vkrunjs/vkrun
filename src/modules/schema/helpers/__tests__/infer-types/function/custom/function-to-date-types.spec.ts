import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Function Custom Method to Number Types", () => {
  it("should infer a function to Date", () => {
    const customSchema = schema()
      .function()
      .custom<Date>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function;
            success: (value: Date) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(new Date());
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function or null to Date", () => {
    const customSchema = schema()
      .function()
      .nullable()
      .custom<Date>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function | null;
            success: (value: Date) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(new Date());
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function, null or undefined to Date", () => {
    const customSchema = schema()
      .function()
      .nullable()
      .notRequired()
      .custom<Date>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function | null | undefined;
            success: (value: Date) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(new Date());
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
