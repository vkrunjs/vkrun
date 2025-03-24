import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Boolean Method Types", () => {
  it("should infer a boolean", () => {
    const booleanSchema = schema().boolean();
    const value = booleanSchema.test(true).value;

    type BooleanSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanSchemaIn, boolean>;
    type BooleanSchemaCheckOut = CheckType<BooleanSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null", () => {
    const booleanSchema = schema().boolean().nullable();
    const value = booleanSchema.test(true).value;

    type BooleanNullableSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanNullableSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanNullableSchemaIn, boolean | null>;
    type BooleanSchemaCheckOut = CheckType<BooleanNullableSchemaOut, boolean | null>;
    type CheckValue = CheckType<typeof value, boolean | null>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null, or undefined", () => {
    const booleanSchema = schema().boolean().nullable().notRequired();
    const value = booleanSchema.test(true).value;

    type BooleanNullableUndefinedSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanNullableUndefinedSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanNullableUndefinedSchemaIn, boolean | null | undefined>;
    type BooleanSchemaCheckOut = CheckType<BooleanNullableUndefinedSchemaOut, boolean | null | undefined>;
    type CheckValue = CheckType<typeof value, boolean | null | undefined>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
