import { isEqual } from "../is-equal";

describe("isEqual", () => {
  it("Should return true for equal strings", () => {
    expect(isEqual("hello", "hello")).toBeTruthy();
  });

  it("Should return false for different strings", () => {
    expect(isEqual("hello", "world")).toBeFalsy();
  });

  it("Should return true for equal NaN", () => {
    expect(isEqual(NaN, NaN)).toBeTruthy();
  });

  it("Should return false for different NaN", () => {
    expect(isEqual(NaN, 123)).toBeFalsy();
  });

  it("Should return true for equal buffers", () => {
    expect(isEqual(Buffer.from("hello"), Buffer.from("hello"))).toBeTruthy();
  });

  it("Should return false for not equal buffers", () => {
    expect(isEqual(Buffer.from("hello"), Buffer.from("world"))).toBeFalsy();
  });

  it("Should return true for equal functions", () => {
    const fnA = () => true;
    const fnB = fnA;
    expect(isEqual(fnA, fnB)).toBeTruthy();
  });

  it("Should return false for not equal functions", () => {
    const fnA = () => false;
    const fnB = () => true;
    expect(isEqual(fnA, fnB)).toBeFalsy();
  });

  it("Should return true for equal boolean", () => {
    expect(isEqual(true, true)).toBeTruthy();
  });

  it("Should return false for different boolean", () => {
    expect(isEqual(true, false)).toBeFalsy();
  });

  it("Should return true for equal date", () => {
    const date = new Date();
    expect(isEqual(date, date)).toBeTruthy();
  });

  it("Should return false for different date", () => {
    const dateA = new Date();
    const dateB = new Date("2000-20-03");
    expect(isEqual(dateA, dateB)).toBeFalsy();
  });

  it("Should return true for equal arrays", () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBeTruthy();
  });

  it("Should return false for arrays with different lengths", () => {
    expect(isEqual([1, 2, 3], [1, 2])).toBeFalsy();
  });

  it("Should return true for equal arrays of objects", () => {
    const arr1 = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    const arr2 = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    expect(isEqual(arr1, arr2)).toBeTruthy();
  });

  it("Should return false for different arrays of objects", () => {
    const arr1 = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    const arr2 = [
      { name: "John", age: 30 },
      { name: "Jake", age: 28 },
    ];
    expect(isEqual(arr1, arr2)).toBeFalsy();
  });

  it("Should return false for arrays with different elements", () => {
    expect(isEqual([1, 2, 3], [3, 2, 1])).toBeFalsy();
  });

  it("Should return true if arrays are not equal", () => {
    const arr1 = [
      [1, 2],
      [3, 4],
    ];
    const arr2 = [
      [1, 2],
      [3, 4],
    ];
    expect(isEqual(arr1, arr2)).toBeTruthy();
  });

  it("Should return false for arrays with nested different elements", () => {
    const arr1 = [
      [1, 2],
      [3, 4],
    ];
    const arr2 = [
      [1, 2],
      [3, 5],
    ];
    expect(isEqual(arr1, arr2)).toBeFalsy();
  });

  it("Should return true if arrays are equal", () => {
    const arr1 = [[[1]], [[2]]];
    const arr2 = [[[1]], [[2]]];
    expect(isEqual(arr1, arr2)).toBeTruthy();
  });

  it("Should return true for equal objects", () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeTruthy();
  });

  it("Should return false for objects with different keys", () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, c: 3 })).toBeFalsy();
  });

  it("Should return true for deeply nested equal objects", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 1 } } };
    expect(isEqual(obj1, obj2)).toBeTruthy();
  });

  it("Should return false for deeply nested different objects", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 2 } } };
    expect(isEqual(obj1, obj2)).toBeFalsy();
  });

  it("Should return false for different types", () => {
    expect(isEqual("hello", 123)).toBeFalsy();
  });

  it("Should return false for array vs. non-array", () => {
    expect(isEqual([1, 2, 3], { a: 1, b: 2 })).toBeFalsy();
  });

  it("Should return false for array vs. non-array (value is array)", () => {
    expect(isEqual([1, 2, 3], { a: 1, b: 2 })).toBeFalsy();
  });

  it("Should return false for array vs. non-array (valueToCompare is array)", () => {
    expect(isEqual({ a: 1, b: 2 }, [1, 2, 3])).toBeFalsy();
  });

  it("Should return true for the same symbol", () => {
    const symA = Symbol("foo");
    const symB = symA;
    expect(isEqual(symA, symB)).toBeTruthy();
  });

  it("Should return false for different symbols with same description", () => {
    const symA = Symbol("foo");
    const symB = Symbol("foo");
    expect(isEqual(symA, symB)).toBeFalsy();
  });

  it("Should return true for same RegExp (pattern + flags)", () => {
    const regA = /abc/gi;
    const regB = /abc/gi;
    expect(isEqual(regA, regB)).toBeTruthy();
  });

  it("Should return false for RegExp with different flags", () => {
    const regA = /abc/g;
    const regB = /abc/i;
    expect(isEqual(regA, regB)).toBeFalsy();
  });

  it("Should return false for RegExp with different patterns", () => {
    const regA = /abc/g;
    const regB = /abcd/g;
    expect(isEqual(regA, regB)).toBeFalsy();
  });

  it("Should return true for two maps with same key-value pairs", () => {
    const mapA = new Map<string, number>([
      ["a", 1],
      ["b", 2],
    ]);
    const mapB = new Map<string, number>([
      ["a", 1],
      ["b", 2],
    ]);
    expect(isEqual(mapA, mapB)).toBeTruthy();
  });

  it("Should return false for maps with different sizes", () => {
    const mapA = new Map([["a", 1]]);
    const mapB = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    expect(isEqual(mapA, mapB)).toBeFalsy();
  });

  it("Should return false for maps with different keys/values", () => {
    const mapA = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const mapB = new Map([
      ["a", 1],
      ["b", 3],
    ]);
    expect(isEqual(mapA, mapB)).toBeFalsy();
  });

  it("Should return true for nested maps if content is equal", () => {
    const nestedMapA = new Map([["inner", new Map([["x", 10]])]]);
    const nestedMapB = new Map([["inner", new Map([["x", 10]])]]);
    expect(isEqual(nestedMapA, nestedMapB)).toBeTruthy();
  });

  it("Should return false for nested maps if nested content differs", () => {
    const nestedMapA = new Map([["inner", new Map([["x", 10]])]]);
    const nestedMapB = new Map([["inner", new Map([["x", 99]])]]);
    expect(isEqual(nestedMapA, nestedMapB)).toBeFalsy();
  });

  it("Should return true for two sets with same elements", () => {
    const setA = new Set([1, 2, 3]);
    const setB = new Set([1, 2, 3]);
    expect(isEqual(setA, setB)).toBeTruthy();
  });

  it("Should return false for sets with different sizes", () => {
    const setA = new Set([1, 2]);
    const setB = new Set([1, 2, 3]);
    expect(isEqual(setA, setB)).toBeFalsy();
  });

  it("Should return false for sets with different elements", () => {
    const setA = new Set([1, 2, 3]);
    const setB = new Set([1, 2, 4]);
    expect(isEqual(setA, setB)).toBeFalsy();
  });

  it("Should return true for nested sets with same elements", () => {
    const nestedA = new Set([new Set([1, 2])]);
    const nestedB = new Set([new Set([1, 2])]);
    expect(isEqual(nestedA, nestedB)).toBeTruthy();
  });

  it("Should return false for nested sets if any element is not equal", () => {
    const nestedA = new Set([new Set([1, 2])]);
    const nestedB = new Set([new Set([2, 3])]);
    expect(isEqual(nestedA, nestedB)).toBeFalsy();
  });

  it("Should return true for two typed arrays (same type, same content)", () => {
    const arrA = new Uint8Array([1, 2, 3]);
    const arrB = new Uint8Array([1, 2, 3]);
    expect(isEqual(arrA, arrB)).toBeTruthy();
  });

  it("Should return false for typed arrays with different content", () => {
    const arrA = new Uint8Array([1, 2, 3]);
    const arrB = new Uint8Array([1, 2, 4]);
    expect(isEqual(arrA, arrB)).toBeFalsy();
  });

  it("Should return false for typed arrays of different types", () => {
    const arrA = new Uint8Array([1, 2, 3]);
    const arrB = new Int8Array([1, 2, 3]);
    expect(isEqual(arrA, arrB)).toBeFalsy();
  });

  it("Should return true for nested typed arrays if content is equal", () => {
    const arrA = [new Uint8Array([1, 2]), new Uint8Array([3, 4])];
    const arrB = [new Uint8Array([1, 2]), new Uint8Array([3, 4])];
    expect(isEqual(arrA, arrB)).toBeTruthy();
  });

  it("Should return true for ArrayBuffer with same bytes", () => {
    const bufferA = new ArrayBuffer(4);
    const bufferB = new ArrayBuffer(4);
    new Uint8Array(bufferA).set([1, 2, 3, 4]);
    new Uint8Array(bufferB).set([1, 2, 3, 4]);
    expect(isEqual(bufferA, bufferB)).toBeTruthy();
  });

  it("Should return false for ArrayBuffer with different bytes", () => {
    const bufferA = new ArrayBuffer(4);
    const bufferB = new ArrayBuffer(4);
    new Uint8Array(bufferA).set([1, 2, 3, 4]);
    new Uint8Array(bufferB).set([1, 2, 3, 5]);
    expect(isEqual(bufferA, bufferB)).toBeFalsy();
  });

  it("Should return false for ArrayBuffer with different length", () => {
    const bufferA = new ArrayBuffer(4);
    const bufferB = new ArrayBuffer(8);
    expect(isEqual(bufferA, bufferB)).toBeFalsy();
  });
});
