import * as util from '../utils'
import * as type from '../types'

export class VkrunCors {
  private readonly options: type.CorsOptions

  constructor (options: type.CorsOptions) {
    this.options = options
  }

  private setCorsHeaders (request: type.Request, response: type.Response): void {
    if (this.options.methods) {
      let methodsValue: string
      if (Array.isArray(this.options.methods)) {
        methodsValue = this.options.methods.join(', ')
      } else {
        methodsValue = this.options.methods
      }
      response.setHeader('Access-Control-Allow-Methods', methodsValue)
    }
    if (this.options.allowedHeaders && request.method === 'OPTIONS') {
      response.setHeader('Access-Control-Allow-Headers', this.options.allowedHeaders)
    }
    if (this.options.exposedHeaders) {
      response.setHeader('Access-Control-Expose-Headers', this.options.exposedHeaders)
    }
    if (this.options.credentials) {
      response.setHeader('Access-Control-Allow-Credentials', String(this.options.credentials))
    }
    if (this.options.maxAge) {
      response.setHeader('Access-Control-Max-Age', String(this.options.maxAge))
    }

    if (request.method === 'OPTIONS') {
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      response.setHeader('Content-Length', '0')
      response.statusCode = this.options.successStatus || 204
      response.end()
    }
  }

  handle (request: type.Request, response: type.Response, next: type.NextFunction): void {
    if (this.options.origin !== '*') {
      if (util.isArray(this.options.origin)) {
        const originHeader = this.options.origin.find(origin => origin === request.headers.origin)
        if (originHeader) {
          response.setHeader('Access-Control-Allow-Origin', originHeader)
        } else {
          const concatenatedOrigins = this.options.origin.join(', ')
          response.setHeader('Access-Control-Allow-Origin', concatenatedOrigins)
          response.setHeader('Content-Type', 'text/plain')
          response.statusCode = 403
          response.end()
          return
        }
      } else if (this.options.origin !== request.headers.origin) {
        response.setHeader('Content-Type', 'text/plain')
        response.setHeader('Access-Control-Allow-Origin', this.options.origin)
        response.statusCode = 403
        response.end()
        return
      }
    }

    if (request.method === 'OPTIONS') {
      if (this.options.preflightNext) {
        next()
      } else {
        this.setCorsHeaders(request, response)
      }
    } else {
      this.setCorsHeaders(request, response)
      next()
    }
  }
}

const validateOptions = (options: type.SetCorsOptions): void => {
  if (!util.isObject(options)) {
    throw new Error('vkrun-cors: Options must be an object.')
  }

  if (options?.origin && !util.isString(options.origin) && !util.isArray(options.origin)) {
    throw new Error('vkrun-cors: The origin value must be a string or string array.')
  }

  if (options?.methods && !util.isString(options.methods) && !util.isArray(options.methods)) {
    throw new Error('vkrun-cors: The methods value must be a string or string array.')
  }

  if (options?.allowedHeaders && !util.isString(options.allowedHeaders)) {
    throw new Error('vkrun-cors: The allowedHeaders value must be a string.')
  }

  if (options?.exposedHeaders && !util.isString(options.exposedHeaders)) {
    throw new Error('vkrun-cors: The exposedHeaders value must be a string.')
  }

  if (options?.credentials && !util.isBoolean(options.credentials)) {
    throw new Error('vkrun-cors: The credentials value must be a boolean.')
  }

  if (options?.maxAge && (!util.isNumber(options.maxAge) || options.maxAge < 0)) {
    throw new Error('vkrun-cors: The maxAge value must be a non-negative number.')
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

  validateOptions(mergeOptions)
  return new VkrunCors(Object.assign({}, defaultOptions, mergeOptions))
}
