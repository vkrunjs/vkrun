export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`missing param "${paramName}"`)
    this.name = 'MissingParamError'
  }
}
