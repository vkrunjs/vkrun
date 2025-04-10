import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator BigInt ParseTo Boolean Types", () => {
  it("should infer a bigint to boolean", () => {
    const bigintSchema = schema().bigInt().parseTo().boolean();
    const value = bigintSchema.test(123).value;

    type NumberSchemaIn = InferIn<typeof bigintSchema>;
    type NumberSchemaOut = InferOut<typeof bigintSchema>;

    type NumberSchemaCheckIn = CheckType<NumberSchemaIn, bigint>;
    type NumberSchemaCheckOut = CheckType<NumberSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint or null to boolean", () => {
    const bigintSchema = schema().bigInt().nullable().parseTo().boolean();
    const value = bigintSchema.test(123).value;

    type NumberNullableSchemaIn = InferIn<typeof bigintSchema>;
    type NumberNullableSchemaOut = InferOut<typeof bigintSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableSchemaIn, bigint | null>;
    type NumberSchemaCheckOut = CheckType<NumberNullableSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigint, null, or undefined to boolean", () => {
    const bigintSchema = schema().bigInt().nullable().notRequired().parseTo().boolean();
    const value = bigintSchema.test(123).value;

    type NumberNullableUndefinedSchemaIn = InferIn<typeof bigintSchema>;
    type NumberNullableUndefinedSchemaOut = InferOut<typeof bigintSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableUndefinedSchemaIn, bigint | null | undefined>;
    type NumberSchemaCheckOut = CheckType<NumberNullableUndefinedSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
