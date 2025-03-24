import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Array Method Types - Functions", () => {
  it("should allow an array of functions", () => {
    const arrayFunctionSchema = schema().array(schema().function());

    type ArrayFunctionSchemaIn = InferIn<typeof arrayFunctionSchema>;
    type ArrayFunctionSchemaOut = InferOut<typeof arrayFunctionSchema>;

    type ArrayFunctionCheckIn = CheckType<ArrayFunctionSchemaIn, Function[]>;
    type ArrayFunctionCheckOut = CheckType<ArrayFunctionSchemaOut, Function[]>;

    const checkIn: ArrayFunctionCheckIn = true;
    const checkOut: ArrayFunctionCheckOut = true;
  });

  it("should allow an array of functions with an alias", () => {
    const arrayFunctionAliasSchema = schema().array(schema().function().alias("value name"));

    type ArrayFunctionAliasSchemaIn = InferIn<typeof arrayFunctionAliasSchema>;
    type ArrayFunctionAliasSchemaOut = InferOut<typeof arrayFunctionAliasSchema>;

    type ArrayFunctionCheckIn = CheckType<ArrayFunctionAliasSchemaIn, Function[]>;
    type ArrayFunctionCheckOut = CheckType<ArrayFunctionAliasSchemaOut, Function[]>;

    const checkIn: ArrayFunctionCheckIn = true;
    const checkOut: ArrayFunctionCheckOut = true;
  });

  it("should allow an array of functions with a default value", () => {
    const arrayFunctionDefaultSchema = schema()
      .array(schema().function())
      .default([() => {}]);

    type ArrayFunctionDefaultSchemaIn = InferIn<typeof arrayFunctionDefaultSchema>;
    type ArrayFunctionDefaultSchemaOut = InferOut<typeof arrayFunctionDefaultSchema>;

    type ArrayFunctionCheckIn = CheckType<ArrayFunctionDefaultSchemaIn, Function[] | undefined>;
    type ArrayFunctionCheckOut = CheckType<ArrayFunctionDefaultSchemaOut, Function[]>;

    const checkIn: ArrayFunctionCheckIn = true;
    const checkOut: ArrayFunctionCheckOut = true;
  });

  it("should allow an array of functions with a Function | null", () => {
    const arrayFunctionNullableSchema = schema().array(schema().function().nullable());

    type ArrayFunctionNullableSchemaIn = InferIn<typeof arrayFunctionNullableSchema>;
    type ArrayFunctionNullableSchemaOut = InferOut<typeof arrayFunctionNullableSchema>;

    type ArrayFunctionCheckIn = CheckType<ArrayFunctionNullableSchemaIn, (Function | null)[]>;
    type ArrayFunctionCheckOut = CheckType<ArrayFunctionNullableSchemaOut, (Function | null)[]>;

    const checkIn: ArrayFunctionCheckIn = true;
    const checkOut: ArrayFunctionCheckOut = true;
  });

  it("should allow an array of functions with a Function | null | undefined", () => {
    const arrayFunctionNullableSchema = schema().array(schema().function().nullable().notRequired());

    type ArrayFunctionNullableSchemaIn = InferIn<typeof arrayFunctionNullableSchema>;
    type ArrayFunctionNullableSchemaOut = InferOut<typeof arrayFunctionNullableSchema>;

    type ArrayFunctionCheckIn = CheckType<ArrayFunctionNullableSchemaIn, (Function | null | undefined)[]>;
    type ArrayFunctionCheckOut = CheckType<ArrayFunctionNullableSchemaOut, (Function | null | undefined)[]>;

    const checkIn: ArrayFunctionCheckIn = true;
    const checkOut: ArrayFunctionCheckOut = true;
  });
});
