import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Array Custom Method to Number Types", () => {
  it("should infer a string[] to number", () => {
    const customSchema = schema()
      .array(schema().string())
      .custom<number>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[];
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[]>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string[] or null to number", () => {
    const customSchema = schema()
      .array(schema().string())
      .nullable()
      .custom<number>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[] | null;
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[] | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string[], null or undefined to number", () => {
    const customSchema = schema()
      .array(schema().string())
      .nullable()
      .notRequired()
      .custom<number>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[] | null | undefined;
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[] | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
