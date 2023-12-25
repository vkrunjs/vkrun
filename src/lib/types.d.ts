export interface IValidex {
  required: () => this
  minWord: (minWord: number) => this
  email: () => this
  uuid: () => this
  maxLength: (maxLength: number) => this
  minLength: (minLength: number) => this
  string: () => this
  number: () => this
  boolean: () => this
  float: () => this
  integer: () => this
  date: (type: DateTypes) => this
  dateGreaterThan: (dateToCompare: Date) => this
  dateLessThan: (dateToCompare: Date) => this
  time: (type: 'HH:MM' | 'HH:MM:SS') => this
  validate: () => boolean
}
export type ValidexValue = string | boolean | Date | number | undefined | null
export type ValidexValueName = string
export interface ObjectConfig {
  errorType?: ErrorTypes
}
export type DateTypes = 'ISO8601' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM' | 'YYYY-MM-DD' | 'YYYY-DD-MM'
export type ErrorClass<T extends Error> = new (message?: string) => T
export type ErrorTypes = ErrorClass
export type ValidatePropertyKey = string
export type ValidatePropertyValue = any
export type ValidatePropertyRules = Array<{
  method: 'array' | 'string' | 'email' | 'uuid' | 'minWord' | 'maxLength' | 'minLength' | 'required' | 'notRequired' | 'number' | 'float' | 'integer' | 'boolean' | 'date' | 'dateGreaterThan' | 'dateLessThan' | 'time'
  arrayType?: 'string' | 'number' | 'boolean' | 'any' | 'date' | Record<string, Validex[]>
  minWord?: number
  maxLength?: number
  minLength?: number
  dateType?: DateTypes
  dateToCompare?: Date
  timeType?: TimeTypes
  private?: boolean
  customError?: Error
}>
export interface ValidatePropertyRule {
  method: 'array' | 'string' | 'email' | 'uuid' | 'minWord' | 'maxLength' | 'minLength' | 'required' | 'notRequired' | 'number' | 'float' | 'integer' | 'boolean' | 'date' | 'dateGreaterThan' | 'dateLessThan' | 'time'
  arrayType?: 'string' | 'number' | 'boolean' | 'any' | 'date' | Record<string, Validex[]>
  minWord?: number
  maxLength?: number
  minLength?: number
  dateType?: DateTypes
  dateToCompare?: Date
  timeType?: TimeTypes
  private?: boolean
  customError?: Error
}
export type ValidateItemArrayValue = string | boolean | Date | number
export type TimeTypes = 'HH:MM' | 'HH:MM:SS'
export type Schema = Record<string, Validex[]>
export type ObjectType = Record<string, any>
export type SchemaConfig = ObjectConfig
export type ArrayTypes = 'string' | 'number' | 'boolean' | 'date' | Schema
