import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Number ParseTo String Types", () => {
  it("should infer a number to string", () => {
    const numberSchema = schema().number().parseTo().string();
    const value = numberSchema.test(123).value;

    type NumberSchemaIn = InferIn<typeof numberSchema>;
    type NumberSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberSchemaIn, number>;
    type NumberSchemaCheckOut = CheckType<NumberSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null to string", () => {
    const numberSchema = schema().number().nullable().parseTo().string();
    const value = numberSchema.test(123).value;

    type NumberNullableSchemaIn = InferIn<typeof numberSchema>;
    type NumberNullableSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableSchemaIn, number | null>;
    type NumberSchemaCheckOut = CheckType<NumberNullableSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null, or undefined to string", () => {
    const numberSchema = schema().number().nullable().notRequired().parseTo().string();
    const value = numberSchema.test(123).value;

    type NumberNullableUndefinedSchemaIn = InferIn<typeof numberSchema>;
    type NumberNullableUndefinedSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableUndefinedSchemaIn, number | null | undefined>;
    type NumberSchemaCheckOut = CheckType<NumberNullableUndefinedSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
