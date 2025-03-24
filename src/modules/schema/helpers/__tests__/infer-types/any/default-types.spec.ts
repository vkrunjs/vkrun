import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Default Method Types", () => {
  it("should infer a any", () => {
    const anySchema = schema().any().default("content");
    const value = anySchema.test(undefined as any).value;

    type StringSchemaIn = InferIn<typeof anySchema>;
    type StringSchemaOut = InferOut<typeof anySchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, any | undefined>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, any>;
    type CheckValue = CheckType<typeof value, any>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
