import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Buffer ParseTo Buffer Types", () => {
  it("should infer a buffer to Buffer", () => {
    const bufferSchema = schema().buffer().parseTo().string();
    const value = bufferSchema.test(Buffer.from("content")).value;

    type BufferSchemaIn = InferIn<typeof bufferSchema>;
    type BufferSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferSchemaIn, Buffer>;
    type BufferSchemaCheckOut = CheckType<BufferSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to Buffer", () => {
    const bufferSchema = schema().buffer().nullable().parseTo().string();
    const value = bufferSchema.test(Buffer.from("content")).value;

    type BufferNullableSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableSchemaIn, Buffer | null>;
    type BufferSchemaCheckOut = CheckType<BufferNullableSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null, or undefined to Buffer", () => {
    const bufferSchema = schema().buffer().nullable().notRequired().parseTo().string();
    const value = bufferSchema.test(Buffer.from("content")).value;

    type BufferNullableUndefinedSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableUndefinedSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableUndefinedSchemaIn, Buffer | null | undefined>;
    type BufferSchemaCheckOut = CheckType<BufferNullableUndefinedSchemaOut, string>;
    type CheckValue = CheckType<typeof value, string>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
