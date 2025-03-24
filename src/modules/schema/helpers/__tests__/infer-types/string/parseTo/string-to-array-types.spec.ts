import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator String ParseTo Array Types", () => {
  it("should infer a string to array", () => {
    const stringSchema = schema()
      .string()
      .parseTo()
      .array(
        schema().object({
          key: schema().string(),
        }),
      );
    const value = stringSchema.test("").value;

    type StringSchemaIn = InferIn<typeof stringSchema>;
    type StringSchemaOut = InferOut<typeof stringSchema>;
    type CheckValue = CheckType<
      typeof value,
      {
        key: string;
      }[]
    >;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, string>;
    type StringSchemaCheckOut = CheckType<
      StringSchemaOut,
      {
        key: string;
      }[]
    >;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string or null to array", () => {
    const stringSchema = schema()
      .string()
      .nullable()
      .parseTo()
      .array(
        schema().object({
          key: schema().string(),
        }),
      );
    const value = stringSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableSchemaOut = InferOut<typeof stringSchema>;
    type CheckValue = CheckType<
      typeof value,
      {
        key: string;
      }[]
    >;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, string | null>;
    type StringSchemaCheckOut = CheckType<
      StringNullableSchemaOut,
      {
        key: string;
      }[]
    >;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a string, null, or undefined to array", () => {
    const stringSchema = schema()
      .string()
      .nullable()
      .notRequired()
      .parseTo()
      .array(
        schema().object({
          key: schema().string(),
        }),
      );
    const value = stringSchema.test("").value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof stringSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof stringSchema>;
    type CheckValue = CheckType<
      typeof value,
      {
        key: string;
      }[]
    >;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, string | null | undefined>;
    type StringSchemaCheckOut = CheckType<
      StringNullableUndefinedSchemaOut,
      {
        key: string;
      }[]
    >;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
