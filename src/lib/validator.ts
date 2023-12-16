export class Validator {
  required (value: any, returnError?: Error): boolean | Error {
    const isEmpty = !value || value === undefined
    if (typeof value === 'boolean') return true
    else if (isEmpty && returnError) throw new Error(returnError.message)
    else if (isEmpty && !returnError) return false
    return true
  }

  minWord (value: string, minWord: number, returnError?: Error): boolean | Error {
    const trimmedValue = value.trim()
    const words = trimmedValue.split(/\s+/)
    const notHasMinOfWords = words.length < minWord
    if (notHasMinOfWords && returnError) throw new Error(returnError.message)
    else if (notHasMinOfWords && !returnError) return false
    return true
  }

  isEmail (email: string, returnError?: Error): boolean | Error {
    const regEmail =
      /^[a-zA-Z0-9_.+-]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const emailFormatIsInvalid = !regEmail.test(String(email))
    if (emailFormatIsInvalid && returnError) throw new Error(returnError.message)
    else if (emailFormatIsInvalid && !returnError) return false
    return true
  }

  isUuid (uuid: string, returnError?: Error): boolean | Error {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const isUuid = uuidRegex.test(uuid)
    if (!isUuid && returnError) throw new Error(returnError.message)
    else if (!isUuid && !returnError) return false
    return true
  }

  maxLength (value: any, maxLength: number, returnError?: Error): boolean | Error {
    const exceededLimit = String(value).length > maxLength
    if (exceededLimit && returnError) throw new Error(returnError.message)
    else if (exceededLimit && !returnError) return true
    return false
  }

  minLength (value: any, minLength: number, returnError?: Error): boolean | Error {
    const exceededLimit = String(value).length < minLength
    if (exceededLimit && returnError) throw new Error(returnError.message)
    else if (exceededLimit && !returnError) return true
    return false
  }

  isString (value: string, returnError?: Error): boolean | Error {
    const isString = typeof value === 'string'
    if (isString) return true
    else if (!isString && returnError) throw new Error(returnError.message)
    return false
  }

  isNumber (value: number, returnError?: Error): boolean | Error {
    const isNumber = typeof value === 'number'
    if (isNumber) return true
    else if (!isNumber && returnError) throw new Error(returnError.message)
    return false
  }

  isBoolean (value: boolean, returnError?: Error): boolean | Error {
    const isBoolean = typeof value === 'boolean'
    if (isBoolean) return true
    else if (!isBoolean && returnError) throw new Error(returnError.message)
    return false
  }

  isFloat (value: number, returnError?: Error): boolean | Error {
    const isNumber = typeof value === 'number'
    if (!isNumber) return false
    const isFloat = Number.isFinite(value) && !Number.isInteger(value)
    if (isFloat && value % 1 !== 0) return true
    else if (!isFloat && returnError) throw new Error(returnError.message)
    return false
  }

  isInteger (value: number, returnError?: Error): boolean | Error {
    const isInteger = Number.isInteger(value)
    if (isInteger) return true
    else if (!isInteger && returnError) throw new Error(returnError.message)
    return false
  }

  isDate (
    value: Date | string,
    type: 'ISO8601' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM' | 'YYYY-MM-DD' | 'YYYY-DD-MM',
    returnError?: Error
  ): boolean | Error {
    let year: number, month: number, day: number
    let formattedDate: Date

    if (typeof value === 'string' && value.length < 10) {
      if (returnError) {
        console.log('entrou')
        throw new Error(returnError.message)
      }
      return false
    }

    switch (type) {
      case 'DD/MM/YYYY':
        [day, month, year] = String(value).split('/').map(Number)
        formattedDate = new Date(year, month - 1, day)
        break
      case 'MM/DD/YYYY':
        [month, day, year] = String(value).split('/').map(Number)
        formattedDate = new Date(year, month - 1, day)
        break
      case 'DD-MM-YYYY':
        [day, month, year] = String(value).split('-').map(Number)
        formattedDate = new Date(year, month - 1, day)
        break
      case 'MM-DD-YYYY':
        [month, day, year] = String(value).split('-').map(Number)
        formattedDate = new Date(year, month - 1, day)
        break
      case 'YYYY/MM/DD':
        [year, month, day] = String(value).split('/').map(Number)
        formattedDate = new Date(year, month - 1, day)
        break
      case 'YYYY/DD/MM':
        [year, day, month] = String(value).split('/').map(Number)
        formattedDate = new Date(year, month - 1, day)
        break
      case 'YYYY-MM-DD':
        [year, month, day] = String(value).split('-').map(Number)
        formattedDate = new Date(year, month - 1, day)
        break
      case 'YYYY-DD-MM':
        [year, day, month] = String(value).split('-').map(Number)
        formattedDate = new Date(year, month - 1, day)
        break
      case 'ISO8601':
        formattedDate = new Date(String(value))
        break
      default:
        throw new Error('isDate method received invalid parameter: type is mandatory!')
    }

    if (!formattedDate || isNaN(formattedDate.getTime())) {
      if (returnError) throw new Error(returnError.message)
      return false
    }

    return true
  }

  dateGreaterThan (
    validateDate: Date,
    dateToCompare: Date,
    returnError?: Error
  ): boolean | Error {
    const datesAreEqual = validateDate.getTime() === dateToCompare.getTime()
    const deadlineExceeded = new Date(validateDate) < dateToCompare
    if (datesAreEqual) {
      if (returnError) throw new Error(returnError.message)
      return false
    } else if (deadlineExceeded) {
      if (returnError) throw new Error(returnError.message)
      return false
    }
    return true
  }
}
