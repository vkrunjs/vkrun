import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Boolean Custom Method to Buffer Types", () => {
  it("should infer a boolean to Buffer", () => {
    const customSchema = schema()
      .boolean()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null to Buffer", () => {
    const customSchema = schema()
      .boolean()
      .nullable()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean | null;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null or undefined to Buffer", () => {
    const customSchema = schema()
      .boolean()
      .nullable()
      .notRequired()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: boolean | null | undefined;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test(true).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, boolean | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
