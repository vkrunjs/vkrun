import { describe, expect, it } from "../../../..";

describe("Expect toBeFalsy Method - Success Cases", () => {
  it("should pass when a falsy value is provided", () => {
    expect(false).toBeFalsy(); // false is falsy
    expect(0).toBeFalsy(); // 0 is falsy
    expect("").toBeFalsy(); // Empty string is falsy
    expect(null).toBeFalsy(); // null is falsy
    expect(undefined).toBeFalsy(); // undefined is falsy
    expect(NaN).toBeFalsy(); // NaN is falsy
  });

  it("should pass when `false` is provided", () => {
    expect(false).toBeFalsy();
  });

  it("should pass when `null` is provided", () => {
    expect(null).toBeFalsy();
  });

  it("should pass when `undefined` is provided", () => {
    expect(undefined).toBeFalsy();
  });
});
