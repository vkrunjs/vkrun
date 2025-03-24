import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Function Custom Method to Object Types", () => {
  it("should infer a function to object", () => {
    const customSchema = schema()
      .function()
      .custom<{ key: string }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function;
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

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: string }>;
    type CheckValue = CheckType<typeof value, { key: string }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function or null to object", () => {
    const customSchema = schema()
      .function()
      .nullable()
      .custom<{ key: string }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function | null;
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

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: string }>;
    type CheckValue = CheckType<typeof value, { key: string }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function, null or undefined to object", () => {
    const customSchema = schema()
      .function()
      .nullable()
      .notRequired()
      .custom<{ key: string }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: Function | null | undefined;
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

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, Function | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: string }>;
    type CheckValue = CheckType<typeof value, { key: string }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
