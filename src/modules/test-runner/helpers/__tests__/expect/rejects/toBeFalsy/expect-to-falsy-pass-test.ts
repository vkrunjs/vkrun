import { describe, expect, it } from "../../../../..";

describe("Expect rejects.toBeFalsy Method - Success Cases", () => {
  it("should pass when a falsy value is rejected", async () => {
    await expect(Promise.reject(false)).rejects.toBeFalsy(); // false is falsy
    await expect(Promise.reject(0)).rejects.toBeFalsy(); // 0 is falsy
    await expect(Promise.reject("")).rejects.toBeFalsy(); // Empty string is falsy
    await expect(Promise.reject(null)).rejects.toBeFalsy(); // null is falsy
    await expect(Promise.reject(undefined)).rejects.toBeFalsy(); // undefined is falsy
    await expect(Promise.reject(NaN)).rejects.toBeFalsy(); // NaN is falsy
  });

  it("should pass when `false` is rejected", async () => {
    await expect(Promise.reject(false)).rejects.toBeFalsy();
  });

  it("should pass when `null` is rejected", async () => {
    await expect(Promise.reject(null)).rejects.toBeFalsy();
  });

  it("should pass when `undefined` is rejected", async () => {
    await expect(Promise.reject(undefined)).rejects.toBeFalsy();
  });
});
