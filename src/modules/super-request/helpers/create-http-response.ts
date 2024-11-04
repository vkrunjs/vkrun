import { ServerResponse } from 'http'
import { STATUS_CODES } from './status-codes'
import { isObject } from '../../utils'

export const createHttpResponse = (request: any): any => {
  const response: any = new ServerResponse(request) // new CreateHttpResponse()

  response.headers = {}

  response.end = (data?: any): void => {
    response.statusMessage = STATUS_CODES[response.statusCode]

    if (data !== undefined) {
      if (isObject(data)) {
        response.data = JSON.stringify(data)
      } else if (Buffer.isBuffer(data)) {
        response.data = data.toString()
      } else {
        response.data = data.toString().trim()
      }
    } else {
      if (isObject(response._body)) {
        response.data = JSON.stringify(response._body)
      } else {
        if (response._body) response.data = response._body.toString().trim()
      }
    }

    response._ended = true
    delete response._body
  }

  response.on = (event: string, listener: any) => {
    if (event === 'finish') {
      listener()
    }
  }

  response.hasHeader = (name: string): boolean => {
    return !!response.headers[name.toLowerCase()]
  }

  response.setHeader = (name: string, value: string | string[]): void => {
    response.headers[name.toLowerCase()] = value
  }

  response.getHeader = (name: string): string | string[] | undefined => {
    return response.headers[name.toLowerCase()]
  }

  response.removeHeader = (name: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete response.headers[name.toLowerCase()]
  }

  return response
}
