import { schema, InferIn, InferOut, CheckType, oneOf } from "../../../../../../../index";

describe("Validator Buffer Custom Method to String Types", () => {
  it("should infer a buffer to string", () => {
    const customSchema = schema()
      .buffer()
      .custom<string>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer;
            success: (value: string) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success("hello");
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to string or null", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .custom<string>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null;
            success: (value: string) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success("hello");
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null or undefined to string, null or undefined", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .notRequired()
      .custom<string>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null | undefined;
            success: (value: string) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success("hello");
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
