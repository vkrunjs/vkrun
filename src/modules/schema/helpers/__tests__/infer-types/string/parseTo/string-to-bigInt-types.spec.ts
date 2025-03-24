import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator String ParseTo BigInt Types", () => {
  it("should infer a string to bigint", () => {
    const stringSchema = schema().string().parseTo().bigInt();
    const value = stringSchema.test("").value;

    type StringSchemaIn = InferIn<typeof stringSchema>;
    type StringSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, string>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null to bigint", () => {
    const stringSchema = schema().string().nullable().parseTo().bigInt();
    const value = stringSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, string | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null, or undefined to bigint", () => {
    const stringSchema = schema().string().nullable().notRequired().parseTo().bigInt();
    const value = stringSchema.test("").value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, string | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
