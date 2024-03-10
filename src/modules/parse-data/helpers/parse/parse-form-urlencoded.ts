import * as querystring from 'querystring'
import { formatValue } from '../format'
import * as type from '../../../types'

export const parseFormUrlEncoded = (request: type.Request, escapeSQL: boolean): object => {
  const parsedBody = querystring.parse(request.body)
  const formattedBody: Record<string, string | number | boolean | Date> = {}

  for (const key in parsedBody) {
    if (Object.prototype.hasOwnProperty.call(parsedBody, key)) {
      const value: any = parsedBody[key]
      formattedBody[key] = formatValue(value, escapeSQL)
    }
  }

  return formattedBody
}
