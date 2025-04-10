import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Date Method Types", () => {
  it("should infer a Date", () => {
    const dateSchema = schema().date();
    const value = dateSchema.test(new Date()).value;

    type DateSchemaIn = InferIn<typeof dateSchema>;
    type DateSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateSchemaIn, Date>;
    type DateSchemaCheckOut = CheckType<DateSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date or null", () => {
    const dateSchema = schema().date().nullable();
    const value = dateSchema.test(new Date()).value;

    type DateNullableSchemaIn = InferIn<typeof dateSchema>;
    type DateNullableSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateNullableSchemaIn, Date | null>;
    type DateSchemaCheckOut = CheckType<DateNullableSchemaOut, Date | null>;
    type CheckValue = CheckType<typeof value, Date | null>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date, null, or undefined", () => {
    const dateSchema = schema().date().nullable().notRequired();
    const value = dateSchema.test(new Date()).value;

    type DateNullableUndefinedSchemaIn = InferIn<typeof dateSchema>;
    type DateNullableUndefinedSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateNullableUndefinedSchemaIn, Date | null | undefined>;
    type DateSchemaCheckOut = CheckType<DateNullableUndefinedSchemaOut, Date | null | undefined>;
    type CheckValue = CheckType<typeof value, Date | null | undefined>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
