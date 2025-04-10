import { schema, InferIn, InferOut, CheckType, oneOf } from "../../../../../../../index";

describe("Validator Array Custom Method to String Types", () => {
  it("should infer a string[] to 'hello'", () => {
    const customSchema = schema()
      .array(schema().string())
      .custom<"hello">((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[];
            success: (value: "hello") => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success("hello");
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[]>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, "hello">;
    type CheckValue = CheckType<typeof value, "hello">;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string[] or null to 'hello'", () => {
    const customSchema = schema()
      .array(schema().string())
      .nullable()
      .custom<"hello">((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[] | null;
            success: (value: "hello") => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success("hello");
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[] | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, "hello">;
    type CheckValue = CheckType<typeof value, "hello">;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string[], null or undefined to 'hello'", () => {
    const customSchema = schema()
      .array(schema().string())
      .nullable()
      .notRequired()
      .custom<"hello">((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string[] | null | undefined;
            success: (value: "hello") => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success("hello");
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string[] | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, "hello">;
    type CheckValue = CheckType<typeof value, "hello">;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
