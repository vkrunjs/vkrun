import { errorMessage } from './errors/error-message'
import {
  DateTypes,
  ErrorTypes,
  IValidex,
  TimeTypes,
  ValidexValue,
  ValidexValueName
} from './types'

export class Validex implements IValidex {
  private readonly value: ValidexValue
  private readonly valueName: ValidexValueName
  private readonly errorType?: ErrorTypes
  private readonly isValid: boolean[]

  constructor (
    value: ValidexValue,
    valueName: ValidexValueName,
    errorType?: ErrorTypes
  ) {
    this.value = value
    this.errorType = errorType
    this.valueName = valueName
    this.isValid = []
    const invalidErrorType = errorType && typeof errorType !== 'function'
    if (errorType && !valueName) {
      throw new Error(errorMessage.validex.constructorParams.valueName.missingClassParam)
    } else if (invalidErrorType) {
      throw new Error(errorMessage.validex.constructorParams.valueName.invalidClassParam)
    }
  }

  string (): this {
    const isString = typeof this.value === 'string'
    if (isString) {
      this.isValid.push(true)
    } else {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.string.strict
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  minWord (minWord: number): this {
    const trimmedValue = String(this.value).trim()
    const words = trimmedValue.split(/\s+/)
    const hasMinOfWords = words.length >= minWord
    if (hasMinOfWords) {
      this.isValid.push(true)
    } else {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.minWord.noMinimumWords
        const messageError = errorMessageTemplate
          .replace('[valueName]', this.valueName)
          .replace('[minWord]', String(minWord))
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  uuid (): this {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const isUuid = uuidRegex.test(String(this.value))
    if (isUuid) {
      this.isValid.push(true)
    } else {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.uuid.strict
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  email (): this {
    const regEmail = /^[a-zA-Z0-9_.+-]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const emailFormatIsValid = regEmail.test(String(this.value))
    if (emailFormatIsValid) {
      this.isValid.push(true)
    } else {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.email.strict
        const messageError = errorMessageTemplate.replace('[value]', String(this.value))
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  maxLength (maxLength: number): this {
    const isString = typeof this.value === 'string'
    if (isString) {
      const exceededLimit = String(this.value).length > maxLength
      if (exceededLimit) {
        if (this.errorType) {
          const errorMessageTemplate = errorMessage.validex.method.maxLength.strict
          const messageError = errorMessageTemplate
            .replace('[valueName]', this.valueName)
            .replace('[maxLength]', String(maxLength))
          this.handleError(messageError)
        }
        this.isValid.push(true)
        return this
      }
      this.isValid.push(false)
    } else {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.string.strict
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  minLength (minLength: number): this {
    const isString = typeof this.value === 'string'
    if (isString) {
      const exceededLimit = String(this.value).length < minLength
      if (exceededLimit) {
        if (this.errorType) {
          const errorMessageTemplate = errorMessage.validex.method.minLength.strict
          const messageError = errorMessageTemplate
            .replace('[valueName]', this.valueName)
            .replace('[minLength]', String(minLength))
          this.handleError(messageError)
        }
        this.isValid.push(true)
        return this
      }
      this.isValid.push(false)
    } else {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.string.strict
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  number (): this {
    const isNumber = typeof this.value === 'number'
    if (isNumber) {
      this.isValid.push(true)
    } else {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.number.strict
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  float (): this {
    const isNumber = typeof this.value === 'number'
    const isFloat = Number.isFinite(this.value) && !Number.isInteger(this.value)

    if (isNumber && isFloat && this.value % 1 !== 0) {
      this.isValid.push(true)
    } else {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.float.strict
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }

    return this
  }

  integer (): this {
    const isInteger = Number.isInteger(this.value)

    if (isInteger) {
      this.isValid.push(true)
    } else {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.integer.strict
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }

    return this
  }

  boolean (): this {
    const isBoolean = typeof this.value === 'boolean'
    if (isBoolean) {
      this.isValid.push(true)
    } else {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.boolean.strict
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }
    return this
  }

  required (): this {
    const isEmpty = !this.value || this.value === undefined

    if (typeof this.value === 'boolean') {
      this.isValid.push(true)
    } else if (typeof this.value === 'number' && this.value === 0) {
      this.isValid.push(true)
    } else if (isEmpty) {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.required.strict
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    } else {
      this.isValid.push(true)
    }
    return this
  }

  date (type: DateTypes): this {
    let year: number, month: number, day: number
    let formattedDate: Date

    if (typeof this.value === 'string' && this.value.length < 10) {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.date.invalidFormat
        const messageError = errorMessageTemplate
          .replace('[valueName]', this.valueName)
          .replace('[type]', type)
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
        if (this.errorType) {
          const errorMessageTemplate = errorMessage.validex.method.date.invalidParameter
          const messageError = errorMessageTemplate
          this.handleError(messageError)
        }
        this.isValid.push(false)
        return this
    }
    const isInvalidDate = !formattedDate || isNaN(formattedDate.getTime())
    if (isInvalidDate) {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.date.invalidFormat
        const messageError = errorMessageTemplate
          .replace('[valueName]', this.valueName)
          .replace('[type]', type)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    } else {
      this.isValid.push(true)
    }
    return this
  }

  dateGreaterThan (dateToCompare: Date): this {
    const date = new Date(String(this.value))
    const isInvalidDate = isNaN(date.getTime())

    if (isInvalidDate) {
      if (this.errorType) {
        const messageError = errorMessage.validex.method.dateGreaterThan.invalidDate
        this.handleError(messageError)
      }
      this.isValid.push(false)
      return this
    }

    const datesAreEqual = date.getTime() === dateToCompare.getTime()
    const deadlineExceeded = date < dateToCompare

    if (datesAreEqual || deadlineExceeded) {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.dateGreaterThan.limitExceeded
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
      return this
    }
    this.isValid.push(true)
    return this
  }

  dateLessThan (dateToCompare: Date): this {
    const date = new Date(String(this.value))
    const isInvalidDate = isNaN(date.getTime())
    if (isInvalidDate) {
      if (this.errorType) {
        const messageError = errorMessage.validex.method.dateGreaterThan.invalidDate
        this.handleError(messageError)
      }
      this.isValid.push(false)
      return this
    }

    const datesAreEqual = date.getTime() === dateToCompare.getTime()
    const deadlineExceeded = date > dateToCompare

    if (datesAreEqual || deadlineExceeded) {
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.dateLessThan.limitExceeded
        const messageError = errorMessageTemplate.replace('[valueName]', this.valueName)
        this.handleError(messageError)
      }
      this.isValid.push(false)
      return this
    }
    this.isValid.push(true)
    return this
  }

  time (type: TimeTypes): this {
    const regTimeHHMM = /^([01]\d|2[0-3]):[0-5]\d$/
    const regTimeHHMMSS = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
    let isTime = false

    if (!type || typeof type !== 'string') {
      if (this.errorType) {
        const messageError = errorMessage.validex.method.time.invalidParameter
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
      if (this.errorType) {
        const errorMessageTemplate = errorMessage.validex.method.time.invalidFormat
        const messageError = errorMessageTemplate
          .replace('[value]', String(this.value))
          .replace('[type]', type)
        this.handleError(messageError)
      }
      this.isValid.push(false)
    }

    return this
  }

  private handleError (messageError: string): void {
    const isCustomError = typeof this.errorType === 'function'
    if (isCustomError) {
      const CustomError = this.errorType
      throw new CustomError(messageError)
    }
  }

  validate (): boolean {
    return this.isValid.every(isValid => isValid)
  }
}
