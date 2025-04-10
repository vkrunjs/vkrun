import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator BigInt Method Types", () => {
  it("should infer a bigInt", () => {
    const bigIntSchema = schema().bigInt();
    const value = bigIntSchema.test(123n).value;

    type BigIntSchemaIn = InferIn<typeof bigIntSchema>;
    type BigIntSchemaOut = InferOut<typeof bigIntSchema>;

    type BigIntSchemaCheckIn = CheckType<BigIntSchemaIn, bigint>;
    type BigIntSchemaCheckOut = CheckType<BigIntSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: BigIntSchemaCheckIn = true;
    const checkOut: BigIntSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigInt or null", () => {
    const bigIntSchema = schema().bigInt().nullable();
    const value = bigIntSchema.test(123n).value;

    type BigIntSchemaIn = InferIn<typeof bigIntSchema>;
    type BigIntSchemaOut = InferOut<typeof bigIntSchema>;

    type BigIntSchemaCheckIn = CheckType<BigIntSchemaIn, bigint | null>;
    type BigIntSchemaCheckOut = CheckType<BigIntSchemaOut, bigint | null>;
    type CheckValue = CheckType<typeof value, bigint | null>;

    const checkIn: BigIntSchemaCheckIn = true;
    const checkOut: BigIntSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a bigInt, null, or undefined", () => {
    const bigIntSchema = schema().bigInt().nullable().notRequired();
    const value = bigIntSchema.test(123n).value;

    type BigIntSchemaIn = InferIn<typeof bigIntSchema>;
    type BigIntSchemaOut = InferOut<typeof bigIntSchema>;

    type BigIntSchemaCheckIn = CheckType<BigIntSchemaIn, bigint | null | undefined>;
    type BigIntSchemaCheckOut = CheckType<BigIntSchemaOut, bigint | null | undefined>;
    type CheckValue = CheckType<typeof value, bigint | null | undefined>;

    const checkIn: BigIntSchemaCheckIn = true;
    const checkOut: BigIntSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
