import { SchemaReturn } from '../types'
import { isEqual } from './is-equal'

export const notOneOf = (value: any, comparisonItems: SchemaReturn[] | any[]): boolean => {
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
      return false
    }
  }
  return true
}
