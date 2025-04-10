import { SchemaReturnCommonMethods } from "../types";
import { isEqual } from "./is-equal";

export const oneOf = (value: any, comparisonItems: SchemaReturnCommonMethods<any, any>[] | any[]): boolean => {
  for (const comparisonItem of comparisonItems) {
    if (
      (comparisonItem.throw &&
        comparisonItem.throwAsync &&
        comparisonItem.validate &&
        comparisonItem.validateAsync &&
        comparisonItem.test &&
        comparisonItem.testAsync &&
        comparisonItem.validate(value)) ||
      isEqual(value, comparisonItem)
    ) {
      return true;
    }
  }
  return false;
};
