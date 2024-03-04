import { formatValue } from '../format'
import * as type from '../../../../types'

export const parseMultipartFormData = (request: type.Request, escapeSQL: boolean): object => {
  const headerContentType = request.headers['content-type']
  const boundary = headerContentType?.split('boundary=')[1]
  const parts = request.body.split(`--${boundary}`)

  const formData: Record<string, string | number | boolean | Date> = {}

  for (const part of parts) {
    const lines = part.split('\r\n\r\n')
    const headers = lines[0]
    const bodyData = lines[1]

    if (headers && bodyData) {
      const contentDisposition = headers.split('; ')[1]
      const nameMatch = contentDisposition.match(/name="(.+?)"/)

      if (nameMatch) {
        const key = nameMatch[1]
        formData[key] = formatValue(bodyData.trim(), escapeSQL)
      }
    }
  }

  return formData
}
