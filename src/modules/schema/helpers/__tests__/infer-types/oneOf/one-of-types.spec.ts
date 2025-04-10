import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator OneOf Method Types", () => {
  it("should infer a multiple schemas", () => {
    const oneOfSchema = schema().oneOf([
      schema().string().parseTo().date(),
      schema().number(),
      schema().bigInt(),
      schema().boolean(),
    ]);
    const value = oneOfSchema.test("").value;

    type OneOfSchemaIn = InferIn<typeof oneOfSchema>;
    type OneOfSchemaOut = InferOut<typeof oneOfSchema>;

    type OneOfSchemaCheckIn = CheckType<OneOfSchemaIn, string | number | bigint | boolean>;
    type OneOfSchemaCheckOut = CheckType<OneOfSchemaOut, number | bigint | boolean | Date>;
    type CheckValue = CheckType<typeof value, number | bigint | boolean | Date>;

    const checkIn: OneOfSchemaCheckIn = true;
    const checkOut: OneOfSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a multiple schemas with null", () => {
    const oneOfSchema = schema()
      .oneOf([schema().string().parseTo().date(), schema().number(), schema().bigInt(), schema().boolean()])
      .nullable();
    const value = oneOfSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof oneOfSchema>;
    type StringNullableSchemaOut = InferOut<typeof oneOfSchema>;

    type OneOfSchemaCheckIn = CheckType<StringNullableSchemaIn, string | number | bigint | boolean | null>;
    type OneOfSchemaCheckOut = CheckType<StringNullableSchemaOut, number | bigint | boolean | Date | null>;
    type CheckValue = CheckType<typeof value, number | bigint | boolean | Date | null>;

    const checkIn: OneOfSchemaCheckIn = true;
    const checkOut: OneOfSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a multiple schemas with null and undefined", () => {
    const oneOfSchema = schema()
      .oneOf([schema().string().parseTo().date(), schema().number(), schema().bigInt(), schema().boolean()])
      .nullable()
      .notRequired();
    const value = oneOfSchema.test("").value;

    type StringNullableUndefinedSchemaIn = InferIn<typeof oneOfSchema>;
    type StringNullableUndefinedSchemaOut = InferOut<typeof oneOfSchema>;

    type OneOfSchemaCheckIn = CheckType<StringNullableUndefinedSchemaIn, string | number | bigint | boolean | null | undefined>;
    type OneOfSchemaCheckOut = CheckType<StringNullableUndefinedSchemaOut, number | bigint | boolean | Date | null | undefined>;
    type CheckValue = CheckType<typeof value, number | bigint | boolean | Date | null | undefined>;

    const checkIn: OneOfSchemaCheckIn = true;
    const checkOut: OneOfSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
