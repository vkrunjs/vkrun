import { isDate } from "util/types";
import { isArray } from "./is-array";
import { isObject } from "./is-object";

export const isEqual = (value: any, valueToCompare: any): boolean => {
  if (Number.isNaN(value) && Number.isNaN(valueToCompare)) {
    return true;
  } else if (typeof value !== typeof valueToCompare) {
    return false;
  } else if (typeof value === "symbol" && typeof valueToCompare === "symbol") {
    return value === valueToCompare;
  } else if (typeof Buffer !== "undefined" && Buffer.isBuffer(value) && Buffer.isBuffer(valueToCompare)) {
    return value.equals(valueToCompare);
  } else if (typeof value === "function" && typeof valueToCompare === "function") {
    return value === valueToCompare;
  } else if (isDate(value) && isDate(valueToCompare)) {
    return value.getTime() === valueToCompare.getTime();
  } else if (value instanceof RegExp && valueToCompare instanceof RegExp) {
    return value.source === valueToCompare.source && value.flags === valueToCompare.flags;
  } else if (ArrayBuffer.isView(value) && ArrayBuffer.isView(valueToCompare)) {
    if (Object.getPrototypeOf(value).constructor !== Object.getPrototypeOf(valueToCompare).constructor) {
      return false;
    }

    if (value.byteLength !== valueToCompare.byteLength) {
      return false;
    }

    for (let i = 0; i < (value as any).length; i++) {
      if ((value as any)[i] !== (valueToCompare as any)[i]) {
        return false;
      }
    }

    return true;
  } else if (value instanceof ArrayBuffer && valueToCompare instanceof ArrayBuffer) {
    if (value.byteLength !== valueToCompare.byteLength) {
      return false;
    }
    const viewA = new Uint8Array(value);
    const viewB = new Uint8Array(valueToCompare);
    for (let i = 0; i < viewA.length; i++) {
      if (viewA[i] !== viewB[i]) {
        return false;
      }
    }
    return true;
  } else if (value instanceof Map && valueToCompare instanceof Map) {
    if (value.size !== valueToCompare.size) {
      return false;
    }
    for (const [key, valA] of value) {
      if (!valueToCompare.has(key)) {
        return false;
      }
      const valB = valueToCompare.get(key);
      if (!isEqual(valA, valB)) {
        return false;
      }
    }
    return true;
  } else if (value instanceof Set && valueToCompare instanceof Set) {
    if (value.size !== valueToCompare.size) {
      return false;
    }

    for (const valA of value) {
      let found = false;
      for (const valB of valueToCompare) {
        if (isEqual(valA, valB)) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  } else if (isArray(value) && isArray(valueToCompare)) {
    if (value.length !== valueToCompare.length) {
      return false;
    }
    return value.every((item, i) => isEqual(item, valueToCompare[i]));
  } else if (isObject(value) && isObject(valueToCompare)) {
    const keysA = Object.keys(value);
    const keysB = Object.keys(valueToCompare);

    if (keysA.length !== keysB.length) {
      return false;
    }

    if (!keysA.every((key) => keysB.includes(key))) {
      return false;
    }

    return keysA.every((key) => isEqual(value[key], valueToCompare[key]));
  }

  return value === valueToCompare;
};
