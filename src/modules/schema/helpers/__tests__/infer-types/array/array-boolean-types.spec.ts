import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Array Method Types - Booleans", () => {
  it("should allow an array of booleans", () => {
    const arrayBooleanSchema = schema().array(schema().boolean());

    type ArrayBooleanSchemaIn = InferIn<typeof arrayBooleanSchema>;
    type ArrayBooleanSchemaOut = InferOut<typeof arrayBooleanSchema>;

    type ArrayBooleanCheckIn = CheckType<ArrayBooleanSchemaIn, boolean[]>;
    type ArrayBooleanCheckOut = CheckType<ArrayBooleanSchemaOut, boolean[]>;

    const checkIn: ArrayBooleanCheckIn = true;
    const checkOut: ArrayBooleanCheckOut = true;
  });

  it("should allow an array of booleans with an alias", () => {
    const arrayBooleanAliasSchema = schema().array(schema().boolean().alias("value name"));

    type ArrayBooleanAliasSchemaIn = InferIn<typeof arrayBooleanAliasSchema>;
    type ArrayBooleanAliasSchemaOut = InferOut<typeof arrayBooleanAliasSchema>;

    type ArrayBooleanCheckIn = CheckType<ArrayBooleanAliasSchemaIn, boolean[]>;
    type ArrayBooleanCheckOut = CheckType<ArrayBooleanAliasSchemaOut, boolean[]>;

    const checkIn: ArrayBooleanCheckIn = true;
    const checkOut: ArrayBooleanCheckOut = true;
  });

  it("should allow an array of booleans with a default value", () => {
    const arrayBooleanDefaultSchema = schema().array(schema().boolean()).default([true]);

    type ArrayBooleanDefaultSchemaIn = InferIn<typeof arrayBooleanDefaultSchema>;
    type ArrayBooleanDefaultSchemaOut = InferOut<typeof arrayBooleanDefaultSchema>;

    type ArrayBooleanCheckIn = CheckType<ArrayBooleanDefaultSchemaIn, boolean[] | undefined>;
    type ArrayBooleanCheckOut = CheckType<ArrayBooleanDefaultSchemaOut, boolean[]>;

    const checkIn: ArrayBooleanCheckIn = true;
    const checkOut: ArrayBooleanCheckOut = true;
  });

  it("should allow an array of booleans with a boolean | null", () => {
    const arrayBooleanNullableSchema = schema().array(schema().boolean().nullable());

    type ArrayBooleanNullableSchemaIn = InferIn<typeof arrayBooleanNullableSchema>;
    type ArrayBooleanNullableSchemaOut = InferOut<typeof arrayBooleanNullableSchema>;

    type ArrayBooleanCheckIn = CheckType<ArrayBooleanNullableSchemaIn, (boolean | null)[]>;
    type ArrayBooleanCheckOut = CheckType<ArrayBooleanNullableSchemaOut, (boolean | null)[]>;

    const checkIn: ArrayBooleanCheckIn = true;
    const checkOut: ArrayBooleanCheckOut = true;
  });

  it("should allow an array of booleans with a boolean | null | undefined", () => {
    const arrayBooleanNullableSchema = schema().array(schema().boolean().nullable().notRequired());

    type ArrayBooleanNullableSchemaIn = InferIn<typeof arrayBooleanNullableSchema>;
    type ArrayBooleanNullableSchemaOut = InferOut<typeof arrayBooleanNullableSchema>;

    type ArrayBooleanCheckIn = CheckType<ArrayBooleanNullableSchemaIn, (boolean | null | undefined)[]>;
    type ArrayBooleanCheckOut = CheckType<ArrayBooleanNullableSchemaOut, (boolean | null | undefined)[]>;

    const checkIn: ArrayBooleanCheckIn = true;
    const checkOut: ArrayBooleanCheckOut = true;
  });
});
