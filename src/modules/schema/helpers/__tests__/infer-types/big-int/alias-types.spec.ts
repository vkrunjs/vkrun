import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Alias Method Types", () => {
  it("should infer a bigInt", () => {
    const bigIntSchema = schema().bigInt().alias("value name");
    const value = bigIntSchema.test(123n).value;

    type BigIntSchemaIn = InferIn<typeof bigIntSchema>;
    type BigIntSchemaOut = InferOut<typeof bigIntSchema>;
    type CheckValue = CheckType<typeof value, bigint>;

    type BigIntSchemaCheckIn = CheckType<BigIntSchemaIn, bigint>;
    type BigIntSchemaCheckOut = CheckType<BigIntSchemaOut, bigint>;

    const checkIn: BigIntSchemaCheckIn = true;
    const checkOut: BigIntSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigInt or null", () => {
    const bigIntSchema = schema().bigInt().alias("value name").nullable();
    const value = bigIntSchema.test(123n).value;

    type BigIntNullableSchemaIn = InferIn<typeof bigIntSchema>;
    type BigIntNullableSchemaOut = InferOut<typeof bigIntSchema>;

    type BigIntSchemaCheckIn = CheckType<BigIntNullableSchemaIn, bigint | null>;
    type BigIntSchemaCheckOut = CheckType<BigIntNullableSchemaOut, bigint | null>;
    type CheckValue = CheckType<typeof value, bigint | null>;

    const checkIn: BigIntSchemaCheckIn = true;
    const checkOut: BigIntSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigInt, null, or undefined", () => {
    const bigIntSchema = schema().bigInt().alias("value name").nullable().notRequired();
    const value = bigIntSchema.test(123n).value;

    type BigIntNullableUndefinedSchemaIn = InferIn<typeof bigIntSchema>;
    type BigIntNullableUndefinedSchemaOut = InferOut<typeof bigIntSchema>;

    type BigIntSchemaCheckIn = CheckType<BigIntNullableUndefinedSchemaIn, bigint | null | undefined>;
    type BigIntSchemaCheckOut = CheckType<BigIntNullableUndefinedSchemaOut, bigint | null | undefined>;
    type CheckValue = CheckType<typeof value, bigint | null | undefined>;

    const checkIn: BigIntSchemaCheckIn = true;
    const checkOut: BigIntSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
