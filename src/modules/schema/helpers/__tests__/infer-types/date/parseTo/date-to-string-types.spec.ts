import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Date ParseTo String Types", () => {
  it("should infer a Date to string", () => {
    const dateSchema = schema().date().parseTo().string();
    const value = dateSchema.test(new Date()).value;

    type DateSchemaIn = InferIn<typeof dateSchema>;
    type DateSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateSchemaIn, Date>;
    type DateSchemaCheckOut = CheckType<DateSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date or null to string", () => {
    const dateSchema = schema().date().nullable().parseTo().string();
    const value = dateSchema.test(new Date()).value;

    type DateNullableSchemaIn = InferIn<typeof dateSchema>;
    type DateNullableSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateNullableSchemaIn, Date | null>;
    type DateSchemaCheckOut = CheckType<DateNullableSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date null, or undefined to string", () => {
    const dateSchema = schema().date().nullable().notRequired().parseTo().string();
    const value = dateSchema.test(new Date()).value;

    type DateNullableUndefinedSchemaIn = InferIn<typeof dateSchema>;
    type DateNullableUndefinedSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateNullableUndefinedSchemaIn, Date | null | undefined>;
    type DateSchemaCheckOut = CheckType<DateNullableUndefinedSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
