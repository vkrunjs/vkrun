import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Any Custom Method to BigInt Types", () => {
  it("should infer a any to bigint", () => {
    const customSchema = schema()
      .any()
      .custom<bigint>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: any;
            success: (value: bigint) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123n);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, any>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
