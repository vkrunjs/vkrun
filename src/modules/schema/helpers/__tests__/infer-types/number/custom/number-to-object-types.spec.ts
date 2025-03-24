import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Number Custom Method to Object Types", () => {
  it("should infer a number to object", () => {
    const customSchema = schema()
      .number()
      .custom<{ key: number }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number;
            success: (value: { key: number }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: 123 });
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: number }>;
    type CheckValue = CheckType<typeof value, { key: number }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null to object", () => {
    const customSchema = schema()
      .number()
      .nullable()
      .custom<{ key: number }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number | null;
            success: (value: { key: number }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: 123 });
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: number }>;
    type CheckValue = CheckType<typeof value, { key: number }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null or undefined to object", () => {
    const customSchema = schema()
      .number()
      .nullable()
      .notRequired()
      .custom<{ key: number }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number | null | undefined;
            success: (value: { key: number }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: 123 });
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: number }>;
    type CheckValue = CheckType<typeof value, { key: number }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
