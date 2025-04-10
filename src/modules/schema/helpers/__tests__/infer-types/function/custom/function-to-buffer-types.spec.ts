import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Function Custom Method to Buffer Types", () => {
  it("should infer a function to Buffer", () => {
    const customSchema = schema()
      .function()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function;
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

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function or null to Buffer", () => {
    const customSchema = schema()
      .function()
      .nullable()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function | null;
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

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function, null or undefined to Buffer", () => {
    const customSchema = schema()
      .function()
      .nullable()
      .notRequired()
      .custom<Buffer>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function | null | undefined;
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

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
