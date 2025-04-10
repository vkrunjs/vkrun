import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator String Custom Method to Object Types", () => {
  it("should infer a string to object", () => {
    const customSchema = schema()
      .string()
      .custom<{ key: string }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string;
            success: (value: { key: string }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: "string" });
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: string }>;
    type CheckValue = CheckType<typeof value, { key: string }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null to object", () => {
    const customSchema = schema()
      .string()
      .nullable()
      .custom<{ key: string }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string | null;
            success: (value: { key: string }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: "string" });
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: string }>;
    type CheckValue = CheckType<typeof value, { key: string }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null or undefined to object", () => {
    const customSchema = schema()
      .string()
      .nullable()
      .notRequired()
      .custom<{ key: string }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string | null | undefined;
            success: (value: { key: string }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: "string" });
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: string }>;
    type CheckValue = CheckType<typeof value, { key: string }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
