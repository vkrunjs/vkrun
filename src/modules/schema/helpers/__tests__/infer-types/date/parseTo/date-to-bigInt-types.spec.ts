import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Date ParseTo BigInt Types", () => {
  it("should infer a Date to bigint", () => {
    const dateSchema = schema().date().parseTo().bigInt();
    const value = dateSchema.test(new Date()).value;

    type NumberSchemaIn = InferIn<typeof dateSchema>;
    type NumberSchemaOut = InferOut<typeof dateSchema>;

    type NumberSchemaCheckIn = CheckType<NumberSchemaIn, Date>;
    type NumberSchemaCheckOut = CheckType<NumberSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date or null to bigint", () => {
    const dateSchema = schema().date().nullable().parseTo().bigInt();
    const value = dateSchema.test(new Date()).value;

    type NumberNullableSchemaIn = InferIn<typeof dateSchema>;
    type NumberNullableSchemaOut = InferOut<typeof dateSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableSchemaIn, Date | null>;
    type NumberSchemaCheckOut = CheckType<NumberNullableSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date, null, or undefined to bigint", () => {
    const dateSchema = schema().date().nullable().notRequired().parseTo().bigInt();
    const value = dateSchema.test(new Date()).value;

    type NumberNullableUndefinedSchemaIn = InferIn<typeof dateSchema>;
    type NumberNullableUndefinedSchemaOut = InferOut<typeof dateSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableUndefinedSchemaIn, Date | null | undefined>;
    type NumberSchemaCheckOut = CheckType<NumberNullableUndefinedSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
