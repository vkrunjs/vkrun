import { Request, Route } from '../../../types'
import { formatValue } from '../format'

export const parseParams = (request: Request, escapeSQL: boolean): Record<string, string | number | boolean | Date> => {
  const route = request.route as Route
  const routeParams: Record<string, string | number | boolean | Date> = {}
  const routePathParts = route.path.split('/')
  const urlPathParts = (request.url ?? '').split('?')[0].split('/') // Adiciona o split('?')[0] para ignorar a query string

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
