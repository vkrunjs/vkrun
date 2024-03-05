import * as util from '../utils'

export const deepEqual = (value: any, valueToCompare: any): boolean => {
  if (typeof value !== typeof valueToCompare) {
    return false
  }
  if (util.isDate(value) && valueToCompare instanceof Date) {
    return value.getTime() === valueToCompare.getTime()
  }

  if (
    !util.isArray(value) && util.isObject(value) && value !== null &&
    !util.isArray(valueToCompare) && util.isObject(valueToCompare) && valueToCompare !== null
  ) {
    const keysA = Object.keys(value)
    const keysB = Object.keys(valueToCompare)

    if (keysA.length !== keysB.length || !keysA.every(key => keysB.includes(key))) {
      return false
    }

    return keysA.every(key => deepEqual(value[key], valueToCompare[key]))
  }

  if (util.isArray(value) && util.isArray(valueToCompare)) {
    if (value.length !== valueToCompare.length) {
      return false
    }

    return value.every((value, index) => deepEqual(value, valueToCompare[index]))
  }

  return value === valueToCompare
}
