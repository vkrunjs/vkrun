import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator Buffer ParseTo BigInt Types", () => {
  it("should infer a buffer to bigint", () => {
    const bufferSchema = schema().buffer().parseTo().bigInt();
    const value = bufferSchema.test("").value;

    type BufferSchemaIn = InferIn<typeof bufferSchema>;
    type BufferSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferSchemaIn, Buffer>;
    type BufferSchemaCheckOut = CheckType<BufferSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to bigint", () => {
    const bufferSchema = schema().buffer().nullable().parseTo().bigInt();
    const value = bufferSchema.test("").value;

    type BufferNullableSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableSchemaIn, Buffer | null>;
    type BufferSchemaCheckOut = CheckType<BufferNullableSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null, or undefined to bigint", () => {
    const bufferSchema = schema().buffer().nullable().notRequired().parseTo().bigInt();
    const value = bufferSchema.test("").value;

    type BufferNullableUndefinedSchemaIn = InferIn<typeof bufferSchema>;
    type BufferNullableUndefinedSchemaOut = InferOut<typeof bufferSchema>;

    type BufferSchemaCheckIn = CheckType<BufferNullableUndefinedSchemaIn, Buffer | null | undefined>;
    type BufferSchemaCheckOut = CheckType<BufferNullableUndefinedSchemaOut, bigint>;
    type CheckValue = CheckType<typeof value, bigint>;

    const checkIn: BufferSchemaCheckIn = true;
    const checkOut: BufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
