import { isArray } from './is-array'
import { isString } from './is-string'

export const isEmpty = (value: string | any[]): value is '' => {
  if (isString(value) && value === '') return true
  if (isArray(value) && value.length === 0) return true
  return false
}
