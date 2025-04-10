import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Array Custom Method to String Types", () => {
  it("should infer a string[] to string[]", () => {
    const customSchema = schema()
      .array(schema().string())
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[];
            success: (value: string[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(["string"]);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[]>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string[]>;
    type CheckValue = CheckType<typeof value, string[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string[] or null to string[]", () => {
    const customSchema = schema()
      .array(schema().string())
      .nullable()
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[] | null;
            success: (value: string[] | null) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(["string"]);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[] | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string[] | null>;
    type CheckValue = CheckType<typeof value, string[] | null>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string[], null or undefined to string[]", () => {
    const customSchema = schema()
      .array(schema().string())
      .nullable()
      .notRequired()
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[] | null | undefined;
            success: (value: string[] | null | undefined) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(["string"]);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[] | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string[] | null | undefined>;
    type CheckValue = CheckType<typeof value, string[] | null | undefined>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
