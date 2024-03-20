import * as type from '../../types'

export const routeExists = (path: string, method: string, routes: type.Route[]): boolean => {
  return !!routes.find(route => route.path === path && route.method === method)
}
