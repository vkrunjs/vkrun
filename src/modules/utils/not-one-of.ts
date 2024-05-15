import * as util from '../utils'

export const notOneOf = (value: any, comparisonItems: any[]): boolean => {
  for (const item of comparisonItems) {
    if (util.isEqual(value, item)) {
      return false
    }
  }
  return true
}
