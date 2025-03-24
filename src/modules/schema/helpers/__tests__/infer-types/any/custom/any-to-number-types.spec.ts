import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Any Custom Method to Number Types", () => {
  it("should infer a any to number", () => {
    const customSchema = schema()
      .any()
      .custom<number>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: any;
            success: (value: number) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(123);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, any>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
