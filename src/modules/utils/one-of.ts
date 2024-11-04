import { isEqual } from './is-equal'

export const oneOf = (value: any, comparisonItems: any[]): boolean => {
  for (const item of comparisonItems) {
    if (isEqual(value, item)) {
      return true
    }
  }
  return false
}
