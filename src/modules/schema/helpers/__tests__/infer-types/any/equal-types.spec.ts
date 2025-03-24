import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Equal Method Types", () => {
  it("should infer a string", () => {
    const stringSchema = schema().string().equal("hello");
    const value = stringSchema.test("").value;

    type StringSchemaIn = InferIn<typeof stringSchema>;
    type StringSchemaOut = InferOut<typeof stringSchema>;
    type CheckValue = CheckType<typeof value, "hello">;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, "hello">;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, "hello">;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null", () => {
    const stringSchema = schema().string().equal("hello").nullable();
    const value = stringSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, "hello" | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, "hello" | null>;
    type CheckValue = CheckType<typeof value, "hello" | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null, or undefined", () => {
    const stringSchema = schema().string().equal("hello").nullable().notRequired();
    const value = stringSchema.test("").value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, "hello" | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, "hello" | null | undefined>;
    type CheckValue = CheckType<typeof value, "hello" | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
