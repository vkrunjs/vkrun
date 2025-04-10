import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Alias Method Types", () => {
  it("should infer a boolean", () => {
    const booleanSchema = schema().boolean().alias("value name");
    const value = booleanSchema.test(true).value;

    type StringSchemaIn = InferIn<typeof booleanSchema>;
    type StringSchemaOut = InferOut<typeof booleanSchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, boolean>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null", () => {
    const booleanSchema = schema().boolean().alias("value name").nullable();
    const value = booleanSchema.test(true).value;

    type StringNullableSchemaIn = InferIn<typeof booleanSchema>;
    type StringNullableSchemaOut = InferOut<typeof booleanSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, boolean | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, boolean | null>;
    type CheckValue = CheckType<typeof value, boolean | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null, or undefined", () => {
    const booleanSchema = schema().boolean().alias("value name").nullable().notRequired();
    const value = booleanSchema.test(true).value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof booleanSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof booleanSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, boolean | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, boolean | null | undefined>;
    type CheckValue = CheckType<typeof value, boolean | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
