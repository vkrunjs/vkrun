import { informativeMessage } from '../location'
import {
  addBooleanResults,
  addDateResults,
  addEmailResults,
  addFloatResults,
  addIntegerResults,
  addMaxLengthResults,
  addMinLengthResults,
  addMinWordResults,
  addNumberResults,
  addRequiredResults,
  addStringResults,
  addUuidResults,
  addDateGreaterThanResults,
  addDateLessThanResults,
  addTimeResults
} from './helpers'
import {
  DateTypes,
  ErrorTest,
  ErrorTypes,
  IValidator,
  Methods,
  SuccessTest,
  Tests,
  TimeTypes,
  ValidatorValue,
  ValidatorValueName
} from '../types'

export class Validator implements IValidator {
  private readonly value: ValidatorValue
  private readonly valueName: ValidatorValueName
  private readonly methods: Methods
  private uninitializedValidation: boolean
  private readonly tests: Tests

  constructor (value: ValidatorValue, valueName: ValidatorValueName) {
    this.value = value
    this.valueName = valueName
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
      this.methods.push({ method: 'string' })
    } else {
      addStringResults({
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
      this.methods.push({ method: 'minWord', minWord })
    } else {
      addMinWordResults({
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
      this.methods.push({ method: 'uuid' })
    } else {
      addUuidResults({
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
      this.methods.push({ method: 'email' })
    } else {
      addEmailResults({
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
      this.methods.push({ method: 'maxLength', maxLength })
    } else {
      addMaxLengthResults({
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
      this.methods.push({ method: 'minLength', minLength })
    } else {
      addMinLengthResults({
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
      this.methods.push({ method: 'number' })
    } else {
      addNumberResults({
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
      this.methods.push({ method: 'float' })
    } else {
      addFloatResults({
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
      this.methods.push({ method: 'integer' })
    } else {
      addIntegerResults({
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
      this.methods.push({ method: 'boolean' })
    } else {
      addBooleanResults({
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
      this.methods.push({ method: 'required' })
    } else {
      addRequiredResults({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  date (type?: DateTypes): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'date', dateType: type })
    } else {
      addDateResults({
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
      this.methods.push({ method: 'dateGreaterThan', dateToCompare })
    } else {
      addDateGreaterThanResults({
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
      this.methods.push({ method: 'dateLessThan', dateToCompare })
    } else {
      addDateLessThanResults({
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
      this.methods.push({ method: 'time', timeType: type })
    } else {
      addTimeResults({
        value: this.value,
        valueName: this.valueName,
        type,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
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
    this.uninitializedValidation = false
    this.methods.forEach((rule) => {
      if (rule.method === 'required') {
        this.required()
      } else if (rule.method === 'string') {
        this.string()
      } else if (rule.method === 'minWord') {
        this.minWord(rule.minWord as any)
      } else if (rule.method === 'email') {
        this.email()
      } else if (rule.method === 'uuid') {
        this.uuid()
      } else if (rule.method === 'maxLength') {
        this.maxLength(rule.maxLength as any)
      } else if (rule.method === 'minLength') {
        this.minLength(rule.minLength as any)
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
        this.dateGreaterThan(rule?.dateToCompare as any)
      } else if (rule.method === 'dateLessThan') {
        this.dateLessThan(rule?.dateToCompare as any)
      } else if (rule.method === 'time') {
        this.time(rule?.timeType as any)
      }
    })
  }

  throw (ClassError?: ErrorTypes): void {
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

  validate (): Tests {
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

export const validator = (value: ValidatorValue, valueName: ValidatorValueName): Validator => {
  return new Validator(value, valueName)
}
