export interface IValidator {
  required: (returnError?: Error) => boolean | Error
  minWord: (minWord: number, returnError?: Error) => boolean | Error
  email: (returnError?: Error) => boolean | Error
  uuid: (returnError?: Error) => boolean | Error
  maxLength: (maxLength: number, returnError?: Error) => boolean | Error
  minLength: (minLength: number, returnError?: Error) => boolean | Error
  string: (returnError?: Error) => boolean | Error
  number: (returnError?: Error) => boolean | Error
  boolean: (returnError?: Error) => boolean | Error
  float: (returnError?: Error) => boolean | Error
  integer: (returnError?: Error) => boolean | Error
  date: (type: DateTypes, returnError?: Error) => boolean | Error
  dateGreaterThan: (dateToCompare: Date, returnError?: Error) => boolean | Error
  dateLessThan: (dateToCompare: Date, returnError?: Error) => boolean | Error
  time: (type: 'HH:MM' | 'HH:MM:SS', returnError?: Error) => boolean | Error
}

export type DateTypes = 'ISO8601' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM' | 'YYYY-MM-DD' | 'YYYY-DD-MM'
export type ErrorTypes = 'MISSING_PARAM' | 'INVALID_PARAM' | 'SERVER_ERROR'
