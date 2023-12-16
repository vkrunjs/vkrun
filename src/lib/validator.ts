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
    console.log('aqui 1')
    return false
  }

  isDate (
    value: Date | string,
    type: 'ISO8601' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM' | 'YYYY-MM-DD' | 'YYYY-DD-MM',
    returnError?: Error
  ): boolean | Error {
    let year: number, month: number, day: number

    const parseDateString = (str: string): Date | null => {
      switch (type) {
        case 'DD/MM/YYYY':
          [day, month, year] = str.split('/').map(Number)
          return new Date(year, month - 1, day)
        case 'MM/DD/YYYY':
          [month, day, year] = str.split('/').map(Number)
          return new Date(year, month - 1, day)
        case 'DD-MM-YYYY':
          [day, month, year] = str.split('-').map(Number)
          return new Date(year, month - 1, day)
        case 'MM-DD-YYYY':
          [month, day, year] = str.split('-').map(Number)
          return new Date(year, month - 1, day)
        case 'YYYY/MM/DD':
          [year, month, day] = str.split('/').map(Number)
          return new Date(year, month - 1, day)
        case 'YYYY/DD/MM':
          [year, day, month] = str.split('/').map(Number)
          return new Date(year, month - 1, day)
        case 'YYYY-MM-DD':
          [year, month, day] = str.split('-').map(Number)
          return new Date(year, month - 1, day)
        case 'YYYY-DD-MM':
          [year, day, month] = str.split('-').map(Number)
          return new Date(year, month - 1, day)
        case 'ISO8601':
          return new Date(str)
        default:
          return null
      }
    }

    if (typeof value === 'string' && value.length < 10) {
      if (returnError) throw new Error(returnError.message)
      return false
    }

    const parsedDate = typeof value === 'string' ? parseDateString(value) : value

    if (!parsedDate || isNaN(parsedDate.getTime())) {
      if (returnError) throw new Error(returnError.message)
      return false
    }

    return true
  }
}
