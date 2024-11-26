import { hasMethod, setLocation, throwError, validator } from './helpers'
import { numberMethod } from './helpers/methods/number'
import { bigIntMethod } from './helpers/methods/big-int'
import {
  VkrunSchema,
  SchemaAliasMethod,
  SchemaArrayMethod,
  SchemaBigIntMethod,
  SchemaDateMethod,
  SchemaDateTypes,
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
  SchemaTimeTypes,
  SchemaUUIDMethod,
  UUIDVersion,
  SchemaArrayConfig,
  SchemaRegexMethod,
  SchemaOtherMethodConfig
} from '../types'

export class SchemaSetup implements VkrunSchema {
  private value: any
  private valueName: any
  private readonly methods: SchemaMethods
  private tests: SchemaTests

  constructor () {
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
  }

  string (config?: SchemaOtherMethodConfig): SchemaStringMethod {
    this.methodBuild({ method: 'string', config })

    const email = (): SchemaEmailMethod => {
      this.methodBuild({ method: 'email' })
      return this.defaultReturnMethods()
    }

    const UUID = (version?: UUIDVersion): SchemaUUIDMethod => {
      this.methodBuild({ method: 'UUID', uuidVersion: version })
      return this.defaultReturnMethods()
    }

    const time = (type: SchemaTimeTypes): SchemaTimeMethod => {
      if (!['HH:MM', 'HH:MM:SS', 'HH:MM:SS.MS'].includes(type)) {
        console.error('vkrun-schema: time method received invalid parameter!')
        throw Error('vkrun-schema: time method received invalid parameter!')
      }

      this.methodBuild({ method: 'time', timeType: type })
      return this.defaultReturnMethods()
    }

    const minLength = (limit: number): SchemaMinLengthMethod => {
      if (hasMethod(this.methods, 'minLength')) {
        console.error('vkrun-schema: minLength method has already been called!')
        throw Error('minLength method has already been called!')
      }

      if (typeof limit !== 'number' || limit < 0) {
        console.error('vkrun-schema: minLength method received invalid parameter!')
        throw Error('vkrun-schema: minLength method received invalid parameter!')
      }

      this.methodBuild({ method: 'minLength', minLength: limit })
      return { maxLength, minWord, ...this.defaultReturnMethods() }
    }

    const maxLength = (limit: number): SchemaMaxLengthMethod => {
      if (hasMethod(this.methods, 'maxLength')) {
        console.error('vkrun-schema: maxLength method has already been called!')
        throw Error('maxLength method has already been called!')
      }

      if (typeof limit !== 'number' || limit < 0) {
        console.error('vkrun-schema: maxLength method received invalid parameter!')
        throw Error('vkrun-schema: maxLength method received invalid parameter!')
      }

      this.methodBuild({ method: 'maxLength', maxLength: limit })
      return { minLength, minWord, ...this.defaultReturnMethods() }
    }

    const minWord = (limit: number): SchemaMinWordMethod => {
      if (hasMethod(this.methods, 'minWord')) {
        console.error('vkrun-schema: minWord method has already been called!')
        throw Error('vkrun-schema: minWord method has already been called!')
      }

      if (typeof limit !== 'number' || limit < 0) {
        console.error('vkrun-schema: minWord method received invalid parameter!')
        throw Error('vkrun-schema: minWord method received invalid parameter!')
      }

      this.methodBuild({ method: 'minWord', minWord: limit })
      return { minLength, maxLength, ...this.defaultReturnMethods() }
    }

    const regex = (regExp: RegExp, config?: SchemaOtherMethodConfig): SchemaRegexMethod => {
      this.methodBuild({ method: 'regex', regExp, config })
      return this.defaultReturnMethods()
    }

    return {
      minLength,
      maxLength,
      minWord,
      email,
      UUID,
      time,
      regex,
      ...this.defaultReturnMethods()
    }
  }

  number (): SchemaNumberMethod {
    return numberMethod({
      callbackMethodBuild: (build: SchemaMethod) => this.methodBuild(build),
      callbackDefaultReturnMethods: () => this.defaultReturnMethods()
    })
  }

  bigInt (): SchemaBigIntMethod {
    return bigIntMethod({
      callbackMethodBuild: (build: SchemaMethod) => this.methodBuild(build),
      callbackDefaultReturnMethods: () => this.defaultReturnMethods()
    })
  }

  boolean (): SchemaReturn {
    this.methodBuild({ method: 'boolean' })
    return this.defaultReturnMethods()
  }

  buffer (): SchemaReturn {
    this.methodBuild({ method: 'buffer' })
    return this.defaultReturnMethods()
  }

  function (): SchemaReturn {
    this.methodBuild({ method: 'function' })
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

  nullable (): SchemaNullableMethod {
    this.methodBuild({ method: 'nullable' })
    return {
      throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => { this.throw(value, valueName, ClassError) },
      throwAsync: async (value: any, valueName: string, ClassError?: SchemaErrorTypes) => { await this.throwAsync(value, valueName, ClassError) },
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  date (type?: SchemaDateTypes): SchemaDateMethod {
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
    if (type !== undefined && !dateTypes.includes(type)) {
      console.error('vkrun-schema: date method received invalid parameter!')
      throw Error('vkrun-schema: date method received invalid parameter!')
    }

    this.methodBuild({ method: 'date', dateType: type })

    const min = (dateToCompare: Date): SchemaMinDateMethod => {
      if (!(dateToCompare instanceof Date)) {
        console.error('vkrun-schema: min method received invalid parameter!')
        throw Error('vkrun-schema: min method received invalid parameter!')
      }

      if (hasMethod(this.methods, 'min')) {
        console.error('vkrun-schema: min method has already been called!')
        throw Error('min method has already been called!')
      }

      this.methodBuild({ method: 'min', dateToCompare })
      return { max, ...this.defaultReturnMethods() }
    }

    const max = (dateToCompare: Date): SchemaMaxDateMethod => {
      if (!(dateToCompare instanceof Date)) {
        console.error('vkrun-schema: max method received invalid parameter!')
        throw Error('vkrun-schema: max method received invalid parameter!')
      }

      if (hasMethod(this.methods, 'max')) {
        console.error('vkrun-schema: max method has already been called!')
        throw Error('max method has already been called!')
      }

      this.methodBuild({ method: 'max', dateToCompare })
      return { min, ...this.defaultReturnMethods() }
    }

    return { min, max, ...this.defaultReturnMethods() }
  }

  equal (valueToCompare: any): SchemaReturn {
    this.methodBuild({ method: 'equal', valueToCompare })
    return this.defaultReturnMethods()
  }

  notEqual (valueToCompare: any): SchemaReturn {
    this.methodBuild({ method: 'notEqual', valueToCompare })
    return this.defaultReturnMethods()
  }

  oneOf (comparisonItems: SchemaReturn[] | any[]): SchemaReturn {
    this.methodBuild({ method: 'oneOf', comparisonItems })
    return this.defaultReturnMethods()
  }

  notOneOf (comparisonItems: SchemaReturn[] | any[]): SchemaReturn {
    this.methodBuild({ method: 'notOneOf', comparisonItems })
    return this.defaultReturnMethods()
  }

  alias (valueName: string): SchemaAliasMethod {
    if (typeof valueName !== 'string') {
      console.error('vkrun-schema: alias method received invalid parameter!')
      throw Error('vkrun-schema: alias method received invalid parameter!')
    }

    this.methodBuild({ method: 'alias', alias: valueName })
    return {
      string: () => this.string(),
      number: () => this.number(),
      boolean: () => this.boolean(),
      date: (type?: SchemaDateTypes) => this.date(type),
      array: (config?: SchemaArrayConfig) => this.array(config),
      equal: (valueToCompare: any) => this.equal(valueToCompare),
      object: (schema: SchemaObjectType) => this.object(schema),
      ...this.defaultReturnMethods()
    }
  }

  object (schema: SchemaObjectType): SchemaReturn {
    try {
      for (const [key, rule] of Object.entries(schema) as [string, any]) {
        rule.validate(undefined, key)
      }
    } catch (error) {
      console.error('vkrun-schema: object method received invalid parameter!')
      throw Error('vkrun-schema: object method received invalid parameter!')
    }

    this.methodBuild({ method: 'object', schema })
    return this.defaultReturnMethods()
  }

  array (config?: SchemaArrayConfig): SchemaArrayMethod {
    this.methodBuild({ method: 'array', min: config?.min, max: config?.max })
    return {
      string: () => this.string(),
      boolean: () => this.boolean(),
      number: () => this.number(),
      bigInt: () => this.bigInt(),
      date: (type?: SchemaDateTypes) => this.date(type),
      object: (schema: SchemaObjectType) => this.object(schema),
      oneOf: (comparisonItems: SchemaReturn[] | any[]) => this.oneOf(comparisonItems),
      notOneOf: (comparisonItems: SchemaReturn[] | any[]) => this.notOneOf(comparisonItems),
      buffer: () => this.buffer(),
      function: () => this.function(),
      ...this.defaultReturnMethods()
    }
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
      nullable: () => this.nullable(),
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
const schema = (): VkrunSchema => {
  return new SchemaSetup()
}

export { schema, setLocation }
