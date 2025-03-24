import { describe, expect, it } from "../../../../..";

describe("Expect resolves.toBeFalsy Method - Success Cases", () => {
  it("should pass when a falsy value is provided", async () => {
    await expect(Promise.resolve(false)).resolves.toBeFalsy(); // false is falsy
    await expect(Promise.resolve(0)).resolves.toBeFalsy(); // 0 is falsy
    await expect(Promise.resolve("")).resolves.toBeFalsy(); // Empty string is falsy
    await expect(Promise.resolve(null)).resolves.toBeFalsy(); // null is falsy
    await expect(Promise.resolve(undefined)).resolves.toBeFalsy(); // undefined is falsy
    await expect(Promise.resolve(NaN)).resolves.toBeFalsy(); // NaN is falsy
  });

  it("should pass when `false` is provided", async () => {
    await expect(Promise.resolve(false)).resolves.toBeFalsy();
  });

  it("should pass when `null` is provided", async () => {
    await expect(Promise.resolve(null)).resolves.toBeFalsy();
  });

  it("should pass when `undefined` is provided", async () => {
    await expect(Promise.resolve(undefined)).resolves.toBeFalsy();
  });
});
