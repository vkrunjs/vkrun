export class Validator {
  required (value: any, returnError?: Error): boolean | Error {
    const isEmpty = !value || value === undefined
    if (typeof value === 'boolean') {
      return true
    } else if (isEmpty && returnError) {
      throw new Error(returnError.message)
    } else if (isEmpty && !returnError) {
      return false
    }
    return true
  }

  minWord (value: any, minWord: number, returnError?: Error): boolean | Error {
    const trimmedValue = value.trim()
    const words = trimmedValue.split(/\s+/)
    const notHasMinOfWords = words.length < minWord
    if (notHasMinOfWords && returnError) {
      throw new Error(returnError.message)
    } else if (notHasMinOfWords && !returnError) {
      return false
    }
    return true
  }

  isEmail (email: string, returnError?: Error): boolean | Error {
    const regEmail =
      /^[a-zA-Z0-9_.+-]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const emailFormatIsInvalid = !regEmail.test(String(email))
    if (emailFormatIsInvalid && returnError) {
      throw new Error(returnError.message)
    } else if (emailFormatIsInvalid && !returnError) {
      return false
    }
    return true
  }
}
