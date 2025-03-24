import { describe, expect, it } from "../../../../..";

describe("Expect not.toThrow Method - Failure Cases", () => {
  it("should fail when a function does not throw an error", () => {
    const throwTypeError = () => {
      throw new TypeError("Invalid type");
    };
    expect(throwTypeError).not.toThrow();
  });

  it("should fail when a function throws an error but not the expected message", () => {
    const throwError = () => {
      throw new Error("Correct error message");
    };
    expect(throwError).not.toThrow("Correct error message");
  });

  it("should fail when a function throws an error with a different Error", () => {
    class ErrorA extends Error {
      constructor(message?: string) {
        super(message);
        this.name = "ErrorA";
      }
    }

    const throwTypeError = () => {
      throw new ErrorA("This is ErrorA");
    };

    expect(throwTypeError).not.toThrow(ErrorA);
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

    expect(throwTypeError).not.toThrow(new ErrorA("This is ErrorA"));
  });

  it("should fail when a function throws an error that matches the regex", () => {
    const throwRegexError = () => {
      throw new Error("File not found");
    };
    expect(throwRegexError).not.toThrow(/found/);
  });

  it("should fail when a function correctly throws an expected error", () => {
    const throwInvalidArg = (arg: string) => {
      if (arg !== "valid") {
        throw new Error("Invalid argument");
      }
    };
    expect(() => throwInvalidArg("invalid")).not.toThrow();
  });

  it("should fail when an async function correctly throws an expected error", () => {
    const asyncThrowError = async () => {
      throw new Error("Async error");
    };
    expect(asyncThrowError()).not.toThrow("Async error");
  });
});
