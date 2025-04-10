import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Min Method Types", () => {
  it("should infer a number", () => {
    const numberSchema = schema().number().min({ min: 1 });
    const value = numberSchema.test(123).value;

    type NumberSchemaIn = InferIn<typeof numberSchema>;
    type NumberSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberSchemaIn, number>;
    type NumberSchemaCheckOut = CheckType<NumberSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null", () => {
    const numberSchema = schema().number().min({ min: 1 }).nullable();
    const value = numberSchema.test(123).value;

    type NumberNullableSchemaIn = InferIn<typeof numberSchema>;
    type NumberNullableSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableSchemaIn, number | null>;
    type NumberSchemaCheckOut = CheckType<NumberNullableSchemaOut, number | null>;
    type CheckValue = CheckType<typeof value, number | null>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null, or undefined", () => {
    const numberSchema = schema().number().min({ min: 1 }).nullable().notRequired();
    const value = numberSchema.test(123).value;

    type NumberNullableUndefinedSchemaIn = InferIn<typeof numberSchema>;
    type NumberNullableUndefinedSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableUndefinedSchemaIn, number | null | undefined>;
    type NumberSchemaCheckOut = CheckType<NumberNullableUndefinedSchemaOut, number | null | undefined>;
    type CheckValue = CheckType<typeof value, number | null | undefined>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
