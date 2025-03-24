import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Array Method Types - Buffers", () => {
  it("should accept an array of Buffers", () => {
    const arrayBufferSchema = schema().array(schema().buffer());

    type ArrayBufferSchemaIn = InferIn<typeof arrayBufferSchema>;
    type ArrayBufferSchemaOut = InferOut<typeof arrayBufferSchema>;

    type ArrayBufferCheckIn = CheckType<ArrayBufferSchemaIn, Buffer[]>;
    type ArrayBufferCheckOut = CheckType<ArrayBufferSchemaOut, Buffer[]>;

    const checkIn: ArrayBufferCheckIn = true;
    const checkOut: ArrayBufferCheckOut = true;
  });

  it("should accept an array of Buffers with an alias", () => {
    const arrayBufferAliasSchema = schema().array(schema().buffer().alias("value name"));

    type ArrayBufferAliasSchemaIn = InferIn<typeof arrayBufferAliasSchema>;
    type ArrayBufferAliasSchemaOut = InferOut<typeof arrayBufferAliasSchema>;

    type ArrayBufferCheckIn = CheckType<ArrayBufferAliasSchemaIn, Buffer[]>;
    type ArrayBufferCheckOut = CheckType<ArrayBufferAliasSchemaOut, Buffer[]>;

    const checkIn: ArrayBufferCheckIn = true;
    const checkOut: ArrayBufferCheckOut = true;
  });

  it("should accept an array of Buffers with a default value", () => {
    const arrayBufferDefaultSchema = schema()
      .array(schema().buffer())
      .default([Buffer.from("content")]);

    type ArrayBufferDefaultSchemaIn = InferIn<typeof arrayBufferDefaultSchema>;
    type ArrayBufferDefaultSchemaOut = InferOut<typeof arrayBufferDefaultSchema>;

    type ArrayBufferCheckIn = CheckType<ArrayBufferDefaultSchemaIn, Buffer[] | undefined>;
    type ArrayBufferCheckOut = CheckType<ArrayBufferDefaultSchemaOut, Buffer[]>;

    const checkIn: ArrayBufferCheckIn = true;
    const checkOut: ArrayBufferCheckOut = true;
  });

  it("should accept an array of Buffers that can contain null", () => {
    const arrayBufferNullableSchema = schema().array(schema().buffer().nullable());

    type ArrayBufferNullableSchemaIn = InferIn<typeof arrayBufferNullableSchema>;
    type ArrayBufferNullableSchemaOut = InferOut<typeof arrayBufferNullableSchema>;

    type ArrayBufferCheckIn = CheckType<ArrayBufferNullableSchemaIn, (Buffer | null)[]>;
    type ArrayBufferCheckOut = CheckType<ArrayBufferNullableSchemaOut, (Buffer | null)[]>;

    const checkIn: ArrayBufferCheckIn = true;
    const checkOut: ArrayBufferCheckOut = true;
  });

  it("should accept an array of Buffers that can contain null or undefined", () => {
    const arrayBufferNullableSchema = schema().array(schema().buffer().nullable().notRequired());

    type ArrayBufferNullableSchemaIn = InferIn<typeof arrayBufferNullableSchema>;
    type ArrayBufferNullableSchemaOut = InferOut<typeof arrayBufferNullableSchema>;

    type ArrayBufferCheckIn = CheckType<ArrayBufferNullableSchemaIn, (Buffer | null | undefined)[]>;
    type ArrayBufferCheckOut = CheckType<ArrayBufferNullableSchemaOut, (Buffer | null | undefined)[]>;

    const checkIn: ArrayBufferCheckIn = true;
    const checkOut: ArrayBufferCheckOut = true;
  });
});
