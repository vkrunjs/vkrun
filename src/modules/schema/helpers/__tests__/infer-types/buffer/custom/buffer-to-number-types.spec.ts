import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Buffer Custom Method to Number Types", () => {
  it("should infer a buffer to number", () => {
    const customSchema = schema()
      .buffer()
      .custom<number>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer;
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123);
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to number", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .custom<number>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null;
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123);
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null or undefined to number", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .notRequired()
      .custom<number>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null | undefined;
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123);
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
