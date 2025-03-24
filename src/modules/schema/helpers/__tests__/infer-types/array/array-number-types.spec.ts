import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Array Method Types - Numbers", () => {
  it("should accept an array of numbers", () => {
    const arrayNumberSchema = schema().array(schema().number());

    type ArrayNumberSchemaIn = InferIn<typeof arrayNumberSchema>;
    type ArrayNumberSchemaOut = InferOut<typeof arrayNumberSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberSchemaIn, number[]>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberSchemaOut, number[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });

  it("should accept an array of numbers with a maximum of 3", () => {
    const arrayNumberMaxSchema = schema().array(schema().number().max({ max: 3 }));

    type ArrayNumberMaxSchemaIn = InferIn<typeof arrayNumberMaxSchema>;
    type ArrayNumberMaxSchemaOut = InferOut<typeof arrayNumberMaxSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberMaxSchemaIn, number[]>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberMaxSchemaOut, number[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });

  it("should accept an array of numbers with a minimum of 2", () => {
    const arrayNumberMinSchema = schema().array(schema().number().min({ min: 2 }));

    type ArrayNumberMinSchemaIn = InferIn<typeof arrayNumberMinSchema>;
    type ArrayNumberMinSchemaOut = InferOut<typeof arrayNumberMinSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberMinSchemaIn, number[]>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberMinSchemaOut, number[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });

  it("should accept an array of float numbers", () => {
    const arrayNumberFloatSchema = schema().array(schema().number().float());

    type ArrayNumberFloatSchemaIn = InferIn<typeof arrayNumberFloatSchema>;
    type ArrayNumberFloatSchemaOut = InferOut<typeof arrayNumberFloatSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberFloatSchemaIn, number[]>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberFloatSchemaOut, number[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });

  it("should accept an array of integer numbers", () => {
    const arrayNumberIntSchema = schema().array(schema().number().integer());

    type ArrayNumberIntSchemaIn = InferIn<typeof arrayNumberIntSchema>;
    type ArrayNumberIntSchemaOut = InferOut<typeof arrayNumberIntSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberIntSchemaIn, number[]>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberIntSchemaOut, number[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });

  it("should accept an array of positive numbers", () => {
    const arrayNumberPositiveSchema = schema().array(schema().number().positive());

    type ArrayNumberPositiveSchemaIn = InferIn<typeof arrayNumberPositiveSchema>;
    type ArrayNumberPositiveSchemaOut = InferOut<typeof arrayNumberPositiveSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberPositiveSchemaIn, number[]>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberPositiveSchemaOut, number[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });

  it("should accept an array of negative numbers", () => {
    const arrayNumberNegativeSchema = schema().array(schema().number().negative());

    type ArrayNumberNegativeSchemaIn = InferIn<typeof arrayNumberNegativeSchema>;
    type ArrayNumberNegativeSchemaOut = InferOut<typeof arrayNumberNegativeSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberNegativeSchemaIn, number[]>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberNegativeSchemaOut, number[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });

  it("should accept an array of numbers with an alias", () => {
    const arrayNumberAliasSchema = schema().array(schema().number().alias("value name"));

    type ArrayNumberAliasSchemaIn = InferIn<typeof arrayNumberAliasSchema>;
    type ArrayNumberAliasSchemaOut = InferOut<typeof arrayNumberAliasSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberAliasSchemaIn, number[]>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberAliasSchemaOut, number[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });

  it("should accept an array of numbers with a default value", () => {
    const arrayNumberDefaultSchema = schema().array(schema().number()).default([123]);

    type ArrayNumberDefaultSchemaIn = InferIn<typeof arrayNumberDefaultSchema>;
    type ArrayNumberDefaultSchemaOut = InferOut<typeof arrayNumberDefaultSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberDefaultSchemaIn, number[] | undefined>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberDefaultSchemaOut, number[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });

  it("should accept an array of numbers that can contain null", () => {
    const arrayNumberNullableSchema = schema().array(schema().number().nullable());

    type ArrayNumberNullableSchemaIn = InferIn<typeof arrayNumberNullableSchema>;
    type ArrayNumberNullableSchemaOut = InferOut<typeof arrayNumberNullableSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberNullableSchemaIn, (number | null)[]>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberNullableSchemaOut, (number | null)[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });

  it("should accept an array of numbers that can contain null or undefined", () => {
    const arrayNumberNullableSchema = schema().array(schema().number().nullable().notRequired());

    type ArrayNumberNullableSchemaIn = InferIn<typeof arrayNumberNullableSchema>;
    type ArrayNumberNullableSchemaOut = InferOut<typeof arrayNumberNullableSchema>;

    type ArrayNumberCheckIn = CheckType<ArrayNumberNullableSchemaIn, (number | null | undefined)[]>;
    type ArrayNumberCheckOut = CheckType<ArrayNumberNullableSchemaOut, (number | null | undefined)[]>;

    const checkIn: ArrayNumberCheckIn = true;
    const checkOut: ArrayNumberCheckOut = true;
  });
});
