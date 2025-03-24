import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Any Custom Method to Boolean Types", () => {
  it("should infer a any to boolean", () => {
    const customSchema = schema()
      .any()
      .custom<boolean>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: any;
            success: (value: boolean) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(true);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, any>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
