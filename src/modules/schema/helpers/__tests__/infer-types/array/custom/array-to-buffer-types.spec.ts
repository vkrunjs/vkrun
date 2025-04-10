import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Array Custom Method to Buffer Types", () => {
  it("should infer a string[] to Buffer", () => {
    const customSchema = schema()
      .array(schema().string())
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[];
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[]>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string[] or null to Buffer", () => {
    const customSchema = schema()
      .array(schema().string())
      .nullable()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[] | null;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[] | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string[], null or undefined to Buffer", () => {
    const customSchema = schema()
      .array(schema().string())
      .nullable()
      .notRequired()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[] | null | undefined;
            success: (value: Buffer) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(Buffer.from("content"));
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[] | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
