import { isNumber } from './is-number'

export const isInteger = (value: any): boolean => {
  return isNumber(value) && Number.isInteger(value)
}
