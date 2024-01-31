export class AnyError extends Error {
  constructor (message: string) {
    super(`any error: ${message}`)
    this.name = 'AnyError'
  }
}
