import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Array Method Types - BigInts", () => {
  it("should accept an array of bigints", () => {
    const arrayBigIntSchema = schema().array(schema().bigInt());

    type ArrayBigIntSchemaIn = InferIn<typeof arrayBigIntSchema>;
    type ArrayBigIntSchemaOut = InferOut<typeof arrayBigIntSchema>;

    type ArrayBigIntCheckIn = CheckType<ArrayBigIntSchemaIn, bigint[]>;
    type ArrayBigIntCheckOut = CheckType<ArrayBigIntSchemaOut, bigint[]>;

    const checkIn: ArrayBigIntCheckIn = true;
    const checkOut: ArrayBigIntCheckOut = true;
  });

  it("should accept an array of bigints with a maximum of 3", () => {
    const arrayBigIntMaxSchema = schema().array(schema().bigInt().max({ max: 3n }));

    type ArrayBigIntMaxSchemaIn = InferIn<typeof arrayBigIntMaxSchema>;
    type ArrayBigIntMaxSchemaOut = InferOut<typeof arrayBigIntMaxSchema>;

    type ArrayBigIntCheckIn = CheckType<ArrayBigIntMaxSchemaIn, bigint[]>;
    type ArrayBigIntCheckOut = CheckType<ArrayBigIntMaxSchemaOut, bigint[]>;

    const checkIn: ArrayBigIntCheckIn = true;
    const checkOut: ArrayBigIntCheckOut = true;
  });

  it("should accept an array of bigints with a minimum of 2", () => {
    const arrayBigIntMinSchema = schema().array(schema().bigInt().min({ min: 2n }));

    type ArrayBigIntMinSchemaIn = InferIn<typeof arrayBigIntMinSchema>;
    type ArrayBigIntMinSchemaOut = InferOut<typeof arrayBigIntMinSchema>;

    type ArrayBigIntCheckIn = CheckType<ArrayBigIntMinSchemaIn, bigint[]>;
    type ArrayBigIntCheckOut = CheckType<ArrayBigIntMinSchemaOut, bigint[]>;

    const checkIn: ArrayBigIntCheckIn = true;
    const checkOut: ArrayBigIntCheckOut = true;
  });

  it("should accept an array of positive bigints", () => {
    const arrayBigIntPositiveSchema = schema().array(schema().bigInt().positive());

    type ArrayBigIntPositiveSchemaIn = InferIn<typeof arrayBigIntPositiveSchema>;
    type ArrayBigIntPositiveSchemaOut = InferOut<typeof arrayBigIntPositiveSchema>;

    type ArrayBigIntCheckIn = CheckType<ArrayBigIntPositiveSchemaIn, bigint[]>;
    type ArrayBigIntCheckOut = CheckType<ArrayBigIntPositiveSchemaOut, bigint[]>;

    const checkIn: ArrayBigIntCheckIn = true;
    const checkOut: ArrayBigIntCheckOut = true;
  });

  it("should accept an array of negative bigints", () => {
    const arrayBigIntNegativeSchema = schema().array(schema().bigInt().negative());

    type ArrayBigIntNegativeSchemaIn = InferIn<typeof arrayBigIntNegativeSchema>;
    type ArrayBigIntNegativeSchemaOut = InferOut<typeof arrayBigIntNegativeSchema>;

    type ArrayBigIntCheckIn = CheckType<ArrayBigIntNegativeSchemaIn, bigint[]>;
    type ArrayBigIntCheckOut = CheckType<ArrayBigIntNegativeSchemaOut, bigint[]>;

    const checkIn: ArrayBigIntCheckIn = true;
    const checkOut: ArrayBigIntCheckOut = true;
  });

  it("should accept an array of bigints with an alias", () => {
    const arrayBigIntAliasSchema = schema().array(schema().bigInt().alias("value name"));

    type ArrayBigIntAliasSchemaIn = InferIn<typeof arrayBigIntAliasSchema>;
    type ArrayBigIntAliasSchemaOut = InferOut<typeof arrayBigIntAliasSchema>;

    type ArrayBigIntCheckIn = CheckType<ArrayBigIntAliasSchemaIn, bigint[]>;
    type ArrayBigIntCheckOut = CheckType<ArrayBigIntAliasSchemaOut, bigint[]>;

    const checkIn: ArrayBigIntCheckIn = true;
    const checkOut: ArrayBigIntCheckOut = true;
  });

  it("should accept an array of bigints with a default value", () => {
    const arrayBigIntDefaultSchema = schema().array(schema().bigInt()).default([123n]);

    type ArrayBigIntDefaultSchemaIn = InferIn<typeof arrayBigIntDefaultSchema>;
    type ArrayBigIntDefaultSchemaOut = InferOut<typeof arrayBigIntDefaultSchema>;

    type ArrayBigIntCheckIn = CheckType<ArrayBigIntDefaultSchemaIn, bigint[] | undefined>;
    type ArrayBigIntCheckOut = CheckType<ArrayBigIntDefaultSchemaOut, bigint[]>;

    const checkIn: ArrayBigIntCheckIn = true;
    const checkOut: ArrayBigIntCheckOut = true;
  });

  it("should accept an array of bigints that can contain null", () => {
    const arrayBigIntNullableSchema = schema().array(schema().bigInt().nullable());

    type ArrayBigIntNullableSchemaIn = InferIn<typeof arrayBigIntNullableSchema>;
    type ArrayBigIntNullableSchemaOut = InferOut<typeof arrayBigIntNullableSchema>;

    type ArrayBigIntCheckIn = CheckType<ArrayBigIntNullableSchemaIn, (bigint | null)[]>;
    type ArrayBigIntCheckOut = CheckType<ArrayBigIntNullableSchemaOut, (bigint | null)[]>;

    const checkIn: ArrayBigIntCheckIn = true;
    const checkOut: ArrayBigIntCheckOut = true;
  });

  it("should accept an array of bigints that can contain null or undefined", () => {
    const arrayBigIntNullableSchema = schema().array(schema().bigInt().nullable().notRequired());

    type ArrayBigIntNullableSchemaIn = InferIn<typeof arrayBigIntNullableSchema>;
    type ArrayBigIntNullableSchemaOut = InferOut<typeof arrayBigIntNullableSchema>;

    type ArrayBigIntCheckIn = CheckType<ArrayBigIntNullableSchemaIn, (bigint | null | undefined)[]>;
    type ArrayBigIntCheckOut = CheckType<ArrayBigIntNullableSchemaOut, (bigint | null | undefined)[]>;

    const checkIn: ArrayBigIntCheckIn = true;
    const checkOut: ArrayBigIntCheckOut = true;
  });
});
