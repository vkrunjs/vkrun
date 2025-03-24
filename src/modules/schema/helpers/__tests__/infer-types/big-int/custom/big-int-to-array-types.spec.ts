import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator BigInt Custom Method to Array Types", () => {
  it("should infer a bigint to bigint[]", () => {
    const customSchema = schema()
      .bigInt()
      .custom<bigint[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint;
            success: (value: bigint[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success([123n]);
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint[]>;
    type CheckValue = CheckType<typeof value, bigint[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint or null to bigint[]", () => {
    const customSchema = schema()
      .bigInt()
      .nullable()
      .custom<bigint[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint | null;
            success: (value: bigint[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success([123n]);
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint | null>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint[]>;
    type CheckValue = CheckType<typeof value, bigint[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint, null or undefined to bigint[]", () => {
    const customSchema = schema()
      .bigInt()
      .nullable()
      .notRequired()
      .custom<bigint[]>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: bigint | null | undefined;
            success: (value: bigint[]) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success([123n]);
      });
    const value = customSchema.test(123n).value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, bigint | null | undefined>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint[]>;
    type CheckValue = CheckType<typeof value, bigint[]>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
