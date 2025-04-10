import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Regex Method Types", () => {
  it("should infer a string", () => {
    const stringSchema = schema()
      .string()
      .regex({ regExp: /^[a-zA-Z]+$/ });
    const value = stringSchema.test("").value;

    type StringSchemaIn = InferIn<typeof stringSchema>;
    type StringSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, string>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null", () => {
    const stringSchema = schema()
      .string()
      .regex({ regExp: /^[a-zA-Z]+$/ })
      .nullable();
    const value = stringSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, string | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, string | null>;
    type CheckValue = CheckType<typeof value, string | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null, or undefined", () => {
    const stringSchema = schema()
      .string()
      .regex({ regExp: /^[a-zA-Z]+$/ })
      .nullable()
      .notRequired();
    const value = stringSchema.test("").value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof stringSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, string | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, string | null | undefined>;
    type CheckValue = CheckType<typeof value, string | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
