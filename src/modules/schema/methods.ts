import { DateTypes, TimeTypes } from '../types'

const addValidation = (method: string, params?: any): any[] => {
  return { method, private: true, ...params }
}

export const string = (): any => {
  return addValidation('string')
}

export const minWord = (minWord: number): any => {
  return addValidation('minWord', { minWord })
}

export const maxLength = (maxLength: number): any => {
  return addValidation('maxLength', { maxLength })
}

export const minLength = (minLength: number): any => {
  return addValidation('minLength', { minLength })
}

export const uuid = (): any => {
  return addValidation('uuid')
}

export const email = (): any => {
  return addValidation('email')
}

export const number = (): any => {
  return addValidation('number')
}

export const float = (): any => {
  return addValidation('float')
}

export const integer = (): any => {
  return addValidation('integer')
}

export const boolean = (): any => {
  return addValidation('boolean')
}

export const date = (type?: DateTypes): any => {
  return addValidation('date', { dateType: type })
}

export const dateGreaterThan = (dateToCompare: Date): any => {
  return addValidation('dateGreaterThan', { dateToCompare })
}

export const dateLessThan = (dateToCompare: Date): any => {
  return addValidation('dateLessThan', { dateToCompare })
}

export const time = (type: TimeTypes): any => {
  return addValidation('time', { timeType: type })
}

export const notRequired = (): any => {
  return addValidation('notRequired')
}

export const array: {
  string: any
  number: any
  boolean: any
  date: (type?: DateTypes) => void
  strict: (array: any[]) => void
  object: (object: any) => void
  any: any
} = {
  string: () => [addValidation('array', { arrayType: 'string' })],
  number: () => [addValidation('array', { arrayType: 'number' })],
  boolean: () => [addValidation('array', { arrayType: 'boolean' })],
  date: (type?: DateTypes) => [addValidation('array', { arrayType: 'date', dateType: type })],
  strict: (array: any[]) => [addValidation('array', { arrayType: 'strict', arrayRules: array })],
  object: (object: any) => [addValidation('array', { arrayType: 'object', arrayRules: object })],
  any: () => [addValidation('array', { arrayType: 'any' })]
}
