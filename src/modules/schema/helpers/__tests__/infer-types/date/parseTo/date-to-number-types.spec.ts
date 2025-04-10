import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Date ParseTo Number Types", () => {
  it("should infer a date or string to number", () => {
    const dateSchema = schema().date().parseTo().number();
    const value = dateSchema.test(new Date()).value;

    type DateSchemaIn = InferIn<typeof dateSchema>;
    type DateSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateSchemaIn, Date>;
    type DateSchemaCheckOut = CheckType<DateSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a date, string or null to number", () => {
    const dateSchema = schema().date().nullable().parseTo().number();
    const value = dateSchema.test(new Date()).value;

    type DateNullableSchemaIn = InferIn<typeof dateSchema>;
    type DateNullableSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateNullableSchemaIn, Date | null>;
    type DateSchemaCheckOut = CheckType<DateNullableSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a date, string, null, or undefined to number", () => {
    const dateSchema = schema().date().nullable().notRequired().parseTo().number();
    const value = dateSchema.test(new Date()).value;

    type DateNullableUndefinedSchemaIn = InferIn<typeof dateSchema>;
    type DateNullableUndefinedSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateNullableUndefinedSchemaIn, Date | null | undefined>;
    type DateSchemaCheckOut = CheckType<DateNullableUndefinedSchemaOut, number>;
    type CheckValue = CheckType<typeof value, number>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
