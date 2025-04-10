import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Alias Method Types", () => {
  it("should infer a buffer", () => {
    const bufferSchema = schema().buffer().alias("value name");
    const value = bufferSchema.test("").value;

    type BufferSchemaIn = InferIn<typeof bufferSchema>;
    type BufferSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferSchemaIn, Buffer>;
    type BufferSchemaCheckOut = CheckType<BufferSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null", () => {
    const bufferSchema = schema().buffer().alias("value name").nullable();
    const value = bufferSchema.test("").value;

    type BufferNullableSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableSchemaIn, Buffer | null>;
    type BufferSchemaCheckOut = CheckType<BufferNullableSchemaOut, Buffer | null>;
    type CheckValue = CheckType<typeof value, Buffer | null>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null, or undefined", () => {
    const bufferSchema = schema().buffer().alias("value name").nullable().notRequired();
    const value = bufferSchema.test("").value;

    type BufferNullableUndefinedSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableUndefinedSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableUndefinedSchemaIn, Buffer | null | undefined>;
    type BufferSchemaCheckOut = CheckType<BufferNullableUndefinedSchemaOut, Buffer | null | undefined>;
    type CheckValue = CheckType<typeof value, Buffer | null | undefined>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
