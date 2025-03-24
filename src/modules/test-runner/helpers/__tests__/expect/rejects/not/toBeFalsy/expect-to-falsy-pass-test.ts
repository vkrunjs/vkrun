import { describe, expect, it } from "../../../../../..";

describe("Expect rejects.not.toBeFalsy Method - Success Cases", () => {
  it("should pass when a truthy value is rejected", async () => {
    await expect(Promise.reject(true)).rejects.not.toBeFalsy();
    await expect(Promise.reject(1)).rejects.not.toBeFalsy();
    await expect(Promise.reject("hello")).rejects.not.toBeFalsy();
    await expect(Promise.reject([1, 2, 3])).rejects.not.toBeFalsy();
    await expect(Promise.reject({ key: "value" })).rejects.not.toBeFalsy();
    await expect(Promise.reject(() => {})).rejects.not.toBeFalsy();
    await expect(Promise.reject(new Date())).rejects.not.toBeFalsy();
  });

  it("should pass when `true` is rejected", async () => {
    await expect(Promise.reject(true)).rejects.not.toBeFalsy();
  });

  it("should pass when `1` is rejected", async () => {
    await expect(Promise.reject(1)).rejects.not.toBeFalsy();
  });

  it("should pass when a non-empty string is rejected", async () => {
    await expect(Promise.reject("hello")).rejects.not.toBeFalsy();
  });

  it("should pass when an array with values is rejected", async () => {
    await expect(Promise.reject([1, 2, 3])).rejects.not.toBeFalsy();
  });

  it("should pass when an object with values is rejected", async () => {
    await expect(Promise.reject({ key: "value" })).rejects.not.toBeFalsy();
  });

  it("should pass when a function is rejected", async () => {
    await expect(Promise.reject(() => {})).rejects.not.toBeFalsy();
  });

  it("should pass when a Date object is rejected", async () => {
    await expect(Promise.reject(new Date())).rejects.not.toBeFalsy();
  });
});
