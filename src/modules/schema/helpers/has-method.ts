import * as type from '../../types'

export const hasMethod = (value: any, method: type.MethodTypes): boolean => {
  if (!value) return false
  return value.some((rule: any) => rule?.method === method)
}
