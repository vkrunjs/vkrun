import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Boolean ParseTo String Types", () => {
  it("should infer a boolean to string", () => {
    const booleanSchema = schema().boolean().parseTo().string();
    const value = booleanSchema.test(true).value;

    type BooleanSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanSchemaIn, boolean>;
    type BooleanSchemaCheckOut = CheckType<BooleanSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null to string", () => {
    const booleanSchema = schema().boolean().nullable().parseTo().string();
    const value = booleanSchema.test(true).value;

    type BooleanNullableSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanNullableSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanNullableSchemaIn, boolean | null>;
    type BooleanSchemaCheckOut = CheckType<BooleanNullableSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null, or undefined to string", () => {
    const booleanSchema = schema().boolean().nullable().notRequired().parseTo().string();
    const value = booleanSchema.test(true).value;

    type BooleanNullableUndefinedSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanNullableUndefinedSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanNullableUndefinedSchemaIn, boolean | null | undefined>;
    type BooleanSchemaCheckOut = CheckType<BooleanNullableUndefinedSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
