import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Any Custom Method to Object Types", () => {
  it("should infer a any to object", () => {
    const customSchema = schema()
      .any()
      .custom<{ key: string }>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: any;
            success: (value: { key: string }) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success({ key: "string" });
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, any>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, { key: string }>;
    type CheckValue = CheckType<typeof value, { key: string }>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
