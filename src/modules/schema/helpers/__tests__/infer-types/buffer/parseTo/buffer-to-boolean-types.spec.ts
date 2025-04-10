import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Buffer ParseTo Boolean Types", () => {
  it("should infer a buffer to boolean", () => {
    const bufferSchema = schema().buffer().parseTo().boolean();
    const value = bufferSchema.test("").value;

    type BufferSchemaIn = InferIn<typeof bufferSchema>;
    type BufferSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferSchemaIn, Buffer>;
    type BufferSchemaCheckOut = CheckType<BufferSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to boolean", () => {
    const bufferSchema = schema().buffer().nullable().parseTo().boolean();
    const value = bufferSchema.test("").value;

    type BufferNullableSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableSchemaIn, Buffer | null>;
    type BufferSchemaCheckOut = CheckType<BufferNullableSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null, or undefined to boolean", () => {
    const bufferSchema = schema().buffer().nullable().notRequired().parseTo().boolean();
    const value = bufferSchema.test("").value;

    type BufferNullableUndefinedSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableUndefinedSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableUndefinedSchemaIn, Buffer | null | undefined>;
    type BufferSchemaCheckOut = CheckType<BufferNullableUndefinedSchemaOut, boolean>;
    type CheckValue = CheckType<typeof value, boolean>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
