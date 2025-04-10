import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Default Method Types", () => {
  it("should infer a number", () => {
    const numberSchema = schema().number().default(123);
    const value = numberSchema.test(undefined as any).value;

    type NumberSchemaIn = InferIn<typeof numberSchema>;
    type NumberSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberSchemaIn, number | undefined>;
    type NumberSchemaCheckOut = CheckType<NumberSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null", () => {
    const numberSchema = schema().number().default(123).nullable();
    const value = numberSchema.test(undefined as any).value;

    type NumberNullableSchemaIn = InferIn<typeof numberSchema>;
    type NumberNullableSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableSchemaIn, number | undefined | null>;
    type NumberSchemaCheckOut = CheckType<NumberNullableSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null, or undefined", () => {
    const numberSchema = schema().number().default(123).nullable();
    const value = numberSchema.test(undefined as any).value;

    type NumberNullableUndefinedSchemaIn = InferIn<typeof numberSchema>;
    type NumberNullableUndefinedSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableUndefinedSchemaIn, number | null | undefined>;
    type NumberSchemaCheckOut = CheckType<NumberNullableUndefinedSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
