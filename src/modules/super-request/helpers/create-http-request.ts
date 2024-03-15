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
  request.url = path
  const lowercaseHeaders: any = {}

  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key)) {
      const lowercaseKey = key.toLowerCase()
      const value = headers[key]
      lowercaseHeaders[lowercaseKey] = value.toLowerCase()
    }
  }

  request.headers = lowercaseHeaders

  const generateBufferData = (headers: Record<string, any>): any => {
    const headerContentType = request.headers['content-type']

    if (headerContentType?.includes('multipart/form-data')) {
      if (!headerContentType?.includes('boundary=')) {
        request.headers['content-type'] = `${headerContentType}; boundary=${data._boundary}`
      }

      const dataArr = data._streams
      dataArr.push(data._boundary)
      const filteredData = dataArr.filter((element: any) => typeof element !== 'function')
      let result = ''

      for (let i = 0; i < filteredData.length; i += 2) {
        const header = filteredData[i]
        const value = filteredData[i + 1]
        result += header + value + '\r\n'
      }

      return result
    } else if (util.isObject(data)) {
      return JSON.stringify(data)
    } else {
      return data.toString()
    }
  }
  const bufferData = generateBufferData(request.headers)

  request.on = (event: string, listener: any) => {
    if (event === 'data') {
      listener(bufferData)
    } else if (event === 'end') {
      listener()
    }
  }

  return request
}
