import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Buffer Custom Method to Function Types", () => {
  it("should infer a buffer to Function", () => {
    const customSchema = schema()
      .buffer()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to Function", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null or undefined to Function", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .notRequired()
      .custom<Function>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null | undefined;
            success: (value: Function) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(() => {});
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
