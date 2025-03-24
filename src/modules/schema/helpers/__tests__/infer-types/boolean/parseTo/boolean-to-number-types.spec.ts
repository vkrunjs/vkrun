import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Boolean ParseTo Number Types", () => {
  it("should infer a boolean to number", () => {
    const booleanSchema = schema().boolean().parseTo().number();
    const value = booleanSchema.test(true).value;

    type BooleanSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanSchemaIn, boolean>;
    type BooleanSchemaCheckOut = CheckType<BooleanSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null to number", () => {
    const booleanSchema = schema().boolean().nullable().parseTo().number();
    const value = booleanSchema.test(true).value;

    type BooleanNullableSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanNullableSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanNullableSchemaIn, boolean | null>;
    type BooleanSchemaCheckOut = CheckType<BooleanNullableSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null, or undefined to number", () => {
    const booleanSchema = schema().boolean().nullable().notRequired().parseTo().number();
    const value = booleanSchema.test(true).value;

    type BooleanNullableUndefinedSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanNullableUndefinedSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanNullableUndefinedSchemaIn, boolean | null | undefined>;
    type BooleanSchemaCheckOut = CheckType<BooleanNullableUndefinedSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
