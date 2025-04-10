import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Buffer Custom Method to Object Types", () => {
  it("should infer a buffer to object", () => {
    const customSchema = schema()
      .buffer()
      .custom<{ key: string }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer;
            success: (value: { key: string }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: "string" });
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: string }>;
    type CheckValue = CheckType<typeof value, { key: string }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to object", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .custom<{ key: string }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null;
            success: (value: { key: string }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: "string" });
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null>;
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
    const value = customSchema.test(Buffer.from("content")).value;

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
