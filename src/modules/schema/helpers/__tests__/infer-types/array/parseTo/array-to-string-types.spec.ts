import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Array ParseTo Boolean Types", () => {
  it("should infer a string[] to boolean", () => {
    const arraySchema = schema().array(schema().string()).parseTo().boolean();
    const value = arraySchema.test("").value;

    type StringSchemaIn = InferIn<typeof arraySchema>;
    type StringSchemaOut = InferOut<typeof arraySchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, string[]>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string[] or null to boolean", () => {
    const arraySchema = schema().array(schema().string()).nullable().parseTo().boolean();
    const value = arraySchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof arraySchema>;
    type StringNullableSchemaOut = InferOut<typeof arraySchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, string[] | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string[], null or undefined to boolean", () => {
    const arraySchema = schema().array(schema().string()).nullable().notRequired().parseTo().boolean();
    const value = arraySchema.test("").value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof arraySchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof arraySchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, string[] | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
