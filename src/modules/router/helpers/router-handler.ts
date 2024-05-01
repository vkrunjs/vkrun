import { VkrunCors } from '../../cors'
import * as type from '../../types'
import * as util from '../../utils'
import * as helper from './../helpers'

export class RouterHandler {
  private routes: type.Route[] = []

  private addRoutesOptionsWithCors (middlewares: any[]): void {
    const corsMiddleware = middlewares.find(middleware => middleware instanceof VkrunCors)

    if (corsMiddleware) {
      const routeGroups = new Map<string, string[]>()

      this.routes.forEach((route) => {
        if (route.method !== 'OPTIONS') {
          const existingMethods = routeGroups.get(route.path) ?? []
          existingMethods.push(route.method)
          routeGroups.set(route.path, existingMethods)
        }
      })

      routeGroups.forEach((_methods, path) => {
        const optionsRouteExists = !!this.routes.find(route =>
          route.path === path && route.method === 'OPTIONS'
        )

        if (!optionsRouteExists) {
          const handlers: any[] = [() => null]
          this.routes.push({ path, method: 'OPTIONS', handlers })
        }
      })
    }
  }

  public async handleRequest (
    request: type.Request,
    response: type.Response,
    routes: type.Route[],
    middlewares: any[]
  ): Promise<void> {
    this.routes = routes
    const requestId = util.randomUUID()
    request.requestId = requestId
    response.setHeader('Request-Id', requestId)
    this.addRoutesOptionsWithCors(middlewares)

    const { url, method } = request
    const [path] = String(url).split('?')
    const route = this.routes.find((route) => {
      const regex = new RegExp('^' + route.path.replace(/\/:([^/]+)/g, '/([^/]+)') + '$')
      return regex.test(path) && route.method === method
    })

    if (route) {
      request.route = route
      let handlerIndex = 0

      const handleHandlers = async (): Promise<void> => {
        if (route.handlers.length === 0) {
          response.setHeader('Content-Type', 'text/plain')
          response.setHeader('Access-Control-Allow-Origin', '*')
          response.statusCode = 204
          response.end()
        } else if (route.handlers.length === 1 && middlewares.length === 0) {
          route.handlers[handlerIndex](request, response)
        } else {
          const next = (): void => {
            if (handlerIndex < route.handlers.length) {
              route.handlers[handlerIndex++](request, response, next)
            }
          }

          const handleMiddleware = async (index: number): Promise<void> => {
            const middleware = middlewares[index]
            let nextMiddleware: type.NextFunction
            if (index < middlewares.length - 1) {
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              nextMiddleware = async () => { await handleMiddleware(index + 1) }
            } else {
              nextMiddleware = next
            }

            const latestMiddleware = middlewares[middlewares.length - 1]
            const hasErrorHandler = typeof latestMiddleware === 'function' && latestMiddleware.length === 4

            if (hasErrorHandler) {
              try {
                await helper.executeMiddleware(middleware, request, response, nextMiddleware)
              } catch (error: any) {
                await latestMiddleware(error, request, response, nextMiddleware)
              }
            } else {
              await helper.executeMiddleware(middleware, request, response, nextMiddleware)
            }
          }

          if (middlewares.length > 0) await handleMiddleware(0)
          else next()
        }
      }

      await handleHandlers()
    } else {
      response.setHeader('Content-Type', 'text/plain')
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.statusCode = 404
      response.end('Not Found')
    }
  }
}
