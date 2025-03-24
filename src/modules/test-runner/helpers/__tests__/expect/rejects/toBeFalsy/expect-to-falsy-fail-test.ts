import { describe, expect, it } from "../../../../..";

describe("Expect rejects.toBeFalsy Method - Failure Cases", () => {
  it("should fail when a truthy value is rejected", async () => {
    await expect(Promise.reject(true)).rejects.toBeFalsy();
  });

  it("should fail when `1` is rejected", async () => {
    await expect(Promise.reject(1)).rejects.toBeFalsy();
  });

  it("should fail when a non-empty string is rejected", async () => {
    await expect(Promise.reject("hello")).rejects.toBeFalsy();
  });

  it("should fail when an array with values is rejected", async () => {
    await expect(Promise.reject([1, 2, 3])).rejects.toBeFalsy();
  });

  it("should fail when an object with values is rejected", async () => {
    await expect(Promise.reject({ key: "value" })).rejects.toBeFalsy();
  });

  it("should fail when a function is rejected", async () => {
    await expect(Promise.reject(() => {})).rejects.toBeFalsy();
  });

  it("should fail when a Date object is rejected", async () => {
    await expect(Promise.reject(new Date())).rejects.toBeFalsy();
  });
});
