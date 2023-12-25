import { DateTypes, TimeTypes, ArrayTypes } from '../../types'

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
  return addValidation('maxLength')
}

export const minLength = (minLength: number): any => {
  return addValidation('minLength', { minLength })
}

export const uuid = (): any => {
  return addValidation('uuid')
}

export const email = (customError?: Error): any => {
  return addValidation('email', { customError })
}

export const number = (customError?: Error): any => {
  return addValidation('number', { customError })
}

export const float = (customError?: Error): any => {
  return addValidation('float', { customError })
}

export const integer = (customError?: Error): any => {
  return addValidation('integer', { customError })
}

export const boolean = (customError?: Error): any => {
  return addValidation('boolean', { customError })
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

export const array = (arrayType?: ArrayTypes): any => {
  return [addValidation('array', { arrayType: arrayType ?? 'any' })]
}
