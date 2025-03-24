import { describe, expect, it } from "../../../../../..";

describe("Expect resolves.not.toBeTruthy Method - Success Cases", () => {
  it("should pass when a falsy value is provided", async () => {
    await expect(Promise.resolve(false)).resolves.not.toBeTruthy();
    await expect(Promise.resolve(0)).resolves.not.toBeTruthy();
    await expect(Promise.resolve("")).resolves.not.toBeTruthy();
    await expect(Promise.resolve(null)).resolves.not.toBeTruthy();
    await expect(Promise.resolve(undefined)).resolves.not.toBeTruthy();
    await expect(Promise.resolve(NaN)).resolves.not.toBeTruthy();
  });

  it("should pass when `false` is provided", async () => {
    await expect(Promise.resolve(false)).resolves.not.toBeTruthy();
  });

  it("should pass when `null` is provided", async () => {
    await expect(Promise.resolve(null)).resolves.not.toBeTruthy();
  });

  it("should pass when `undefined` is provided", async () => {
    await expect(Promise.resolve(undefined)).resolves.not.toBeTruthy();
  });

  it("should pass when `NaN` is provided", async () => {
    await expect(Promise.resolve(NaN)).resolves.not.toBeTruthy();
  });

  it("should pass when an empty string is provided", async () => {
    await expect(Promise.resolve("")).resolves.not.toBeTruthy();
  });

  it("should pass when `0` is provided", async () => {
    await expect(Promise.resolve(0)).resolves.not.toBeTruthy();
  });
});
