import * as util from '../utils'

export const isNotEqual = (value: any, valueToCompare: any): boolean => {
  return !util.isEqual(value, valueToCompare)
}
