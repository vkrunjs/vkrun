import * as helper from './helpers'
import * as type from '../types'

export const superRequest = (app: any): type.SuperRequest => {
  const createMethod = async (method: string, path: any, data: any, options?: Record<string, any>): Promise<type.SuperRequestMethod> => {
    const httpRequest: any = helper.createHttpRequest({
      method,
      path,
      headers: options?.headers ?? {},
      data,
      host: 'example.com',
      port: 4000
    })

    const httpResponse = helper.createHttpResponse(httpRequest)
    const serverResponse = await app.serverMock(httpRequest, httpResponse)
    serverResponse.data = helper.formatResponseData(serverResponse)
    httpRequest.abort()

    return {
      statusCode: serverResponse.statusCode,
      statusMessage: serverResponse.statusMessage,
      headers: serverResponse.headers,
      data: serverResponse.data
    }
  }

  const get = async (path: any, options?: Record<string, any>): Promise<type.SuperRequestMethod> => {
    return await createMethod('GET', path, '', options)
  }

  const post = async (path: any, data: Record<string, any> | string, options?: Record<string, any>): Promise<type.SuperRequestMethod> => {
    return await createMethod('POST', path, data, options)
  }

  const put = async (path: any, data: Record<string, any> | string, options?: Record<string, any>): Promise<type.SuperRequestMethod> => {
    return await createMethod('PUT', path, data, options)
  }

  const patch = async (path: any, data: Record<string, any> | string, options?: Record<string, any>): Promise<type.SuperRequestMethod> => {
    return await createMethod('PATCH', path, data, options)
  }

  const remove = async (path: any, options?: Record<string, any>): Promise<type.SuperRequestMethod> => {
    return await createMethod('DELETE', path, '', options)
  }

  const head = async (path: any, options?: Record<string, any>): Promise<type.SuperRequestMethod> => {
    return await createMethod('HEAD', path, '', options)
  }

  const options = async (path: any, options?: Record<string, any>): Promise<type.SuperRequestMethod> => {
    return await createMethod('OPTIONS', path, '', options)
  }

  return { get, post, put, patch, delete: remove, head, options }
}
