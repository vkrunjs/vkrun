import { describe, expect, it } from "../../../..";

describe("Expect toThrow Method - Failure Cases", () => {
  it("should fail when a function throws an error with a different message", () => {
    const throwTypeError = () => {
      throw new TypeError("Invalid type");
    };
    expect(throwTypeError).toThrow("Different error message");
  });

  it("should fail when a function throws an error with a different Error", () => {
    class ErrorA extends Error {
      constructor(message?: string) {
        super(message);
        this.name = "ErrorA";
      }
    }

    class ErrorB extends Error {
      constructor(message?: string) {
        super(message);
        this.name = "ErrorB";
      }
    }

    const throwTypeError = () => {
      throw new ErrorA("This is ErrorA");
    };

    expect(throwTypeError).toThrow(ErrorB);
  });

  it("should fail when a function throws an error with a different Error message", () => {
    class ErrorA extends Error {
      constructor(message?: string) {
        super(message);
        this.name = "ErrorA";
      }
    }

    const throwTypeError = () => {
      throw new ErrorA("This is ErrorA");
    };

    expect(throwTypeError).toThrow(new ErrorA("This is ErrorB"));
  });

  it("should fail when a function does not throw any error", () => {
    const noThrow = () => {};
    expect(noThrow).toThrow();
  });

  it("should fail when a function throws an error with a non-matching regex", () => {
    const throwRegexError = () => {
      throw new Error("File not found");
    };
    expect(throwRegexError).toThrow(/file/);
  });

  it("should fail when a function does not throw an error when invalid arguments are passed", () => {
    const throwInvalidArg = (arg: string) => {
      if (arg !== "valid") {
        throw new Error("Invalid argument");
      }
    };
    expect(() => throwInvalidArg("valid")).toThrow("Invalid argument");
    expect(() => throwInvalidArg("invalid")).toThrow();
  });

  it("should fail when an async function does not throw an error", async () => {
    const asyncThrowError = async () => {
      return "No error";
    };
    expect(asyncThrowError()).toThrow("Async error");
  });
});
