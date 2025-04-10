import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Positive Method Types", () => {
  it("should infer a bigInt", () => {
    const bigIntSchema = schema().bigInt().positive();
    const value = bigIntSchema.test(123n).value;

    type BigIntSchemaIn = InferIn<typeof bigIntSchema>;
    type BigIntSchemaOut = InferOut<typeof bigIntSchema>;

    const input: BigIntSchemaIn = 123n;
    const output: BigIntSchemaOut = 123n;

    type BigIntSchemaCheckIn = CheckType<BigIntSchemaIn, bigint>;
    type BigIntSchemaCheckOut = CheckType<BigIntSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: BigIntSchemaCheckIn = true;
    const checkOut: BigIntSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigInt or null", () => {
    const bigIntSchema = schema().bigInt().positive().nullable();
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
    const bigIntSchema = schema().bigInt().positive().nullable().notRequired();
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
