import { schema, InferIn, InferOut, CheckType, oneOf } from "../../../../../../../index";

describe("Validator String Custom Method to String Types", () => {
  it("should infer a string to string", () => {
    const customSchema = schema()
      .string()
      .equal("hello")
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: "hello";
            success: (value: "hello") => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(ctx.value);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, "hello">;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, "hello">;
    type CheckValue = CheckType<typeof value, "hello">;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null to string or null", () => {
    const customSchema = schema()
      .string()
      .oneOf(["hello", "world"])
      .nullable()
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: "hello" | "world" | null;
            success: (value: "hello" | "world" | null) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(ctx.value);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, "hello" | "world" | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, "hello" | "world" | null>;
    type CheckValue = CheckType<typeof value, "hello" | "world" | null>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null or undefined to string, null or undefined", () => {
    const customSchema = schema()
      .string()
      .nullable()
      .notRequired()
      .custom((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string | null | undefined;
            success: (value: string | null | undefined) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(ctx.value);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string | null | undefined>;
    type CheckValue = CheckType<typeof value, string | null | undefined>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
