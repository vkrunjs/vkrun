import { setCorsHeaders, validateOptions } from './helpers'
import { isArray } from '../utils'
import {
  CorsOptions,
  NextFunction,
  Request,
  Response,
  CorsSetOptions,
  VkrunCors
} from '../types'

export class CorsSetup implements VkrunCors {
  private readonly options: CorsOptions

  constructor (options: CorsOptions) {
    this.options = options
  }

  handle (request: Request, response: Response, next: NextFunction): void {
    setCorsHeaders(request, response, this.options)

    if (this.options.origin !== '*') {
      if (isArray(this.options.origin)) {
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

export const cors = (options?: CorsSetOptions): VkrunCors => {
  const defaultOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    preflightNext: false,
    successStatus: 204
  }
  const mergeOptions = Object.assign({}, defaultOptions, options)

  validateOptions(mergeOptions)
  return new CorsSetup(Object.assign({}, defaultOptions, mergeOptions))
}
