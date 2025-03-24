import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator BigInt Custom Method to Object Types", () => {
  it("should infer a bigint to object", () => {
    const customSchema = schema()
      .bigInt()
      .custom<{ key: bigint }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint;
            success: (value: { key: bigint }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: 123n });
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: bigint }>;
    type CheckValue = CheckType<typeof value, { key: bigint }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint or null to object", () => {
    const customSchema = schema()
      .bigInt()
      .nullable()
      .custom<{ key: bigint }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint | null;
            success: (value: { key: bigint }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: 123n });
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: bigint }>;
    type CheckValue = CheckType<typeof value, { key: bigint }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint, null or undefined to object", () => {
    const customSchema = schema()
      .bigInt()
      .nullable()
      .notRequired()
      .custom<{ key: bigint }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint | null | undefined;
            success: (value: { key: bigint }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: 123n });
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: bigint }>;
    type CheckValue = CheckType<typeof value, { key: bigint }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
