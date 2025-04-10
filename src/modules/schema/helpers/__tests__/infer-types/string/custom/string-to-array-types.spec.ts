import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator String Custom Method to Array Types", () => {
  it("should infer a string to string[]", () => {
    const customSchema = schema()
      .string()
      .custom<string[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string;
            success: (value: string[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(["string"]);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string[]>;
    type CheckValue = CheckType<typeof value, string[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null to string[]", () => {
    const customSchema = schema()
      .string()
      .nullable()
      .custom<string[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string | null;
            success: (value: string[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(["string"]);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string[]>;
    type CheckValue = CheckType<typeof value, string[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null or undefined to string[]", () => {
    const customSchema = schema()
      .string()
      .nullable()
      .notRequired()
      .custom<string[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: string | null | undefined;
            success: (value: string[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(["string"]);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, string | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, string[]>;
    type CheckValue = CheckType<typeof value, string[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
