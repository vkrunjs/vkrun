import { isEqual } from "./is-equal";

export const isNotEqual = (value: any, valueToCompare: any): boolean => {
  return !isEqual(value, valueToCompare);
};
