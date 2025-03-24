import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator BigInt Equal Method Types", () => {
  it("should infer a bigint", () => {
    const bigintSchema = schema().bigInt().equal(123n);
    const value = bigintSchema.test(123n).value;

    type StringSchemaIn = InferIn<typeof bigintSchema>;
    type StringSchemaOut = InferOut<typeof bigintSchema>;
    type CheckValue = CheckType<typeof value, 123n>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, 123n>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, 123n>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint or null", () => {
    const bigintSchema = schema().bigInt().equal(123n).nullable();
    const value = bigintSchema.test(123n).value;

    type StringNullableSchemaIn = InferIn<typeof bigintSchema>;
    type StringNullableSchemaOut = InferOut<typeof bigintSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, 123n | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, 123n | null>;
    type CheckValue = CheckType<typeof value, 123n | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint, null, or undefined", () => {
    const bigintSchema = schema().bigInt().equal(123n).nullable().notRequired();
    const value = bigintSchema.test(123n).value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof bigintSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof bigintSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, 123n | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, 123n | null | undefined>;
    type CheckValue = CheckType<typeof value, 123n | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
