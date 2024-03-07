import * as helper from './helpers'
import { setLocation } from './helpers'
import * as type from '../types'

export class Schema implements type.ISchema {
  private value: any
  private valueName: any
  private readonly methods: type.Methods
  private tests: type.Tests

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

  string (): type.StringMethod {
    this.methodBuild({ method: 'string' })

    const email = (): type.EmailMethod => {
      this.methodBuild({ method: 'email' })
      return this.defaultReturnMethods()
    }

    const UUID = (version?: type.UUIDVersion): type.UUIDMethod => {
      this.methodBuild({ method: 'UUID', uuidVersion: version })
      return this.defaultReturnMethods()
    }

    const time = (type: type.TimeTypes): type.TimeMethod => {
      if (!['HH:MM', 'HH:MM:SS', 'HH:MM:SS.MS'].includes(type)) {
        console.error('vkrun-schema: time method received invalid parameter!')
        throw Error('vkrun-schema: time method received invalid parameter!')
      }

      this.methodBuild({ method: 'time', timeType: type })
      return this.defaultReturnMethods()
    }

    const minLength = (limit: number): type.MinLengthMethod => {
      if (helper.hasMethod(this.methods, 'minLength')) {
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

    const maxLength = (limit: number): type.MaxLengthMethod => {
      if (helper.hasMethod(this.methods, 'maxLength')) {
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

    const minWord = (limit: number): type.MinWordMethod => {
      if (helper.hasMethod(this.methods, 'minWord')) {
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

    return {
      minLength,
      maxLength,
      minWord,
      email,
      UUID,
      time,
      ...this.defaultReturnMethods()
    }
  }

  number (): type.NumberMethod {
    this.methodBuild({ method: 'number' })

    const float = (): type.DefaultReturn => {
      this.methodBuild({ method: 'float' })
      return this.defaultReturnMethods()
    }

    const integer = (): type.DefaultReturn => {
      this.methodBuild({ method: 'integer' })
      return this.defaultReturnMethods()
    }

    return { float, integer, ...this.defaultReturnMethods() }
  }

  boolean (): type.DefaultReturn {
    this.methodBuild({ method: 'boolean' })
    return this.defaultReturnMethods()
  }

  notRequired (): type.NotRequiredMethod {
    this.methodBuild({ method: 'notRequired' })
    return {
      throw: (value: any, valueName: string, ClassError?: type.ErrorTypes) => { this.throw(value, valueName, ClassError) },
      throwAsync: async (value: any, valueName: string, ClassError?: type.ErrorTypes) => { await this.throwAsync(value, valueName, ClassError) },
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  date (type?: type.DateTypes): type.DateMethod {
    const dateTypes = ['ISO8601', 'DD/MM/YYYY', 'MM/DD/YYYY', 'DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY/MM/DD', 'YYYY/DD/MM', 'YYYY-MM-DD', 'YYYY-DD-MM']
    if (type !== undefined && !dateTypes.includes(type)) {
      console.error('vkrun-schema: date method received invalid parameter!')
      throw Error('vkrun-schema: date method received invalid parameter!')
    }

    this.methodBuild({ method: 'date', dateType: type })

    const min = (dateToCompare: Date): type.MinDateMethod => {
      if (!(dateToCompare instanceof Date)) {
        console.error('vkrun-schema: min method received invalid parameter!')
        throw Error('vkrun-schema: min method received invalid parameter!')
      }

      if (helper.hasMethod(this.methods, 'min')) {
        console.error('vkrun-schema: min method has already been called!')
        throw Error('min method has already been called!')
      }

      this.methodBuild({ method: 'min', dateToCompare })
      return { max, ...this.defaultReturnMethods() }
    }

    const max = (dateToCompare: Date): type.MaxDateMethod => {
      if (!(dateToCompare instanceof Date)) {
        console.error('vkrun-schema: max method received invalid parameter!')
        throw Error('vkrun-schema: max method received invalid parameter!')
      }

      if (helper.hasMethod(this.methods, 'max')) {
        console.error('vkrun-schema: max method has already been called!')
        throw Error('max method has already been called!')
      }

      this.methodBuild({ method: 'max', dateToCompare })
      return { min, ...this.defaultReturnMethods() }
    }

    return { min, max, ...this.defaultReturnMethods() }
  }

  equal (valueToCompare: any): type.DefaultReturn {
    this.methodBuild({ method: 'equal', valueToCompare })
    return this.defaultReturnMethods()
  }

  alias (valueName: string): type.AliasMethod {
    if (typeof valueName !== 'string') {
      console.error('vkrun-schema: alias method received invalid parameter!')
      throw Error('vkrun-schema: alias method received invalid parameter!')
    }

    this.methodBuild({ method: 'alias', alias: valueName })
    return {
      string: () => this.string(),
      number: () => this.number(),
      boolean: () => this.boolean(),
      date: (type?: type.DateTypes) => this.date(type),
      array: () => this.array(),
      equal: (valueToCompare: any) => this.equal(valueToCompare),
      object: (schema: type.ObjectType) => this.object(schema),
      ...this.defaultReturnMethods()
    }
  }

  object (schema: type.ObjectType): type.DefaultReturn {
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

  array (): type.ArrayMethod {
    this.methodBuild({ method: 'array' })
    return {
      string: () => this.string(),
      boolean: () => this.boolean(),
      number: () => this.number(),
      date: (type?: type.DateTypes) => this.date(type),
      object: (schema: type.ObjectType) => this.object(schema),
      ...this.defaultReturnMethods()
    }
  }

  private methodBuild (build: type.Method): void {
    this.methods.push(build)
  }

  private validateMethods (): void {
    helper.validator({
      value: this.value,
      valueName: this.valueName,
      methods: this.methods,
      callbackUpdateTest: (test: type.Tests): void => {
        this.tests.passed += test.passed
        this.tests.failed += test.failed
        this.tests.totalTests += test.totalTests

        test.successes.forEach((success: type.SuccessTest) => {
          this.tests.successes.push(success)
        })

        test.errors.forEach((error: type.ErrorTest) => {
          this.tests.errors.push(error)
        })

        this.tests.passedAll = this.tests.passed === this.tests.totalTests
      },
      callbackAddPassed: (success: type.SuccessTest) => {
        ++this.tests.passed
        ++this.tests.totalTests
        this.tests.successes.push(success)
        this.tests.passedAll = this.tests.passed === this.tests.totalTests
      },
      callbackAddFailed: (error: type.ErrorTest) => {
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

  private defaultReturnMethods (): type.DefaultReturn {
    return {
      notRequired: () => this.notRequired(),
      throw: (value: any, valueName: string, ClassError?: type.ErrorTypes) => { this.throw(value, valueName, ClassError) },
      throwAsync: async (value: any, valueName: string, ClassError?: type.ErrorTypes) => { await this.throwAsync(value, valueName, ClassError) },
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  throw (value: any, valueName: string, ClassError?: type.ErrorTypes): void {
    this.value = value
    this.valueName = valueName
    this.validateMethods()
    helper.throwError(this.tests, ClassError)
  }

  async throwAsync (value: any, valueName: string, ClassError?: type.ErrorTypes): Promise<void> {
    this.value = await value
    this.valueName = valueName
    this.validateMethods()
    helper.throwError(this.tests, ClassError)
  }

  test (value: any, valueName: string): type.Tests {
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

  async testAsync (value: any, valueName: string): Promise<type.Tests> {
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

const schema = (): type.ISchema => {
  return new Schema()
}

export { schema, setLocation }
