import { isPromise } from "../is-promise";

describe("isPromise", () => {
  const asyncFunction = async () => true;
  const syncFunction = () => 42;
  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 5);
    });
  };
  const promise = Promise.resolve("test");

  it("should return true for an async function", () => {
    expect(isPromise(asyncFunction)).toBeTruthy();
  });

  it("should return false for a regular function", () => {
    expect(isPromise(syncFunction)).toBeFalsy();
  });

  it("should return true for a Promise", () => {
    expect(isPromise(promise)).toBeTruthy();
  });

  it("should return true for a thenable object", () => {
    const thenable = { then: () => {}, catch: () => {} };
    expect(isPromise(thenable)).toBeFalsy();
  });

  it("should return false for a function that returns a Promise (without execution)", () => {
    expect(isPromise(fetchData)).toBeTruthy();
  });

  it("should return false for primitive values", () => {
    expect(isPromise(42)).toBeFalsy();
    expect(isPromise("string")).toBeFalsy();
    expect(isPromise(null)).toBeFalsy();
    expect(isPromise(undefined)).toBeFalsy();
    expect(isPromise(true)).toBeFalsy();
  });

  it("should return false for regular objects", () => {
    expect(isPromise({})).toBeFalsy();
    expect(isPromise([])).toBeFalsy();
  });

  it("should return false for generator functions", () => {
    function* generator() {
      yield 1;
    }
    expect(isPromise(generator)).toBeFalsy();
  });
});
