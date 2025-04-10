import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Default Method Types", () => {
  it("should infer a Date ro string", () => {
    const dateSchema = schema().date().default(new Date());
    const value = dateSchema.test(undefined).value;

    type DateSchemaIn = InferIn<typeof dateSchema>;
    type DateSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateSchemaIn, Date | undefined>;
    type DateSchemaCheckOut = CheckType<DateSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date or null", () => {
    const dateSchema = schema().date().default(new Date()).nullable();
    const value = dateSchema.test(undefined).value;

    type DateNullableSchemaIn = InferIn<typeof dateSchema>;
    type DateNullableSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateNullableSchemaIn, Date | null | undefined>;
    type DateSchemaCheckOut = CheckType<DateNullableSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a Date, null, or undefined", () => {
    const dateSchema = schema().date().default(new Date()).nullable();
    const value = dateSchema.test(undefined).value;

    type DateNullableUndefinedSchemaIn = InferIn<typeof dateSchema>;
    type DateNullableUndefinedSchemaOut = InferOut<typeof dateSchema>;

    type DateSchemaCheckIn = CheckType<DateNullableUndefinedSchemaIn, Date | null | undefined>;
    type DateSchemaCheckOut = CheckType<DateNullableUndefinedSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: DateSchemaCheckIn = true;
    const checkOut: DateSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
