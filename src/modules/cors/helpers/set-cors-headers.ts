import * as util from '../../utils'
import * as type from '../../types'

export const setCorsHeaders = (request: type.Request, response: type.Response, options: type.SetCorsOptions): void => {
  if (options.origin === '*') {
    response.setHeader('Access-Control-Allow-Origin', options.origin)
  } else if (options.origin && options.origin !== '*') {
    if (util.isArray(options.origin)) {
      const originHeader = options.origin.find(origin => origin === request.headers.origin)
      if (originHeader) {
        response.setHeader('Access-Control-Allow-Origin', originHeader)
      } else {
        const concatenatedOrigins = options.origin.join(', ')
        response.setHeader('Access-Control-Allow-Origin', concatenatedOrigins)
        response.setHeader('Content-Type', 'text/plain')
        response.statusCode = 403
        return
      }
    } else if (options.origin !== request.headers.origin) {
      response.setHeader('Access-Control-Allow-Origin', options.origin)
      response.setHeader('Content-Type', 'text/plain')
      response.statusCode = 403
      return
    } else {
      response.setHeader('Access-Control-Allow-Origin', options.origin)
    }
  }

  if (options.methods) {
    let methodsValue: string
    if (Array.isArray(options.methods)) {
      methodsValue = options.methods.join(', ')
    } else {
      methodsValue = options.methods
    }
    response.setHeader('Access-Control-Allow-Methods', methodsValue)
  }
  if (options.exposedHeaders) {
    response.setHeader('Access-Control-Expose-Headers', options.exposedHeaders)
  }
  if (options.credentials) {
    response.setHeader('Access-Control-Allow-Credentials', String(options.credentials))
  }
  if (options.maxAge) {
    response.setHeader('Access-Control-Max-Age', String(options.maxAge))
  }

  if (request.method === 'OPTIONS') {
    response.statusCode = options.successStatus ?? 204

    if (options.allowedHeaders) {
      response.setHeader('Access-Control-Allow-Headers', options.allowedHeaders)
    }
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.setHeader('Content-Length', '0')
  }
}
