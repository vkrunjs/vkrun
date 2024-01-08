import { isObject } from './is-object'

export const isNotEmpty = (value: any): boolean => (
  (isObject(value)) ||
  (Array.isArray(value) && value.length > 0) ||
  (typeof value === 'boolean') ||
  (typeof value === 'number') ||
  (value instanceof Date) ||
  (typeof value === 'string' && value !== '' && value !== null && value !== undefined)
)
