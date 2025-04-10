import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator BigInt ParseTo String Types", () => {
  it("should infer a bigint to string", () => {
    const bigintSchema = schema().bigInt().parseTo().string();
    const value = bigintSchema.test(123).value;

    type NumberSchemaIn = InferIn<typeof bigintSchema>;
    type NumberSchemaOut = InferOut<typeof bigintSchema>;

    type NumberSchemaCheckIn = CheckType<NumberSchemaIn, bigint>;
    type NumberSchemaCheckOut = CheckType<NumberSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint or null to string", () => {
    const bigintSchema = schema().bigInt().nullable().parseTo().string();
    const value = bigintSchema.test(123).value;

    type NumberNullableSchemaIn = InferIn<typeof bigintSchema>;
    type NumberNullableSchemaOut = InferOut<typeof bigintSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableSchemaIn, bigint | null>;
    type NumberSchemaCheckOut = CheckType<NumberNullableSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint, null, or undefined to string", () => {
    const bigintSchema = schema().bigInt().nullable().notRequired().parseTo().string();
    const value = bigintSchema.test(123).value;

    type NumberNullableUndefinedSchemaIn = InferIn<typeof bigintSchema>;
    type NumberNullableUndefinedSchemaOut = InferOut<typeof bigintSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableUndefinedSchemaIn, bigint | null | undefined>;
    type NumberSchemaCheckOut = CheckType<NumberNullableUndefinedSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
