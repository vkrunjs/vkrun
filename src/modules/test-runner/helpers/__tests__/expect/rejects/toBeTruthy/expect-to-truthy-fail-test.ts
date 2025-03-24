import { describe, expect, it } from "../../../../..";

describe("Expect rejects.toBeTruthy Method - Failure Cases", () => {
  it("should fail when `false` is rejected", async () => {
    await expect(Promise.reject(false)).rejects.toBeTruthy();
  });

  it("should fail when `0` is rejected", async () => {
    await expect(Promise.reject(0)).rejects.toBeTruthy();
  });

  it("should fail when an empty string is rejected", async () => {
    await expect(Promise.reject("")).rejects.toBeTruthy();
  });

  it("should fail when `null` is rejected", async () => {
    await expect(Promise.reject(null)).rejects.toBeTruthy();
  });

  it("should fail when `undefined` is rejected", async () => {
    await expect(Promise.reject(undefined)).rejects.toBeTruthy();
  });

  it("should fail when `NaN` is rejected", async () => {
    await expect(Promise.reject(NaN)).rejects.toBeTruthy();
  });
});
