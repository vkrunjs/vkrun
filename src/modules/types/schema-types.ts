import { SchemaSetup } from '../schema'
import { UUIDVersion } from './utils-types'

export interface VkrunSchema {
  string: (config?: SchemaStringConfig) => SchemaStringMethod
  number: (config?: SchemaNumberConfig) => SchemaNumberMethod
  bigInt: (config?: SchemaBigIntConfig) => SchemaBigIntMethod
  boolean: (config?: SchemaBooleanConfig) => SchemaReturn
  buffer: (config?: SchemaBufferConfig) => SchemaReturn
  function: (config?: SchemaFunctionConfig) => SchemaReturn
  date: (config?: SchemaDateConfig) => SchemaDateMethod
  alias: (valueName: string) => SchemaAliasMethod
  array: (schema: SchemaReturn, config?: SchemaArrayConfig) => SchemaArrayMethod
  equal: (valueToCompare: any, config?: SchemaEqualConfig) => SchemaReturn
  notEqual: (valueToCompare: any, config?: SchemaNotEqualConfig) => SchemaReturn
  oneOf: (comparisonItems: SchemaReturn[] | any[], config?: SchemaOneOfConfig) => SchemaReturn
  notOneOf: (comparisonItems: SchemaReturn[] | any[], config?: SchemaNotOneOfConfig) => SchemaReturn
  object: (schema: SchemaObjectType, config?: SchemaObjectConfig) => SchemaReturn
  nullable: (config?: SchemaNullableConfig) => SchemaNullableMethod
  notRequired: () => SchemaNotRequiredMethod
  throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => void
  throwAsync: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => Promise<void>
  validate: (value: any) => boolean
  validateAsync: (value: any) => Promise<boolean>
  test: (value: any, valueName: string) => SchemaTests
  testAsync: (value: any, valueName: string) => Promise<SchemaTests>
}

export interface SchemaConfig {
  message?: string
}

export type SchemaEqualConfig = SchemaConfig

export type SchemaNotEqualConfig = SchemaConfig

export type SchemaNullableConfig = SchemaConfig

export type SchemaStringConfig = SchemaConfig

export type SchemaObjectConfig = SchemaConfig

export type SchemaBooleanConfig = SchemaConfig

export type SchemaBufferConfig = SchemaConfig

export type SchemaFunctionConfig = SchemaConfig

export type SchemaNumberConfig = SchemaConfig

export type SchemaBigIntConfig = SchemaConfig

export type SchemaNumberFloatConfig = SchemaConfig

export type SchemaNumberIntegerConfig = SchemaConfig

export interface SchemaNumberMinConfig extends SchemaConfig {
  min: number
}

export interface SchemaBigIntMinConfig extends SchemaConfig {
  min: bigint
}

export interface SchemaNumberMaxConfig extends SchemaConfig {
  max: number
}

export interface SchemaBigIntMaxConfig extends SchemaConfig {
  max: bigint
}

export type SchemaNumberPositiveConfig = SchemaConfig

export type SchemaBigIntPositiveConfig = SchemaConfig

export type SchemaNumberNegativeConfig = SchemaConfig

export type SchemaBigIntNegativeConfig = SchemaConfig

export interface SchemaStringUUIDConfig extends SchemaConfig {
  version?: UUIDVersion
}

export interface SchemaStringTimeConfig extends SchemaConfig {
  type: 'HH:MM' | 'HH:MM:SS' | 'HH:MM:SS.MS'
}

export interface SchemaStringRegexConfig extends SchemaConfig {
  regExp: RegExp
}

export interface SchemaStringMinLengthConfig extends SchemaConfig {
  min: number
}

export interface SchemaStringMaxLengthConfig extends SchemaConfig {
  max: number
}

export interface SchemaStringMinWordConfig extends SchemaConfig {
  min: number
}

export interface SchemaArrayConfig {
  message?: string
}

export interface SchemaArrayMaxConfig extends SchemaConfig {
  max: number
}

export interface SchemaArrayMinConfig extends SchemaConfig {
  min: number
}

export type SchemaOneOfConfig = SchemaConfig

export type SchemaNotOneOfConfig = SchemaConfig

export interface SchemaDateConfig extends SchemaConfig {
  type?: SchemaDateTypes
}

export interface SchemaDateMinConfig extends SchemaConfig {
  min: Date
}

export interface SchemaDateMaxConfig extends SchemaConfig {
  max: Date
}

export interface SchemaReturn {
  notRequired: () => SchemaNotRequiredMethod
  nullable: (config?: SchemaNullableConfig) => SchemaNullableMethod
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
  float: (config?: SchemaNumberFloatConfig) => SchemaNumberFloatMethod
  integer: (config?: SchemaNumberIntegerConfig) => SchemaNumberIntegerMethod
  min: (config: SchemaNumberMinConfig) => SchemaNumberMinMethod
  max: (config: SchemaNumberMaxConfig) => SchemaNumberMaxMethod
  positive: (config?: SchemaNumberPositiveConfig) => SchemaNumberPositiveMethod
  negative: (config?: SchemaNumberNegativeConfig) => SchemaNumberNegativeMethod
}

export interface SchemaNumberFloatMethod extends SchemaReturn {
  min: (config: SchemaNumberMinConfig) => SchemaReturn & {
    max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
      positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn
      negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn
    }
    positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
    negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
  }
  max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
    min: (config: SchemaNumberMinConfig) => SchemaReturn & {
      positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn
      negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn
    }
    positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
    negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
  }
  positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
    min: (config: SchemaNumberMinConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
    max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
  }
  negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
    min: (config: SchemaNumberMinConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
    max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
  }
}

export type SchemaNumberIntegerMethod = SchemaNumberFloatMethod

export interface SchemaNumberMinMethod extends SchemaReturn {
  float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
    max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
      positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn
      negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn
    }
    positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
    negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
  }
  integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
    max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
      positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn
      negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn
    }
    positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
    negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
  }
  max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
    float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
      positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn
      negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn
    }
    integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
      positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn
      negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn
    }
    positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
      float: (config?: SchemaNumberFloatConfig) => SchemaReturn
      integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn
    }
    negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
      float: (config?: SchemaNumberFloatConfig) => SchemaReturn
      integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn
    }
  }
  positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
    max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
      float: (config?: SchemaNumberFloatConfig) => SchemaReturn
      integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn
    }
    float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
    integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
  }
  negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
    max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
      float: (config?: SchemaNumberFloatConfig) => SchemaReturn
      integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn
    }
    float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
    integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
  }
}

export interface SchemaNumberMaxMethod extends SchemaReturn {
  float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
    min: (config: SchemaNumberMinConfig) => SchemaReturn & {
      positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn
      negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn
    }
    positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
    negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
  }
  integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
    min: (config: SchemaNumberMinConfig) => SchemaReturn & {
      positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn
      negative: (config?: SchemaBigIntNegativeConfig) => SchemaReturn
    }
    positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
    negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
  }
  min: (config: SchemaNumberMinConfig) => SchemaReturn & {
    float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
      positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn
      negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn
    }
    integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
      positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn
      negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn
    }
    positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
      float: (config?: SchemaNumberFloatConfig) => SchemaReturn
      integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn
    }
    negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
      float: (config?: SchemaNumberFloatConfig) => SchemaReturn
      integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn
    }
  }
  positive: (config?: SchemaNumberPositiveConfig) => SchemaReturn & {
    min: (config: SchemaNumberMinConfig) => SchemaReturn & {
      float: (config?: SchemaNumberFloatConfig) => SchemaReturn
      integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn
    }
    float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
    integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
  }
  negative: (config?: SchemaNumberNegativeConfig) => SchemaReturn & {
    min: (config: SchemaNumberMinConfig) => SchemaReturn & {
      float: (config?: SchemaNumberFloatConfig) => SchemaReturn
      integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn
    }
    float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
    integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
  }
}

export interface SchemaNumberPositiveMethod extends SchemaReturn {
  float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
    min: (config: SchemaNumberMinConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
    max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
  }
  integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
    min: (config: SchemaNumberMinConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
    max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
  }
  min: (config: SchemaNumberMinConfig) => SchemaReturn & {
    max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
      float: (config?: SchemaNumberFloatConfig) => SchemaReturn
      integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn
    }
    float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
    integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
      max: (config: SchemaNumberMaxConfig) => SchemaReturn
    }
  }
  max: (config: SchemaNumberMaxConfig) => SchemaReturn & {
    min: (config: SchemaNumberMinConfig) => SchemaReturn & {
      float: (config?: SchemaNumberFloatConfig) => SchemaReturn
      integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn
    }
    float: (config?: SchemaNumberFloatConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
    integer: (config?: SchemaNumberIntegerConfig) => SchemaReturn & {
      min: (config: SchemaNumberMinConfig) => SchemaReturn
    }
  }
}

export type SchemaNumberNegativeMethod = SchemaNumberPositiveMethod

export interface SchemaBigIntMethod extends SchemaReturn {
  min: (config: SchemaBigIntMinConfig) => SchemaBigIntMinMethod
  max: (config: SchemaBigIntMaxConfig) => SchemaBigIntMaxMethod
  positive: (config?: SchemaBigIntPositiveConfig) => SchemaBigIntPositiveMethod
  negative: (config?: SchemaBigIntNegativeConfig) => SchemaBigIntNegativeMethod
}

export interface SchemaBigIntMinMethod extends SchemaReturn {
  max: (config: SchemaBigIntMaxConfig) => SchemaReturn & {
    positive: (config?: SchemaBigIntPositiveConfig) => SchemaReturn
    negative: (config?: SchemaBigIntNegativeConfig) => SchemaReturn
  }
  positive: (config?: SchemaBigIntPositiveConfig) => SchemaReturn & {
    max: (config: SchemaBigIntMaxConfig) => SchemaReturn
  }
  negative: (config?: SchemaBigIntNegativeConfig) => SchemaReturn & {
    max: (config: SchemaBigIntMaxConfig) => SchemaReturn
  }
}

export interface SchemaBigIntMaxMethod extends SchemaReturn {
  min: (config: SchemaBigIntMinConfig) => SchemaReturn & {
    positive: (config?: SchemaBigIntPositiveConfig) => SchemaReturn
    negative: (config?: SchemaBigIntNegativeConfig) => SchemaReturn
  }
  positive: (config?: SchemaBigIntPositiveConfig) => SchemaReturn & {
    min: (config: SchemaBigIntMinConfig) => SchemaReturn
  }
  negative: (config?: SchemaBigIntNegativeConfig) => SchemaReturn & {
    min: (config: SchemaBigIntMinConfig) => SchemaReturn
  }
}

export interface SchemaBigIntPositiveMethod extends SchemaReturn {
  min: (config: SchemaBigIntMinConfig) => SchemaReturn & {
    max: (config: SchemaBigIntMaxConfig) => SchemaReturn
  }
  max: (config: SchemaBigIntMaxConfig) => SchemaReturn & {
    min: (config: SchemaBigIntMinConfig) => SchemaReturn
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
  minLength: (config: SchemaStringMinLengthConfig) => SchemaMinLengthMethod
  maxLength: (config: SchemaStringMaxLengthConfig) => SchemaMaxLengthMethod
  minWord: (config: SchemaStringMinWordConfig) => SchemaMinWordMethod
  email: (config?: SchemaStringEmailConfig) => SchemaEmailMethod
  UUID: (config?: SchemaStringUUIDConfig) => SchemaUUIDMethod
  time: (config: SchemaStringTimeConfig) => SchemaTimeMethod
  regex: (config?: SchemaStringRegexConfig) => SchemaRegexMethod
}

export interface SchemaEmailMethod extends SchemaReturn {}

export interface SchemaUUIDMethod extends SchemaReturn {}

export interface SchemaStringEmailConfig extends SchemaConfig {}

export interface SchemaTimeMethod extends SchemaReturn {}

export interface SchemaRegexMethod extends SchemaReturn {}

export interface SchemaMinLengthMethod extends SchemaReturn {
  maxLength: (config: SchemaStringMaxLengthConfig) => SchemaReturn & {
    minWord: (config: SchemaStringMinWordConfig) => SchemaReturn
  }
  minWord: (config: SchemaStringMinWordConfig) => SchemaReturn & {
    maxLength: (config: SchemaStringMaxLengthConfig) => SchemaReturn
  }
}

export interface SchemaMaxLengthMethod extends SchemaReturn {
  minLength: (config: SchemaStringMinLengthConfig) => SchemaReturn & {
    minWord: (config: SchemaStringMinWordConfig) => SchemaReturn
  }
  minWord: (config: SchemaStringMinWordConfig) => SchemaReturn & {
    minLength: (config: SchemaStringMinLengthConfig) => SchemaReturn
  }
}

export interface SchemaMinWordMethod extends SchemaReturn {
  minLength: (config: SchemaStringMinLengthConfig) => SchemaReturn & {
    maxLength: (config: SchemaStringMaxLengthConfig) => SchemaReturn
  }
  maxLength: (config: SchemaStringMaxLengthConfig) => SchemaReturn & {
    minLength: (config: SchemaStringMinLengthConfig) => SchemaReturn
  }
}

export interface SchemaDateMethod extends SchemaReturn {
  min: (config: SchemaDateMinConfig) => SchemaMinDateMethod
  max: (config: SchemaDateMaxConfig) => SchemaMaxDateMethod
}

export interface SchemaMinDateMethod extends SchemaReturn {
  max: (config: SchemaDateMaxConfig) => SchemaReturn
}

export interface SchemaMaxDateMethod extends SchemaReturn {
  min: (config: SchemaDateMinConfig) => SchemaReturn
}

export interface SchemaAliasMethod extends SchemaReturn {
  string: (config?: SchemaStringConfig) => SchemaStringMethod
  number: (config?: SchemaNumberConfig) => SchemaNumberMethod
  bigInt: () => SchemaBigIntMethod
  boolean: (config?: SchemaBooleanConfig) => SchemaReturn
  date: (config?: SchemaDateConfig) => SchemaDateMethod
  array: (schema: SchemaReturn, config?: SchemaArrayConfig) => SchemaArrayMethod
  equal: (valueToCompare: any, config?: SchemaEqualConfig) => SchemaReturn
  notEqual: (valueToCompare: any, config?: SchemaNotEqualConfig) => SchemaReturn
  object: (schema: SchemaObjectType, config?: SchemaObjectConfig) => SchemaReturn
  buffer: (config?: SchemaBufferConfig) => SchemaReturn
  function: (config?: SchemaFunctionConfig) => SchemaReturn
  oneOf: (comparisonItems: SchemaReturn[] | any[], config?: SchemaOneOfConfig) => SchemaReturn
  notOneOf: (comparisonItems: SchemaReturn[] | any[], config?: SchemaNotOneOfConfig) => SchemaReturn
  nullable: (config?: SchemaNullableConfig) => SchemaNullableMethod
}

export interface SchemaArrayMethod extends SchemaReturn {
  min: (config: SchemaArrayMinConfig) => SchemaArrayMinMethod
  max: (config: SchemaArrayMaxConfig) => SchemaArrayMaxMethod
  // oneOf: (comparisonItems: SchemaReturn[] | any[], config?: SchemaOneOfConfig) => SchemaArrayOneOfMethod
}

export interface SchemaArrayMinMethod extends SchemaReturn {
  max: (config: SchemaArrayMaxConfig) => SchemaReturn
  // & {
  //   oneOf: (comparisonItems: SchemaReturn[] | any[], config?: SchemaOneOfConfig) => SchemaReturn
  // }
  // oneOf: (comparisonItems: SchemaReturn[] | any[], config?: SchemaOneOfConfig) => SchemaReturn
}

export interface SchemaArrayMaxMethod extends SchemaReturn {
  min: (config: SchemaArrayMinConfig) => SchemaReturn
  // & {
  //   oneOf: (comparisonItems: SchemaReturn[] | any[], config?: SchemaOneOfConfig) => SchemaReturn
  // }
  // oneOf: (comparisonItems: SchemaReturn[] | any[], config?: SchemaOneOfConfig) => SchemaReturn
}

export interface SchemaArrayOneOfMethod extends SchemaReturn {
  min: (config: SchemaArrayMinConfig) => SchemaReturn & {
    max: (config: SchemaArrayMaxConfig) => SchemaReturn
  }
  max: (config: SchemaArrayMaxConfig) => SchemaReturn & {
    min: (config: SchemaArrayMinConfig) => SchemaReturn
  }
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
  'buffer' |
  'function' |
  'UUID' |
  'minWord' |
  'maxLength' |
  'minLength' |
  'regex' |
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
  max?: number | bigint
  min?: number | bigint
  dateToCompare?: Date
  config?: SchemaConfig |
  SchemaStringConfig |
  SchemaBooleanConfig |
  SchemaBufferConfig |
  SchemaFunctionConfig |
  SchemaNumberConfig |
  SchemaBigIntConfig |
  SchemaNumberFloatConfig |
  SchemaNumberIntegerConfig |
  SchemaNumberMinConfig |
  SchemaBigIntMinConfig |
  SchemaNumberMaxConfig |
  SchemaBigIntMaxConfig |
  SchemaNumberPositiveConfig |
  SchemaBigIntPositiveConfig |
  SchemaNumberNegativeConfig |
  SchemaBigIntNegativeConfig |
  SchemaStringUUIDConfig |
  SchemaStringTimeConfig |
  SchemaStringRegexConfig |
  SchemaStringMinLengthConfig |
  SchemaStringMaxLengthConfig |
  SchemaStringMinWordConfig |
  SchemaOneOfConfig |
  SchemaNotOneOfConfig |
  SchemaDateConfig |
  SchemaArrayConfig & { schema: SchemaReturn }
  arrayType?: SchemaArrayTypes
  regExp?: RegExp
  arrayRules?: any
  valueToCompare?: any
  alias?: string
  schema?: SchemaObjectType
  uuidVersion?: UUIDVersion
  comparisonItems?: any[]
}

export type SchemaArrayTypes = 'string' | 'number' | 'bigInt' | 'boolean' | 'any' | 'date' | 'strict' | 'object' | Record<string, SchemaSetup[]>

export type SchemaMethods = SchemaMethod[]

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
