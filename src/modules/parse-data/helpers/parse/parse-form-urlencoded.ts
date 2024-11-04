import { parse } from 'querystring'
import { formatValue } from '../format'
import { Request } from '../../../types'

export const parseFormUrlEncoded = (request: Request, escapeSQL: boolean): object => {
  const parsedBody = parse(request.body.toString())
  const formattedBody: Record<string, string | number | boolean | Date> = {}

  for (const key in parsedBody) {
    if (Object.prototype.hasOwnProperty.call(parsedBody, key)) {
      const value: any = parsedBody[key]
      formattedBody[key] = formatValue(value, escapeSQL)
    }
  }

  return formattedBody
}
