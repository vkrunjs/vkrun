import { Validator } from './validator'

export interface IValidator {
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
  throw: (ClassError?: ErrorTypes) => void
  validate: () => Tests
}
export type ValidatorValue = string | boolean | Date | number | undefined | null
export type ValidatorValueName = string
export interface ObjectConfig {
  error?: ErrorTypes
}
export type DateTypes = 'ISO8601' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM' | 'YYYY-MM-DD' | 'YYYY-DD-MM'
export type ErrorClass<T extends Error> = new (message?: string) => T
export type ErrorTypes = any // ErrorClass
export type ValidatePropertyKey = string
export type ValidatePropertyValue = any
export type Methods = Array<{
  method: 'string' | 'email' | 'uuid' | 'minWord' | 'maxLength' | 'minLength' | 'required' | 'notRequired' | 'number' | 'float' | 'integer' | 'boolean' | 'date' | 'dateGreaterThan' | 'dateLessThan' | 'time'
  minWord?: number
  maxLength?: number
  minLength?: number
  dateType?: DateTypes
  dateToCompare?: Date
  timeType?: TimeTypes
  private?: boolean
}>
export type MethodTypes = 'object' | 'array' | 'string' | 'email' | 'uuid' | 'minWord' | 'maxLength' | 'minLength' | 'required' | 'notRequired' | 'number' | 'float' | 'integer' | 'boolean' | 'date' | 'dateGreaterThan' | 'dateLessThan' | 'time' | 'alias'
export type ValidatePropertyRules = Array<{
  method: MethodTypes
  arrayType?: 'string' | 'number' | 'boolean' | 'any' | 'date' | 'strict' | 'object' | Record<string, Validator[]>
  arrayRules?: any
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
  method: MethodTypes
  arrayType?: 'string' | 'number' | 'boolean' | 'any' | 'date' | 'strict' | 'object' | Record<string, Validator[]>
  arrayRules?: any
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
export type Schema = Record<string, Validator[]>
export type ObjectType = Record<string, any>
export type SchemaConfig = ObjectConfig
export interface SetTranslationMessage {
  validator?: {
    constructorParams?: {
      valueName?: {
        missingClassParam?: string
        invalidClassParam?: string
      }
    }
    method?: {
      string?: {
        strict?: string
      }
      minWord?: {
        noMinimumWords?: string
      }
      uuid?: {
        strict?: string
      }
      email?: {
        strict?: string
      }
      maxLength?: {
        strict?: string
      }
      minLength?: {
        strict?: string
      }
      number?: {
        strict?: string
      }
      float?: {
        strict?: string
      }
      integer?: {
        strict?: string
      }
      boolean?: {
        strict?: string
      }
      required?: {
        strict?: string
      }
      date?: {
        invalidFormat?: string
        invalidParameter?: string
      }
      dateGreaterThan?: {
        invalidDate?: string
        limitExceeded?: string
      }
      dateLessThan?: {
        invalidDate?: string
        limitExceeded?: string
      }
      time?: {
        invalidParameter?: string
        invalidFormat?: string
      }
    }
  }
  schema?: {
    validateProperty?: {
      itemArray?: {
        valueName?: string
      }
    }
    validateSchema?: {
      keyNotDeclaredInTheSchema?: string
    }
    validateObject?: {
      schemaKeyAbsent?: string
      notIsArray?: string
    }
  }
}
export interface InformativeMessage {
  validator: {
    constructorParams: {
      valueName: {
        missingClassParam: string
        invalidClassParam: string
      }
    }
    method: {
      string: {
        strict: string
      }
      minWord: {
        noMinimumWords: string
      }
      uuid: {
        strict: string
      }
      email: {
        strict: string
      }
      maxLength: {
        strict: string
      }
      minLength: {
        strict: string
      }
      number: {
        strict: string
      }
      float: {
        strict: string
      }
      integer: {
        strict: string
      }
      boolean: {
        strict: string
      }
      required: {
        strict: string
      }
      date: {
        invalidFormat: string
      }
      dateGreaterThan: {
        invalidDate: string
        limitExceeded: string
      }
      dateLessThan: {
        invalidDate: string
        limitExceeded: string
      }
      time: {
        invalidParameter: string
        invalidFormat: string
      }
    }
  }
  schema: {
    constructorParams: {
      schema: string
    }
    validateProperty: {
      itemArray: {
        valueName: string
      }
    }
    validateObject: {
      schemaKeyAbsent: string
      notIsArray: string
      notIsObject: string
    }
  }
}
export type AnyInformativeMessage = InformativeMessage & Record<string, any>
export interface Tests {
  passedAll: boolean
  passed: number
  failed: number
  totalTests: number
  successes: SuccessTest[]
  errors: ErrorTest[]
  time: string
}
export interface ErrorTest {
  class?: string
  method?: string
  type: 'invalid param' | 'invalid value' | 'missing value' | 'missing key'
  name: string
  expect: string
  received: any
  message: string
}
export interface SuccessTest {
  class?: string
  method?: string
  name: string
  expect: string
  received: any
}
export interface ValidateMethodParams {
  keyName: string
  value: any
  schemaRules: any
  callbackValidateValue: (object: ObjectType, schema: ObjectType) => Promise<void>
  callbackUpdateTest: (test: Tests) => void
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}
export interface SelectSchemaFormat {
  value: ObjectType
  schema: ObjectType
  callbackValidateValue: (object: ObjectType, schema: ObjectType) => Promise<void>
  callbackUpdateTest: (test: Tests) => void
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}
