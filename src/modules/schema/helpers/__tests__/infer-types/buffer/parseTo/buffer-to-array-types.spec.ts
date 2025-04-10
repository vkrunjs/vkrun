import { CheckType, InferIn, InferOut, schema } from "../../../../../../../index";

describe("Validator buffer ParseTo Array Types", () => {
  it("should infer a string to array", () => {
    const bufferSchema = schema()
      .buffer()
      .parseTo()
      .array(
        schema().object({
          key: schema().string(),
        }),
      );
    const value = bufferSchema.test(Buffer.from("content")).value;

    type bufferSchemaIn = InferIn<typeof bufferSchema>;
    type bufferSchemaOut = InferOut<typeof bufferSchema>;
    type CheckValue = CheckType<
      typeof value,
      {
        key: string;
      }[]
    >;

    type bufferSchemaCheckIn = CheckType<bufferSchemaIn, Buffer>;
    type bufferSchemaCheckOut = CheckType<
      bufferSchemaOut,
      {
        key: string;
      }[]
    >;

    const checkIn: bufferSchemaCheckIn = true;
    const checkOut: bufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer or null to array", () => {
    const bufferSchema = schema()
      .buffer()
      .nullable()
      .parseTo()
      .array(
        schema().object({
          key: schema().string(),
        }),
      );
    const value = bufferSchema.test(Buffer.from("content")).value;

    type bufferNullableSchemaIn = InferIn<typeof bufferSchema>;
    type bufferNullableSchemaOut = InferOut<typeof bufferSchema>;
    type CheckValue = CheckType<
      typeof value,
      {
        key: string;
      }[]
    >;

    type bufferSchemaCheckIn = CheckType<bufferNullableSchemaIn, Buffer | null>;
    type bufferSchemaCheckOut = CheckType<
      bufferNullableSchemaOut,
      {
        key: string;
      }[]
    >;

    const checkIn: bufferSchemaCheckIn = true;
    const checkOut: bufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });

  it("should infer a buffer, null, or undefined to array", () => {
    const bufferSchema = schema()
      .buffer()
      .nullable()
      .notRequired()
      .parseTo()
      .array(
        schema().object({
          key: schema().string(),
        }),
      );
    const value = bufferSchema.test(Buffer.from("content")).value;

    type bufferNullableUndefinedSchemaIn = InferIn<typeof bufferSchema>;
    type bufferNullableUndefinedSchemaOut = InferOut<typeof bufferSchema>;
    type CheckValue = CheckType<
      typeof value,
      {
        key: string;
      }[]
    >;

    type bufferSchemaCheckIn = CheckType<bufferNullableUndefinedSchemaIn, Buffer | null | undefined>;
    type bufferSchemaCheckOut = CheckType<
      bufferNullableUndefinedSchemaOut,
      {
        key: string;
      }[]
    >;

    const checkIn: bufferSchemaCheckIn = true;
    const checkOut: bufferSchemaCheckOut = true;
    const checkValue: CheckValue = true;
  });
});
