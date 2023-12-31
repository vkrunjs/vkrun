import { informativeMessage } from '../location'
import {
  DateTypes,
  ErrorTest,
  ErrorTypes,
  IValidator,
  Methods,
  Tests,
  TimeTypes,
  ValidatorValue,
  ValidatorValueName
} from '../types'
import { formattedYYYYDDMMHHMMSS, isNotEmpty } from './utils'

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
      errors: [],
      time: ''
    }
  }

  string (): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'string' })
    } else {
      const isString = typeof this.value === 'string'
      if (isString) {
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.string.strict
        const valueName = this.valueName ? this.valueName : 'valueName'
        const messageError = message.replace('[valueName]', valueName)
        this.addFailed({
          method: 'string',
          type: 'invalid value',
          name: this.valueName,
          expect: 'string type',
          received: this.value,
          message: messageError
        })
      }
    }

    return this
  }

  minWord (minWord: number): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'minWord', minWord })
    } else {
      const trimmedValue = String(this.value).trim()
      const words = trimmedValue.split(/\s+/)
      const hasMinOfWords = words.length >= minWord
      if (hasMinOfWords) {
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.minWord.noMinimumWords
        const messageError = message
          .replace('[valueName]', this.valueName)
          .replace('[minWord]', String(minWord))

        this.addFailed({
          method: 'minWord',
          type: 'invalid value',
          name: this.valueName,
          expect: 'must have a minimum of words',
          received: this.value,
          message: messageError
        })
      }
    }
    return this
  }

  uuid (): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'uuid' })
    } else {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      const isUuid = uuidRegex.test(String(this.value))
      if (isUuid) {
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.uuid.strict
        const messageError = message.replace('[valueName]', this.valueName)

        this.addFailed({
          method: 'uuid',
          type: 'invalid value',
          name: this.valueName,
          expect: 'uuid format',
          received: this.value,
          message: messageError
        })
      }
    }
    return this
  }

  email (): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'email' })
    } else {
      const regEmail = /^[a-zA-Z0-9_.+-]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      const emailFormatIsValid = regEmail.test(String(this.value))
      if (emailFormatIsValid) {
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.email.strict
        const messageError = message.replace('[value]', String(this.value))

        this.addFailed({
          method: 'email',
          type: 'invalid value',
          name: this.valueName,
          expect: 'valid email',
          received: this.value,
          message: messageError
        })
      }
    }
    return this
  }

  maxLength (maxLength: number): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'maxLength', maxLength })
    } else {
      const isString = typeof this.value === 'string'

      const handleAddFailed = (messageError: string): void => {
        this.addFailed({
          method: 'maxLength',
          type: 'invalid value',
          name: this.valueName,
          expect: 'string with characters less than or equal to the limit',
          received: this.value,
          message: messageError
        })
      }

      if (isString) {
        const exceededLimit = String(this.value).length > maxLength
        if (exceededLimit) {
          const message = informativeMessage.validator.method.maxLength.strict
          const messageError = message
            .replace('[valueName]', this.valueName)
            .replace('[maxLength]', String(maxLength))

          handleAddFailed(messageError)
          return this
        }
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.string.strict
        const messageError = message.replace('[valueName]', this.valueName)
        handleAddFailed(messageError)
      }
    }
    return this
  }

  minLength (minLength: number): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'minLength', minLength })
    } else {
      const isString = typeof this.value === 'string'

      const handleAddFailed = (messageError: string): void => {
        this.addFailed({
          method: 'minLength',
          type: 'invalid value',
          name: this.valueName,
          expect: 'string with characters greater than or equal to the limit',
          received: this.value,
          message: messageError
        })
      }

      if (isString) {
        const exceededLimit = String(this.value).length < minLength
        if (exceededLimit) {
          const message = informativeMessage.validator.method.minLength.strict
          const messageError = message
            .replace('[valueName]', this.valueName)
            .replace('[minLength]', String(minLength))

          handleAddFailed(messageError)
          return this
        }
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.string.strict
        const messageError = message.replace('[valueName]', this.valueName)
        handleAddFailed(messageError)
      }
    }
    return this
  }

  number (): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'number' })
    } else {
      const isNumber = typeof this.value === 'number'
      if (isNumber) {
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.number.strict
        const messageError = message.replace('[valueName]', this.valueName)

        this.addFailed({
          method: 'number',
          type: 'invalid value',
          name: this.valueName,
          expect: 'number type',
          received: this.value,
          message: messageError
        })
      }
    }
    return this
  }

  float (): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'float' })
    } else {
      const isNumber = typeof this.value === 'number'
      const isFloat = Number.isFinite(this.value) && !Number.isInteger(this.value)

      if (isNumber && isFloat && this.value % 1 !== 0) {
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.float.strict
        const messageError = message.replace('[valueName]', this.valueName)

        this.addFailed({
          method: 'float',
          type: 'invalid value',
          name: this.valueName,
          expect: 'number float type',
          received: this.value,
          message: messageError
        })
      }
    }
    return this
  }

  integer (): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'integer' })
    } else {
      const isInteger = Number.isInteger(this.value)

      if (isInteger) {
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.integer.strict
        const messageError = message.replace('[valueName]', this.valueName)

        this.addFailed({
          method: 'integer',
          type: 'invalid value',
          name: this.valueName,
          expect: 'number integer type',
          received: this.value,
          message: messageError
        })
      }
    }
    return this
  }

  boolean (): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'boolean' })
    } else {
      const isBoolean = typeof this.value === 'boolean'
      if (isBoolean) {
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.boolean.strict
        const messageError = message.replace('[valueName]', this.valueName)
        this.addFailed({
          method: 'boolean',
          type: 'invalid value',
          name: this.valueName,
          expect: 'boolean type',
          received: this.value,
          message: messageError
        })
      }
    }
    return this
  }

  required (): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'required' })
    } else {
      if (isNotEmpty(this.value)) {
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.required.strict
        const messageError = message.replace('[valueName]', this.valueName)
        const received = (): any => {
          if (this.value === null) return 'null'
          else if (this.value === undefined) return 'undefined'
          else return this.value
        }
        this.addFailed({
          method: 'required',
          type: 'missing value',
          name: this.valueName,
          expect: 'value other than undefined, null or empty string',
          received: received(),
          message: messageError
        })
      }
    }
    return this
  }

  date (type?: DateTypes): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'date', dateType: type })
    } else {
      let year: number, month: number, day: number
      let formattedDate: Date

      const invalidFormat = (): boolean => {
        return (typeof this.value === 'string' &&
              this.value.length < 10) ||
              (typeof this.value === 'string' &&
              this.value.length <= 10 &&
              type === 'ISO8601')
      }

      const handleAddFailed = (): void => {
        const message = informativeMessage.validator.method.date.invalidFormat
        const messageError = message
          .replace('[valueName]', this.valueName)
          .replace('[type]', type ?? 'ISO8601')

        this.addFailed({
          method: 'date',
          type: 'invalid value',
          name: this.valueName,
          expect: `date type ${type ?? 'ISO8601'}`,
          received: this.value,
          message: messageError
        })
      }

      if (invalidFormat()) {
        handleAddFailed()
        return this
      }

      switch (type) {
        case 'DD/MM/YYYY':
          [day, month, year] = String(this.value).split('/').map(Number)
          formattedDate = new Date(year, month - 1, day)
          break
        case 'MM/DD/YYYY':
          [month, day, year] = String(this.value).split('/').map(Number)
          formattedDate = new Date(year, month - 1, day)
          break
        case 'DD-MM-YYYY':
          [day, month, year] = String(this.value).split('-').map(Number)
          formattedDate = new Date(year, month - 1, day)
          break
        case 'MM-DD-YYYY':
          [month, day, year] = String(this.value).split('-').map(Number)
          formattedDate = new Date(year, month - 1, day)
          break
        case 'YYYY/MM/DD':
          [year, month, day] = String(this.value).split('/').map(Number)
          formattedDate = new Date(year, month - 1, day)
          break
        case 'YYYY/DD/MM':
          [year, day, month] = String(this.value).split('/').map(Number)
          formattedDate = new Date(year, month - 1, day)
          break
        case 'YYYY-MM-DD':
          [year, month, day] = String(this.value).split('-').map(Number)
          formattedDate = new Date(year, month - 1, day)
          break
        case 'YYYY-DD-MM':
          [year, day, month] = String(this.value).split('-').map(Number)
          formattedDate = new Date(year, month - 1, day)
          break
        default:
          formattedDate = new Date(String(this.value))
      }

      const isInvalidDate = !formattedDate || isNaN(formattedDate.getTime())
      if (isInvalidDate) {
        handleAddFailed()
        return this
      } else this.addPassed()
    }
    return this
  }

  dateGreaterThan (dateToCompare: Date): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'dateGreaterThan', dateToCompare })
    } else {
      const date = new Date(String(this.value))
      const isInvalidDate = isNaN(date.getTime())

      const handleAddFailed = (messageError: string): void => {
        const expect = (): string => {
          if (this.value instanceof Date && dateToCompare instanceof Date) {
            return `${formattedYYYYDDMMHHMMSS(date)} greater than reference ${formattedYYYYDDMMHHMMSS(dateToCompare)}`
          } else {
            return `date ${this.valueName} greater than reference date`
          }
        }
        this.addFailed({
          method: 'dateGreaterThan',
          type: 'invalid value',
          name: this.valueName,
          expect: expect(),
          received: this.value,
          message: messageError
        })
      }

      if (isInvalidDate) {
        handleAddFailed(informativeMessage.validator.method.dateGreaterThan.invalidDate)
        return this
      }

      const datesAreEqual = date.getTime() === dateToCompare.getTime()
      const deadlineExceeded = date < dateToCompare

      if (datesAreEqual || deadlineExceeded) {
        const message = informativeMessage.validator.method.dateGreaterThan.limitExceeded
        const messageError = message.replace('[valueName]', this.valueName)
        handleAddFailed(messageError)
        return this
      }

      this.addPassed()
    }
    return this
  }

  dateLessThan (dateToCompare: Date): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'dateLessThan', dateToCompare })
    } else {
      const date = new Date(String(this.value))
      const isInvalidDate = isNaN(date.getTime())

      const handleAddFailed = (messageError: string): void => {
        const expect = (): string => {
          if (this.value instanceof Date && dateToCompare instanceof Date) {
            return `${formattedYYYYDDMMHHMMSS(date)} less than reference ${formattedYYYYDDMMHHMMSS(dateToCompare)}`
          } else {
            return `date ${this.valueName} less than reference date`
          }
        }
        this.addFailed({
          method: 'dateGreaterThan',
          type: 'invalid value',
          name: this.valueName,
          expect: expect(),
          received: this.value,
          message: messageError
        })
      }

      if (isInvalidDate) {
        handleAddFailed(informativeMessage.validator.method.dateGreaterThan.invalidDate)
        return this
      }

      const datesAreEqual = date.getTime() === dateToCompare.getTime()
      const deadlineExceeded = date > dateToCompare

      if (datesAreEqual || deadlineExceeded) {
        const message = informativeMessage.validator.method.dateLessThan.limitExceeded
        const messageError = message.replace('[valueName]', this.valueName)
        handleAddFailed(messageError)
        return this
      }
      this.addPassed()
    }
    return this
  }

  time (type: TimeTypes): this {
    if (this.uninitializedValidation) {
      this.methods.push({ method: 'time', timeType: type })
    } else {
      const regTimeHHMM = /^([01]\d|2[0-3]):[0-5]\d$/
      const regTimeHHMMSS = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
      let isTime = false

      const handleAddFailed = (messageError: string): void => {
        this.addFailed({
          method: 'time',
          type: 'invalid value',
          name: this.valueName,
          expect: `format ${type}`,
          received: this.value,
          message: messageError
        })
      }

      if (!type || typeof type !== 'string') {
        handleAddFailed(informativeMessage.validator.method.time.invalidParameter)
        return this
      } else if (type === 'HH:MM') {
        isTime = regTimeHHMM.test(String(this.value))
      } else if (type === 'HH:MM:SS') {
        isTime = regTimeHHMMSS.test(String(this.value))
      }

      if (isTime) {
        this.addPassed()
      } else {
        const message = informativeMessage.validator.method.time.invalidFormat
        const messageError = message
          .replace('[value]', String(this.value))
          .replace('[type]', type)

        handleAddFailed(messageError)
      }
    }
    return this
  }

  private passedAll (): void {
    this.tests.passedAll = this.tests.passed === this.tests.totalTests
  }

  private addPassed (): void {
    ++this.tests.passed
    ++this.tests.totalTests
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
      switch (rule.method) {
        case 'required':
          this.required()
          break

        case 'string':
          this.string()
          break

        case 'minWord':
          this.minWord(rule.minWord as any)
          break

        case 'email':
          this.email()
          break

        case 'uuid':
          this.uuid()
          break

        case 'maxLength':
          this.maxLength(rule.maxLength as any)
          break

        case 'minLength':
          this.minLength(rule.minLength as any)
          break

        case 'number':
          this.number()
          break

        case 'float':
          this.float()
          break

        case 'integer':
          this.integer()
          break

        case 'boolean':
          this.boolean()
          break

        case 'date':
          this.date(rule.dateType)
          break

        case 'dateGreaterThan':
          this.dateGreaterThan(rule?.dateToCompare as any)
          break

        case 'dateLessThan':
          this.dateLessThan(rule?.dateToCompare as any)
          break

        case 'time':
          this.time(rule?.timeType as any)
          break

        default:
          break
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
