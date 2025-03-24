import { describe, expect, it } from "../../../../../..";

describe("Expect resolves.not.toBeTruthy Method - Failure Cases", () => {
  it("should fail when `true` is provided", async () => {
    await expect(Promise.resolve(true)).resolves.not.toBeTruthy();
  });

  it("should fail when `1` is provided", async () => {
    await expect(Promise.resolve(1)).resolves.not.toBeTruthy();
  });

  it("should fail when a non-empty string is provided", async () => {
    await expect(Promise.resolve("hello")).resolves.not.toBeTruthy();
  });

  it("should fail when a non-empty array is provided", async () => {
    await expect(Promise.resolve([1, 2, 3])).resolves.not.toBeTruthy();
  });

  it("should fail when a non-empty object is provided", async () => {
    await expect(Promise.resolve({ key: "value" })).resolves.not.toBeTruthy();
  });

  it("should fail when a function is provided", async () => {
    await expect(Promise.resolve(() => {})).resolves.not.toBeTruthy();
  });

  it("should fail when a Date object is provided", async () => {
    await expect(Promise.resolve(new Date())).resolves.not.toBeTruthy();
  });
});
