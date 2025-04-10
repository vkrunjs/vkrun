import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Default Method Types", () => {
  it("should infer a multiple schemas", () => {
    const oneOfSchema = schema().oneOf([schema().string(), schema().number()]).default(123);
    const value = oneOfSchema.test("").value;

    type OneOfSchemaIn = InferIn<typeof oneOfSchema>;
    type OneOfSchemaOut = InferOut<typeof oneOfSchema>;

    type OneOfSchemaCheckIn = CheckType<OneOfSchemaIn, string | number | undefined>;
    type OneOfSchemaCheckOut = CheckType<OneOfSchemaOut, string | number>;
    type CheckValue = CheckType<typeof value, string | number>;

    const checkIn: OneOfSchemaCheckIn = true;
    const checkOut: OneOfSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a multiple schemas with null", () => {
    const oneOfSchema = schema().oneOf([schema().string(), schema().number()]).default(123).nullable();

    const value = oneOfSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof oneOfSchema>;
    type StringNullableSchemaOut = InferOut<typeof oneOfSchema>;

    type OneOfSchemaCheckIn = CheckType<StringNullableSchemaIn, string | number | null | undefined>;
    type OneOfSchemaCheckOut = CheckType<StringNullableSchemaOut, string | number | null>;
    type CheckValue = CheckType<typeof value, string | number | null>;

    const checkIn: OneOfSchemaCheckIn = true;
    const checkOut: OneOfSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a multiple schemas with null and undefined", () => {
    const oneOfSchema = schema().oneOf([schema().string(), schema().number()]).notRequired().default(123).nullable();

    const value = oneOfSchema.test("").value;

    type StringNullableSchemaIn = InferIn<typeof oneOfSchema>;
    type StringNullableSchemaOut = InferOut<typeof oneOfSchema>;

    type OneOfSchemaCheckIn = CheckType<StringNullableSchemaIn, string | number | null | undefined>;
    type OneOfSchemaCheckOut = CheckType<StringNullableSchemaOut, string | number | null>;
    type CheckValue = CheckType<typeof value, string | number | null>;

    const checkIn: OneOfSchemaCheckIn = true;
    const checkOut: OneOfSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
