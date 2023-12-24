import { DateTypes, TimeTypes, ArrayTypes } from '../types'

const addValidation = (method: string, params?: any): any[] => {
  return {
    method,
    private: true,
    ...params
  }
}

export const string = (customError?: Error): any => {
  return addValidation('string', { customError })
}

export const minWord = (minWord: number, customError?: Error): any => {
  return addValidation('minWord', { minWord, customError })
}

export const maxLength = (maxLength: number, customError?: Error): any => {
  return addValidation('maxLength', { maxLength, customError })
}

export const minLength = (minLength: number, customError?: Error): any => {
  return addValidation('minLength', { minLength, customError })
}

export const uuid = (customError?: Error): any => {
  return addValidation('uuid', { customError })
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

export const date = (type: DateTypes, customError?: Error): any => {
  return addValidation('date', { dateType: type, customError })
}

export const dateGreaterThan = (dateToCompare: Date, customError?: Error): any => {
  return addValidation('dateGreaterThan', { dateToCompare, customError })
}

export const dateLessThan = (dateToCompare: Date, customError?: Error): any => {
  return addValidation('dateLessThan', { dateToCompare, customError })
}

export const time = (type: TimeTypes, customError?: Error): any => {
  return addValidation('time', { timeType: type, customError })
}

export const notRequired = (): any => {
  return addValidation('notRequired')
}

export const array = (arrayType?: ArrayTypes): any => {
  return [addValidation('array', { arrayType: arrayType ?? 'any' })]
}
