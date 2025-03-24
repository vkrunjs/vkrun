import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator NotEqual Method Types", () => {
  it("should infer a number", () => {
    const numberSchema = schema().number().notEqual(321);
    const value = numberSchema.test(123).value;

    type StringSchemaIn = InferIn<typeof numberSchema>;
    type StringSchemaOut = InferOut<typeof numberSchema>;
    type CheckValue = CheckType<typeof value, number>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, number>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, number>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null", () => {
    const numberSchema = schema().number().notEqual(321).nullable();
    const value = numberSchema.test(123).value;

    type StringNullableSchemaIn = InferIn<typeof numberSchema>;
    type StringNullableSchemaOut = InferOut<typeof numberSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, number | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, number | null>;
    type CheckValue = CheckType<typeof value, number | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null, or undefined", () => {
    const numberSchema = schema().number().notEqual(321).nullable().notRequired();
    const value = numberSchema.test(123).value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof numberSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof numberSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, number | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, number | null | undefined>;
    type CheckValue = CheckType<typeof value, number | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
