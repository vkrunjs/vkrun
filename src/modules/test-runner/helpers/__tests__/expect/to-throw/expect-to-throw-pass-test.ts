import { describe, expect, it } from "../../../..";

describe("Expect toThrow Method - Success Cases", () => {
  it("should pass when a function throws the correct error", () => {
    const throwError = () => {
      throw new Error("This is an error");
    };
    expect(throwError).toThrow("This is an error");
  });

  it("should pass when a function throws a specific error type", () => {
    const throwTypeError = () => {
      throw new TypeError("Invalid type");
    };
    expect(throwTypeError).toThrow(TypeError);
    expect(throwTypeError).toThrow("Invalid type");
  });

  it("should pass when a function throws an error with a same Error", () => {
    class ErrorA extends Error {
      constructor(message?: string) {
        super(message);
        this.name = "ErrorA";
      }
    }

    const throwTypeError = () => {
      throw new ErrorA("This is ErrorA");
    };

    expect(throwTypeError).toThrow(ErrorA);
  });

  it("should pass when a function throws an error with a same Error message", () => {
    class ErrorA extends Error {
      constructor(message?: string) {
        super(message);
        this.name = "ErrorA";
      }
    }

    const throwTypeError = () => {
      throw new ErrorA("This is ErrorA");
    };

    expect(throwTypeError).toThrow(new ErrorA("This is ErrorA"));
  });

  it("should pass when a function throws the correct error and message using regex", () => {
    const throwRegexError = () => {
      throw new Error("Something went wrong in the system");
    };
    expect(throwRegexError).toThrow(/went wrong/);
  });

  it("should fail with no error message for comparison", () => {
    const throwTypeError = () => {
      throw new TypeError("Invalid type");
    };
    expect(throwTypeError).toThrow();
  });

  it("should pass when a function does not throw an error when valid arguments are passed", () => {
    const throwInvalidArg = (arg: string) => {
      if (arg !== "valid") {
        throw new Error("Invalid argument");
      }
    };
    expect(() => throwInvalidArg("invalid")).toThrow();
  });
});
