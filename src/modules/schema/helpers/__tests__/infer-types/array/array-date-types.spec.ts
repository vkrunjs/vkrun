import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Array Method Types - Strings", () => {
  it("should allow an array of dates", () => {
    const arrayStringSchema = schema().array(schema().date());

    type ArrayStringSchemaIn = InferIn<typeof arrayStringSchema>;
    type ArrayStringSchemaOut = InferOut<typeof arrayStringSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringSchemaIn, Date[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringSchemaOut, Date[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should accept an array of dates with a maximum date", () => {
    const arrayDateMaxSchema = schema().array(schema().date().max({ max: new Date() }));

    type ArrayDateMaxSchemaIn = InferIn<typeof arrayDateMaxSchema>;
    type ArrayDateMaxSchemaOut = InferOut<typeof arrayDateMaxSchema>;

    type ArrayDateCheckIn = CheckType<ArrayDateMaxSchemaIn, Date[]>;
    type ArrayDateCheckOut = CheckType<ArrayDateMaxSchemaOut, Date[]>;

    const checkIn: ArrayDateCheckIn = true;
    const checkOut: ArrayDateCheckOut = true;
  });

  it("should accept an array of dates with a minimum date", () => {
    const arrayDateMinSchema = schema().array(schema().date().min({ min: new Date() }));

    type ArrayDateMinSchemaIn = InferIn<typeof arrayDateMinSchema>;
    type ArrayDateMinSchemaOut = InferOut<typeof arrayDateMinSchema>;

    type ArrayDateCheckIn = CheckType<ArrayDateMinSchemaIn, Date[]>;
    type ArrayDateCheckOut = CheckType<ArrayDateMinSchemaOut, Date[]>;

    const checkIn: ArrayDateCheckIn = true;
    const checkOut: ArrayDateCheckOut = true;
  });

  it("should allow an array of dates with an alias", () => {
    const arrayStringAliasSchema = schema().array(schema().date().alias("value name"));

    type ArrayStringAliasSchemaIn = InferIn<typeof arrayStringAliasSchema>;
    type ArrayStringAliasSchemaOut = InferOut<typeof arrayStringAliasSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringAliasSchemaIn, Date[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringAliasSchemaOut, Date[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of dates with a default value", () => {
    const arrayStringDefaultSchema = schema().array(schema().date()).default([new Date()]);

    type ArrayStringDefaultSchemaIn = InferIn<typeof arrayStringDefaultSchema>;
    type ArrayStringDefaultSchemaOut = InferOut<typeof arrayStringDefaultSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringDefaultSchemaIn, Date[] | undefined>;
    type ArrayStringCheckOut = CheckType<ArrayStringDefaultSchemaOut, Date[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of dates with a date | null", () => {
    const arrayStringNullableSchema = schema().array(schema().date().nullable());

    type ArrayStringNullableSchemaIn = InferIn<typeof arrayStringNullableSchema>;
    type ArrayStringNullableSchemaOut = InferOut<typeof arrayStringNullableSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringNullableSchemaIn, (Date | null)[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringNullableSchemaOut, (Date | null)[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of dates with a date | null | undefined", () => {
    const arrayStringNullableSchema = schema().array(schema().date().nullable().notRequired());

    type ArrayStringNullableSchemaIn = InferIn<typeof arrayStringNullableSchema>;
    type ArrayStringNullableSchemaOut = InferOut<typeof arrayStringNullableSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringNullableSchemaIn, (Date | null | undefined)[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringNullableSchemaOut, (Date | null | undefined)[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });
});
