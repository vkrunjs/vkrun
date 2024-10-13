import {
  getData,
  parseMultipartFormData,
  parseQuery,
  parseParams,
  parseFormUrlEncoded,
  parseJSON
} from './helpers'
import * as util from '../utils'
import * as type from '../types'

export class VkrunParseData {
  private readonly urlencoded: boolean = true
  private readonly params: boolean = true
  private readonly query: boolean = true
  private readonly json: boolean = true
  private readonly formData: boolean = true
  private readonly escapeSQL: boolean = false

  constructor (config?: type.ParseDataConfig) {
    if (config?.urlencoded !== undefined) this.urlencoded = config.urlencoded
    if (config?.params !== undefined) this.params = config.params
    if (config?.query !== undefined) this.query = config.query
    if (config?.json !== undefined) this.json = config.json
    if (config?.formData !== undefined) this.formData = config.formData
    if (config?.escapeSQL !== undefined) this.escapeSQL = config.escapeSQL
  }

  async handle (request: type.Request, response: type.Response, next: () => void): Promise<void> {
    try {
      const headerContentType = request.headers['content-type']

      request.body = await getData(request)
      if (this.params) request.params = parseParams(request, this.escapeSQL)
      if (this.query) request.query = parseQuery(request, this.escapeSQL)

      if (request.body) {
        if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
          if (this.json && headerContentType && headerContentType?.includes('application/json')) {
            request.body = parseJSON(request, this.escapeSQL)
          } else if (this.urlencoded && headerContentType && headerContentType?.includes('application/x-www-form-urlencoded')) {
            request.body = parseFormUrlEncoded(request, this.escapeSQL)
          } else if (this.formData && headerContentType && headerContentType?.includes('multipart/form-data')) {
            const parsedData = parseMultipartFormData(request, this.escapeSQL)
            request.body = parsedData.body
            request.files = parsedData.files
          } else {
            request.body = request.body.toString()
            if (this.escapeSQL && util.isString(request.body)) {
              request.body = util.parseEscapeSQL(request.body)
            }
          }
        }
      } else {
        request.body = undefined
      }
    } catch (error: any) {
      response.setHeader('Content-Type', 'text/plain')
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.statusCode = 400
      response.end('Invalid Request Data')
      return
    }
    next()
  }
}

export const parseData = (config?: type.ParseDataConfig): VkrunParseData => {
  return new VkrunParseData(config)
}
