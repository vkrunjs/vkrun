import { safeSerialize } from "../safe-serialize";

describe("safeSerialize", () => {
  it("should serialize primitive values correctly", () => {
    expect(safeSerialize("text")).toBe("text");
    expect(safeSerialize(42)).toBe(42);
    expect(safeSerialize(true)).toBe(true);
    expect(safeSerialize(null)).toBeNull();
  });

  it("should handle functions and symbols", () => {
    const input = {
      a: "value",
      b: () => {},
      c: Symbol("sym"),
    };

    const result = safeSerialize(input);

    expect(result).toEqual({
      a: "value",
      b: "Function [Unserializable]",
      c: "Symbol [Unserializable]",
    });
  });

  it("should serialize arrays with mixed content", () => {
    const arr = ["text", 123, () => {}, Symbol("sym")];
    const result = safeSerialize(arr);

    expect(result).toEqual(["text", 123, "Function [Unserializable]", "Symbol [Unserializable]"]);
  });

  it("should serialize Date, RegExp, Buffer, and BigInt properly", () => {
    const date = new Date("2020-01-01T00:00:00Z");
    const regexp = /abc/g;
    const buffer = Buffer.from("hello");
    const bigInt = BigInt(9007199254740991);

    const input = {
      date,
      regexp,
      buffer,
      bigInt,
    };

    const result = safeSerialize(input);

    expect(result).toEqual({
      date: date.toString(),
      regexp: regexp.toString(),
      buffer: `[Buffer: ${buffer.length} bytes]`,
      bigInt: "BigInt [Unserializable]",
    });
  });

  it("should handle circular references gracefully", () => {
    const input: any = { name: "circular" };
    input.self = input;

    const result = safeSerialize(input);

    expect(result).toEqual({
      name: "circular",
      self: "Circular [Unserializable]",
    });
  });

  it("should serialize Error objects with all properties", () => {
    const error = new Error("Something went wrong");
    (error as any).customProp = 123;

    const result = safeSerialize(error);

    expect(result).toMatchObject({
      message: "Something went wrong",
      stack: expect.any(String),
      customProp: 123,
    });
  });

  it("should serialize custom Error subclasses with all properties", () => {
    class CustomError extends Error {
      statusCode: number;
      details: string;

      constructor(message: string, statusCode: number, details: string) {
        super(message);
        this.name = "CustomError";
        this.statusCode = statusCode;
        this.details = details;
      }
    }

    const error = new CustomError("Not Found", 404, "Resource does not exist");

    const result = safeSerialize(error);

    expect(result).toMatchObject({
      message: "Not Found",
      name: "CustomError",
      stack: expect.any(String),
      statusCode: 404,
      details: "Resource does not exist",
    });
  });
});
