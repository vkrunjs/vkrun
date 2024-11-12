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
  SuperRequestSuccess
} from '../types'

export const superRequest = (app: any): SuperRequest => {
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
      const serverResponse = await app._reqWithoutServer(
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
