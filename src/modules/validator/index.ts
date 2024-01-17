import { informativeMessage } from '../location'
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
  validateNotRequired
} from './helpers'
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
  TimeTypes,
  ValidatorValue,
  ValidatorValueName
} from '../types'
import { hasMethod, isNotEmpty } from '../utils'
import { CreateSchema } from '../schema'

export class Validator implements IValidator {
  private value: ValidatorValue
  private valueName: ValidatorValueName
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

  required (): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'required' })
    } else {
      validateRequired({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
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
      if (rule.method === 'required') {
        this.required()
      } else if (rule.method === 'notRequired') {
        this.notRequired()
      } else if (rule.method === 'string') {
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
      }
    }

    const prioritizeRequired = (): void => {
      const requiredIndex = this.methods.findIndex(
        method => method.method === 'required' || method.method === 'notRequired'
      )

      if (requiredIndex !== -1) {
        const requiredMethod = this.methods.splice(requiredIndex, 1)[0]
        this.methods.unshift(requiredMethod)
      }
    }

    const execute = (): void => {
      prioritizeRequired()
      this.methods.forEach(rule => executeMethod(rule))
    }

    if (hasMethod(this.methods, 'notRequired')) {
      if (isNotEmpty(this.value)) {
        execute()
      } else {
        validateNotRequired({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: (success) => this.addPassed(success)
        })
      }
    } else if (
      hasMethod(this.methods, 'required') ||
      (!hasMethod(this.methods, 'required') && !hasMethod(this.methods, 'notRequired'))
    ) {
      execute()
    }
  }

  schema (schema: ObjectType, config?: ObjectConfig): CreateSchema {
    return new CreateSchema(schema, config)
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

  async throw (value: any, valueName: ValidatorValueName, ClassError?: ErrorTypes): Promise<void> {
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
          throw new Error(informativeMessage.validator.constructorParams.valueName.invalidClassParam)
        }
      } else {
        throw new Error(this.tests.errors[0].message)
      }
    }
  }

  async validate (value: any, valueName: ValidatorValueName): Promise<Tests> {
    this.value = await value
    if (!this.valueName) this.valueName = valueName
    const stateDate = new Date()
    this.executeMethods()
    const endTime = new Date()
    const elapsedTime = endTime.getTime() - stateDate.getTime()
    const seconds = Math.floor(elapsedTime / 1000)
    const ms = elapsedTime % 1000 || 1
    this.tests.time = `${seconds}s ${ms}ms`
    return this.tests
  }
}

export const validator = (): Validator => {
  return new Validator()
}
