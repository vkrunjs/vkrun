import { describe, expect, it } from "../../../../..";

describe("Expect resolves.toBeFalsy Method - Failure Cases", () => {
  it("should fail when a truthy value is provided", async () => {
    await expect(Promise.resolve(true)).resolves.toBeFalsy();
  });

  it("should fail when `1` is provided", async () => {
    await expect(Promise.resolve(1)).resolves.toBeFalsy();
  });

  it("should fail when a non-empty string is provided", async () => {
    await expect(Promise.resolve("hello")).resolves.toBeFalsy();
  });

  it("should fail when an array with values is provided", async () => {
    await expect(Promise.resolve([1, 2, 3])).resolves.toBeFalsy();
  });

  it("should fail when an object with values is provided", async () => {
    await expect(Promise.resolve({ key: "value" })).resolves.toBeFalsy();
  });

  it("should fail when a function is provided", async () => {
    await expect(Promise.resolve(() => {})).resolves.toBeFalsy();
  });

  it("should fail when a Date object is provided", async () => {
    await expect(Promise.resolve(new Date())).resolves.toBeFalsy();
  });
});
