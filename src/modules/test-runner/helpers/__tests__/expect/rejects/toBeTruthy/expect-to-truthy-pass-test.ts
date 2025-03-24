import { describe, expect, it } from "../../../../..";

describe("Expect rejects.toBeTruthy Method - Success Cases", () => {
  it("should pass when a non-falsy value is rejected", async () => {
    await expect(Promise.reject(42)).rejects.toBeTruthy();
    await expect(Promise.reject("hello")).rejects.toBeTruthy();
    await expect(Promise.reject([])).rejects.toBeTruthy();
    await expect(Promise.reject({})).rejects.toBeTruthy();
  });

  it("should pass when `true` is rejected", async () => {
    await expect(Promise.reject(true)).rejects.toBeTruthy();
  });

  it("should pass when a non-empty object is rejected", async () => {
    const obj = { key: "value" };
    await expect(Promise.reject(obj)).rejects.toBeTruthy();
  });

  it("should pass when a non-empty array is rejected", async () => {
    const arr = [1, 2, 3];
    await expect(Promise.reject(arr)).rejects.toBeTruthy();
  });
});
