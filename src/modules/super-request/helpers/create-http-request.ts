import * as http from 'http'
import { Socket } from 'net'
import * as util from '../../utils'

export const createHttpRequest = (params: { method: any, path: any, headers: Record<string, any>, data: any, host: string, port: number }): any => {
  const { method, path, headers, data, host, port } = params
  const options: http.RequestOptions = {
    ...new URL(`http://${host}${path}`),
    method,
    headers,
    hostname: host,
    port,
    path
  }

  const request: any = http.request(options)

  request.socket = new Socket()
  request.method = method
  request.headers = headers
  request.url = path

  const bufferData = util.isObject(data) ? JSON.stringify(data) : data

  request.on = (event: string, listener: any) => {
    if (event === 'data') {
      listener(bufferData)
    } else if (event === 'end') {
      listener()
    }
  }

  return request
}
