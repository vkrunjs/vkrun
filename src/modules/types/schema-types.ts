import { SchemaSetup } from '../schema'
import { UUIDVersion } from './utils-types'

export interface VkrunSchema {
  string: () => SchemaStringMethod
  number: () => SchemaNumberMethod
  bigInt: () => SchemaBigIntMethod
  boolean: () => SchemaReturn
  date: (type?: SchemaDateTypes) => SchemaDateMethod
  alias: (valueName: string) => SchemaAliasMethod
  array: (config?: SchemaArrayConfig) => SchemaArrayMethod
  equal: (valueToCompare: any) => SchemaReturn
  notEqual: (valueToCompare: any) => SchemaReturn
  oneOf: (comparisonItems: SchemaReturn[] | any[]) => SchemaReturn
  notOneOf: (comparisonItems: SchemaReturn[] | any[]) => SchemaReturn
  object: (schema: SchemaObjectType) => SchemaReturn
  nullable: () => SchemaNullableMethod
  notRequired: () => SchemaNotRequiredMethod
  throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => void
  throwAsync: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => Promise<void>
  validate: (value: any) => boolean
  validateAsync: (value: any) => Promise<boolean>
  test: (value: any, valueName: string) => SchemaTests
  testAsync: (value: any, valueName: string) => Promise<SchemaTests>
}

export interface SchemaReturn {
  notRequired: () => SchemaNotRequiredMethod
  nullable: () => SchemaNullableMethod
  throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => void
  throwAsync: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => Promise<void>
  validate: (value: any) => boolean
  validateAsync: (value: any) => Promise<boolean>
  test: (value: any, valueName: string) => SchemaTests
  testAsync: (value: any, valueName: string) => Promise<SchemaTests>
}

export interface SchemaNotRequiredMethod {
  throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => void
  throwAsync: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => Promise<void>
  validate: (value: any) => boolean
  validateAsync: (value: any) => Promise<boolean>
  test: (value: any, valueName: string) => SchemaTests
  testAsync: (value: any, valueName: string) => Promise<SchemaTests>
}

export interface SchemaNumberMethod extends SchemaReturn {
  float: () => SchemaNumberFloatMethod
  integer: () => SchemaNumberIntegerMethod
  min: (value: number) => SchemaNumberMinMethod
  max: (value: number) => SchemaNumberMaxMethod
  positive: () => SchemaNumberPositiveMethod
  negative: () => SchemaNumberNegativeMethod
}

export interface SchemaNumberFloatMethod extends SchemaReturn {
  min: (value: number) => SchemaReturn & {
    max: (value: number) => SchemaReturn & {
      positive: () => SchemaReturn
      negative: () => SchemaReturn
    }
    positive: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
    negative: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
  }
  max: (value: number) => SchemaReturn & {
    min: (value: number) => SchemaReturn & {
      positive: () => SchemaReturn
      negative: () => SchemaReturn
    }
    positive: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
    negative: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
  }
  positive: () => SchemaReturn & {
    min: (value: number) => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
    max: (value: number) => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
  }
  negative: () => SchemaReturn & {
    min: (value: number) => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
    max: (value: number) => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
  }
}

export type SchemaNumberIntegerMethod = SchemaNumberFloatMethod

export interface SchemaNumberMinMethod extends SchemaReturn {
  float: () => SchemaReturn & {
    max: (value: number) => SchemaReturn & {
      positive: () => SchemaReturn
      negative: () => SchemaReturn
    }
    positive: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
    negative: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
  }
  integer: () => SchemaReturn & {
    max: (value: number) => SchemaReturn & {
      positive: () => SchemaReturn
      negative: () => SchemaReturn
    }
    positive: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
    negative: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
  }
  max: (value: number) => SchemaReturn & {
    float: () => SchemaReturn & {
      positive: () => SchemaReturn
      negative: () => SchemaReturn
    }
    integer: () => SchemaReturn & {
      positive: () => SchemaReturn
      negative: () => SchemaReturn
    }
    positive: () => SchemaReturn & {
      float: () => SchemaReturn
      integer: () => SchemaReturn
    }
    negative: () => SchemaReturn & {
      float: () => SchemaReturn
      integer: () => SchemaReturn
    }
  }
  positive: () => SchemaReturn & {
    max: (value: number) => SchemaReturn & {
      float: () => SchemaReturn
      integer: () => SchemaReturn
    }
    float: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
    integer: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
  }
  negative: () => SchemaReturn & {
    max: (value: number) => SchemaReturn & {
      float: () => SchemaReturn
      integer: () => SchemaReturn
    }
    float: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
    integer: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
  }
}

export interface SchemaNumberMaxMethod extends SchemaReturn {
  float: () => SchemaReturn & {
    min: (value: number) => SchemaReturn & {
      positive: () => SchemaReturn
      negative: () => SchemaReturn
    }
    positive: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
    negative: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
  }
  integer: () => SchemaReturn & {
    min: (value: number) => SchemaReturn & {
      positive: () => SchemaReturn
      negative: () => SchemaReturn
    }
    positive: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
    negative: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
  }
  min: (value: number) => SchemaReturn & {
    float: () => SchemaReturn & {
      positive: () => SchemaReturn
      negative: () => SchemaReturn
    }
    integer: () => SchemaReturn & {
      positive: () => SchemaReturn
      negative: () => SchemaReturn
    }
    positive: () => SchemaReturn & {
      float: () => SchemaReturn
      integer: () => SchemaReturn
    }
    negative: () => SchemaReturn & {
      float: () => SchemaReturn
      integer: () => SchemaReturn
    }
  }
  positive: () => SchemaReturn & {
    min: (value: number) => SchemaReturn & {
      float: () => SchemaReturn
      integer: () => SchemaReturn
    }
    float: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
    integer: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
  }
  negative: () => SchemaReturn & {
    min: (value: number) => SchemaReturn & {
      float: () => SchemaReturn
      integer: () => SchemaReturn
    }
    float: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
    integer: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
  }
}

export interface SchemaNumberPositiveMethod extends SchemaReturn {
  float: () => SchemaReturn & {
    min: (value: number) => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
    max: (value: number) => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
  }
  integer: () => SchemaReturn & {
    min: (value: number) => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
    max: (value: number) => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
  }
  min: (value: number) => SchemaReturn & {
    max: (value: number) => SchemaReturn & {
      float: () => SchemaReturn
      integer: () => SchemaReturn
    }
    float: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
    integer: () => SchemaReturn & {
      max: (value: number) => SchemaReturn
    }
  }
  max: (value: number) => SchemaReturn & {
    min: (value: number) => SchemaReturn & {
      float: () => SchemaReturn
      integer: () => SchemaReturn
    }
    float: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
    integer: () => SchemaReturn & {
      min: (value: number) => SchemaReturn
    }
  }
}

export type SchemaNumberNegativeMethod = SchemaNumberPositiveMethod

export interface SchemaBigIntMethod extends SchemaReturn {
  min: (value: bigint) => SchemaBigIntMinMethod
  max: (value: bigint) => SchemaBigIntMaxMethod
  positive: () => SchemaBigIntPositiveMethod
  negative: () => SchemaBigIntNegativeMethod
}

export interface SchemaBigIntMinMethod extends SchemaReturn {
  max: (value: bigint) => SchemaReturn & {
    positive: () => SchemaReturn
    negative: () => SchemaReturn
  }
  positive: () => SchemaReturn & {
    max: (value: bigint) => SchemaReturn
  }
  negative: () => SchemaReturn & {
    max: (value: bigint) => SchemaReturn
  }
}

export interface SchemaBigIntMaxMethod extends SchemaReturn {
  min: (value: bigint) => SchemaReturn & {
    positive: () => SchemaReturn
    negative: () => SchemaReturn
  }
  positive: () => SchemaReturn & {
    min: (value: bigint) => SchemaReturn
  }
  negative: () => SchemaReturn & {
    min: (value: bigint) => SchemaReturn
  }
}

export interface SchemaBigIntPositiveMethod extends SchemaReturn {
  min: (value: bigint) => SchemaReturn & {
    max: (value: bigint) => SchemaReturn
  }
  max: (value: bigint) => SchemaReturn & {
    min: (value: bigint) => SchemaReturn
  }
}

export type SchemaBigIntNegativeMethod = SchemaBigIntPositiveMethod

export interface SchemaNullableMethod {
  throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => void
  throwAsync: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => Promise<void>
  validate: (value: any) => boolean
  validateAsync: (value: any) => Promise<boolean>
  test: (value: any, valueName: string) => SchemaTests
  testAsync: (value: any, valueName: string) => Promise<SchemaTests>
}

export interface SchemaStringMethod extends SchemaReturn {
  minLength: (limit: number) => SchemaMinLengthMethod
  maxLength: (limit: number) => SchemaMaxLengthMethod
  minWord: (limit: number) => SchemaMinWordMethod
  email: () => SchemaEmailMethod
  UUID: (version?: UUIDVersion) => SchemaUUIDMethod
  time: (type: SchemaTimeTypes) => SchemaTimeMethod
}

export interface SchemaEmailMethod extends SchemaReturn {}

export interface SchemaUUIDMethod extends SchemaReturn {}

export interface SchemaTimeMethod extends SchemaReturn {}

export interface SchemaMinLengthMethod extends SchemaReturn {
  maxLength: (limit: number) => SchemaReturn & {
    minWord: (limit: number) => SchemaReturn
  }
  minWord: (limit: number) => SchemaReturn & {
    maxLength: (limit: number) => SchemaReturn
  }
}

export interface SchemaMaxLengthMethod extends SchemaReturn {
  minLength: (limit: number) => SchemaReturn & {
    minWord: (limit: number) => SchemaReturn
  }
  minWord: (limit: number) => SchemaReturn & {
    minLength: (limit: number) => SchemaReturn
  }
}

export interface SchemaMinWordMethod extends SchemaReturn {
  minLength: (limit: number) => SchemaReturn & {
    maxLength: (limit: number) => SchemaReturn
  }
  maxLength: (limit: number) => SchemaReturn & {
    minLength: (limit: number) => SchemaReturn
  }
}

export interface SchemaObjectConfig {
  error?: SchemaErrorTypes
}

export interface SchemaDateMethod extends SchemaReturn {
  min: (dateToCompare: Date) => SchemaMinDateMethod
  max: (dateToCompare: Date) => SchemaMaxDateMethod
}

export interface SchemaMinDateMethod extends SchemaReturn {
  max: (dateToCompare: Date) => SchemaReturn
}

export interface SchemaMaxDateMethod extends SchemaReturn {
  min: (dateToCompare: Date) => SchemaReturn
}

export interface SchemaAliasMethod extends SchemaReturn {
  string: () => SchemaStringMethod
  number: () => SchemaNumberMethod
  boolean: () => SchemaReturn
  date: (type?: SchemaDateTypes) => SchemaDateMethod
  array: (config?: SchemaArrayConfig) => SchemaArrayMethod
  equal: (valueToCompare: any) => SchemaReturn
  object: (schema: SchemaObjectType) => SchemaReturn
}

export interface SchemaArrayConfig {
  min?: number
  max?: number
}

export interface SchemaArrayMethod extends SchemaReturn {
  string: () => SchemaStringMethod
  boolean: () => SchemaReturn
  number: () => SchemaNumberMethod
  bigInt: () => SchemaBigIntMethod
  date: (type?: SchemaDateTypes) => SchemaDateMethod
  object: (schema: SchemaObjectType) => SchemaReturn
  oneOf: (comparisonItems: SchemaReturn[] | any[]) => SchemaReturn
  notOneOf: (comparisonItems: SchemaReturn[] | any[]) => SchemaReturn
}

export type SchemaDateTypes = 'ISO8601' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM' | 'YYYY-MM-DD' | 'YYYY-DD-MM'

export type SchemaErrorClass<T extends Error> = new (message?: string) => T

export type SchemaErrorTypes = any // ErrorClass

export type SchemaMethodTypes =
  'equal' |
  'notEqual' |
  'oneOf' |
  'notOneOf' |
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
  'bigInt' |
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

export interface SchemaMethod {
  method: SchemaMethodTypes
  minWord?: number
  maxLength?: number
  minLength?: number
  max?: number | bigint
  min?: number | bigint
  dateType?: SchemaDateTypes
  dateToCompare?: Date
  timeType?: SchemaTimeTypes
  arrayType?: SchemaArrayTypes
  arrayRules?: any
  valueToCompare?: any
  alias?: string
  schema?: SchemaObjectType
  uuidVersion?: UUIDVersion
  comparisonItems?: any[]
}

export type SchemaArrayTypes = 'string' | 'number' | 'bigInt' | 'boolean' | 'any' | 'date' | 'strict' | 'object' | Record<string, SchemaSetup[]>

export type SchemaMethods = SchemaMethod[]

export type SchemaTimeTypes = 'HH:MM' | 'HH:MM:SS' | 'HH:MM:SS.MS'

export type SchemaObjectType = Record<string, any>

export interface SchemaTests {
  passedAll: boolean
  passed: number
  failed: number
  totalTests: number
  successes: SchemaSuccessTest[]
  errors: SchemaErrorTest[]
  time: string
}

export interface SchemaErrorTest {
  class?: string
  method?: string
  type: 'invalid param' | 'invalid value' | 'missing value' | 'missing key'
  name: string
  expect: string
  received: any
  index?: number
  message: string
}

export interface SchemaSuccessTest {
  class?: string
  method?: string
  name: string
  expect: string
  index?: number
  received: any
}

export interface SchemaExecuteValidateMethods {
  value: any
  valueName: string
  methods: SchemaMethods
  resetTests: () => void
  callbackUpdateTest: (test: SchemaTests) => void
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}

export interface SchemaSetLocation {
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
  bigInt?: {
    invalidValue?: string
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
  array?: {
    invalidValue?: string
    min?: string
    max?: string
  }
  nullable?: string
  equal?: string
  notEqual?: string
  oneOf?: string
  notOneOf?: string
}

export interface SchemaInformativeMessage {
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
  bigInt: {
    invalidValue: string
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
  array: {
    invalidValue: string
    min: string
    max: string
  }
  nullable: string
  equal: string
  notEqual: string
  oneOf: string
  notOneOf: string
}

export type SchemaAnyInformativeMessage = SchemaInformativeMessage & Record<string, any>

export interface SchemaParamsMethod {
  callbackMethodBuild: (build: SchemaMethod) => void
  callbackDefaultReturnMethods: () => SchemaReturn
}

export interface SchemaValidateMethod {
  value: any
  valueName: string
  indexArray: number
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}
