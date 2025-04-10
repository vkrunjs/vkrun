import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Boolean Custom Method to Function Types", () => {
  it("should infer a boolean to Function", () => {
    const customSchema = schema()
      .boolean()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null to Function", () => {
    const customSchema = schema()
      .boolean()
      .nullable()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean | null;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null or undefined to Function", () => {
    const customSchema = schema()
      .boolean()
      .nullable()
      .notRequired()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean | null | undefined;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
