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
}
