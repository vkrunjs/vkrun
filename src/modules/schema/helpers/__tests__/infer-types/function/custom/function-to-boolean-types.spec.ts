import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Function Custom Method to Boolean Types", () => {
  it("should infer a function to boolean", () => {
    const customSchema = schema()
      .function()
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function or null to boolean", () => {
    const customSchema = schema()
      .function()
      .nullable()
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function | null;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function, null or undefined to boolean", () => {
    const customSchema = schema()
      .function()
      .nullable()
      .notRequired()
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function | null | undefined;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
