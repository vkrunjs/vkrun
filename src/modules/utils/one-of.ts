import * as util from '../utils'

export const oneOf = (value: any, comparisonItems: any[]): boolean => {
  for (const item of comparisonItems) {
    if (util.isEqual(value, item)) {
      return true
    }
  }
  return false
}
