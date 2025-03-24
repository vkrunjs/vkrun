import { describe, expect, it } from "../../../../../..";

describe("Expect resolves.not.toBeFalsy Method - Success Cases", () => {
  it("should pass when a truthy value is provided", async () => {
    await expect(Promise.resolve(true)).resolves.not.toBeFalsy();
    await expect(Promise.resolve(1)).resolves.not.toBeFalsy();
    await expect(Promise.resolve("hello")).resolves.not.toBeFalsy();
    await expect(Promise.resolve([1, 2, 3])).resolves.not.toBeFalsy();
    await expect(Promise.resolve({ key: "value" })).resolves.not.toBeFalsy();
    await expect(Promise.resolve(() => {})).resolves.not.toBeFalsy();
    await expect(Promise.resolve(new Date())).resolves.not.toBeFalsy();
  });

  it("should pass when `true` is provided", async () => {
    await expect(Promise.resolve(true)).resolves.not.toBeFalsy();
  });

  it("should pass when `1` is provided", async () => {
    await expect(Promise.resolve(1)).resolves.not.toBeFalsy();
  });

  it("should pass when a non-empty string is provided", async () => {
    await expect(Promise.resolve("hello")).resolves.not.toBeFalsy();
  });

  it("should pass when an array with values is provided", async () => {
    await expect(Promise.resolve([1, 2, 3])).resolves.not.toBeFalsy();
  });

  it("should pass when an object with values is provided", async () => {
    await expect(Promise.resolve({ key: "value" })).resolves.not.toBeFalsy();
  });

  it("should pass when a function is provided", async () => {
    await expect(Promise.resolve(() => {})).resolves.not.toBeFalsy();
  });

  it("should pass when a Date object is provided", async () => {
    await expect(Promise.resolve(new Date())).resolves.not.toBeFalsy();
  });
});
