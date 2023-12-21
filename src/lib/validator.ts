import { InvalidParamError, MissingParamError, ServerError } from './errors'
import {
  DateTypes,
  ErrorTypes,
  IValidator,
  TimeTypes,
  ValidatorValue,
  ValidatorValueName
} from './types'

export class Validator implements IValidator {
  private readonly value: ValidatorValue
  private readonly valueName: ValidatorValueName
  private readonly errorType?: ErrorTypes
  private readonly isValid: boolean[]

  constructor (
    value: ValidatorValue,
    valueName: ValidatorValueName,
    errorType?: ErrorTypes
  ) {
    this.value = value
    this.errorType = errorType
    if (errorType && !valueName) throw new Error('missing class param: valueName is required!')
    this.valueName = valueName
    this.isValid = []
  }

  string (returnError?: Error): this {
    const isString = typeof this.value === 'string'
    if (isString) {
      this.isValid.push(true)
    } else {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `${this.valueName} must be a string type!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  minWord (minWord: number, returnError?: Error): this {
    const trimmedValue = String(this.value).trim()
    const words = trimmedValue.split(/\s+/)
    const hasMinOfWords = words.length >= minWord
    if (hasMinOfWords) {
      this.isValid.push(true)
    } else {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `${this.valueName} must have at least ${minWord} words!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  uuid (returnError?: Error): this {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const isUuid = uuidRegex.test(String(this.value))
    if (isUuid) {
      this.isValid.push(true)
    } else {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `${this.valueName} must be a uuid type!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  email (returnError?: Error): this {
    const regEmail = /^[a-zA-Z0-9_.+-]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const emailFormatIsValid = regEmail.test(String(this.value))
    if (emailFormatIsValid) {
      this.isValid.push(true)
    } else {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = 'email format is invalid!'
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  maxLength (maxLength: number, returnError?: Error): this {
    const isString = typeof this.value === 'string'
    if (isString) {
      const exceededLimit = String(this.value).length > maxLength
      if (exceededLimit) {
        if (returnError) throw new Error(returnError.message)
        else if (this.errorType) {
          const messageError = `${this.valueName} must have a maximum of ${maxLength} characters!`
          this.handleError(messageError)
        }
        this.isValid.push(true)
        return this
      }
      this.isValid.push(false)
    } else {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `${this.valueName} must be a string type!`
        this.handleError(messageError)
      }
      this.isValid.push(true)
    }
    return this
  }

  minLength (minLength: number, returnError?: Error): this {
    const isString = typeof this.value === 'string'
    if (isString) {
      const exceededLimit = String(this.value).length < minLength
      if (exceededLimit) {
        if (returnError) throw new Error(returnError.message)
        else if (this.errorType) {
          const messageError = `${this.valueName} must have a minimum of ${minLength} characters!`
          this.handleError(messageError)
        }
        this.isValid.push(true)
        return this
      }
      this.isValid.push(false)
    } else {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `${this.valueName} must be a string type!`
        this.handleError(messageError)
      }
      this.isValid.push(true)
    }
    return this
  }

  number (returnError?: Error): this {
    const isNumber = typeof this.value === 'number'
    if (isNumber) {
      this.isValid.push(true)
    } else {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `${this.valueName} must be a number type!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  float (returnError?: Error): this {
    const isNumber = typeof this.value === 'number'
    const isFloat = Number.isFinite(this.value) && !Number.isInteger(this.value)

    if (isNumber && isFloat && this.value % 1 !== 0) {
      this.isValid.push(true)
    } else {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `${this.valueName} must be a number and float!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }

    return this
  }

  integer (returnError?: Error): this {
    const isInteger = Number.isInteger(this.value)

    if (isInteger) {
      this.isValid.push(true)
    } else {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `${this.valueName} must be a number and integer!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }

    return this
  }

  boolean (returnError?: Error): this {
    const isBoolean = typeof this.value === 'boolean'
    if (!isBoolean) {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `${this.valueName} must be a boolean type!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
    } else {
      this.isValid.push(true)
    }
    return this
  }

  required (returnError?: Error): this {
    const isEmpty = !this.value || this.value === undefined

    if (typeof this.value === 'boolean') {
      this.isValid.push(true)
    } else if (typeof this.value === 'number' && this.value === 0) {
      this.isValid.push(true)
    } else if (isEmpty) {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `${this.valueName} is required!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
    } else {
      this.isValid.push(true)
    }
    return this
  }

  date (type: DateTypes, returnError?: Error): this {
    let year: number, month: number, day: number
    let formattedDate: Date

    if (typeof this.value === 'string' && this.value.length < 10) {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `the date ${this.valueName} is not in the format ${type}!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
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
      case 'ISO8601':
        formattedDate = new Date(String(this.value))
        break
      default:
        if (returnError) throw new Error(returnError.message)
        else if (this.errorType) {
          const messageError = 'date method received invalid parameter: type is required!!'
          this.handleError(messageError)
        }
        this.isValid.push(false)
        return this
    }
    const isInvalidDate = !formattedDate || isNaN(formattedDate.getTime())
    if (isInvalidDate) {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `the date ${this.valueName} is not in the format ${type}!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
    } else {
      this.isValid.push(true)
    }
    return this
  }

  dateGreaterThan (
    dateToCompare: Date,
    returnError?: Error
  ): this {
    const date = new Date(String(this.value))
    const isInvalidDate = isNaN(date.getTime())

    if (isInvalidDate) {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = 'the provided date is invalid!'
        this.handleError(messageError)
      }
      this.isValid.push(false)
      return this
    }

    const datesAreEqual = date.getTime() === dateToCompare.getTime()
    const deadlineExceeded = date < dateToCompare

    if (datesAreEqual) {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `the date ${this.valueName} must be greater than the reference date!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
      return this
    } else if (deadlineExceeded) {
      if (returnError) throw new Error(returnError.message)
      this.isValid.push(false)
    }
    this.isValid.push(true)
    return this
  }

  dateLessThan (
    dateToCompare: Date,
    returnError?: Error
  ): this {
    const date = new Date(String(this.value))
    const isInvalidDate = isNaN(date.getTime())
    if (isInvalidDate) {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = 'the provided date is invalid!'
        this.handleError(messageError)
      }
      this.isValid.push(false)
      return this
    }

    const datesAreEqual = date.getTime() === dateToCompare.getTime()
    const deadlineExceeded = date > dateToCompare

    if (datesAreEqual) {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `the date ${this.valueName} must be less than the reference date!`
        this.handleError(messageError)
      }
      this.isValid.push(false)
      return this
    } else if (deadlineExceeded) {
      if (returnError) throw new Error(returnError.message)
      this.isValid.push(false)
    }
    this.isValid.push(true)
    return this
  }

  time (type: TimeTypes, returnError?: Error): this {
    const regTimeHHMM = /^([01]\d|2[0-3]):[0-5]\d$/
    const regTimeHHMMSS = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
    let isTime = false

    if (!type || typeof type !== 'string') {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = 'time method received invalid parameter: type is required!'
        this.handleError(messageError)
      }
      this.isValid.push(false)
      return this
    } else if (type === 'HH:MM') {
      isTime = regTimeHHMM.test(String(this.value))
    } else if (type === 'HH:MM:SS') {
      isTime = regTimeHHMMSS.test(String(this.value))
    }

    if (isTime) {
      this.isValid.push(true)
    } else {
      if (returnError) throw new Error(returnError.message)
      else if (this.errorType) {
        const messageError = `the time ${String(this.value)} is not in the format ${type}`
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }

    return this
  }

  private handleError (messageError: string): this {
    switch (this.errorType) {
      case 'MISSING_PARAM':
        throw new MissingParamError(messageError)
      case 'INVALID_PARAM':
        throw new InvalidParamError(messageError)
      case 'SERVER_ERROR':
        throw new ServerError()
      default:
        throw new Error(messageError)
    }
  }

  validate (): boolean {
    return this.isValid.every(isValid => isValid)
  }
}
