import { isNumber } from "./is-number";

export const isInteger = (value: any): value is number => {
  return isNumber(value) && Number.isInteger(value);
};
