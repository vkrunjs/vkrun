import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Buffer Custom Method to Number Types", () => {
  it("should infer a buffer to Date", () => {
    const customSchema = schema()
      .buffer()
      .custom<Date>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer;
            success: (value: Date) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(new Date());
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to Date", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .custom<Date>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null;
            success: (value: Date) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(new Date());
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null or undefined to Date", () => {
    const customSchema = schema()
      .buffer()
      .nullable()
      .notRequired()
      .custom<Date>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Buffer | null | undefined;
            success: (value: Date) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(new Date());
      });
    const value = customSchema.test(Buffer.from("content")).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Buffer | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
