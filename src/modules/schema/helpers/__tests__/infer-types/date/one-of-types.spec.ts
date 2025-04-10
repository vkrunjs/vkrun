import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator OneOf Method Types", () => {
  it("should infer a date", () => {
    const dateSchema = schema()
      .date()
      .oneOf([new Date("2000-02-02"), new Date("2000-02-03")]);
    const value = dateSchema.test(new Date("2000-02-02")).value;

    type StringSchemaIn = InferIn<typeof dateSchema>;
    type StringSchemaOut = InferOut<typeof dateSchema>;
    type CheckValue = CheckType<typeof value, Date>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, Date>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, Date>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a date or null", () => {
    const dateSchema = schema()
      .date()
      .oneOf([new Date("2000-02-02"), new Date("2000-02-03")])
      .nullable();
    const value = dateSchema.test(new Date("2000-02-02")).value;

    type StringNullableSchemaIn = InferIn<typeof dateSchema>;
    type StringNullableSchemaOut = InferOut<typeof dateSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, Date | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, Date | null>;
    type CheckValue = CheckType<typeof value, Date | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a date, null, or undefined", () => {
    const dateSchema = schema()
      .date()
      .oneOf([new Date("2000-02-02"), new Date("2000-02-03")])
      .nullable()
      .notRequired();
    const value = dateSchema.test(new Date("2000-02-02")).value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof dateSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof dateSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, Date | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, Date | null | undefined>;
    type CheckValue = CheckType<typeof value, Date | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
