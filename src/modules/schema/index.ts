import { validator } from '../validator'
import { hasMethod } from '../utils'
import {
  MinDateMethod,
  MaxDateMethod,
  DateMethod,
  DateTypes,
  DefaultReturn,
  EmailMethod,
  ErrorTest,
  ErrorTypes,
  ISchema,
  MaxLengthMethod,
  Method,
  Methods,
  MinLengthMethod,
  MinWordMethod,
  NotRequiredMethod,
  NumberMethod,
  ObjectType,
  StringMethod,
  SuccessTest,
  Tests,
  TimeTypes,
  UUIDMethod,
  TimeMethod,
  AliasMethod,
  ArrayMethod
} from '../types'
import { throwError } from '../errors'

export class Schema implements ISchema {
  private value: any
  private valueName: any
  private readonly methods: Methods
  private tests: Tests

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

  string (): StringMethod {
    this.methodBuild({ method: 'string' })

    const email = (): EmailMethod => {
      this.methodBuild({ method: 'email' })
      return this.defaultReturnMethods()
    }

    const UUID = (): UUIDMethod => {
      this.methodBuild({ method: 'UUID' })
      return this.defaultReturnMethods()
    }

    const time = (type: TimeTypes): TimeMethod => {
      if (!['HH:MM', 'HH:MM:SS', 'HH:MM:SS.MS'].includes(type)) {
        console.error('vkrun: time method received invalid parameter!')
        throw Error('vkrun: time method received invalid parameter!')
      }

      this.methodBuild({ method: 'time', timeType: type })
      return this.defaultReturnMethods()
    }

    const minLength = (limit: number): MinLengthMethod => {
      if (hasMethod(this.methods, 'minLength')) {
        console.error('vkrun: minLength method has already been called!')
        throw Error('minLength method has already been called!')
      }

      if (typeof limit !== 'number' || limit < 0) {
        console.error('vkrun: minLength method received invalid parameter!')
        throw Error('vkrun: minLength method received invalid parameter!')
      }

      this.methodBuild({ method: 'minLength', minLength: limit })
      return { maxLength, minWord, ...this.defaultReturnMethods() }
    }

    const maxLength = (limit: number): MaxLengthMethod => {
      if (hasMethod(this.methods, 'maxLength')) {
        console.error('vkrun: maxLength method has already been called!')
        throw Error('maxLength method has already been called!')
      }

      if (typeof limit !== 'number' || limit < 0) {
        console.error('vkrun: maxLength method received invalid parameter!')
        throw Error('vkrun: maxLength method received invalid parameter!')
      }

      this.methodBuild({ method: 'maxLength', maxLength: limit })
      return { minLength, minWord, ...this.defaultReturnMethods() }
    }

    const minWord = (limit: number): MinWordMethod => {
      if (hasMethod(this.methods, 'minWord')) {
        console.error('vkrun: minWord method has already been called!')
        throw Error('minWord method has already been called!')
      }

      if (typeof limit !== 'number' || limit < 0) {
        console.error('vkrun: minWord method received invalid parameter!')
        throw Error('vkrun: minWord method received invalid parameter!')
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

  number (): NumberMethod {
    this.methodBuild({ method: 'number' })

    const float = (): DefaultReturn => {
      this.methodBuild({ method: 'float' })
      return this.defaultReturnMethods()
    }

    const integer = (): DefaultReturn => {
      this.methodBuild({ method: 'integer' })
      return this.defaultReturnMethods()
    }

    return { float, integer, ...this.defaultReturnMethods() }
  }

  boolean (): DefaultReturn {
    this.methodBuild({ method: 'boolean' })
    return this.defaultReturnMethods()
  }

  notRequired (): NotRequiredMethod {
    this.methodBuild({ method: 'notRequired' })
    return {
      throw: (value: any, valueName: string, ClassError?: ErrorTypes) => this.throw(value, valueName, ClassError),
      throwAsync: async (value: any, valueName: string, ClassError?: ErrorTypes) => await this.throwAsync(value, valueName, ClassError),
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  date (type?: DateTypes): DateMethod {
    const dateTypes = ['ISO8601', 'DD/MM/YYYY', 'MM/DD/YYYY', 'DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY/MM/DD', 'YYYY/DD/MM', 'YYYY-MM-DD', 'YYYY-DD-MM']
    if (type !== undefined && !dateTypes.includes(type)) {
      console.error('vkrun: date method received invalid parameter!')
      throw Error('vkrun: date method received invalid parameter!')
    }

    this.methodBuild({ method: 'date', dateType: type })

    const min = (dateToCompare: Date): MinDateMethod => {
      if (!(dateToCompare instanceof Date)) {
        console.error('vkrun: min method received invalid parameter!')
        throw Error('vkrun: min method received invalid parameter!')
      }

      if (hasMethod(this.methods, 'min')) {
        console.error('vkrun: min method has already been called!')
        throw Error('min method has already been called!')
      }

      this.methodBuild({ method: 'min', dateToCompare })
      return { max, ...this.defaultReturnMethods() }
    }

    const max = (dateToCompare: Date): MaxDateMethod => {
      if (!(dateToCompare instanceof Date)) {
        console.error('vkrun: max method received invalid parameter!')
        throw Error('vkrun: max method received invalid parameter!')
      }

      if (hasMethod(this.methods, 'max')) {
        console.error('vkrun: max method has already been called!')
        throw Error('max method has already been called!')
      }

      this.methodBuild({ method: 'max', dateToCompare })
      return { min, ...this.defaultReturnMethods() }
    }

    return { min, max, ...this.defaultReturnMethods() }
  }

  equal (valueToCompare: any): DefaultReturn {
    this.methodBuild({ method: 'equal', valueToCompare })
    return this.defaultReturnMethods()
  }

  alias (valueName: string): AliasMethod {
    if (typeof valueName !== 'string') {
      console.error('vkrun: alias method received invalid parameter!')
      throw Error('vkrun: alias method received invalid parameter!')
    }

    this.methodBuild({ method: 'alias', alias: valueName })
    return {
      string: () => this.string(),
      number: () => this.number(),
      boolean: () => this.boolean(),
      date: (type?: DateTypes) => this.date(type),
      array: () => this.array(),
      equal: (valueToCompare: any) => this.equal(valueToCompare),
      object: (schema: ObjectType) => this.object(schema),
      ...this.defaultReturnMethods()
    }
  }

  object (schema: ObjectType): DefaultReturn {
    try {
      for (const [key, rule] of Object.entries(schema) as [string, any]) {
        rule.validate(undefined, key)
      }
    } catch (error) {
      console.error('vkrun: object method received invalid parameter!')
      throw Error('vkrun: object method received invalid parameter!')
    }

    this.methodBuild({ method: 'object', schema })
    return this.defaultReturnMethods()
  }

  array (): ArrayMethod {
    this.methodBuild({ method: 'array' })
    return {
      string: () => this.string(),
      boolean: () => this.boolean(),
      number: () => this.number(),
      date: (type?: DateTypes) => this.date(type),
      object: (schema: ObjectType) => this.object(schema),
      ...this.defaultReturnMethods()
    }
  }

  private methodBuild (build: Method): void {
    this.methods.push(build)
  }

  private validateMethods (): void {
    validator({
      value: this.value,
      valueName: this.valueName,
      methods: this.methods,
      callbackUpdateTest: (test: Tests): void => {
        this.tests.passed += test.passed
        this.tests.failed += test.failed
        this.tests.totalTests += test.totalTests

        test.successes.forEach((success: SuccessTest) => {
          this.tests.successes.push(success)
        })

        test.errors.forEach((error: ErrorTest) => {
          this.tests.errors.push(error)
        })

        this.tests.passedAll = this.tests.passed === this.tests.totalTests
      },
      callbackAddPassed: (success: SuccessTest) => {
        ++this.tests.passed
        ++this.tests.totalTests
        this.tests.successes.push(success)
        this.tests.passedAll = this.tests.passed === this.tests.totalTests
      },
      callbackAddFailed: (error: ErrorTest) => {
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

  private defaultReturnMethods (): DefaultReturn {
    return {
      notRequired: () => this.notRequired(),
      throw: (value: any, valueName: string, ClassError?: ErrorTypes) => this.throw(value, valueName, ClassError),
      throwAsync: async (value: any, valueName: string, ClassError?: ErrorTypes) => await this.throwAsync(value, valueName, ClassError),
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  throw (value: any, valueName: string, ClassError?: ErrorTypes): void {
    this.value = value
    this.valueName = valueName
    this.validateMethods()
    throwError(this.tests, ClassError)
  }

  async throwAsync (value: any, valueName: string, ClassError?: ErrorTypes): Promise<void> {
    this.value = await value
    this.valueName = valueName
    this.validateMethods()
    throwError(this.tests, ClassError)
  }

  test (value: any, valueName: string): Tests {
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

  async testAsync (value: any, valueName: string): Promise<Tests> {
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

export const schema = (): ISchema => {
  return new Schema()
}
