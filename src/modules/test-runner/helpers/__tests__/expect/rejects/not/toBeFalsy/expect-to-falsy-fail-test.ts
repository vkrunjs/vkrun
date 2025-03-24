import { describe, expect, it } from "../../../../../..";

describe("Expect rejects.not.toBeFalsy Method - Failure Cases", () => {
  it("should fail when `false` is rejected", async () => {
    await expect(Promise.reject(false)).rejects.not.toBeFalsy();
  });

  it("should fail when `0` is rejected", async () => {
    await expect(Promise.reject(0)).rejects.not.toBeFalsy();
  });

  it("should fail when an empty string is rejected", async () => {
    await expect(Promise.reject("")).rejects.not.toBeFalsy();
  });

  it("should fail when `null` is rejected", async () => {
    await expect(Promise.reject(null)).rejects.not.toBeFalsy();
  });

  it("should fail when `undefined` is rejected", async () => {
    await expect(Promise.reject(undefined)).rejects.not.toBeFalsy();
  });

  it("should fail when `NaN` is rejected", async () => {
    await expect(Promise.reject(NaN)).rejects.not.toBeFalsy();
  });
});
