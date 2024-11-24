import { isObject } from '../utils'
import {
  createHttpRequest,
  createHttpResponse,
  customResponse,
  formatResponseData
} from './helpers'
import {
  SuperRequest,
  SuperRequestError,
  SuperRequestSuccess,
  VkrunApp
} from '../types'

/**
 * @function superRequest
 *
 * A function that simulates HTTP requests without the need to initialize a server listening on a port.
 * This is useful for testing and integration purposes where an actual HTTP server is not required.
 * It supports all HTTP methods like `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`.
 *
 * This function allows you to test endpoints by simulating HTTP requests and receiving the response
 * without having to manually start and stop a server.
 *
 * **Usage Example:**
 * ```ts
 * import { App, superRequest } from 'vkrun'
 *
 * describe('Basic example with superRequest', () => {
 *   it('Should respond with "Hello, World!" on GET /hello route', async () => {
 *     const app = App()
 *
 *     // Define the GET /hello route
 *     app.get('/hello', (req, res) => {
 *       res.status(200).send('Hello, World!')
 *     })
 *
 *     // Perform a GET request using superRequest
 *     await superRequest(app).get('/hello').then((response) => {
 *       // Validate the response
 *       expect(response.statusCode).toEqual(200)
 *       expect(response.data).toEqual('Hello, World!')
 *     })
 *
 *     app.close() // closes all app processes
 *   })
 * })
 * ```
 * In this example, `superRequest` simulates the `GET /hello` request, and you can validate the status code and data of the response.
 *
 * @param {VkrunApp} app - The Vkrun application instance that will be used to simulate HTTP requests.
 *                         This should be the application where routes and handlers are defined.
 *
 * @returns {SuperRequest} - Returns an object containing methods for making HTTP requests. The methods include:
 *   - `get(path: string, options?: Record<string, any>): Promise<SuperRequestSuccess>`
 *   - `post(path: string, data?: Record<string, any> | string, options?: Record<string, any>): Promise<SuperRequestSuccess>`
 *   - `put(path: string, data?: Record<string, any> | string, options?: Record<string, any>): Promise<SuperRequestSuccess>`
 *   - `patch(path: string, data?: Record<string, any> | string, options?: Record<string, any>): Promise<SuperRequestSuccess>`
 *   - `delete(path: string, options?: Record<string, any>): Promise<SuperRequestSuccess>`
 *   - `head(path: string, options?: Record<string, any>): Promise<SuperRequestSuccess>`
 *   - `options(path: string, options?: Record<string, any>): Promise<SuperRequestSuccess>`
 *
 * **Supported HTTP Methods:**
 * - **GET**: Simulates a GET request to retrieve data from the server.
 * - **POST**: Simulates a POST request to send data to the server.
 * - **PUT**: Simulates a PUT request to update an existing resource on the server.
 * - **PATCH**: Simulates a PATCH request to partially update a resource.
 * - **DELETE**: Simulates a DELETE request to remove a resource.
 * - **HEAD**: Simulates a HEAD request to retrieve only the headers without the body.
 * - **OPTIONS**: Simulates an OPTIONS request to check what HTTP methods are supported by the server.
 *
 * @example
 * ```ts
 * // Example of using superRequest to make a GET request
 * const response = await superRequest(app).get('/some-endpoint')
 * console.log(response.statusCode)  // Output: 200
 * console.log(response.data)        // Output: response data
 * ```
 *
 * @example
 * ```ts
 * // Example of using superRequest to make a POST request with JSON data
 * const data = { name: 'John', age: 30 }
 * const response = await superRequest(app).post('/submit', data, {
 *   headers: { 'Content-Type': 'application/json' }
 * })
 * console.log(response.statusCode)  // Output: 200
 * console.log(response.data)        // Output: { name: 'John', age: 30 }
 * ```
 *
 * @example
 * ```ts
 * // Example of using superRequest to make a DELETE request
 * const response = await superRequest(app).delete('/delete/1')
 * console.log(response.statusCode)  // Output: 200
 * console.log(response.data)        // Output: { deletedId: '1' }
 * ```
 *
 * @example
 * ```ts
 * // Example of using superRequest to make a HEAD request
 * const response = await superRequest(app).head('/info')
 * console.log(response.statusCode)  // Output: 200
 * console.log(response.headers)     // Output: response headers
 * ```
 *
 * @throws {SuperRequestError} - Throws an error if the request fails with a status code of 400 or higher.
 */
export const superRequest = (app: VkrunApp): SuperRequest => {
  const _app = app as VkrunApp & { _reqWithoutServer: any }
  const request = async (method: string, path: any, data: any, options?: Record<string, any>): Promise<SuperRequestSuccess> => {
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
    return await new Promise(async (resolve, reject) => {
      const httpRequest: any = createHttpRequest({
        method,
        path,
        headers: options?.headers ?? {},
        data,
        host: 'localhost',
        port: Math.floor(10000 + Math.random() * 55535)
      })

      const httpResponse = createHttpResponse(httpRequest)
      const serverResponse = await _app._reqWithoutServer(
        httpRequest, customResponse(httpResponse)
      )
      serverResponse.data = formatResponseData(serverResponse)
      serverResponse.headers.connection = 'close'
      serverResponse.headers.date = new Date().toUTCString()
      const contentLength = (): void => {
        let value = ''
        if (method === 'HEAD') return
        else if (serverResponse.data === undefined) value = '0'
        else if (isObject(serverResponse.data)) value = JSON.stringify(serverResponse.data).length.toString()
        else value = String(serverResponse.data.length)
        serverResponse.headers['content-length'] = value
      }
      contentLength()

      const response: SuperRequestSuccess = {
        statusCode: serverResponse.statusCode,
        statusMessage: serverResponse.statusMessage,
        headers: serverResponse.headers,
        data: serverResponse.data === undefined || method === 'OPTIONS' ? '' : serverResponse.data
      }

      if (serverResponse.statusCode < 400) {
        resolve(response)
      } else {
        const error: SuperRequestError = { response }
        reject(error)
      }
    })
  }

  const get = async (path: any, options?: Record<string, any>): Promise<SuperRequestSuccess> => {
    return await request('GET', path, '', options)
  }

  const post = async (path: any, data?: Record<string, any> | string, options?: Record<string, any>): Promise<SuperRequestSuccess> => {
    return await request('POST', path, data, options)
  }

  const put = async (path: any, data?: Record<string, any> | string, options?: Record<string, any>): Promise<SuperRequestSuccess> => {
    return await request('PUT', path, data, options)
  }

  const patch = async (path: any, data?: Record<string, any> | string, options?: Record<string, any>): Promise<SuperRequestSuccess> => {
    return await request('PATCH', path, data, options)
  }

  const remove = async (path: any, options?: Record<string, any>): Promise<SuperRequestSuccess> => {
    return await request('DELETE', path, '', options)
  }

  const head = async (path: any, options?: Record<string, any>): Promise<SuperRequestSuccess> => {
    return await request('HEAD', path, '', options)
  }

  const options = async (path: any, options?: Record<string, any>): Promise<SuperRequestSuccess> => {
    return await request('OPTIONS', path, '', options)
  }

  return { get, post, put, patch, delete: remove, head, options }
}
