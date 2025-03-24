import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Alias Method Types", () => {
  it("should infer a function", () => {
    const functionSchema = schema().function().alias("value name");
    const value = functionSchema.test(() => {}).value;

    type StringSchemaIn = InferIn<typeof functionSchema>;
    type StringSchemaOut = InferOut<typeof functionSchema>;

    type StringSchemaCheckIn = CheckType<StringSchemaIn, Function>;
    type StringSchemaCheckOut = CheckType<StringSchemaOut, Function>;
    type CheckValue = CheckType<typeof value, Function>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function or null", () => {
    const functionSchema = schema().function().alias("value name").nullable();
    const value = functionSchema.test(() => {}).value;

    type StringNullableSchemaIn = InferIn<typeof functionSchema>;
    type StringNullableSchemaOut = InferOut<typeof functionSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableSchemaIn, Function | null>;
    type StringSchemaCheckOut = CheckType<StringNullableSchemaOut, Function | null>;
    type CheckValue = CheckType<typeof value, Function | null>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a function, null, or undefined", () => {
    const functionSchema = schema().function().alias("value name").nullable().notRequired();
    const value = functionSchema.test(() => {}).value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof functionSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof functionSchema>;

    type StringSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, Function | null | undefined>;
    type StringSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, Function | null | undefined>;
    type CheckValue = CheckType<typeof value, Function | null | undefined>;

    const checkIn: StringSchemaCheckIn = true;
    const checkOut: StringSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
