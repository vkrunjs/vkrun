export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`invalid param "${paramName}"`)
    this.name = 'InvalidParamError'
  }
}
