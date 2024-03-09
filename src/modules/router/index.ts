import { VkrunCors } from '../middleware/cors'
import * as type from '../types'
import * as util from '../utils'

export class VkrunRouter {
  private readonly routes: type.Route[] = []

  private routeExists (path: string, method: string): boolean {
    return !!this.routes.find(route => route.path === path && route.method === method)
  }

  public get (path: string, ...handlers: any): void {
    if (this.routeExists(path, 'GET')) {
      console.error(`vkrun-router: ${path} route is duplicated for GET method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for GET method.`)
    }
    this.routes.push({ path, method: 'GET', handlers })
  }

  public head (path: string, ...handlers: any): void {
    if (this.routeExists(path, 'HEAD')) {
      console.error(`vkrun-router: ${path} route is duplicated for HEAD method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for HEAD method.`)
    }
    this.routes.push({ path, method: 'HEAD', handlers })
  }

  public post (path: string, ...handlers: any): void {
    if (this.routeExists(path, 'POST')) {
      console.error(`vkrun-router: ${path} route is duplicated for POST method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for POST method.`)
    }
    this.routes.push({ path, method: 'POST', handlers })
  }

  public put (path: string, ...handlers: any): void {
    if (this.routeExists(path, 'PUT')) {
      console.error(`vkrun-router: ${path} route is duplicated for PUT method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for PUT method.`)
    }
    this.routes.push({ path, method: 'PUT', handlers })
  }

  public patch (path: string, ...handlers: any): void {
    if (this.routeExists(path, 'PATCH')) {
      console.error(`vkrun-router: ${path} route is duplicated for PATCH method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for PATCH method.`)
    }
    this.routes.push({ path, method: 'PATCH', handlers })
  }

  public delete (path: string, ...handlers: any): void {
    if (this.routeExists(path, 'DELETE')) {
      console.error(`vkrun-router: ${path} route is duplicated for DELETE method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for DELETE method.`)
    }
    this.routes.push({ path, method: 'DELETE', handlers })
  }

  public options (path: string, ...handlers: any): void {
    if (this.routeExists(path, 'OPTIONS')) {
      console.error(`vkrun-router: ${path} route is duplicated for OPTIONS method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for OPTIONS method.`)
    }
    this.routes.push({ path, method: 'OPTIONS', handlers })
  }

  private corsOptionsDefault (): any {
    return (_request: type.Request, response: type.Response): any => {
      response.end()
    }
  }

  private addRoutesOptionsWithCors (middlewares: any[]): void {
    const corsMiddleware = middlewares.find(middleware => middleware instanceof VkrunCors)

    if (corsMiddleware) {
      // Cria um mapa para agrupar as rotas pelo caminho (path) e métodos permitidos
      const routeGroups = new Map<string, string[]>()

      // Agrupa as rotas pelo caminho (path)
      this.routes.forEach((route) => {
        if (route.method !== 'OPTIONS') {
          const existingMethods = routeGroups.get(route.path) ?? []
          existingMethods.push(route.method)
          routeGroups.set(route.path, existingMethods)
        }
      })

      // Para cada grupo de rotas com o mesmo caminho (path), injeta o middleware OPTIONS
      routeGroups.forEach((_methods, path) => {
        const optionsRouteExists = this.routeExists(path, 'OPTIONS')
        // Verifica se já existe uma rota OPTIONS para o caminho atual
        if (!optionsRouteExists) {
          let handlers: any[] = []
          // Verifica se já existe algum handler definido para essa rota OPTIONS
          const existingRoute = this.routes.find(route => route.path === path && route.method === 'OPTIONS')
          if (existingRoute) {
            handlers = existingRoute.handlers
          } else {
            // Se não houver nenhum handler definido, usamos o handler padrão do CORS
            handlers = [this.corsOptionsDefault()]
          }
          this.routes.push({ path, method: 'OPTIONS', handlers })
        }
      })
    }
  }

  private async executeMiddleware (
    middleware: any,
    request: type.Request,
    response: type.Response,
    nextMiddleware: () => void
  ): Promise<void> {
    if (typeof middleware?.handle === 'function' && middleware?.handle.length === 3) {
      await middleware.handle(request, response, nextMiddleware)
    } else if (typeof middleware === 'function' && middleware?.length === 3) {
      await middleware(request, response, nextMiddleware)
    } else {
      throw new Error('vkrun-router: method use received invalid middleware.')
    }
  }

  public async handleRequest (request: type.Request, response: type.Response, middlewares: any[]): Promise<void> {
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

            try {
              await this.executeMiddleware(middleware, request, response, nextMiddleware)
            } catch (error: any) {
              if (error?.message === 'The "chunk" argument must be of type string or an instance of Buffer or Uint8Array. Received an instance of Object') {
                throw Error(`vkrun-router: route ${route.path} with method ${route.method} returns a value in the response that does not match the content type.`)
              }
              if (hasErrorHandler) await latestMiddleware(error, request, response, nextMiddleware)
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

export const Router = (): VkrunRouter => new VkrunRouter()
