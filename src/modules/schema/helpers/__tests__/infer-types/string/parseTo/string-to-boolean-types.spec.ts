import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator String ParseTo Boolean Types", () => {
  it("should infer a string to boolean", () => {
    const stringSchema = schema().string().parseTo().boolean();
    const value = stringSchema.test("").value;

    type StringSchemaIn = InferIn<typeof stringSchema>;
    type StringSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, string>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null to boolean", () => {
    const stringSchema = schema().string().nullable().parseTo().boolean();
    const value = stringSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, string | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null, or undefined to boolean", () => {
    const stringSchema = schema().string().nullable().notRequired().parseTo().boolean();
    const value = stringSchema.test("").value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, string | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
