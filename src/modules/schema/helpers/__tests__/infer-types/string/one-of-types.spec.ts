import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator OneOf Method Types", () => {
  it("should infer a string", () => {
    const stringSchema = schema().string().oneOf(["hello", "world"]);
    const value = stringSchema.test("").value;

    type StringSchemaIn = InferIn<typeof stringSchema>;
    type StringSchemaOut = InferOut<typeof stringSchema>;
    type CheckValue = CheckType<typeof value, "hello" | "world">;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, "hello" | "world">;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, "hello" | "world">;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null", () => {
    const stringSchema = schema().string().oneOf(["hello", "world"]).nullable();
    const value = stringSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, "hello" | "world" | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, "hello" | "world" | null>;
    type CheckValue = CheckType<typeof value, "hello" | "world" | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null, or undefined", () => {
    const stringSchema = schema().string().oneOf(["hello", "world"]).nullable().notRequired();
    const value = stringSchema.test("").value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, "hello" | "world" | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, "hello" | "world" | null | undefined>;
    type CheckValue = CheckType<typeof value, "hello" | "world" | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
