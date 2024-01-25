import {
  validateBoolean,
  validateDate,
  validateEmail,
  validateFloat,
  validateInteger,
  validateMaxLength,
  validateMinLength,
  validateMinWord,
  validateNumber,
  validateRequired,
  validateString,
  validateUuid,
  validateDateGreaterThan,
  validateDateLessThan,
  validateTime,
  validateNotRequired,
  validateArray,
  validateEqual
} from './helpers/validate'
import {
  DateTypes,
  DefaultReturn,
  EmailMethod,
  ErrorTest,
  ErrorTypes,
  IValidator,
  MaxLengthMethod,
  Method,
  Methods,
  MinLengthMethod,
  MinWordMethod,
  NotRequiredMethod,
  ObjectConfig,
  ObjectType,
  StringMethod,
  SuccessTest,
  Tests,
  TimeTypes,
  UUIDMethod
} from '../types'
import { hasMethod } from '../utils'
import { CreateSchema } from '../schema'

export class Validator implements IValidator {
  private value: any
  private valueName: any
  private readonly methods: Methods
  private uninitializedValidation: boolean
  private tests: Tests

  constructor () {
    this.valueName = undefined
    this.methods = []
    this.uninitializedValidation = true
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

    const minLength = (minLength: number): MinLengthMethod => {
      if (hasMethod(this.methods, 'minLength')) {
        console.error('vkrun: minLength method has already been called!')
        throw Error('minLength method has already been called!')
      }

      this.methodBuild({ method: 'minLength', minLength })
      return { maxLength, minWord, ...this.defaultReturnMethods() }
    }

    const maxLength = (maxLength: number): MaxLengthMethod => {
      if (hasMethod(this.methods, 'maxLength')) {
        console.error('vkrun: maxLength method has already been called!')
        throw Error('maxLength method has already been called!')
      }

      this.methodBuild({ method: 'maxLength', maxLength })
      return { minLength, minWord, ...this.defaultReturnMethods() }
    }

    const minWord = (minWord: number): MinWordMethod => {
      if (hasMethod(this.methods, 'minWord')) {
        console.error('vkrun: minWord method has already been called!')
        throw Error('minWord method has already been called!')
      }

      this.methodBuild({ method: 'minWord', minWord })
      return { minLength, maxLength, ...this.defaultReturnMethods() }
    }

    return {
      minLength,
      maxLength,
      minWord,
      email,
      UUID,
      ...this.defaultReturnMethods()
    }
  }

  number (): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'number' })
    } else {
      validateNumber({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  float (): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'float' })
    } else {
      validateFloat({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  integer (): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'integer' })
    } else {
      validateInteger({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  boolean (): DefaultReturn {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'boolean' })
    } else {
      validateBoolean({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this.defaultReturnMethods()
  }

  private required (): void {
    if (!this.uninitializedValidation) {
      validateRequired({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
  }

  notRequired (): NotRequiredMethod {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'notRequired' })
    } else {
      validateNotRequired({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success)
      })
    }

    return {
      throw: (value: any, valueName: string, ClassError?: ErrorTypes) => this.throw(value, valueName, ClassError),
      throwAsync: async (value: any, valueName: string, ClassError?: ErrorTypes) => await this.throwAsync(value, valueName, ClassError),
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  date (type?: DateTypes): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'date', dateType: type })
    } else {
      validateDate({
        value: this.value,
        valueName: this.valueName,
        type,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  dateGreaterThan (dateToCompare: Date): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'dateGreaterThan', dateToCompare })
    } else {
      validateDateGreaterThan({
        value: this.value,
        valueName: this.valueName,
        dateToCompare,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  dateLessThan (dateToCompare: Date): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'dateLessThan', dateToCompare })
    } else {
      validateDateLessThan({
        value: this.value,
        valueName: this.valueName,
        dateToCompare,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  time (type: TimeTypes): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'time', timeType: type })
    } else {
      validateTime({
        value: this.value,
        valueName: this.valueName,
        type,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  alias (valueName: string): this {
    this.valueName = valueName
    return this
  }

  array (): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'array' })
    } else {
      validateArray({
        value: this.value,
        valueName: this.valueName,
        methods: this.methods,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  equal (valueToCompare: any): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'equal', valueToCompare })
    } else {
      validateEqual({
        value: this.value,
        valueToCompare,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  schema (schema: ObjectType, config?: ObjectConfig): CreateSchema {
    return new CreateSchema(schema, config)
  }

  private methodBuild (build: Method): void {
    this.methods.push(build)
  }

  private passedAll (): void {
    this.tests.passedAll = this.tests.passed === this.tests.totalTests
  }

  private addPassed (success: SuccessTest): void {
    ++this.tests.passed
    ++this.tests.totalTests
    this.tests.successes.push(success)
    this.passedAll()
  }

  private addFailed (error: ErrorTest): void {
    ++this.tests.failed
    ++this.tests.totalTests
    this.tests.errors.push(error)
    this.passedAll()
  }

  private executeMethods (): void {
    this.resetTests()

    this.uninitializedValidation = false
    const executeMethod = (rule: any): void => {
      if (rule.method === 'string') {
        validateString({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'minWord') {
        validateMinWord({
          value: this.value,
          valueName: this.valueName,
          minWord: rule.minWord,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'email') {
        validateEmail({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'UUID') {
        validateUuid({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'maxLength') {
        validateMaxLength({
          value: this.value,
          valueName: this.valueName,
          maxLength: rule.maxLength,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'minLength') {
        validateMinLength({
          value: this.value,
          valueName: this.valueName,
          minLength: rule.minLength,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'number') {
        this.number()
      } else if (rule.method === 'float') {
        this.float()
      } else if (rule.method === 'integer') {
        this.integer()
      } else if (rule.method === 'boolean') {
        this.boolean()
      } else if (rule.method === 'date') {
        this.date(rule.dateType)
      } else if (rule.method === 'dateGreaterThan') {
        this.dateGreaterThan(rule?.dateToCompare)
      } else if (rule.method === 'dateLessThan') {
        this.dateLessThan(rule?.dateToCompare)
      } else if (rule.method === 'time') {
        this.time(rule?.timeType)
      } else if (rule.method === 'equal') {
        this.equal(rule?.valueToCompare)
      }
    }

    if (hasMethod(this.methods, 'notRequired')) {
      this.notRequired()
      if (this.value === undefined) return
    } else {
      this.required()
    }

    if (hasMethod(this.methods, 'array')) {
      this.array()
    } else {
      this.methods.forEach(rule => executeMethod(rule))
    }
  }

  private resetTests (): void {
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
    this.executeMethods()

    if (this.tests.errors.length > 0) {
      if (ClassError) {
        const TestClassError = new ClassError('')
        const extendsError = TestClassError instanceof Error
        if (extendsError) {
          throw new ClassError(this.tests.errors[0].message)
        } else {
          throw new Error('invalid param: class error provided is not valid!')
        }
      } else {
        throw new Error(this.tests.errors[0].message)
      }
    }
  }

  async throwAsync (value: any, valueName: string, ClassError?: ErrorTypes): Promise<void> {
    this.value = await value
    this.valueName = valueName
    this.executeMethods()

    if (this.tests.errors.length > 0) {
      if (ClassError) {
        const TestClassError = new ClassError('')
        const extendsError = TestClassError instanceof Error
        if (extendsError) {
          throw new ClassError(this.tests.errors[0].message)
        } else {
          throw new Error('invalid param: class error provided is not valid!')
        }
      } else {
        throw new Error(this.tests.errors[0].message)
      }
    }
  }

  test (value: any, valueName: string): Tests {
    const startDate = new Date()
    this.value = value
    this.valueName = valueName
    this.executeMethods()
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
    this.executeMethods()
    const endTime = new Date()
    const elapsedTime = endTime.getTime() - startDate.getTime()
    const seconds = Math.floor(elapsedTime / 1000)
    const ms = elapsedTime % 1000 || 1
    this.tests.time = `${seconds}s ${ms}ms`
    return this.tests
  }

  validate (value: any): boolean {
    this.value = value
    this.executeMethods()
    return this.tests.passedAll
  }

  async validateAsync (value: any): Promise<boolean> {
    this.value = await value
    this.executeMethods()
    return this.tests.passedAll
  }
}

export const validator = (): Validator => {
  return new Validator()
}
