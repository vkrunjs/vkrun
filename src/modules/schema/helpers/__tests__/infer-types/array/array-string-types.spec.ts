import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Array Method Types - Strings", () => {
  it("should allow an array of strings", () => {
    const arrayStringSchema = schema().array(schema().string());

    type ArrayStringSchemaIn = InferIn<typeof arrayStringSchema>;
    type ArrayStringSchemaOut = InferOut<typeof arrayStringSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringSchemaIn, string[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringSchemaOut, string[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of strings with a maximum length", () => {
    const arrayStringMaxLengthSchema = schema().array(schema().string().maxLength({ max: 3 }));

    type ArrayStringMaxLengthSchemaIn = InferIn<typeof arrayStringMaxLengthSchema>;
    type ArrayStringMaxLengthSchemaOut = InferOut<typeof arrayStringMaxLengthSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringMaxLengthSchemaIn, string[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringMaxLengthSchemaOut, string[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of strings with a minimum word count", () => {
    const arrayStringMinWordSchema = schema().array(schema().string().minWord({ min: 3 }));

    type ArrayStringMinWordSchemaIn = InferIn<typeof arrayStringMinWordSchema>;
    type ArrayStringMinWordSchemaOut = InferOut<typeof arrayStringMinWordSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringMinWordSchemaIn, string[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringMinWordSchemaOut, string[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of strings formatted as UUIDs", () => {
    const arrayStringUUIDSchema = schema().array(schema().string().UUID());

    type ArrayStringUUIDSchemaIn = InferIn<typeof arrayStringUUIDSchema>;
    type ArrayStringUUIDSchemaOut = InferOut<typeof arrayStringUUIDSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringUUIDSchemaIn, string[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringUUIDSchemaOut, string[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of strings formatted as time", () => {
    const arrayStringTimeSchema = schema().array(schema().string().time({ type: "HH:MM" }));

    type ArrayStringTimeSchemaIn = InferIn<typeof arrayStringTimeSchema>;
    type ArrayStringTimeSchemaOut = InferOut<typeof arrayStringTimeSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringTimeSchemaIn, string[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringTimeSchemaOut, string[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of strings formatted as email", () => {
    const arrayStringEmailSchema = schema().array(schema().string().email());

    type ArrayStringEmailSchemaIn = InferIn<typeof arrayStringEmailSchema>;
    type ArrayStringEmailSchemaOut = InferOut<typeof arrayStringEmailSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringEmailSchemaIn, string[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringEmailSchemaOut, string[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of strings matching a regex pattern", () => {
    const arrayStringRegexSchema = schema().array(
      schema()
        .string()
        .regex({ regExp: /^[a-zA-Z]+$/ }),
    );

    type ArrayStringRegexSchemaIn = InferIn<typeof arrayStringRegexSchema>;
    type ArrayStringRegexSchemaOut = InferOut<typeof arrayStringRegexSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringRegexSchemaIn, string[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringRegexSchemaOut, string[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of strings with an alias", () => {
    const arrayStringAliasSchema = schema().array(schema().string().alias("value name"));

    type ArrayStringAliasSchemaIn = InferIn<typeof arrayStringAliasSchema>;
    type ArrayStringAliasSchemaOut = InferOut<typeof arrayStringAliasSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringAliasSchemaIn, string[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringAliasSchemaOut, string[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of strings with a default value", () => {
    const arrayStringDefaultSchema = schema().array(schema().string()).default(["string"]);

    type ArrayStringDefaultSchemaIn = InferIn<typeof arrayStringDefaultSchema>;
    type ArrayStringDefaultSchemaOut = InferOut<typeof arrayStringDefaultSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringDefaultSchemaIn, string[] | undefined>;
    type ArrayStringCheckOut = CheckType<ArrayStringDefaultSchemaOut, string[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of strings with a string | null", () => {
    const arrayStringNullableSchema = schema().array(schema().string().nullable());

    type ArrayStringNullableSchemaIn = InferIn<typeof arrayStringNullableSchema>;
    type ArrayStringNullableSchemaOut = InferOut<typeof arrayStringNullableSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringNullableSchemaIn, (string | null)[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringNullableSchemaOut, (string | null)[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });

  it("should allow an array of strings with a string | null | undefined", () => {
    const arrayStringNullableSchema = schema().array(schema().string().nullable().notRequired());

    type ArrayStringNullableSchemaIn = InferIn<typeof arrayStringNullableSchema>;
    type ArrayStringNullableSchemaOut = InferOut<typeof arrayStringNullableSchema>;

    type ArrayStringCheckIn = CheckType<ArrayStringNullableSchemaIn, (string | null | undefined)[]>;
    type ArrayStringCheckOut = CheckType<ArrayStringNullableSchemaOut, (string | null | undefined)[]>;

    const checkIn: ArrayStringCheckIn = true;
    const checkOut: ArrayStringCheckOut = true;
  });
});
