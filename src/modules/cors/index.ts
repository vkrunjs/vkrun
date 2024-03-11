import * as helper from './helpers'
import * as util from '../utils'
import * as type from '../types'

export class VkrunCors {
  private readonly options: type.CorsOptions

  constructor (options: type.CorsOptions) {
    this.options = options
  }

  handle (request: type.Request, response: type.Response, next: type.NextFunction): void {
    helper.setCorsHeaders(request, response, this.options)

    if (this.options.origin !== '*') {
      if (util.isArray(this.options.origin)) {
        const originHeader = this.options.origin.find(origin => origin === request.headers.origin)
        if (!originHeader) {
          response.end()
          return
        }
      } else if (this.options.origin !== request.headers.origin) {
        response.end()
        return
      }
    }

    if (request.method === 'OPTIONS') {
      if (this.options.preflightNext) next()
      else response.end()
    } else next()
  }
}

export const cors = (options?: type.SetCorsOptions): VkrunCors => {
  const defaultOptions: type.CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    preflightNext: false,
    successStatus: 204
  }
  const mergeOptions = Object.assign({}, defaultOptions, options)

  helper.validateOptions(mergeOptions)
  return new VkrunCors(Object.assign({}, defaultOptions, mergeOptions))
}
