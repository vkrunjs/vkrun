import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Equal Method Types", () => {
  it("should infer a number", () => {
    const numberSchema = schema().number().equal(123);
    const value = numberSchema.test(123).value;

    type StringSchemaIn = InferIn<typeof numberSchema>;
    type StringSchemaOut = InferOut<typeof numberSchema>;
    type CheckValue = CheckType<typeof value, 123>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, 123>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, 123>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null", () => {
    const numberSchema = schema().number().equal(123).nullable();
    const value = numberSchema.test(123).value;

    type StringNullableSchemaIn = InferIn<typeof numberSchema>;
    type StringNullableSchemaOut = InferOut<typeof numberSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, 123 | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, 123 | null>;
    type CheckValue = CheckType<typeof value, 123 | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null, or undefined", () => {
    const numberSchema = schema().number().equal(123).nullable().notRequired();
    const value = numberSchema.test(123).value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof numberSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof numberSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, 123 | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, 123 | null | undefined>;
    type CheckValue = CheckType<typeof value, 123 | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
