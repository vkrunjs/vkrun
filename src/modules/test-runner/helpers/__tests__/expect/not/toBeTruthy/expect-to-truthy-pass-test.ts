import { describe, expect, it } from "../../../../..";

describe("Expect not.toBeTruthy Method - Success Cases", () => {
  it("should pass when a falsy value is provided", () => {
    expect(false).not.toBeTruthy(); // false é falsy
    expect(0).not.toBeTruthy(); // 0 é falsy
    expect("").not.toBeTruthy(); // String vazia é falsy
    expect(null).not.toBeTruthy(); // null é falsy
    expect(undefined).not.toBeTruthy(); // undefined é falsy
    expect(NaN).not.toBeTruthy(); // NaN é falsy
  });

  it("should pass when `false` is provided", () => {
    expect(false).not.toBeTruthy();
  });

  it("should pass when `0` is provided", () => {
    expect(0).not.toBeTruthy();
  });

  it("should pass when an empty string is provided", () => {
    expect("").not.toBeTruthy();
  });

  it("should pass when `null` is provided", () => {
    expect(null).not.toBeTruthy();
  });

  it("should pass when `undefined` is provided", () => {
    expect(undefined).not.toBeTruthy();
  });

  it("should pass when `NaN` is provided", () => {
    expect(NaN).not.toBeTruthy();
  });
});
