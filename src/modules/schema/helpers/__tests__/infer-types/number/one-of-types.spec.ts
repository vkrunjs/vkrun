import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator OneOf Method Types", () => {
  it("should infer a number", () => {
    const numberSchema = schema().number().oneOf([123, 321]);
    const value = numberSchema.test("").value;

    type StringSchemaIn = InferIn<typeof numberSchema>;
    type StringSchemaOut = InferOut<typeof numberSchema>;
    type CheckValue = CheckType<typeof value, 123 | 321>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, 123 | 321>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, 123 | 321>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null", () => {
    const numberSchema = schema().number().oneOf([123, 321]).nullable();
    const value = numberSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof numberSchema>;
    type StringNullableSchemaOut = InferOut<typeof numberSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, 123 | 321 | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, 123 | 321 | null>;
    type CheckValue = CheckType<typeof value, 123 | 321 | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null, or undefined", () => {
    const numberSchema = schema().number().oneOf([123, 321]).nullable().notRequired();
    const value = numberSchema.test("").value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof numberSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof numberSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, 123 | 321 | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, 123 | 321 | null | undefined>;
    type CheckValue = CheckType<typeof value, 123 | 321 | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
