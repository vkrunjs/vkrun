import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator String ParseTo Date Types", () => {
  it("should infer a string to Date", () => {
    const stringSchema = schema().string().date().parseTo().date();
    const value = stringSchema.test("").value;

    type StringSchemaIn = InferIn<typeof stringSchema>;
    type StringSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, string>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null to Date", () => {
    const stringSchema = schema().string().date().nullable().parseTo().date();
    const value = stringSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, string | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null, or undefined to Date", () => {
    const stringSchema = schema().string().date().nullable().notRequired().parseTo().date();
    const value = stringSchema.test("").value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, string | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
