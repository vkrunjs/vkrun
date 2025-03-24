import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Default Method Types", () => {
  it("should infer a function", () => {
    const functionSchema = schema()
      .function()
      .default(() => {});
    const value = functionSchema.test(undefined as any).value;

    type StringSchemaIn = InferIn<typeof functionSchema>;
    type StringSchemaOut = InferOut<typeof functionSchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, Function | undefined>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function or null", () => {
    const functionSchema = schema()
      .function()
      .default(() => {})
      .nullable();
    const value = functionSchema.test(undefined as any).value;

    type StringNullableSchemaIn = InferIn<typeof functionSchema>;
    type StringNullableSchemaOut = InferOut<typeof functionSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, Function | undefined | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function, null, or undefined", () => {
    const functionSchema = schema()
      .function()
      .nullable()
      .default(() => {});
    const value = functionSchema.test(undefined as any).value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof functionSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof functionSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, Function | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
