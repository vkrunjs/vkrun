import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Array Method Types - Any", () => {
  it("should allow an array of any", () => {
    const arrayAnySchema = schema().array(schema().any());

    type ArrayAnySchemaIn = InferIn<typeof arrayAnySchema>;
    type ArrayAnySchemaOut = InferOut<typeof arrayAnySchema>;

    type ArrayAnyCheckIn = CheckType<ArrayAnySchemaIn, any[]>;
    type ArrayAnyCheckOut = CheckType<ArrayAnySchemaOut, any[]>;

    const checkIn: ArrayAnyCheckIn = true;
    const checkOut: ArrayAnyCheckOut = true;
  });

  it("should allow an array of any with an alias", () => {
    const arrayAnyAliasSchema = schema().array(schema().any().alias("value name"));

    type ArrayAnyAliasSchemaIn = InferIn<typeof arrayAnyAliasSchema>;
    type ArrayAnyAliasSchemaOut = InferOut<typeof arrayAnyAliasSchema>;

    type ArrayAnyCheckIn = CheckType<ArrayAnyAliasSchemaIn, any[]>;
    type ArrayAnyCheckOut = CheckType<ArrayAnyAliasSchemaOut, any[]>;

    const checkIn: ArrayAnyCheckIn = true;
    const checkOut: ArrayAnyCheckOut = true;
  });

  it("should allow an array of strings with a default value", () => {
    const arrayAnyDefaultSchema = schema().array(schema().any()).default(["string"]);

    type ArrayAnyDefaultSchemaIn = InferIn<typeof arrayAnyDefaultSchema>;
    type ArrayAnyDefaultSchemaOut = InferOut<typeof arrayAnyDefaultSchema>;

    type ArrayAnyCheckIn = CheckType<ArrayAnyDefaultSchemaIn, any[] | undefined>;
    type ArrayAnyCheckOut = CheckType<ArrayAnyDefaultSchemaOut, any[]>;

    const checkIn: ArrayAnyCheckIn = true;
    const checkOut: ArrayAnyCheckOut = true;
  });
});
