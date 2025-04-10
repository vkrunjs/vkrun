import { isFunction } from "../is-function";

describe("isFunction", () => {
  it("Should return true for a function with no parameters", () => {
    const noParamFunction = (): void => {};
    expect(isFunction(noParamFunction)).toBeTruthy();
  });

  it("Should return true for a function with parameters", () => {
    const paramFunction = (x: number, y: number): number => x + y;
    expect(isFunction(paramFunction)).toBeTruthy();
  });

  it("Should return true for a named function with parameters", () => {
    function namedFunction(x: number, y: number): number {
      return x + y;
    }
    expect(isFunction(namedFunction)).toBeTruthy();
  });

  it("Should return false for a string", () => {
    const notAFunction = "Hello World";
    expect(isFunction(notAFunction)).toBeFalsy();
  });

  it("Should return false for a number", () => {
    const notAFunction = 123;
    expect(isFunction(notAFunction)).toBeFalsy();
  });

  it("Should return false for an object", () => {
    const notAFunction = {};
    expect(isFunction(notAFunction)).toBeFalsy();
  });

  it("Should return false for an array", () => {
    const notAFunction = [1, 2, 3];
    expect(isFunction(notAFunction)).toBeFalsy();
  });

  it("Should return false for null", () => {
    const notAFunction = null;
    expect(isFunction(notAFunction)).toBeFalsy();
  });

  it("Should return false for undefined", () => {
    const notAFunction = undefined;
    expect(isFunction(notAFunction)).toBeFalsy();
  });

  it("Should return false for a class constructor", () => {
    // eslint-disable-next-line @typescript-eslint/no-extraneous-class
    class ClassNotAFunction {}
    expect(isFunction(ClassNotAFunction)).toBeFalsy();
  });
});
