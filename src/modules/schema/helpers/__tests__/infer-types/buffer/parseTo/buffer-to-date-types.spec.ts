import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Buffer ParseTo Date Types", () => {
  it("should infer a buffer to Date", () => {
    const bufferSchema = schema().buffer().parseTo().date();
    const value = bufferSchema.test(Buffer.from("content")).value;

    type BufferSchemaIn = InferIn<typeof bufferSchema>;
    type BufferSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferSchemaIn, Buffer>;
    type BufferSchemaCheckOut = CheckType<BufferSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to Date", () => {
    const bufferSchema = schema().buffer().nullable().parseTo().date();
    const value = bufferSchema.test(Buffer.from("content")).value;

    type BufferNullableSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableSchemaIn, Buffer | null>;
    type BufferSchemaCheckOut = CheckType<BufferNullableSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null, or undefined to Date", () => {
    const bufferSchema = schema().buffer().nullable().notRequired().parseTo().date();
    const value = bufferSchema.test(Buffer.from("content")).value;

    type BufferNullableUndefinedSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableUndefinedSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableUndefinedSchemaIn, Buffer | null | undefined>;
    type BufferSchemaCheckOut = CheckType<BufferNullableUndefinedSchemaOut, Date>;
    type CheckValue = CheckType<typeof value, Date>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
