import { describe, expect, it } from "../../../../../..";

describe("Expect resolves.not.toBeFalsy Method - Failure Cases", () => {
  it("should fail when `false` is provided", async () => {
    await expect(Promise.resolve(false)).resolves.not.toBeFalsy();
  });

  it("should fail when `0` is provided", async () => {
    await expect(Promise.resolve(0)).resolves.not.toBeFalsy();
  });

  it("should fail when an empty string is provided", async () => {
    await expect(Promise.resolve("")).resolves.not.toBeFalsy();
  });

  it("should fail when `null` is provided", async () => {
    await expect(Promise.resolve(null)).resolves.not.toBeFalsy();
  });

  it("should fail when `undefined` is provided", async () => {
    await expect(Promise.resolve(undefined)).resolves.not.toBeFalsy();
  });

  it("should fail when `NaN` is provided", async () => {
    await expect(Promise.resolve(NaN)).resolves.not.toBeFalsy();
  });
});
