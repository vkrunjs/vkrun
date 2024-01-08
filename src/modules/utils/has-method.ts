import { MethodTypes } from '../types'

export const hasMethod = (value: any, method: MethodTypes): boolean => {
  return value.some((rule: any) => rule?.method === method)
}
