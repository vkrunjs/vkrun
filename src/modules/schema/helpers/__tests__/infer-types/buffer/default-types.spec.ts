import { CheckType, InferIn, InferOut, schema } from "../../../../../../index";

describe("Validator Default Method Types", () => {
  it("should infer a buffer", () => {
    const bufferSchema = schema().buffer().default(Buffer.from("content"));
    const value = bufferSchema.test(undefined as any).value;

    type BufferSchemaIn = InferIn<typeof bufferSchema>;
    type BufferSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferSchemaIn, Buffer | undefined>;
    type BufferSchemaCheckOut = CheckType<BufferSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null", () => {
    const bufferSchema = schema().buffer().default(Buffer.from("content")).nullable();
    const value = bufferSchema.test(undefined as any).value;

    type BufferNullableSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableSchemaIn, Buffer | undefined | null>;
    type BufferSchemaCheckOut = CheckType<BufferNullableSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null, or undefined", () => {
    const bufferSchema = schema().buffer().nullable().default(Buffer.from("content"));
    const value = bufferSchema.test(undefined as any).value;

    type BufferNullableUndefinedSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableUndefinedSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableUndefinedSchemaIn, Buffer | null | undefined>;
    type BufferSchemaCheckOut = CheckType<BufferNullableUndefinedSchemaOut, Buffer>;
    type CheckValue = CheckType<typeof value, Buffer>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
