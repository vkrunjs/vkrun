import { parse } from 'querystring'
import { formatObjectValues } from '../format'
import { Request } from '../../../types'

export const parseQuery = (request: Request, escapeSQL: boolean): Record<string, string | number | boolean | Date> => {
  const parts = (request.url ?? '').split('?')
  const queryString = parts.length > 1 ? parts[1] : ''
  const parsedQuery = parse(queryString)

  return formatObjectValues(parsedQuery, escapeSQL)
}
