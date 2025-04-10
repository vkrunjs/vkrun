import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator BigInt ParseTo Number Types", () => {
  it("should infer a bigInt to number", () => {
    const bigIntSchema = schema().bigInt().parseTo().number();
    const value = bigIntSchema.test(123n).value;

    type NumberSchemaIn = InferIn<typeof bigIntSchema>;
    type NumberSchemaOut = InferOut<typeof bigIntSchema>;

    type NumberSchemaCheckIn = CheckType<NumberSchemaIn, bigint>;
    type NumberSchemaCheckOut = CheckType<NumberSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigInt or null to number", () => {
    const bigIntSchema = schema().bigInt().nullable().parseTo().number();
    const value = bigIntSchema.test(123n).value;

    type NumberNullableSchemaIn = InferIn<typeof bigIntSchema>;
    type NumberNullableSchemaOut = InferOut<typeof bigIntSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableSchemaIn, bigint | null>;
    type NumberSchemaCheckOut = CheckType<NumberNullableSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigInt, null, or undefined to number", () => {
    const bigIntSchema = schema().bigInt().nullable().notRequired().parseTo().number();
    const value = bigIntSchema.test(123n).value;

    type NumberNullableUndefinedSchemaIn = InferIn<typeof bigIntSchema>;
    type NumberNullableUndefinedSchemaOut = InferOut<typeof bigIntSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableUndefinedSchemaIn, bigint | null | undefined>;
    type NumberSchemaCheckOut = CheckType<NumberNullableUndefinedSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
