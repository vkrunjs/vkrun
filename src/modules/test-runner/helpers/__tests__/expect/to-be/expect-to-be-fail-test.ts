import { describe, expect, it } from "../../../..";

describe("Expect toBe Method - Failure Cases", () => {
  it("should fail when the numbers are not equal", () => {
    expect(42).toBe(43);
  });

  it("should fail when the strings are not equal", () => {
    expect("hello").toBe("world");
  });

  it("should fail when the booleans are not equal", () => {
    expect(true).toBe(false);
  });

  it("should fail when undefined is compared to a defined value", () => {
    const undefinedVar = undefined;
    expect(undefinedVar).toBe(42);
  });

  it("should fail when null is compared to a non-null value", () => {
    expect(null).toBe(42);
  });

  it("should fail when NaN is compared to a number", () => {
    expect(NaN).toBe(42);
  });

  it("should fail when objects with different references are compared", () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    expect(obj1).toBe(obj2);
  });

  it("should fail when functions with different references are compared", () => {
    const fn1 = () => {};
    const fn2 = () => {};
    expect(fn1).toBe(fn2);
  });

  it("should fail when arrays with different references are compared", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(arr1).toBe(arr2);
  });

  it("should fail when dates with different references are compared", () => {
    const date1 = new Date(2023, 1, 1);
    const date2 = new Date(2023, 1, 1);
    expect(date1).toBe(date2);
  });

  it("should fail when buffers with different references are compared", () => {
    const buffer1 = Buffer.from("hello");
    const buffer2 = Buffer.from("hello");
    expect(buffer1).toBe(buffer2);
  });

  it("should fail when two symbols with the same description are compared", () => {
    const symbol1 = Symbol("example");
    const symbol2 = Symbol("example");
    expect(symbol1).toBe(symbol2);
  });

  it("should fail when two Map objects with the same content are compared", () => {
    const map1 = new Map();
    const map2 = new Map();
    map1.set("key1", "value1");
    map2.set("key1", "value1");
    expect(map1).toBe(map2);
  });

  it("should fail when two WeakMap objects with the same content are compared", () => {
    const weakMap1 = new WeakMap();
    const weakMap2 = new WeakMap();
    const obj = { key: "content" };
    weakMap1.set(obj, "value");
    weakMap2.set(obj, "value");
    expect(weakMap1).toBe(weakMap2);
  });

  it("should fail when two WeakSet objects with the same content are compared", () => {
    const weakSet1 = new WeakSet();
    const weakSet2 = new WeakSet();
    const obj = { key: "content" };
    weakSet1.add(obj);
    weakSet2.add(obj);
    expect(weakSet1).toBe(weakSet2);
  });

  it("should fail when two ArrayBuffer objects with the same content are compared", () => {
    const buffer1 = new ArrayBuffer(8);
    const buffer2 = new ArrayBuffer(8);
    expect(buffer1).toBe(buffer2);
  });

  it("should fail when two BigInt values are compared", () => {
    const bigInt1 = BigInt(123);
    const bigInt2 = BigInt(124);
    expect(bigInt1).toBe(bigInt2);
  });

  it("should fail when typed arrays with different content are compared", () => {
    const arrA = new Uint8Array([1, 2, 3]);
    const arrB = new Uint8Array([1, 2, 4]);
    expect(arrA).toBe(arrB);
  });

  it("should fail when typed arrays of different types are compared", () => {
    const arrA = new Uint8Array([1, 2, 3]);
    const arrB = new Int8Array([1, 2, 3]);
    expect(arrA).toBe(arrB);
  });

  it("should fail when two Set objects with the same content are compared", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3]);
    expect(set1).toBe(set2);
  });

  it("should fail when two RegExp objects with the same pattern are compared", () => {
    const regExp1 = /abc/;
    const regExp2 = /abc/;
    expect(regExp1).toBe(regExp2);
  });

  it("should fail when two Error objects with the same message are compared", () => {
    const error1 = new Error("Something went wrong");
    const error2 = new Error("Something went wrong");
    expect(error1).toBe(error2);
  });

  it("should fail when two promises with different references are compared", () => {
    const promise1 = new Promise((resolve) => resolve("resolved"));
    const promise2 = new Promise((resolve) => resolve("resolved"));
    expect(promise1).toBe(promise2);
  });

  it("should fail when two Promise objects with different states are compared", () => {
    const promise1 = Promise.resolve("resolved");
    const promise2 = Promise.reject("rejected");
    expect(promise1).toBe(promise2);
  });

  it("should fail when two Typed Arrays of different types are compared", () => {
    const arrA = new Float32Array([1, 2, 3]);
    const arrB = new Uint32Array([1, 2, 3]);
    expect(arrA).toBe(arrB);
  });

  it("should fail when two DataView objects with different references are compared", () => {
    const buffer = new ArrayBuffer(8);
    const view1 = new DataView(buffer);
    const view2 = new DataView(buffer);
    expect(view1).toBe(view2);
  });

  it("should fail when SharedArrayBuffer objects with different content are compared", () => {
    const buffer1 = new SharedArrayBuffer(8);
    const buffer2 = new SharedArrayBuffer(8);
    expect(buffer1).toBe(buffer2);
  });
});
