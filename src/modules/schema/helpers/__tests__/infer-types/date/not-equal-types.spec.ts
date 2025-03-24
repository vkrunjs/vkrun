import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator NotEqual Method Types", () => {
  it("should infer a date", () => {
    const dateSchema = schema().date().notEqual(new Date());
    const value = dateSchema.test(new Date()).value;

    type StringSchemaIn = InferIn<typeof dateSchema>;
    type StringSchemaOut = InferOut<typeof dateSchema>;
    type CheckValue = CheckType<typeof value, Date>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, Date>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, Date>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a date or null", () => {
    const dateSchema = schema().date().notEqual(new Date()).nullable();
    const value = dateSchema.test(new Date()).value;

    type StringNullableSchemaIn = InferIn<typeof dateSchema>;
    type StringNullableSchemaOut = InferOut<typeof dateSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, Date | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, Date | null>;
    type CheckValue = CheckType<typeof value, Date | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a date, null, or undefined", () => {
    const dateSchema = schema().date().notEqual(new Date()).nullable().notRequired();
    const value = dateSchema.test(new Date()).value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof dateSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof dateSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, Date | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, Date | null | undefined>;
    type CheckValue = CheckType<typeof value, Date | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
