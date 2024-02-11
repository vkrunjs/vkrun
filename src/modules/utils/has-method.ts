import { MethodTypes } from '../schema/types'

export const hasMethod = (value: any, method: MethodTypes): boolean => {
  if (!value) return false
  return value.some((rule: any) => rule?.method === method)
}
