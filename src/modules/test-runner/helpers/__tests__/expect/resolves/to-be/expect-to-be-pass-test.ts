import { describe, expect, it } from "../../../../..";

describe("Expect resolves.toBe Method - Success Cases", () => {
  it("should check if numbers are equal", async () => {
    await expect(Promise.resolve(42)).resolves.toBe(42);
  });

  it("should check if strings are equal", async () => {
    await expect(Promise.resolve("hello")).resolves.toBe("hello");
  });

  it("should check if booleans are equal", async () => {
    await expect(Promise.resolve(true)).resolves.toBe(true);
    await expect(Promise.resolve(false)).resolves.toBe(false);
  });

  it("should check if undefined is equal to undefined", async () => {
    const undefinedVar = undefined;
    await expect(Promise.resolve(undefinedVar)).resolves.toBe(undefined);
  });

  it("should check if null is equal to null", async () => {
    await expect(Promise.resolve(null)).resolves.toBe(null);
  });

  it("should check if NaN is equal to NaN using Object.is for strict equality", async () => {
    await expect(Promise.resolve(NaN)).resolves.toBe(NaN);
  });

  it("should check if objects with identical references are equal", async () => {
    const obj = { a: 1 };
    await expect(Promise.resolve(obj)).resolves.toBe(obj);
  });

  it("should check if functions are equal", async () => {
    const fn1 = async () => {};
    const fn2 = fn1;
    await expect(Promise.resolve(fn1)).resolves.toBe(fn2);
  });

  it("should check if arrays with identical references are equal", async () => {
    const arr = [1, 2, 3];
    await expect(Promise.resolve(arr)).resolves.toBe(arr);
  });

  it("should check if dates with identical references are equal", async () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = date1;
    await expect(Promise.resolve(date1)).resolves.toBe(date2);
  });

  it("should check if buffers with identical references are equal", async () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = buffer1;
    await expect(Promise.resolve(buffer1)).resolves.toBe(buffer2);
  });
});
