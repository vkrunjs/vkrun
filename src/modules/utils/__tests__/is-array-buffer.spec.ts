import { isArrayBuffer } from "../is-array-buffer";

describe("isArrayBuffer", () => {
  it("should return true for an ArrayBuffer", () => {
    const arrayBuffer = new ArrayBuffer(8);
    expect(isArrayBuffer(arrayBuffer)).toBeTruthy();
  });

  it("should return false for a regular array", () => {
    const array = [1, 2, 3];
    expect(isArrayBuffer(array)).toBeFalsy();
  });

  it("should return false for a Uint8Array", () => {
    const uint8Array = new Uint8Array([1, 2, 3]);
    expect(isArrayBuffer(uint8Array)).toBeFalsy();
  });

  it("should return false for a string", () => {
    const string = "Hello World";
    expect(isArrayBuffer(string)).toBeFalsy();
  });

  it("should return false for a number", () => {
    const number = 42;
    expect(isArrayBuffer(number)).toBeFalsy();
  });

  it("should return false for an object", () => {
    const object = { key: "value" };
    expect(isArrayBuffer(object)).toBeFalsy();
  });

  it("should return false for null", () => {
    const nullValue = null;
    expect(isArrayBuffer(nullValue)).toBeFalsy();
  });

  it("should return false for undefined", () => {
    const undefinedValue = undefined;
    expect(isArrayBuffer(undefinedValue)).toBeFalsy();
  });

  it("should return false for a boolean", () => {
    const booleanValue = true;
    expect(isArrayBuffer(booleanValue)).toBeFalsy();
  });

  it("should return false for a Set", () => {
    const set = new Set([1, 2, 3]);
    expect(isArrayBuffer(set)).toBeFalsy();
  });

  it("should return false for a Map", () => {
    const map = new Map([
      ["key1", 1],
      ["key2", 2],
    ]);
    expect(isArrayBuffer(map)).toBeFalsy();
  });
});
