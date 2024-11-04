import { isEqual } from './is-equal'

export const notOneOf = (value: any, comparisonItems: any[]): boolean => {
  for (const item of comparisonItems) {
    if (isEqual(value, item)) {
      return false
    }
  }
  return true
}
