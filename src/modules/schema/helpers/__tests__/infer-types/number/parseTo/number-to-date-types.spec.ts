import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Number ParseTo Date Types", () => {
  it("should infer a number to Date", () => {
    const numberSchema = schema().number().parseTo().date();
    const value = numberSchema.test(123).value;

    type NumberSchemaIn = InferIn<typeof numberSchema>;
    type NumberSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberSchemaIn, number>;
    type NumberSchemaCheckOut = CheckType<NumberSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number or null to Date", () => {
    const numberSchema = schema().number().nullable().parseTo().date();
    const value = numberSchema.test(123).value;

    type NumberNullableSchemaIn = InferIn<typeof numberSchema>;
    type NumberNullableSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableSchemaIn, number | null>;
    type NumberSchemaCheckOut = CheckType<NumberNullableSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a number, null, or undefined to Date", () => {
    const numberSchema = schema().number().nullable().notRequired().parseTo().date();
    const value = numberSchema.test(123).value;

    type NumberNullableUndefinedSchemaIn = InferIn<typeof numberSchema>;
    type NumberNullableUndefinedSchemaOut = InferOut<typeof numberSchema>;

    type NumberSchemaCheckIn = CheckType<NumberNullableUndefinedSchemaIn, number | null | undefined>;
    type NumberSchemaCheckOut = CheckType<NumberNullableUndefinedSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: NumberSchemaCheckIn = true;
    const checkOut: NumberSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
