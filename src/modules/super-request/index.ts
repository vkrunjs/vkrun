import * as helper from './helpers'
import * as type from '../types'

export const superRequest = (app: any): type.SuperRequest => {
  const request = async (method: string, path: any, data: any, options?: Record<string, any>): Promise<type.SuperRequestSuccess> => {
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
    return await new Promise(async (resolve, reject) => {
      try {
        const httpRequest: any = helper.createHttpRequest({
          method,
          path,
          headers: options?.headers ?? {},
          data,
          host: 'localhost',
          port: Math.floor(10000 + Math.random() * 55535)
        })

        const httpResponse = helper.createHttpResponse(httpRequest)
        const serverResponse = await app.serverMock(httpRequest, httpResponse)
        serverResponse.data = helper.formatResponseData(serverResponse)
        httpRequest.abort()

        const response: type.SuperRequestSuccess = {
          statusCode: serverResponse.statusCode,
          statusMessage: serverResponse.statusMessage,
          headers: serverResponse.headers,
          data: serverResponse.data
        }

        if (serverResponse.statusCode < 400) {
          resolve(response)
        } else {
          const error: type.SuperRequestError = { response }
          reject(error)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  const get = async (path: any, options?: Record<string, any>): Promise<type.SuperRequestSuccess> => {
    return await request('GET', path, '', options)
  }

  const post = async (path: any, data: Record<string, any> | string, options?: Record<string, any>): Promise<type.SuperRequestSuccess> => {
    return await request('POST', path, data, options)
  }

  const put = async (path: any, data: Record<string, any> | string, options?: Record<string, any>): Promise<type.SuperRequestSuccess> => {
    return await request('PUT', path, data, options)
  }

  const patch = async (path: any, data: Record<string, any> | string, options?: Record<string, any>): Promise<type.SuperRequestSuccess> => {
    return await request('PATCH', path, data, options)
  }

  const remove = async (path: any, options?: Record<string, any>): Promise<type.SuperRequestSuccess> => {
    return await request('DELETE', path, '', options)
  }

  const head = async (path: any, options?: Record<string, any>): Promise<type.SuperRequestSuccess> => {
    return await request('HEAD', path, '', options)
  }

  const options = async (path: any, options?: Record<string, any>): Promise<type.SuperRequestSuccess> => {
    return await request('OPTIONS', path, '', options)
  }

  return { get, post, put, patch, delete: remove, head, options }
}
