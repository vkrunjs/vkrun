import { isInt8Array } from "../is-int8-array";

describe("isInt8Array", () => {
  it("should return true for an Int8Array", () => {
    const int8Array = new Int8Array([1, 2, 3]);
    expect(isInt8Array(int8Array)).toBeTruthy();
  });

  it("should return false for a regular array", () => {
    const array = [1, 2, 3];
    expect(isInt8Array(array)).toBeFalsy();
  });

  it("should return false for a Uint8Array", () => {
    const uint8Array = new Uint8Array([1, 2, 3]);
    expect(isInt8Array(uint8Array)).toBeFalsy();
  });

  it("should return false for a string", () => {
    const string = "Hello World";
    expect(isInt8Array(string)).toBeFalsy();
  });

  it("should return false for a number", () => {
    const number = 42;
    expect(isInt8Array(number)).toBeFalsy();
  });

  it("should return false for an object", () => {
    const object = { key: "value" };
    expect(isInt8Array(object)).toBeFalsy();
  });

  it("should return false for null", () => {
    const nullValue = null;
    expect(isInt8Array(nullValue)).toBeFalsy();
  });

  it("should return false for undefined", () => {
    const undefinedValue = undefined;
    expect(isInt8Array(undefinedValue)).toBeFalsy();
  });

  it("should return false for a boolean", () => {
    const booleanValue = true;
    expect(isInt8Array(booleanValue)).toBeFalsy();
  });

  it("should return false for a Set", () => {
    const set = new Set([1, 2, 3]);
    expect(isInt8Array(set)).toBeFalsy();
  });

  it("should return false for a Map", () => {
    const map = new Map([
      ["key1", 1],
      ["key2", 2],
    ]);
    expect(isInt8Array(map)).toBeFalsy();
  });

  it("should return false for a Buffer", () => {
    const buffer = Buffer.from("hello");
    expect(isInt8Array(buffer)).toBeFalsy();
  });
});
