import { isArray } from "./is-array";
import { isObject } from "./is-object";
import { isString } from "./is-string";

export const isEmpty = (value: string | any[] | object): value is "" => {
  if (isString(value) && value === "") return true;
  if (isArray(value) && value.length === 0) return true;
  if (isObject(value) && Object.keys(value).length === 0) return true;
  return false;
};
