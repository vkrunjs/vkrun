import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Alias Method Types", () => {
  it("should infer a any", () => {
    const anySchema = schema().any().alias("value name");
    const value = anySchema.test("").value;

    type StringSchemaIn = InferIn<typeof anySchema>;
    type StringSchemaOut = InferOut<typeof anySchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, any>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, any>;
    type CheckValue = CheckType<typeof value, any>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
