import { schema, InferIn, InferOut, CheckType } from "../../../../../../../index";

describe("Validator Any Custom Method to Number Types", () => {
  it("should infer a any to Date", () => {
    const customSchema = schema()
      .any()
      .custom<Date>((ctx) => {
        type CheckSuccessCtx = CheckType<
          typeof ctx,
          {
            value: any;
            success: (value: Date) => void;
            failed: (message: string) => void;
          }
        >;
        const checkCtx: CheckSuccessCtx = true;

        ctx.success(new Date());
      });
    const value = customSchema.test("").value;

    type CustomSchemaIn = InferIn<typeof customSchema>;
    type CustomSchemaOut = InferOut<typeof customSchema>;

    type CustomSchemaCheckIn = CheckType<CustomSchemaIn, any>;
    type CustomSchemaCheckOut = CheckType<CustomSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: CustomSchemaCheckIn = true;
    const checkOut: CustomSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
