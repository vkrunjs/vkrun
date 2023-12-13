export class Validator {
  required (value: any, returnError?: Error): boolean | Error {
    const isEmpty = !value || value === undefined
    if (typeof value === 'boolean') {
      return true
    } else if (isEmpty && returnError) {
      return returnError
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
      return returnError
    } else if (notHasMinOfWords && !returnError) {
      return false
    }
    return true
  }
}
