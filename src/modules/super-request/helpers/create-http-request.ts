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
  request.url = path.replaceAll(' ', '%20')
  const lowercaseHeaders: any = {}

  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key)) {
      const lowercaseKey = key.toLowerCase()
      const value = headers[key]
      lowercaseHeaders[lowercaseKey] = value.toLowerCase()
    }
  }

  request.headers = lowercaseHeaders

  const headerContentType = request.headers['content-type']

  if (!headerContentType && util.isObject(data)) {
    request.headers['content-type'] = 'application/json'
  } else if (!headerContentType && data) {
    request.headers['content-type'] = 'text/plain'
  }

  const generateBufferData = (): Buffer => {
    if (
      headerContentType?.includes('multipart/form-data') ||
      (data?._boundary && data?._streams)
    ) {
      if (!headerContentType) {
        request.headers['content-type'] = `multipart/form-data; boundary=${data._boundary}`
      } else if (data && !headerContentType.includes('boundary=')) {
        request.headers['content-type'] = `${headerContentType}; boundary=${data._boundary}`
      }

      if (!data) return Buffer.alloc(0)

      const filteredData = data._streams.filter((element: any) => typeof element !== 'function')
      const parts: Buffer[] = []

      for (let i = 0; i < filteredData.length; i += 2) {
        const header = Buffer.from(filteredData[i], 'utf-8')
        const value = typeof filteredData[i + 1] === 'string'
          ? Buffer.from(filteredData[i + 1], 'utf-8')
          : filteredData[i + 1] // assume Buffer if not string

        parts.push(header, value, Buffer.from('\r\n', 'utf-8'))
      }

      return Buffer.concat(parts)
    } else if (util.isObject(data)) {
      return Buffer.from(JSON.stringify(data), 'utf-8')
    } else {
      return data ? Buffer.from(data.toString(), 'utf-8') : Buffer.alloc(0)
    }
  }
  const bufferData = generateBufferData()

  request.on = (event: string, listener: any) => {
    if (event === 'data') {
      listener(bufferData)
    } else if (event === 'end') {
      listener()
    }
  }

  return request
}
