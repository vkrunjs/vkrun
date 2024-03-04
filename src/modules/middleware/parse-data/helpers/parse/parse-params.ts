import { formatValue } from '../format'
import * as type from '../../../../types'

export const parseParams = (request: type.Request, escapeSQL: boolean): Record<string, string | number | boolean | Date> => {
  const route = request.route as type.Route
  const routeParams: Record<string, string | number | boolean | Date> = {}
  const routePathParts = route.path.split('/')
  const urlPathParts = (request.url ?? '').split('/')

  if (routePathParts.length === urlPathParts.length) {
    for (let i = 0; i < routePathParts.length; i++) {
      const routePart = routePathParts[i]
      const urlPart = urlPathParts[i]

      if (routePart.startsWith(':')) {
        const paramName = routePart.substring(1)
        routeParams[paramName] = formatValue(urlPart, escapeSQL)
      }
    }
  }

  return routeParams
}
