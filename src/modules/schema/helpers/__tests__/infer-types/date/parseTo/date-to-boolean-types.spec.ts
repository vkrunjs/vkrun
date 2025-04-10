import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Date ParseTo Boolean Types", () => {
  it("should infer a Date to boolean", () => {
    const dateSchema = schema().date().parseTo().boolean();
    const value = dateSchema.test(new Date()).value;

    type DateSchemaIn = InferIn<typeof dateSchema>;
    type DateSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateSchemaIn, Date>;
    type DateSchemaCheckOut = CheckType<DateSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date or null to boolean", () => {
    const dateSchema = schema().date().nullable().parseTo().boolean();
    const value = dateSchema.test(new Date()).value;

    type DateNullableSchemaIn = InferIn<typeof dateSchema>;
    type DateNullableSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateNullableSchemaIn, Date | null>;
    type DateSchemaCheckOut = CheckType<DateNullableSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date null, or undefined to boolean", () => {
    const dateSchema = schema().date().nullable().notRequired().parseTo().boolean();
    const value = dateSchema.test(new Date()).value;

    type DateNullableUndefinedSchemaIn = InferIn<typeof dateSchema>;
    type DateNullableUndefinedSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateNullableUndefinedSchemaIn, Date | null | undefined>;
    type DateSchemaCheckOut = CheckType<DateNullableUndefinedSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
