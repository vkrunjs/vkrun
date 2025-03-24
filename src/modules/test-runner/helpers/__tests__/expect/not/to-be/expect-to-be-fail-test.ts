import { describe, expect, it } from "../../../../..";

describe("Expect not.toBe Method - Failure Cases", () => {
  it("should fail when the numbers are equal", () => {
    expect(42).not.toBe(42);
  });

  it("should fail when the strings are equal", () => {
    expect("hello").not.toBe("hello");
  });

  it("should fail when the booleans are equal", () => {
    expect(true).not.toBe(true);
  });

  it("should fail when undefined is compared to undefined", () => {
    const undefinedVar = undefined;
    expect(undefinedVar).not.toBe(undefined);
  });

  it("should fail when null is compared to null", () => {
    expect(null).not.toBe(null);
  });

  it("should fail when NaN is compared to NaN", () => {
    expect(NaN).not.toBe(NaN);
  });

  it("should fail when objects with the same references are compared", () => {
    const obj1 = { a: 1 };
    const obj2 = obj1;
    expect(obj1).not.toBe(obj2);
  });

  it("should fail when functions with the same references are compared", () => {
    const fn1 = () => {};
    const fn2 = fn1;
    expect(fn1).not.toBe(fn2);
  });

  it("should fail when arrays with the same references are compared", () => {
    const arr1 = [1, 2, 3];
    const arr2 = arr1;
    expect(arr1).not.toBe(arr2);
  });

  it("should fail when dates with the same references are compared", () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = date1;
    expect(date1).not.toBe(date2);
  });

  it("should fail when buffers with the same references are compared", () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = buffer1;
    expect(buffer1).not.toBe(buffer2);
  });

  it("should fail when two symbols with the same description are compared", () => {
    const symbol1 = Symbol("example");
    const symbol2 = symbol1;
    expect(symbol1).not.toBe(symbol2);
  });

  it("should fail when two Map objects with the same content and references are compared", () => {
    const map1 = new Map();
    const map2 = map1;
    map1.set("key1", "value1");
    expect(map1).not.toBe(map2);
  });

  it("should fail when two WeakMap objects with the same content and references are compared", () => {
    const weakMap1 = new WeakMap();
    const weakMap2 = weakMap1;
    const obj = { key: "content" };
    weakMap1.set(obj, "value");
    expect(weakMap1).not.toBe(weakMap2);
  });

  it("should fail when two WeakSet objects with the same content and references are compared", () => {
    const weakSet1 = new WeakSet();
    const weakSet2 = weakSet1;
    const obj = { key: "content" };
    weakSet1.add(obj);
    expect(weakSet1).not.toBe(weakSet2);
  });

  it("should fail when two ArrayBuffer objects with the same content are compared", () => {
    const buffer1 = new ArrayBuffer(8);
    const buffer2 = buffer1;
    expect(buffer1).not.toBe(buffer2);
  });

  it("should fail when two BigInt values with the same value are compared", () => {
    const bigInt1 = BigInt(123);
    const bigInt2 = bigInt1;
    expect(bigInt1).not.toBe(bigInt2);
  });

  it("should fail when typed arrays with the same content are compared", () => {
    const arrA = new Uint8Array([1, 2, 3]);
    const arrB = arrA;
    expect(arrA).not.toBe(arrB);
  });

  it("should fail when typed arrays of the same types are compared", () => {
    const arrA = new Uint8Array([1, 2, 3]);
    const arrB = arrA;
    expect(arrA).not.toBe(arrB);
  });

  it("should fail when two Set objects with the same content and references are compared", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = set1;
    expect(set1).not.toBe(set2);
  });

  it("should fail when two RegExp objects with the same pattern and references are compared", () => {
    const regExp1 = /abc/;
    const regExp2 = regExp1;
    expect(regExp1).not.toBe(regExp2);
  });

  it("should fail when two Error objects with the same message and references are compared", () => {
    const error1 = new Error("Something went wrong");
    const error2 = error1;
    expect(error1).not.toBe(error2);
  });

  it("should fail when two promises with the same references are compared", () => {
    const promise1 = Promise.resolve("resolved");
    const promise2 = promise1;
    expect(promise1).not.toBe(promise2);
  });

  it("should fail when two Typed Arrays of the same types and content are compared", () => {
    const arrA = new Float32Array([1, 2, 3]);
    const arrB = arrA;
    expect(arrA).not.toBe(arrB);
  });

  it("should fail when two DataView objects with the same references are compared", () => {
    const buffer = new ArrayBuffer(8);
    const view1 = new DataView(buffer);
    const view2 = view1;
    expect(view1).not.toBe(view2);
  });

  it("should fail when SharedArrayBuffer objects with the same references are compared", () => {
    const buffer1 = new SharedArrayBuffer(8);
    const buffer2 = buffer1;
    expect(buffer1).not.toBe(buffer2);
  });
});
