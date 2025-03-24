import { isEqual, isFunction, isRegExp, isString } from "../../../../utils";

export const matchers = {
  toBe: (expected: any, received: any, flags?: { not?: boolean }) => {
    let pass = Object.is(received, expected);
    return flags?.not ? !pass : pass;
  },

  toEqual: (expected: any, received: any, flags?: { not?: boolean }) => {
    const pass = isEqual(received, expected);
    return flags?.not ? !pass : pass;
  },

  toBeFalsy: (received: any, flags?: { not?: boolean }) => {
    const pass = !received;
    return flags?.not ? !pass : pass;
  },

  toBeTruthy: (received: any, flags?: { not?: boolean }) => {
    const pass = !!received;
    return flags?.not ? !pass : pass;
  },

  toThrow: (expected: any, received: any, flags?: { not?: boolean }) => {
    if (!isFunction(received)) {
      return false;
    }

    let pass = false;
    let errorThrown = false;
    let errorName = "";
    let errorMessage = "";
    let errorType: any = null;

    try {
      received();
    } catch (error: any) {
      errorThrown = true;
      errorName = error.name;
      errorMessage = error.message;
      errorType = error.constructor;
    }

    if (!errorThrown) {
      pass = false;
    } else if (isRegExp(expected)) {
      pass = expected.test(errorMessage);
    } else if (typeof expected === "function" && expected.prototype instanceof Error) {
      pass = errorType === expected;
    } else if (expected instanceof Error && errorThrown) {
      if (expected.name === errorName && expected.message === errorMessage) {
        pass = true;
      }
    } else if (isString(expected)) {
      pass = errorMessage === expected;
    } else {
      pass = true;
    }

    return flags?.not ? !pass : pass;
  },
};
