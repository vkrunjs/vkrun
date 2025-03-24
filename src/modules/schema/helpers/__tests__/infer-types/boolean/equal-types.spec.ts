import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Boolean Equal Method Types", () => {
  it("should infer a boolean", () => {
    const booleanSchema = schema().boolean().equal(true);
    const value = booleanSchema.test(true).value;

    type StringSchemaIn = InferIn<typeof booleanSchema>;
    type StringSchemaOut = InferOut<typeof booleanSchema>;
    type CheckValue = CheckType<typeof value, true>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, true>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, true>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null", () => {
    const booleanSchema = schema().boolean().equal(false).nullable();
    const value = booleanSchema.test(false).value;

    type StringNullableSchemaIn = InferIn<typeof booleanSchema>;
    type StringNullableSchemaOut = InferOut<typeof booleanSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, false | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, false | null>;
    type CheckValue = CheckType<typeof value, false | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null, or undefined", () => {
    const booleanSchema = schema().boolean().equal(true).nullable().notRequired();
    const value = booleanSchema.test(true).value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof booleanSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof booleanSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, true | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, true | null | undefined>;
    type CheckValue = CheckType<typeof value, true | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
