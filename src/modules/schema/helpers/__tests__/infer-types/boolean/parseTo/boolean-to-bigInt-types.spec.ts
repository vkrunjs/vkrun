import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Boolean ParseTo BigInt Types", () => {
  it("should infer a boolean to bigint", () => {
    const booleanSchema = schema().boolean().parseTo().bigInt();
    const value = booleanSchema.test(true).value;

    type BooleanSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanSchemaIn, boolean>;
    type BooleanSchemaCheckOut = CheckType<BooleanSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null to bigint", () => {
    const booleanSchema = schema().boolean().nullable().parseTo().bigInt();
    const value = booleanSchema.test(true).value;

    type BooleanNullableSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanNullableSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanNullableSchemaIn, boolean | null>;
    type BooleanSchemaCheckOut = CheckType<BooleanNullableSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null, or undefined to bigint", () => {
    const booleanSchema = schema().boolean().nullable().notRequired().parseTo().bigInt();
    const value = booleanSchema.test(true).value;

    type BooleanNullableUndefinedSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanNullableUndefinedSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanNullableUndefinedSchemaIn, boolean | null | undefined>;
    type BooleanSchemaCheckOut = CheckType<BooleanNullableUndefinedSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
