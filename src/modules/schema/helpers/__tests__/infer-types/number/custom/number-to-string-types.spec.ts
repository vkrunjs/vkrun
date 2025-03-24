import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Number Custom Method to String Types", () => {
  it("should infer a number to string", () => {
    const customSchema = schema()
      .number()
      .custom<string>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number;
            success: (value: string) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success("string");
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null to string", () => {
    const customSchema = schema()
      .number()
      .nullable()
      .custom<string>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number | null;
            success: (value: string) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success("string");
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null or undefined to string", () => {
    const customSchema = schema()
      .number()
      .nullable()
      .notRequired()
      .custom<string>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number | null | undefined;
            success: (value: string) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success("string");
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
