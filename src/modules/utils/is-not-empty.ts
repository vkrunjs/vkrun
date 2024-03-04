import { isArray } from './is-array'
import { isString } from './is-string'

export const isNotEmpty = (value: string | any[]): boolean => {
  if (isString(value) && value !== '') return true
  if (isArray(value) && value.length > 0) return true
  if (typeof value === 'object' && Object.keys(value).length > 0) return true
  return false
}
