import { InvalidParamError, MissingParamError, ServerError } from './errors'
import { DateTypes, ErrorTypes, IValidator } from './validator.types'

export class Validator implements IValidator {
  private readonly value: any
  private readonly valueName: string
  private readonly typeError?: ErrorTypes

  constructor (value: any, valueName: string, typeError?: ErrorTypes) {
    this.value = value
    this.valueName = valueName
    this.typeError = typeError
  }

  required (returnError?: Error): boolean | Error {
    const isEmpty = !this.value || this.value === undefined

    if (typeof this.value === 'boolean') return true
    else if (isEmpty) {
      switch (this.typeError) {
        case 'MISSING_PARAM': throw new MissingParamError(this.valueName)
        case 'INVALID_PARAM': throw new InvalidParamError(this.valueName)
        case 'SERVER_ERROR': throw new ServerError()
        default:
          if (returnError) throw new Error(returnError.message)
          return false
      }
    }

    return true
  }

  minWord (minWord: number, returnError?: Error): boolean | Error {
    const trimmedValue = this.value.trim()
    const words = trimmedValue.split(/\s+/)
    const notHasMinOfWords = words.length < minWord
    if (notHasMinOfWords && returnError) throw new Error(returnError.message)
    else if (notHasMinOfWords && !returnError) return false
    return true
  }

  isEmail (returnError?: Error): boolean | Error {
    const regEmail =
      /^[a-zA-Z0-9_.+-]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const emailFormatIsInvalid = !regEmail.test(String(this.value))
    if (emailFormatIsInvalid && returnError) throw new Error(returnError.message)
    else if (emailFormatIsInvalid && !returnError) return false
    return true
  }

  isUuid (returnError?: Error): boolean | Error {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const isUuid = uuidRegex.test(this.value)
    if (!isUuid && returnError) throw new Error(returnError.message)
    else if (!isUuid && !returnError) return false
    return true
  }

  maxLength (maxLength: number, returnError?: Error): boolean | Error {
    const exceededLimit = String(this.value).length > maxLength
    if (exceededLimit && returnError) throw new Error(returnError.message)
    else if (exceededLimit && !returnError) return true
    return false
  }

  minLength (minLength: number, returnError?: Error): boolean | Error {
    const exceededLimit = String(this.value).length < minLength
    if (exceededLimit && returnError) throw new Error(returnError.message)
    else if (exceededLimit && !returnError) return true
    return false
  }

  isString (returnError?: Error): boolean | Error {
    const isString = typeof this.value === 'string'
    if (isString) return true
    else if (!isString && returnError) throw new Error(returnError.message)
    return false
  }

  isNumber (returnError?: Error): boolean | Error {
    const isNumber = typeof this.value === 'number'
    if (isNumber) return true
    else if (!isNumber && returnError) throw new Error(returnError.message)
    return false
  }

  isBoolean (returnError?: Error): boolean | Error {
    const isBoolean = typeof this.value === 'boolean'
    if (isBoolean) return true
    else if (!isBoolean && returnError) throw new Error(returnError.message)
    return false
  }

  isFloat (returnError?: Error): boolean | Error {
    const isNumber = typeof this.value === 'number'
    if (!isNumber) return false
    const isFloat = Number.isFinite(this.value) && !Number.isInteger(this.value)
    if (isFloat && this.value % 1 !== 0) return true
    else if (!isFloat && returnError) throw new Error(returnError.message)
    return false
  }

  isInteger (returnError?: Error): boolean | Error {
    const isInteger = Number.isInteger(this.value)
    if (isInteger) return true
    else if (!isInteger && returnError) throw new Error(returnError.message)
    return false
  }

  isDate (type: DateTypes, returnError?: Error): boolean | Error {
    let year: number, month: number, day: number
    let formattedDate: Date

    if (typeof this.value === 'string' && this.value.length < 10) {
      if (returnError) {
        console.log('entrou')
        throw new Error(returnError.message)
      }
      return false
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
        throw new Error('isDate method received invalid parameter: type is required!')
    }

    if (!formattedDate || isNaN(formattedDate.getTime())) {
      if (returnError) throw new Error(returnError.message)
      return false
    }

    return true
  }

  dateGreaterThan (
    dateToCompare: Date,
    returnError?: Error
  ): boolean | Error {
    const datesAreEqual = this.value.getTime() === dateToCompare.getTime()
    const deadlineExceeded = new Date(this.value) < dateToCompare
    if (datesAreEqual) {
      if (returnError) throw new Error(returnError.message)
      return false
    } else if (deadlineExceeded) {
      if (returnError) throw new Error(returnError.message)
      return false
    }
    return true
  }

  dateLessThan (
    dateToCompare: Date,
    returnError?: Error
  ): boolean | Error {
    const datesAreEqual = this.value.getTime() === dateToCompare.getTime()
    const deadlineExceeded = new Date(this.value) > dateToCompare
    if (datesAreEqual) {
      if (returnError) throw new Error(returnError.message)
      return false
    } else if (deadlineExceeded) {
      if (returnError) throw new Error(returnError.message)
      return false
    }
    return true
  }

  isTime (type: 'HH:MM' | 'HH:MM:SS', returnError?: Error): boolean | Error {
    const regTimeHHMM = /^([01]\d|2[0-3]):[0-5]\d$/
    const regTimeHHMMSS = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
    let isValid = false

    if (!type || typeof type !== 'string') {
      throw new Error('isTime method received invalid parameter: type is required!')
    } else if (type === 'HH:MM') isValid = regTimeHHMM.test(this.value)
    else if (type === 'HH:MM:SS')isValid = regTimeHHMMSS.test(this.value)

    if (!isValid) {
      if (returnError) throw new Error(returnError.message)
      return false
    }

    return true
  }
}
