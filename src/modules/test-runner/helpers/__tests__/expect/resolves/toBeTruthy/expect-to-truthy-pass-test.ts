import { describe, expect, it } from "../../../../..";

describe("Expect resolves.toBeTruthy Method - Success Cases", () => {
  it("should pass when a non-falsy value is provided", async () => {
    await expect(Promise.resolve(42)).resolves.toBeTruthy();
    await expect(Promise.resolve("hello")).resolves.toBeTruthy();
    await expect(Promise.resolve([])).resolves.toBeTruthy();
    await expect(Promise.resolve({})).resolves.toBeTruthy();
  });

  it("should pass when `true` is provided", async () => {
    await expect(Promise.resolve(true)).resolves.toBeTruthy();
  });

  it("should pass when a non-empty object is provided", async () => {
    const obj = { key: "value" };
    await expect(Promise.resolve(obj)).resolves.toBeTruthy();
  });

  it("should pass when a non-empty array is provided", async () => {
    const arr = [1, 2, 3];
    await expect(Promise.resolve(arr)).resolves.toBeTruthy();
  });
});
