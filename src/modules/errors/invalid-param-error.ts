export class InvalidParamError extends Error {
  constructor (message: string) {
    super(`invalid param: ${message}`)
    this.name = 'InvalidParamError'
  }
}
