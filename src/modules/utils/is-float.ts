import { isNumber } from './is-number'

export const isFloat = (value: any): boolean => {
  return isNumber(value) && Number.isFinite(value) && !Number.isInteger(value) && value % 1 !== 0
}
