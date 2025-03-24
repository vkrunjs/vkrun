import { describe, expect, it } from "../../../..";

describe("Expect toEqual Method - Failure Cases", () => {
  it("should fail if you expect it to be inside a try catch", () => {
    try {
      expect("hell1").toEqual("hello");
    } catch (error) {}
  });

  it("should fail when numbers are not equal", () => {
    expect(42).toEqual(43);
  });

  it("should fail when strings are not equal", () => {
    expect("hello").toEqual("world");
  });

  it("should fail when arrays with identical elements are not equal", () => {
    expect([1, 2, 3]).toEqual([4, 5, 6]);
  });

  it("should fail when arrays with nested objects are not equal", () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }];
    const arr2 = [{ a: 2, b: 3 }, { c: 4 }];
    expect(arr1).toEqual(arr2);
  });

  it("should fail when arrays with different elements are not equal", () => {
    expect([1, 2, 3]).toEqual([3, 2, 1]);
  });

  it("should fail when arrays with nested different elements are not equal", () => {
    const arr1 = [
      [1, 2],
      [3, 4],
    ];
    const arr2 = [
      [1, 2],
      [3, 5],
    ];
    expect(arr1).toEqual(arr2);
  });

  it("should fail when arrays with nested different elements in deeper levels are not equal", () => {
    const arr1 = [[[1]], [[2]]];
    const arr2 = [[[1]], [[3]]];
    expect(arr1).toEqual(arr2);
  });

  it("should fail when objects with different properties are not equal", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 2, b: 3 };
    expect(obj1).toEqual(obj2);
  });

  it("should fail when multiple data structures and types are not equal", () => {
    const obj1 = {
      a: {
        b: {
          c: 2,
          d: [1, 2, 3],
        },
      },
      numbers: [10, 20, 30],
      map: new Map([
        ["key1", "value1"],
        ["key2", "value2"],
      ]),
      set: new Set([1, 2, 3]),
      buffer: Buffer.from("hello"),
      symbol: Symbol("test"),
      bigint: BigInt(100),
      typedArray: new Uint8Array([5, 10, 15]),
    };

    const obj2 = {
      a: {
        b: {
          c: 3,
          d: [1, 4, 3],
        },
      },
      numbers: [10, 25, 30],
      map: new Map([
        ["key1", "value1"],
        ["key3", "value3"],
      ]),
      set: new Set([2, 3, 4]),
      buffer: Buffer.from("world"),
      symbol: Symbol("test"),
      bigint: BigInt(200),
      typedArray: new Uint8Array([5, 20, 15]),
    };

    expect(obj1).toEqual(obj2);
  });

  it("should fail when objects with different key order are not equal", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, b: 2, a: 1 };
    expect(obj1).toEqual(obj2);
  });

  it("should fail when objects with arrays as values are not equal", () => {
    const obj1 = { a: [1, 2], b: [3, 4] };
    const obj2 = { a: [4, 5], b: [6, 7] };
    expect(obj1).toEqual(obj2);
  });

  it("should fail when functions are not equal", () => {
    const fn1 = () => {};
    const fn2 = () => {
      console.log("hello");
    };
    expect(fn1).toEqual(fn2);
  });

  it("should fail when booleans are not equal", () => {
    expect(true).toEqual(false);
    expect(false).toEqual(true);
  });

  it("should fail when undefined is not equal to undefined", () => {
    let undefinedVar = "defined";
    expect(undefinedVar).toEqual(undefined);
  });

  it("should fail when undefined is not equal to null", () => {
    expect(undefined).toEqual(null);
  });

  it("should fail when null is not equal to null", () => {
    expect(undefined).toEqual(null);
  });

  it("should fail when NaN is not equal to NaN", () => {
    expect(NaN).toEqual("NaN");
  });

  it("should fail when dates are not equal", () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 2, 1);
    expect(date1).toEqual(date2);
  });

  it("should fail when buffers are not equal", () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("world");
    expect(buffer1).toEqual(buffer2);
  });

  it("should fail when symbols with different references are not equal", () => {
    const symbol1 = Symbol("example");
    const symbol2 = Symbol("example");
    expect(symbol1).toEqual(symbol2);
  });

  it("should fail when RegExp with different patterns are not equal", () => {
    const regA = /abc/g;
    const regB = /abcd/g;
    expect(regA).toEqual(regB);
  });

  it("should fail when RegExp with different flags are not equal", () => {
    const regA = /abc/g;
    const regB = /abc/i;
    expect(regA).toEqual(regB);
  });

  it("should fail when RegExp with different patterns and flags are not equal", () => {
    const regA = /abc/g;
    const regB = /abcd/i;
    expect(regA).toEqual(regB);
  });

  it("should fail when two maps with different key-value pairs are not equal", () => {
    const mapA = new Map([["a", 1]]);
    const mapB = new Map([["a", 2]]);
    expect(mapA).toEqual(mapB);
  });

  it("should fail when maps with different sizes are not equal", () => {
    const mapA = new Map([["a", 1]]);
    const mapB = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    expect(mapA).toEqual(mapB);
  });

  it("should fail when two sets with different elements are not equal", () => {
    const setA = new Set([
      1,
      true,
      {
        key: "string",
        obj: {
          keyB: "string",
        },
      },
    ]);
    const setB = new Set([2, 3]);
    expect(setA).toEqual(setB);
  });

  it("should fail when typed arrays with different content are not equal", () => {
    const arrA = new Uint8Array([1, 2, 3]);
    const arrB = new Uint8Array([1, 2, 4]);
    expect(arrA).toEqual(arrB);
  });

  it("should fail when typed arrays of different types are not equal", () => {
    const arrA = new Uint8Array([1, 2, 3]);
    const arrB = new Int8Array([1, 2, 3]);
    expect(arrA).toEqual(arrB);
  });

  // ArrayBuffer
  it("should fail when ArrayBuffers with different content are not equal", () => {
    const bufferA = new ArrayBuffer(4);
    const bufferB = new ArrayBuffer(4);
    new Uint8Array(bufferA).set([1, 2, 3, 4]);
    new Uint8Array(bufferB).set([1, 2, 3, 5]);
    expect(bufferA).toEqual(bufferB);
  });

  it("should fail when ArrayBuffers with different lengths are not equal", () => {
    const bufferA = new ArrayBuffer(4);
    const bufferB = new ArrayBuffer(8);
    expect(bufferA).toEqual(bufferB);
  });
});
