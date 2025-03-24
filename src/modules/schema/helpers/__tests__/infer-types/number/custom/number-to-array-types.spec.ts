import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Number Custom Method to Array Types", () => {
  it("should infer a number to number[]", () => {
    const customSchema = schema()
      .number()
      .custom<number[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number;
            success: (value: number[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success([123]);
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number[]>;
    type CheckValue = CheckType<typeof value, number[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null to number[]", () => {
    const customSchema = schema()
      .number()
      .nullable()
      .custom<number[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number | null;
            success: (value: number[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success([123]);
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number[]>;
    type CheckValue = CheckType<typeof value, number[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null or undefined to number[]", () => {
    const customSchema = schema()
      .number()
      .nullable()
      .notRequired()
      .custom<number[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: number | null | undefined;
            success: (value: number[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success([123]);
      });
    const value = customSchema.test(123).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, number | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number[]>;
    type CheckValue = CheckType<typeof value, number[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
