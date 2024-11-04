import { isDate } from 'util/types'
import { isArray } from './is-array'
import { isObject } from './is-object'

export const isEqual = (value: any, valueToCompare: any): boolean => {
  if (typeof value !== typeof valueToCompare) {
    return false
  }
  if (isDate(value) && valueToCompare instanceof Date) {
    return value.getTime() === valueToCompare.getTime()
  }

  if (
    !isArray(value) && isObject(value) && value !== null &&
    !isArray(valueToCompare) && isObject(valueToCompare) && valueToCompare !== null
  ) {
    const keysA = Object.keys(value)
    const keysB = Object.keys(valueToCompare)

    if (keysA.length !== keysB.length || !keysA.every(key => keysB.includes(key))) {
      return false
    }

    return keysA.every(key => isEqual(value[key], valueToCompare[key]))
  }

  if (isArray(value) && isArray(valueToCompare)) {
    if (value.length !== valueToCompare.length) {
      return false
    }

    return value.every((value, index) => isEqual(value, valueToCompare[index]))
  }

  return value === valueToCompare
}
