import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Default Method Types", () => {
  it("should infer a boolean", () => {
    const booleanSchema = schema().boolean().default(true);
    const value = booleanSchema.test(undefined as any).value;

    type BooleanSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanSchemaIn, boolean | undefined>;
    type BooleanSchemaCheckOut = CheckType<BooleanSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean or null", () => {
    const booleanSchema = schema().boolean().default(true).nullable();
    const value = booleanSchema.test(undefined as any).value;

    type BooleanNullableSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanNullableSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanNullableSchemaIn, boolean | undefined | null>;
    type BooleanSchemaCheckOut = CheckType<BooleanNullableSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a boolean, null, or undefined", () => {
    const booleanSchema = schema().boolean().nullable().default(true);
    const value = booleanSchema.test(undefined as any).value;

    type BooleanNullableUndefinedSchemaIn = InferIn<typeof booleanSchema>;
    type BooleanNullableUndefinedSchemaOut = InferOut<typeof booleanSchema>;

    type BooleanSchemaCheckIn = CheckType<BooleanNullableUndefinedSchemaIn, boolean | null | undefined>;
    type BooleanSchemaCheckOut = CheckType<BooleanNullableUndefinedSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: BooleanSchemaCheckIn = true;
    const checkOut: BooleanSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
