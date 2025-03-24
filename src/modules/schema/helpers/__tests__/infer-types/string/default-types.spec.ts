import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Default Method Types", () => {
  it("should infer a string", () => {
    const stringSchema = schema().string().default("content");
    const value = stringSchema.test(undefined as any).value;

    type StringSchemaIn = InferIn<typeof stringSchema>;
    type StringSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, string | undefined>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null", () => {
    const stringSchema = schema().string().default("content").nullable();
    const value = stringSchema.test(undefined as any).value;

    type StringNullableSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, string | undefined | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null, or undefined", () => {
    const stringSchema = schema().string().nullable().default("content");
    const value = stringSchema.test(undefined as any).value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, string | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
