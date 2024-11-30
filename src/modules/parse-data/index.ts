import { NextFunction, ParseDataConfig, Request, Response, VkrunParseData } from '../types'
import { isString, parseEscapeSQL } from '../utils'
import {
  getData,
  parseMultipartFormData,
  parseQuery,
  parseParams,
  parseFormUrlEncoded,
  parseJSON
} from './helpers'

export class ParseDataSetup implements VkrunParseData {
  private readonly urlencoded: boolean = true
  private readonly params: boolean = true
  private readonly query: boolean = true
  private readonly json: boolean = true
  private readonly formData: boolean = true
  private readonly escapeSQL: boolean = false

  constructor (config?: ParseDataConfig) {
    if (config?.urlencoded !== undefined) this.urlencoded = config.urlencoded
    if (config?.params !== undefined) this.params = config.params
    if (config?.query !== undefined) this.query = config.query
    if (config?.json !== undefined) this.json = config.json
    if (config?.formData !== undefined) this.formData = config.formData
    if (config?.escapeSQL !== undefined) this.escapeSQL = config.escapeSQL
  }

  async handle (request: Request, response: Response, next: NextFunction): Promise<void> {
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
            if (this.escapeSQL && isString(request.body)) {
              request.body = parseEscapeSQL(request.body)
            }
          }
        } else {
          request.body = {}
        }
      } else {
        request.body = undefined
      }
    } catch (error: any) {
      response.setHeader('Content-Type', 'text/plain')
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.status(400).end('Invalid Request Data')
      return
    }
    next()
  }
}

/**
 * @function parseData
 *
 * `ParseData` is a middleware responsible for parsing incoming request data. It automatically processes the request
 * body, query parameters, route parameters, and other data types based on the content type of the request
 * (e.g., JSON, URL-encoded, multipart form data). This middleware is typically used with `app.use(parseData())`
 * in your application to handle incoming data.
 *
 * **Supported data parsing types:**
 * - **JSON**: Parses `application/json` body.
 * - **URL-encoded**: Parses `application/x-www-form-urlencoded` body.
 * - **Multipart form data**: Parses `multipart/form-data` body.
 * - **Query**: Parses query parameters from the URL.
 * - **Params**: Parses URL route parameters.
 * - **Escape SQL**: Optionally applies SQL escaping to the request data to prevent SQL injection attacks.
 *
 * **Usage Example:**
 * ```ts
 * import { App, parseData } from 'vkrun'
 *
 * const app = App()
 *
 * // Use parseData middleware to handle incoming request data
 * app.use(parseData()) // Parse body, query, and params automatically
 *
 * app.get('/example', (req, res) => {
 *   // Access parsed data in req.query, req.params, and req.body
 *   res.json({ query: req.query, params: req.params, body: req.body })
 * })
 *
 * // Start the server
 * app.server().listen(3000, () => {
 *   console.log('Server running on port 3000')
 * })
 * ```
 * In this example:
 * - `req.query`, `req.params`, and `req.body` will be automatically populated based on the incoming request.
 *
 * **Configuration Example:**
 * You can configure the middleware to selectively enable or disable data parsing for certain types.
 * ```ts
 * const app = App()
 *
 * // Use parseData with custom config to disable JSON parsing
 * app.use(parseData({ json: false }))
 * ```
 * In this case, the `json` body parsing will be disabled, and other types of parsing (e.g., URL-encoded, query, params)
 * will still be active.
 *
 * @param {ParseDataConfig} [config] - Optional configuration to customize how data is parsed. If not provided, all data types are enabled.
 *
 * @returns {VkrunParseData} - Returns an instance of `ParseDataSetup` which handles the parsing logic.
 *
 * @example
 * ```ts
 * // Example of parsing URL query parameters
 * const app = App()
 *
 * app.use(parseData()) // Use parseData middleware
 *
 * app.get('/query', (req, res) => {
 *   console.log(req.query) // Access parsed query parameters
 *   res.status(200).send()
 * })
 *
 * // Requesting /query?name=test&age=25 will populate req.query with { name: 'test', age: 25 }
 * ```
 */
export const parseData = (config?: ParseDataConfig): VkrunParseData => {
  return new ParseDataSetup(config)
}
