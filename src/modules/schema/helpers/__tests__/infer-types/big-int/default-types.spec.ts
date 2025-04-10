import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Default Method Types", () => {
  it("should infer a bigInt", () => {
    const bigIntSchema = schema().bigInt().default(123n);
    const value = bigIntSchema.test(123n).value;

    type BigIntSchemaIn = InferIn<typeof bigIntSchema>;
    type BigIntSchemaOut = InferOut<typeof bigIntSchema>;

    type BigIntSchemaCheckIn = CheckType<BigIntSchemaIn, bigint | undefined>;
    type BigIntSchemaCheckOut = CheckType<BigIntSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkValue: CheckValue = true;
    const checkIn: BigIntSchemaCheckIn = true;
    const checkOut: BigIntSchemaCheckOut = true;
  });

  it("should infer a bigInt or null", () => {
    const bigIntSchema = schema().bigInt().default(123n).nullable();
    const value = bigIntSchema.test(123n).value;

    type BigIntNullableSchemaIn = InferIn<typeof bigIntSchema>;
    type BigIntNullableSchemaOut = InferOut<typeof bigIntSchema>;

    type BigIntSchemaCheckIn = CheckType<BigIntNullableSchemaIn, bigint | undefined | null>;
    type BigIntSchemaCheckOut = CheckType<BigIntNullableSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: BigIntSchemaCheckIn = true;
    const checkOut: BigIntSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigInt, null, or undefined", () => {
    const bigIntSchema = schema().bigInt().default(123n).nullable();
    const value = bigIntSchema.test(123n).value;

    type BigIntNullableUndefinedSchemaIn = InferIn<typeof bigIntSchema>;
    type BigIntNullableUndefinedSchemaOut = InferOut<typeof bigIntSchema>;

    type BigIntSchemaCheckIn = CheckType<BigIntNullableUndefinedSchemaIn, bigint | null | undefined>;
    type BigIntSchemaCheckOut = CheckType<BigIntNullableUndefinedSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: BigIntSchemaCheckIn = true;
    const checkOut: BigIntSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
