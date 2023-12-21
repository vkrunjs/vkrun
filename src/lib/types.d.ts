export interface IValidex {
  required: (returnError?: Error) => this
  minWord: (minWord: number, returnError?: Error) => this
  email: (returnError?: Error) => this
  uuid: (returnError?: Error) => this
  maxLength: (maxLength: number, returnError?: Error) => this
  minLength: (minLength: number, returnError?: Error) => this
  string: (returnError?: Error) => this
  number: (returnError?: Error) => this
  boolean: (returnError?: Error) => this
  float: (returnError?: Error) => this
  integer: (returnError?: Error) => this
  date: (type: DateTypes, returnError?: Error) => this
  dateGreaterThan: (dateToCompare: Date, returnError?: Error) => this
  dateLessThan: (dateToCompare: Date, returnError?: Error) => this
  time: (type: 'HH:MM' | 'HH:MM:SS', returnError?: Error) => this
  validate: () => boolean
}
export type ValidexValue = string | boolean | Date | number | undefined | null
export type ValidexValueName = string
export interface ObjectConfig {
  errorType: ErrorTypes
}
export type DateTypes = 'ISO8601' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM' | 'YYYY-MM-DD' | 'YYYY-DD-MM'
export type ErrorTypes = 'MISSING_PARAM' | 'INVALID_PARAM' | 'SERVER_ERROR'
export type ValidatePropertyKey = string
export type ValidatePropertyValue = any
export type ValidatePropertyRules = Array<{
  method: 'array' | 'string' | 'email' | 'uuid' | 'minWord' | 'maxLength' | 'minLength' | 'required' | 'number' | 'float' | 'integer' | 'boolean' | 'date' | 'dateGreaterThan' | 'dateLessThan' | 'time'
  arrayType: 'string' | 'number' | 'boolean' | 'any' | 'date' | Record<string, Validex[]>
  minWord?: number
  maxLength?: number
  minLength?: number
  dateType?: DateTypes
  dateToCompare?: Date
  timeType?: TimeTypes
  private?: boolean
  customError?: Error
}>
export type ValidateItemArrayValue = string | boolean | Date | number
export type TimeTypes = 'HH:MM' | 'HH:MM:SS'
export type Schema = Record<string, Validex[]>
export type ObjectType = Record<string, any>
export type SchemaConfig = ObjectConfig
