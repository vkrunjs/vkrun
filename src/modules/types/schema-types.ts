import { Schema } from '../schema'
import { UUIDVersion } from './utils-types'

export interface ISchema {
  string: () => StringMethod
  number: () => NumberMethod
  boolean: () => DefaultReturn
  date: (type?: DateTypes) => DateMethod
  alias: (valueName: string) => AliasMethod
  array: () => ArrayMethod
  equal: (valueToCompare: any) => DefaultReturn
  object: (schema: ObjectType) => DefaultReturn
  nullable: () => NullableMethod
  notRequired: () => NotRequiredMethod
  throw: (value: any, valueName: string, ClassError?: ErrorTypes) => void
  throwAsync: (value: any, valueName: string, ClassError?: ErrorTypes) => Promise<void>
  validate: (value: any) => boolean
  validateAsync: (value: any) => Promise<boolean>
  test: (value: any, valueName: string) => Tests
  testAsync: (value: any, valueName: string) => Promise<Tests>
}

export interface DefaultReturn {
  notRequired: () => NotRequiredMethod
  nullable: () => NullableMethod
  throw: (value: any, valueName: string, ClassError?: ErrorTypes) => void
  throwAsync: (value: any, valueName: string, ClassError?: ErrorTypes) => Promise<void>
  validate: (value: any) => boolean
  validateAsync: (value: any) => Promise<boolean>
  test: (value: any, valueName: string) => Tests
  testAsync: (value: any, valueName: string) => Promise<Tests>
}

export interface NotRequiredMethod {
  throw: (value: any, valueName: string, ClassError?: ErrorTypes) => void
  throwAsync: (value: any, valueName: string, ClassError?: ErrorTypes) => Promise<void>
  validate: (value: any) => boolean
  validateAsync: (value: any) => Promise<boolean>
  test: (value: any, valueName: string) => Tests
  testAsync: (value: any, valueName: string) => Promise<Tests>
}

export interface NumberMethod extends DefaultReturn {
  float: () => NumberFloatMethod
  integer: () => NumberIntegerMethod
  min: (value: number) => NumberMinMethod
  max: (value: number) => NumberMaxMethod
  positive: () => NumberPositiveMethod
  negative: () => NumberNegativeMethod
}

export interface NumberFloatMethod extends DefaultReturn {
  min: (value: number) => DefaultReturn & {
    max: (value: number) => DefaultReturn & {
      positive: () => DefaultReturn
      negative: () => DefaultReturn
    }
    positive: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
    negative: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
  }
  max: (value: number) => DefaultReturn & {
    min: (value: number) => DefaultReturn & {
      positive: () => DefaultReturn
      negative: () => DefaultReturn
    }
    positive: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
    negative: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
  }
  positive: () => DefaultReturn & {
    min: (value: number) => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
    max: (value: number) => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
  }
  negative: () => DefaultReturn & {
    min: (value: number) => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
    max: (value: number) => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
  }
}

export type NumberIntegerMethod = NumberFloatMethod

export interface NumberMinMethod extends DefaultReturn {
  float: () => DefaultReturn & {
    max: (value: number) => DefaultReturn & {
      positive: () => DefaultReturn
      negative: () => DefaultReturn
    }
    positive: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
    negative: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
  }
  integer: () => DefaultReturn & {
    max: (value: number) => DefaultReturn & {
      positive: () => DefaultReturn
      negative: () => DefaultReturn
    }
    positive: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
    negative: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
  }
  max: (value: number) => DefaultReturn & {
    float: () => {
      positive: () => DefaultReturn
      negative: () => DefaultReturn
    }
    integer: () => DefaultReturn & {
      positive: () => DefaultReturn
      negative: () => DefaultReturn
    }
    positive: () => DefaultReturn & {
      float: () => DefaultReturn
      integer: () => DefaultReturn
    }
    negative: () => DefaultReturn & {
      float: () => DefaultReturn
      integer: () => DefaultReturn
    }
  }
  positive: () => DefaultReturn & {
    max: (value: number) => DefaultReturn & {
      float: () => DefaultReturn
      integer: () => DefaultReturn
    }
    float: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
    integer: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
  }
  negative: () => DefaultReturn & {
    max: (value: number) => DefaultReturn & {
      float: () => DefaultReturn
      integer: () => DefaultReturn
    }
    float: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
    integer: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
  }
}

export interface NumberMaxMethod extends DefaultReturn {
  float: () => DefaultReturn & {
    min: (value: number) => DefaultReturn & {
      positive: () => DefaultReturn
      negative: () => DefaultReturn
    }
    positive: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
    negative: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
  }
  integer: () => DefaultReturn & {
    min: (value: number) => DefaultReturn & {
      positive: () => DefaultReturn
      negative: () => DefaultReturn
    }
    positive: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
    negative: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
  }
  min: (value: number) => DefaultReturn & {
    float: () => {
      positive: () => DefaultReturn
      negative: () => DefaultReturn
    }
    integer: () => DefaultReturn & {
      positive: () => DefaultReturn
      negative: () => DefaultReturn
    }
    positive: () => DefaultReturn & {
      float: () => DefaultReturn
      integer: () => DefaultReturn
    }
    negative: () => DefaultReturn & {
      float: () => DefaultReturn
      integer: () => DefaultReturn
    }
  }
  positive: () => DefaultReturn & {
    min: (value: number) => DefaultReturn & {
      float: () => DefaultReturn
      integer: () => DefaultReturn
    }
    float: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
    integer: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
  }
  negative: () => DefaultReturn & {
    min: (value: number) => DefaultReturn & {
      float: () => DefaultReturn
      integer: () => DefaultReturn
    }
    float: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
    integer: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
  }
}

export interface NumberPositiveMethod extends DefaultReturn {
  float: () => DefaultReturn & {
    min: (value: number) => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
    max: (value: number) => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
  }
  integer: () => DefaultReturn & {
    min: (value: number) => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
    max: (value: number) => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
  }
  min: (value: number) => DefaultReturn & {
    max: (value: number) => DefaultReturn & {
      float: () => DefaultReturn
      integer: () => DefaultReturn
    }
    float: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
    integer: () => DefaultReturn & {
      max: (value: number) => DefaultReturn
    }
  }
  max: (value: number) => DefaultReturn & {
    min: (value: number) => DefaultReturn & {
      float: () => DefaultReturn
      integer: () => DefaultReturn
    }
    float: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
    integer: () => DefaultReturn & {
      min: (value: number) => DefaultReturn
    }
  }
}

export type NumberNegativeMethod = NumberPositiveMethod

export interface NullableMethod {
  throw: (value: any, valueName: string, ClassError?: ErrorTypes) => void
  throwAsync: (value: any, valueName: string, ClassError?: ErrorTypes) => Promise<void>
  validate: (value: any) => boolean
  validateAsync: (value: any) => Promise<boolean>
  test: (value: any, valueName: string) => Tests
  testAsync: (value: any, valueName: string) => Promise<Tests>
}

export interface StringMethod extends DefaultReturn {
  minLength: (limit: number) => MinLengthMethod
  maxLength: (limit: number) => MaxLengthMethod
  minWord: (limit: number) => MinWordMethod
  email: () => EmailMethod
  UUID: (version?: UUIDVersion) => UUIDMethod
  time: (type: TimeTypes) => TimeMethod
}

export interface EmailMethod extends DefaultReturn {}

export interface UUIDMethod extends DefaultReturn {}

export interface TimeMethod extends DefaultReturn {}

export interface MinLengthMethod extends DefaultReturn {
  maxLength: (limit: number) => DefaultReturn & {
    minWord: (limit: number) => DefaultReturn
  }
  minWord: (limit: number) => DefaultReturn & {
    maxLength: (limit: number) => DefaultReturn
  }
}

export interface MaxLengthMethod extends DefaultReturn {
  minLength: (limit: number) => DefaultReturn & {
    minWord: (limit: number) => DefaultReturn
  }
  minWord: (limit: number) => DefaultReturn & {
    minLength: (limit: number) => DefaultReturn
  }
}

export interface MinWordMethod extends DefaultReturn {
  minLength: (limit: number) => DefaultReturn & {
    maxLength: (limit: number) => DefaultReturn
  }
  maxLength: (limit: number) => DefaultReturn & {
    minLength: (limit: number) => DefaultReturn
  }
}

export interface ObjectConfig {
  error?: ErrorTypes
}

export interface DateMethod extends DefaultReturn {
  min: (dateToCompare: Date) => MinDateMethod
  max: (dateToCompare: Date) => MaxDateMethod
}

export interface MinDateMethod extends DefaultReturn {
  max: (dateToCompare: Date) => DefaultReturn
}

export interface MaxDateMethod extends DefaultReturn {
  min: (dateToCompare: Date) => DefaultReturn
}

export interface AliasMethod extends DefaultReturn {
  string: () => StringMethod
  number: () => NumberMethod
  boolean: () => DefaultReturn
  date: (type?: DateTypes) => DateMethod
  array: () => ArrayMethod
  equal: (valueToCompare: any) => DefaultReturn
  object: (schema: ObjectType) => DefaultReturn
}

export interface ArrayMethod extends DefaultReturn {
  string: () => StringMethod
  boolean: () => DefaultReturn
  number: () => NumberMethod
  date: (type?: DateTypes) => DateMethod
  object: (schema: ObjectType) => DefaultReturn
}

export type DateTypes = 'ISO8601' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM' | 'YYYY-MM-DD' | 'YYYY-DD-MM'

export type ErrorClass<T extends Error> = new (message?: string) => T

export type ErrorTypes = any // ErrorClass

export type MethodTypes =
  'equal' |
  'object' |
  'array' |
  'string' |
  'email' |
  'UUID' |
  'minWord' |
  'maxLength' |
  'minLength' |
  'required' |
  'notRequired' |
  'number' |
  'float' |
  'integer' |
  'boolean' |
  'date' |
  'min' |
  'max' |
  'positive' |
  'negative' |
  'time' |
  'alias' |
  'nullable'

export interface Method {
  method: MethodTypes
  minWord?: number
  maxLength?: number
  minLength?: number
  max?: number
  min?: number
  dateType?: DateTypes
  dateToCompare?: Date
  timeType?: TimeTypes
  arrayType?: ArrayTypes
  arrayRules?: any
  valueToCompare?: any
  alias?: string
  schema?: ObjectType
  uuidVersion?: UUIDVersion
}

export type ArrayTypes = 'string' | 'number' | 'boolean' | 'any' | 'date' | 'strict' | 'object' | Record<string, Schema[]>

export type Methods = Method[]

export type TimeTypes = 'HH:MM' | 'HH:MM:SS' | 'HH:MM:SS.MS'

export type ObjectType = Record<string, any>

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
  index?: number
  message: string
}

export interface SuccessTest {
  class?: string
  method?: string
  name: string
  expect: string
  index?: number
  received: any
}

export interface ExecuteValidateMethods {
  value: any
  valueName: string
  methods: Methods
  resetTests: () => void
  callbackUpdateTest: (test: Tests) => void
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}

export interface SetLocation {
  string?: {
    invalidValue?: string
    minWord?: string
    uuid?: string
    email?: string
    time?: string
    maxLength?: string
    minLength?: string
  }
  number?: {
    invalidValue?: string
    float?: string
    integer?: string
    min?: string
    max?: string
    positive?: string
    negative?: string
  }
  boolean?: {
    invalidValue?: string
  }
  required?: string
  date?: {
    invalidValue?: string
    min?: string
    max?: string
  }
  object?: string
  array?: string
  nullable?: string
  equal?: string
  notToEqual?: string
  oneOf?: string
  notOneOf?: string
}

export interface InformativeMessage {
  string: {
    invalidValue: string
    minWord: string
    uuid: string
    email: string
    time: string
    maxLength: string
    minLength: string
  }
  number: {
    invalidValue: string
    float: string
    integer: string
    min: string
    max: string
    positive: string
    negative: string
  }
  boolean: {
    invalidValue: string
  }
  required: string
  date: {
    invalidValue: string
    min: string
    max: string
  }
  object: string
  array: string
  nullable: string
  equal: string
  notEqual: string
  oneOf: string
  notOneOf: string
}

export type AnyInformativeMessage = InformativeMessage & Record<string, any>

export interface ParamsMethod {
  callbackMethodBuild: (build: Method) => void
  callbackDefaultReturnMethods: () => DefaultReturn
}

export interface ValidateMethod {
  value: any
  valueName: string
  indexArray: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}
