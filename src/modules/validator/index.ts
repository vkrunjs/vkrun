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
  ErrorTest,
  ErrorTypes,
  IValidator,
  Method,
  Methods,
  ObjectConfig,
  ObjectType,
  SuccessTest,
  Tests,
  TimeTypes
} from '../types'
import { hasMethod } from '../utils'
import { CreateSchema } from '../schema'

export class Validator implements IValidator {
  private value: any
  private valueName: string
  private readonly methods: Methods
  private uninitializedValidation: boolean
  private tests: Tests

  constructor () {
    this.valueName = ''
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

  string (): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'string' })
    } else {
      validateString({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  minWord (minWord: number): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'minWord', minWord })
    } else {
      validateMinWord({
        value: this.value,
        valueName: this.valueName,
        minWord,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  uuid (): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'uuid' })
    } else {
      validateUuid({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  email (): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'email' })
    } else {
      validateEmail({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  maxLength (maxLength: number): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'maxLength', maxLength })
    } else {
      validateMaxLength({
        value: this.value,
        valueName: this.valueName,
        maxLength,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  minLength (minLength: number): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'minLength', minLength })
    } else {
      validateMinLength({
        value: this.value,
        valueName: this.valueName,
        minLength,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
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

  boolean (): this {
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
    return this
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

  notRequired (): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'notRequired' })
    } else {
      validateNotRequired({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success)
      })
    }
    return this
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
      if (rule.method !== 'notRequired') {
        this.required()
      }
      if (rule.method === 'string') {
        this.string()
      } else if (rule.method === 'minWord') {
        this.minWord(rule.minWord)
      } else if (rule.method === 'email') {
        this.email()
      } else if (rule.method === 'uuid') {
        this.uuid()
      } else if (rule.method === 'maxLength') {
        this.maxLength(rule.maxLength)
      } else if (rule.method === 'minLength') {
        this.minLength(rule.minLength)
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

    const prioritizeRequired = (): void => {
      const prioritizeIndex = this.methods.findIndex(
        method => method.method === 'notRequired'
      )

      if (prioritizeIndex !== -1) {
        const prioritizeMethod = this.methods.splice(prioritizeIndex, 1)[0]
        this.methods.unshift(prioritizeMethod)
      }
    }

    const execute = (): void => {
      if (hasMethod(this.methods, 'array')) {
        if (hasMethod(this.methods, 'notRequired')) {
          if (this.value !== undefined) this.array()
          else this.notRequired()
        } else {
          this.required()
          this.array()
        }
      } else {
        prioritizeRequired()
        this.methods.forEach(rule => executeMethod(rule))
      }
    }

    if (hasMethod(this.methods, 'notRequired') && !hasMethod(this.methods, 'array')) {
      if (this.value !== undefined) execute()
      else this.notRequired()
    } else if (!hasMethod(this.methods, 'notRequired')) {
      execute()
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

  throw (value: any, valueName: string, ClassError?: ErrorTypes): void {
    this.value = value
    if (!this.valueName) this.valueName = valueName
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
    if (!this.valueName) this.valueName = valueName
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
    this.value = value
    if (!this.valueName) this.valueName = valueName
    const startDate = new Date()
    this.executeMethods()
    const endTime = new Date()
    const elapsedTime = endTime.getTime() - startDate.getTime()
    const seconds = Math.floor(elapsedTime / 1000)
    const ms = elapsedTime % 1000 || 1
    this.tests.time = `${seconds}s ${ms}ms`
    return this.tests
  }

  async testAsync (value: any, valueName: string): Promise<Tests> {
    this.value = await value
    if (!this.valueName) this.valueName = valueName
    const startDate = new Date()
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
