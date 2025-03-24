import { schema, InferIn, InferOut, CheckType, oneOf } from "../../../../../../../index";

describe("Validator Any Custom Method to String Types", () => {
  it("should infer a any to string", () => {
    const customSchema = schema()
      .any()
      .custom<"hello">((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: any;
            success: (value: "hello") => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(ctx.value);
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, any>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, "hello">;
    type CheckValue = CheckType<typeof value, "hello">;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
