import * as querystring from 'querystring'
import { formatObjectValues } from '../format'
import * as type from '../../../../types'

export const parseQuery = (request: type.Request, escapeSQL: boolean): Record<string, string | number | boolean | Date> => {
  const parts = (request.url ?? '').split('?')
  const queryString = parts.length > 1 ? parts[1] : ''
  const parsedQuery = querystring.parse(queryString)

  return formatObjectValues(parsedQuery, escapeSQL)
}
