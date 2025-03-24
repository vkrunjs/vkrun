import { describe, expect, it } from "../../../../..";

describe("Expect not.toThrow Method - Success Cases", () => {
  it("should pass when a function does not throw any error", () => {
    const noError = () => {};
    expect(noError).not.toThrow();
  });

  it("should pass when a function throws an error with a different message", () => {
    const throwError = () => {
      throw new Error("Unexpected error");
    };
    expect(throwError).not.toThrow("Specific error message");
  });

  it("should pass when a function throws an error of a different class", () => {
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

    const throwErrorA = () => {
      throw new ErrorA("This is ErrorA");
    };

    expect(throwErrorA).not.toThrow(ErrorB);
  });

  it("should pass when a function throws an error with a different Error instance", () => {
    class ErrorA extends Error {
      constructor(message?: string) {
        super(message);
        this.name = "ErrorA";
      }
    }

    const throwErrorA = () => {
      throw new ErrorA("This is ErrorA");
    };

    expect(throwErrorA).not.toThrow(new ErrorA("This is a different ErrorA message"));
  });

  it("should pass when a function throws an error that does not match the regex", () => {
    const throwError = () => {
      throw new Error("File not found");
    };
    expect(throwError).not.toThrow(/something else/);
  });

  it("should pass when a function does not throw an error even with parameters", () => {
    const validateInput = (input: string) => {
      if (input === "invalid") {
        throw new Error("Invalid input");
      }
    };
    expect(() => validateInput("valid")).not.toThrow("Invalid input");
  });

  it("should pass when a function does not throw an error even if wrapped in try-catch", () => {
    const safeFunction = () => {
      try {
        //
      } catch (error) {
        //
      }
    };
    expect(safeFunction).not.toThrow();
  });

  it("should pass when a function throws an error but a different class", () => {
    class CustomError extends Error {
      constructor(message?: string) {
        super(message);
        this.name = "CustomError";
      }
    }

    class OtherError extends Error {
      constructor(message?: string) {
        super(message);
        this.name = "OtherError";
      }
    }

    const throwCustomError = () => {
      throw new CustomError("Some message");
    };

    expect(throwCustomError).not.toThrow(OtherError);
  });
});
