import { hasMethod, throwError, validator } from './helpers'
import {
  VkrunSchema,
  SchemaAliasMethod,
  SchemaArrayMethod,
  SchemaBigIntMethod,
  SchemaDateMethod,
  SchemaReturn,
  SchemaEmailMethod,
  SchemaErrorTest,
  SchemaErrorTypes,
  SchemaMaxDateMethod,
  SchemaMaxLengthMethod,
  SchemaMethod,
  SchemaMethods,
  SchemaMinDateMethod,
  SchemaMinLengthMethod,
  SchemaMinWordMethod,
  SchemaNotRequiredMethod,
  SchemaNullableMethod,
  SchemaNumberMethod,
  SchemaObjectType,
  SchemaStringMethod,
  SchemaSuccessTest,
  SchemaTests,
  SchemaTimeMethod,
  SchemaUUIDMethod,
  SchemaArrayConfig,
  SchemaRegexMethod,
  SchemaStringUUIDConfig,
  SchemaStringRegexConfig,
  SchemaStringConfig,
  SchemaConfig,
  SchemaStringTimeConfig,
  SchemaStringMinLengthConfig,
  SchemaStringMaxLengthConfig,
  SchemaStringMinWordConfig,
  SchemaStringEmailConfig,
  SchemaBooleanConfig,
  SchemaBufferConfig,
  SchemaFunctionConfig,
  SchemaNumberConfig,
  SchemaNumberFloatMethod,
  SchemaNumberIntegerMethod,
  SchemaNumberMinMethod,
  SchemaNumberNegativeMethod,
  SchemaNumberPositiveMethod,
  SchemaNumberMaxMethod,
  SchemaBigIntMinMethod,
  SchemaBigIntMaxMethod,
  SchemaBigIntPositiveMethod,
  SchemaBigIntNegativeMethod,
  SchemaNumberFloatConfig,
  SchemaNumberIntegerConfig,
  SchemaNumberMinConfig,
  SchemaNumberMaxConfig,
  SchemaNumberPositiveConfig,
  SchemaNumberNegativeConfig,
  SchemaBigIntConfig,
  SchemaBigIntMinConfig,
  SchemaBigIntMaxConfig,
  SchemaBigIntPositiveConfig,
  SchemaBigIntNegativeConfig,
  SchemaArrayMinConfig,
  SchemaArrayMinMethod,
  SchemaArrayMaxMethod,
  SchemaOneOfConfig,
  SchemaNotOneOfConfig,
  SchemaDateConfig,
  SchemaDateMinConfig,
  SchemaDateMaxConfig,
  SchemaObjectConfig,
  SchemaNullableConfig,
  SchemaEqualConfig,
  SchemaNotEqualConfig
} from '../types'

export class SchemaSetup implements VkrunSchema {
  private value: any
  private valueName: any
  private readonly methods: SchemaMethods
  private tests: SchemaTests

  constructor (config?: SchemaConfig) {
    this.valueName = undefined
    this.methods = []
    this.tests = {
      passedAll: false,
      passed: 0,
      failed: 0,
      totalTests: 0,
      successes: [],
      errors: [],
      time: ''
    }
    this.methodBuild({ method: 'required', config })
  }

  string (config?: SchemaStringConfig): SchemaStringMethod {
    this.methodBuild({ method: 'string', config })

    const email = (config?: SchemaStringEmailConfig): SchemaEmailMethod => {
      if (hasMethod(this.methods, 'email')) {
        throw Error('vkrun-schema: email method has already been called!')
      }

      this.methodBuild({ method: 'email', config })
      return stringMethods
    }

    const UUID = (config?: SchemaStringUUIDConfig): SchemaUUIDMethod => {
      if (hasMethod(this.methods, 'UUID')) {
        throw Error('vkrun-schema: UUID method has already been called!')
      }

      this.methodBuild({ method: 'UUID', config })
      return stringMethods
    }

    const time = (config: SchemaStringTimeConfig): SchemaTimeMethod => {
      if (hasMethod(this.methods, 'time')) {
        throw Error('vkrun-schema: time method has already been called!')
      }

      this.methodBuild({ method: 'time', config })
      return stringMethods
    }

    const minLength = (config: SchemaStringMinLengthConfig): SchemaMinLengthMethod => {
      if (hasMethod(this.methods, 'minLength')) {
        throw Error('vkrun-schema: minLength method has already been called!')
      }

      this.methodBuild({ method: 'minLength', config })
      return stringMethods
    }

    const maxLength = (config: SchemaStringMaxLengthConfig): SchemaMaxLengthMethod => {
      if (hasMethod(this.methods, 'maxLength')) {
        throw Error('vkrun-schema: maxLength method has already been called!')
      }

      this.methodBuild({ method: 'maxLength', config })
      return stringMethods
    }

    const minWord = (config: SchemaStringMinWordConfig): SchemaMinWordMethod => {
      if (hasMethod(this.methods, 'minWord')) {
        throw Error('vkrun-schema: minWord method has already been called!')
      }

      this.methodBuild({ method: 'minWord', config })
      return stringMethods
    }

    const regex = (config?: SchemaStringRegexConfig): SchemaRegexMethod => {
      if (hasMethod(this.methods, 'regex')) {
        throw Error('vkrun-schema: regex method has already been called!')
      }

      this.methodBuild({ method: 'regex', config })
      return stringMethods
    }

    const stringMethods = {
      minLength,
      maxLength,
      minWord,
      email,
      UUID,
      time,
      regex,
      ...this.defaultReturnMethods()
    } as unknown as SchemaStringMethod

    return stringMethods
  }

  number (config?: SchemaNumberConfig): SchemaNumberMethod {
    this.methodBuild({ method: 'number', config })

    const float = (config?: SchemaNumberFloatConfig): SchemaNumberFloatMethod => {
      if (hasMethod(this.methods, 'float')) {
        throw Error('vkrun-schema: float method has already been called!')
      }

      this.methodBuild({ method: 'float', config })
      return numberMethods
    }

    const integer = (config?: SchemaNumberIntegerConfig): SchemaNumberIntegerMethod => {
      if (hasMethod(this.methods, 'integer')) {
        throw Error('vkrun-schema: integer method has already been called!')
      }

      this.methodBuild({ method: 'integer', config })
      return numberMethods
    }

    const min = (config?: SchemaNumberMinConfig): SchemaNumberMinMethod => {
      if (hasMethod(this.methods, 'min')) {
        throw Error('vkrun-schema: min method has already been called!')
      }

      this.methodBuild({ method: 'min', config })
      return numberMethods
    }

    const max = (config?: SchemaNumberMaxConfig): SchemaNumberMaxMethod => {
      if (hasMethod(this.methods, 'max')) {
        throw Error('vkrun-schema: max method has already been called!')
      }

      this.methodBuild({ method: 'max', config })
      return numberMethods
    }

    const positive = (config?: SchemaNumberPositiveConfig): SchemaNumberPositiveMethod => {
      if (hasMethod(this.methods, 'positive')) {
        throw Error('vkrun-schema: positive method has already been called!')
      }

      this.methodBuild({ method: 'positive', config })
      return numberMethods
    }

    const negative = (config?: SchemaNumberNegativeConfig): SchemaNumberNegativeMethod => {
      if (hasMethod(this.methods, 'negative')) {
        throw Error('vkrun-schema: negative method has already been called!')
      }

      this.methodBuild({ method: 'negative', config })
      return numberMethods
    }

    const numberMethods = {
      float,
      integer,
      min,
      max,
      positive,
      negative,
      ...this.defaultReturnMethods()
    } as unknown as SchemaNumberMethod

    return numberMethods
  }

  bigInt (config?: SchemaBigIntConfig): SchemaBigIntMethod {
    this.methodBuild({ method: 'bigInt', config })

    const min = (config: SchemaBigIntMinConfig): SchemaBigIntMinMethod => {
      if (hasMethod(this.methods, 'min')) {
        throw Error('vkrun-schema: min method has already been called!')
      }

      this.methodBuild({ method: 'min', config })
      return bigIntMethods
    }

    const max = (config: SchemaBigIntMaxConfig): SchemaBigIntMaxMethod => {
      if (hasMethod(this.methods, 'max')) {
        throw Error('vkrun-schema: max method has already been called!')
      }

      this.methodBuild({ method: 'max', config })
      return bigIntMethods
    }

    const positive = (config?: SchemaBigIntPositiveConfig): SchemaBigIntPositiveMethod => {
      if (hasMethod(this.methods, 'positive')) {
        throw Error('vkrun-schema: positive method has already been called!')
      }

      this.methodBuild({ method: 'positive', config })
      return bigIntMethods
    }

    const negative = (config?: SchemaBigIntNegativeConfig): SchemaBigIntNegativeMethod => {
      if (hasMethod(this.methods, 'negative')) {
        throw Error('vkrun-schema: negative method has already been called!')
      }

      this.methodBuild({ method: 'negative', config })
      return bigIntMethods
    }

    const bigIntMethods = {
      min,
      max,
      positive,
      negative,
      ...this.defaultReturnMethods()
    } as unknown as SchemaBigIntMethod

    return bigIntMethods
  }

  boolean (config?: SchemaBooleanConfig): SchemaReturn {
    this.methodBuild({ method: 'boolean', config })
    return this.defaultReturnMethods()
  }

  buffer (config?: SchemaBufferConfig): SchemaReturn {
    this.methodBuild({ method: 'buffer', config })
    return this.defaultReturnMethods()
  }

  function (config?: SchemaFunctionConfig): SchemaReturn {
    this.methodBuild({ method: 'function', config })
    return this.defaultReturnMethods()
  }

  notRequired (): SchemaNotRequiredMethod {
    this.methodBuild({ method: 'notRequired' })
    return {
      throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => { this.throw(value, valueName, ClassError) },
      throwAsync: async (value: any, valueName: string, ClassError?: SchemaErrorTypes) => { await this.throwAsync(value, valueName, ClassError) },
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  nullable (config?: SchemaNullableConfig): SchemaNullableMethod {
    this.methodBuild({ method: 'nullable', config })
    return {
      throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => { this.throw(value, valueName, ClassError) },
      throwAsync: async (value: any, valueName: string, ClassError?: SchemaErrorTypes) => { await this.throwAsync(value, valueName, ClassError) },
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  date (config?: SchemaDateConfig): SchemaDateMethod {
    const dateTypes = [
      'ISO8601',
      'DD/MM/YYYY',
      'MM/DD/YYYY',
      'DD-MM-YYYY',
      'MM-DD-YYYY',
      'YYYY/MM/DD',
      'YYYY/DD/MM',
      'YYYY-MM-DD',
      'YYYY-DD-MM'
    ]
    if (config?.type && !dateTypes.includes(config.type)) {
      throw Error('vkrun-schema: date method received invalid parameter!')
    }

    this.methodBuild({ method: 'date', config })

    const min = (config: SchemaDateMinConfig): SchemaMinDateMethod => {
      if (!(config.min instanceof Date)) {
        throw Error('vkrun-schema: min method received invalid parameter!')
      }

      if (hasMethod(this.methods, 'min')) {
        throw Error('vkrun-schema: min method has already been called!')
      }

      this.methodBuild({ method: 'min', config })
      return { max, ...this.defaultReturnMethods() }
    }

    const max = (config: SchemaDateMaxConfig): SchemaMaxDateMethod => {
      if (!(config.max instanceof Date)) {
        throw Error('vkrun-schema: max method received invalid parameter!')
      }

      if (hasMethod(this.methods, 'max')) {
        throw Error('vkrun-schema: max method has already been called!')
      }

      this.methodBuild({ method: 'max', config })
      return { min, ...this.defaultReturnMethods() }
    }

    const dateMethods = {
      min,
      max,
      ...this.defaultReturnMethods()
    } as unknown as SchemaDateMethod

    return dateMethods
  }

  equal (valueToCompare: any, config?: SchemaEqualConfig): SchemaReturn {
    this.methodBuild({ method: 'equal', valueToCompare, config })
    return this.defaultReturnMethods()
  }

  notEqual (valueToCompare: any, config?: SchemaNotEqualConfig): SchemaReturn {
    this.methodBuild({ method: 'notEqual', valueToCompare, config })
    return this.defaultReturnMethods()
  }

  oneOf (comparisonItems: SchemaReturn[] | any[], config?: SchemaOneOfConfig): SchemaReturn {
    this.methodBuild({ method: 'oneOf', comparisonItems, config })
    return this.defaultReturnMethods()
  }

  notOneOf (comparisonItems: SchemaReturn[] | any[], config?: SchemaNotOneOfConfig): SchemaReturn {
    this.methodBuild({ method: 'notOneOf', comparisonItems, config })
    return this.defaultReturnMethods()
  }

  alias (valueName: string): SchemaAliasMethod {
    if (typeof valueName !== 'string') {
      throw Error('vkrun-schema: alias method received invalid parameter!')
    }

    this.methodBuild({ method: 'alias', alias: valueName })
    return {
      string: (config?: SchemaStringConfig) => this.string(config),
      number: (config?: SchemaNumberConfig) => this.number(config),
      bigInt: (config?: SchemaBigIntConfig) => this.bigInt(config),
      boolean: (config?: SchemaBooleanConfig) => this.boolean(config),
      date: (config?: SchemaDateConfig) => this.date(config),
      array: (schema: SchemaReturn, config?: SchemaArrayConfig) => this.array(schema, config),
      equal: (valueToCompare: any, config?: SchemaEqualConfig) => this.equal(valueToCompare, config),
      notEqual: (
        valueToCompare: any,
        config?: SchemaNotEqualConfig
      ) => this.notEqual(valueToCompare, config),
      object: (schema: SchemaObjectType, config?: SchemaObjectConfig) => this.object(schema, config),
      oneOf: (
        comparisonItems: SchemaReturn[] | any[],
        config?: SchemaNotOneOfConfig
      ) => this.oneOf(comparisonItems, config),
      notOneOf: (
        comparisonItems: SchemaReturn[] | any[],
        config?: SchemaNotOneOfConfig
      ) => this.notOneOf(comparisonItems, config),
      buffer: (config?: SchemaBufferConfig) => this.buffer(config),
      function: (config?: SchemaFunctionConfig) => this.function(config),
      ...this.defaultReturnMethods()
    }
  }

  object (schema: SchemaObjectType, config?: SchemaObjectConfig): SchemaReturn {
    try {
      for (const [key, rule] of Object.entries(schema) as [string, any]) {
        rule.validate(undefined, key)
      }
    } catch (error) {
      throw Error('vkrun-schema: object method received invalid parameter!')
    }

    this.methodBuild({ method: 'object', schema, config })
    return this.defaultReturnMethods()
  }

  array (schema: SchemaReturn, config?: SchemaArrayConfig): SchemaArrayMethod {
    this.methodBuild({ method: 'array', config, schema })

    const min = (config: SchemaArrayMinConfig): SchemaArrayMinMethod => {
      if (hasMethod(this.methods, 'min')) {
        throw Error('vkrun-schema: min method has already been called!')
      }

      this.methodBuild({ method: 'min', config })
      return arrayMethods
    }

    const max = (config: SchemaArrayMinConfig): SchemaArrayMaxMethod => {
      if (hasMethod(this.methods, 'max')) {
        throw Error('vkrun-schema: min method has already been called!')
      }

      this.methodBuild({ method: 'max', config })
      return arrayMethods
    }

    const arrayMethods = {
      min,
      max,
      ...this.defaultReturnMethods()
    } as unknown as SchemaArrayMethod

    return arrayMethods
  }

  private methodBuild (build: SchemaMethod): void {
    this.methods.push(build)
  }

  private validateMethods (): void {
    validator({
      value: this.value,
      valueName: this.valueName,
      methods: this.methods,
      callbackUpdateTest: (test: SchemaTests): void => {
        this.tests.passed += test.passed
        this.tests.failed += test.failed
        this.tests.totalTests += test.totalTests

        test.successes.forEach((success: SchemaSuccessTest) => {
          this.tests.successes.push(success)
        })

        test.errors.forEach((error: SchemaErrorTest) => {
          this.tests.errors.push(error)
        })

        this.tests.passedAll = this.tests.passed === this.tests.totalTests
      },
      callbackAddPassed: (success: SchemaSuccessTest) => {
        ++this.tests.passed
        ++this.tests.totalTests
        this.tests.successes.push(success)
        this.tests.passedAll = this.tests.passed === this.tests.totalTests
      },
      callbackAddFailed: (error: SchemaErrorTest) => {
        ++this.tests.failed
        ++this.tests.totalTests
        this.tests.errors.push(error)
        this.tests.passedAll = this.tests.passed === this.tests.totalTests
      },
      resetTests: () => {
        this.tests = {
          passedAll: false,
          passed: 0,
          failed: 0,
          totalTests: 0,
          successes: [],
          errors: [],
          time: ''
        }
      }
    })
  }

  private defaultReturnMethods (): SchemaReturn {
    return {
      notRequired: () => this.notRequired(),
      nullable: (config?: SchemaNullableConfig) => this.nullable(config),
      throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => {
        this.throw(value, valueName, ClassError)
      },
      throwAsync: async (value: any, valueName: string, ClassError?: SchemaErrorTypes) => {
        await this.throwAsync(value, valueName, ClassError)
      },
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  throw (value: any, valueName: string, ClassError?: SchemaErrorTypes): void {
    this.value = value
    this.valueName = valueName
    this.validateMethods()
    throwError(this.tests, ClassError)
  }

  async throwAsync (
    value: any,
    valueName: string,
    ClassError?: SchemaErrorTypes
  ): Promise<void> {
    this.value = await value
    this.valueName = valueName
    this.validateMethods()
    throwError(this.tests, ClassError)
  }

  test (value: any, valueName: string): SchemaTests {
    const startDate = new Date()
    this.value = value
    this.valueName = valueName
    this.validateMethods()
    const endTime = new Date()
    const elapsedTime = endTime.getTime() - startDate.getTime()
    const seconds = Math.floor(elapsedTime / 1000)
    const ms = elapsedTime % 1000 || 1
    this.tests.time = `${seconds}s ${ms}ms`
    return this.tests
  }

  async testAsync (value: any, valueName: string): Promise<SchemaTests> {
    const startDate = new Date()
    this.value = await value
    this.valueName = valueName
    this.validateMethods()
    const endTime = new Date()
    const elapsedTime = endTime.getTime() - startDate.getTime()
    const seconds = Math.floor(elapsedTime / 1000)
    const ms = elapsedTime % 1000 || 1
    this.tests.time = `${seconds}s ${ms}ms`
    return this.tests
  }

  validate (value: any): boolean {
    this.value = value
    this.validateMethods()
    return this.tests.passedAll
  }

  async validateAsync (value: any): Promise<boolean> {
    this.value = await value
    this.validateMethods()
    return this.tests.passedAll
  }
}

/**
 * @function schema
 *
 * The `schema` construct provides several methods to validate schema rules such as string, number, date, and more. It supports custom error handling, asynchronous validation, and testing.
 *
 * **Usage Example:**
 * ```ts
 * import { schema } from "vkrun"
 *
 * const emailSchema = schema().string().email()
 *
 * const validateA = emailSchema.validate("any_email@mail.com")
 * const validateB = emailSchema.validate("any_email@mail")
 *
 * console.log(validateA) // true
 * console.log(validateB) // false
 * ```
 */
const schema = (config?: SchemaConfig): VkrunSchema => {
  return new SchemaSetup(config)
}

export { schema }
