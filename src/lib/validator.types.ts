export interface IValidator {
  required: (returnError?: Error) => boolean | Error
  minWord: (minWord: number, returnError?: Error) => boolean | Error
  isEmail: (returnError?: Error) => boolean | Error
  isUuid: (returnError?: Error) => boolean | Error
  maxLength: (maxLength: number, returnError?: Error) => boolean | Error
  minLength: (minLength: number, returnError?: Error) => boolean | Error
  isString: (returnError?: Error) => boolean | Error
  isNumber: (returnError?: Error) => boolean | Error
  isBoolean: (returnError?: Error) => boolean | Error
  isFloat: (returnError?: Error) => boolean | Error
  isInteger: (returnError?: Error) => boolean | Error
  isDate: (type: DateTypes, returnError?: Error) => boolean | Error
  dateGreaterThan: (dateToCompare: Date, returnError?: Error) => boolean | Error
  dateLessThan: (dateToCompare: Date, returnError?: Error) => boolean | Error
  isTime: (type: 'HH:MM' | 'HH:MM:SS', returnError?: Error) => boolean | Error
}

export type DateTypes = 'ISO8601' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM' | 'YYYY-MM-DD' | 'YYYY-DD-MM'
export type ErrorTypes = 'MISSING_PARAM' | 'INVALID_PARAM' | 'SERVER_ERROR'
