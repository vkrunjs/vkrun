import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Buffer Custom Method to Buffer Types", () => {
  it("should infer a buffer to Buffer", () => {
    const customSchema = schema()
      .buffer()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to Buffer", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null or undefined to Buffer", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .notRequired()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null | undefined;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
