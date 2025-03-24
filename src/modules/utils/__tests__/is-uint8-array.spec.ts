import { isUint8Array } from "../is-uint8-array";

describe("isUint8Array", () => {
  it("should return false for an Int8Array", () => {
    const int8Array = new Int8Array([1, 2, 3]);
    expect(isUint8Array(int8Array)).toBeFalsy();
  });

  it("should return true for a Uint8Array", () => {
    const uint8Array = new Uint8Array([1, 2, 3]);
    expect(isUint8Array(uint8Array)).toBeTruthy();
  });

  it("should return false for a regular array", () => {
    const array = [1, 2, 3];
    expect(isUint8Array(array)).toBeFalsy();
  });

  it("should return false for a string", () => {
    const string = "Hello World";
    expect(isUint8Array(string)).toBeFalsy();
  });

  it("should return false for a number", () => {
    const number = 42;
    expect(isUint8Array(number)).toBeFalsy();
  });

  it("should return false for an object", () => {
    const object = { key: "value" };
    expect(isUint8Array(object)).toBeFalsy();
  });

  it("should return false for null", () => {
    const nullValue = null;
    expect(isUint8Array(nullValue)).toBeFalsy();
  });

  it("should return false for undefined", () => {
    const undefinedValue = undefined;
    expect(isUint8Array(undefinedValue)).toBeFalsy();
  });

  it("should return false for a boolean", () => {
    const booleanValue = true;
    expect(isUint8Array(booleanValue)).toBeFalsy();
  });

  it("should return false for a Set", () => {
    const set = new Set([1, 2, 3]);
    expect(isUint8Array(set)).toBeFalsy();
  });

  it("should return false for a Map", () => {
    const map = new Map([
      ["key1", 1],
      ["key2", 2],
    ]);
    expect(isUint8Array(map)).toBeFalsy();
  });

  it("should return false for a Buffer", () => {
    const bufferString = Buffer.from("hello");
    const bufferNumber = Buffer.from([1, 2, 3]);
    expect(isUint8Array(bufferString)).toBeFalsy();
    expect(isUint8Array(bufferNumber)).toBeFalsy();
  });
});
