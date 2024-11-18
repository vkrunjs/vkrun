import { RouterSetup } from '../router'
import { createServer, routeExists } from '../router/helpers'
import { loggerSanitizeInterval } from '../logger'
import { RouterHandler } from '../router/helpers/router-handler'
import { ParseDataSetup } from '../parse-data'
import { cors } from '../cors'
import { rateLimit } from '../rate-limit'
import {
  AppCreateServer,
  ParseDataConfig,
  RateLimitConfig,
  Request,
  Response,
  Route,
  CorsSetOptions,
  VkrunApp,
  VkrunParseData
} from '../types'

class AppSetup implements VkrunApp {
  private instance: 'server' | '_reqWithoutServer' | 'closed' | undefined
  private routes: Route[] = []
  private readonly routerHandler: RouterHandler
  private readonly globalMiddlewares: any[]
  private createdServer: any
  private timers: any[]
  private _parseData?: VkrunParseData
  private errorHandler: ((
    error: any,
    request: Request,
    response: Response
  ) => void) | null

  constructor () {
    this.instance = undefined
    this.routerHandler = new RouterHandler()
    this.globalMiddlewares = []
    this.timers = []
    this.errorHandler = null
  }

  // Timeout management

  public setTimer (callback: () => void, ms: number): NodeJS.Timeout {
    const timeout = setTimeout(callback, ms)
    this.timers.push(timeout)
    return timeout
  }

  public clearTimers (): void {
    this.timers.forEach((timerId: NodeJS.Timeout) => clearTimeout(timerId))
    this.timers = []
    if (loggerSanitizeInterval) clearInterval(loggerSanitizeInterval)
  }

  // Server Nodejs

  public server (): AppCreateServer {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.createdServer = createServer(async (request, response) => {
      this.instance = 'server'
      if (this.errorHandler) {
        try {
          await this.routerHandler.handleRequest(
            request as Request,
            response,
            this.routes,
            this.globalMiddlewares
          )
        } catch (error: any) {
          this.errorHandler(error, request as Request, response)
        }
      } else {
        await this.routerHandler.handleRequest(
          request as Request,
          response,
          this.routes,
          this.globalMiddlewares
        )
      }
    })

    return this.createdServer
  }

  public close (): void {
    if (this.instance === 'server') this.createdServer.close()
    this.createdServer = null
    this.clearTimers()
    this.instance = 'closed'
  }

  // Method to simulate a request with superRequest

  public async _reqWithoutServer (
    request: Request,
    response: Response & { _ended: boolean }
  ): Promise<Response> {
    this.instance = '_reqWithoutServer'
    const _request = request
    _request.setTimer = this.setTimer.bind(this)

    if (this.errorHandler) {
      try {
        await this.routerHandler.handleRequest(
          _request,
          response,
          this.routes,
          this.globalMiddlewares
        )
      } catch (error: any) {
        this.errorHandler(error, _request, response)
      }
    } else {
      await this.routerHandler.handleRequest(
        _request,
        response,
        this.routes,
        this.globalMiddlewares
      )
    }

    return await new Promise<Response>((resolve) => {
      const monitor = setInterval(() => {
        if (response._ended) {
          clearInterval(monitor)
          resolve(response)
        }
      }, 5)
    })
  }

  // Middleware management

  public use (middleware: Record<string, any>): void {
    if (middleware instanceof RouterSetup) {
      this.routes = [...this.routes, ...middleware._routes()]
    } else {
      this.globalMiddlewares.push(middleware)
    }
  }

  // Error Handler

  public error (
    errorHandler: (error: any, request: Request, response: Response) => void
  ): void {
    this.errorHandler = errorHandler
  }

  // Parse data

  public parseData (config?: ParseDataConfig): void {
    if (!this._parseData) {
      this._parseData = new ParseDataSetup(config)
      this.globalMiddlewares.unshift(this._parseData)
    }
  }

  // Cors

  public cors (options?: CorsSetOptions): void {
    this.globalMiddlewares.unshift(cors(options))
  }

  // Rate limit

  public rateLimit (config?: RateLimitConfig): void {
    this.globalMiddlewares.push(rateLimit(config))
  }

  // Routing

  // Helper to pre-compile regex
  private compileRegex (path: string): RegExp {
    const pattern = path
      .replace(/\/\*/g, '/.*') // Support wildcard `*`
      .replace(/\/:([^/]+)/g, '/([^/]+)') // Dynamic parameters `:param`
    return new RegExp(`^${pattern}$`)
  }

  public get (path: string, ...handlers: any): void {
    routeExists(path, 'GET', this.routes)
    this.routes.push({ path, method: 'GET', handlers, regex: this.compileRegex(path) })
  }

  public head (path: string, ...handlers: any): void {
    routeExists(path, 'HEAD', this.routes)
    this.routes.push({ path, method: 'HEAD', handlers, regex: this.compileRegex(path) })
  }

  public post (path: string, ...handlers: any): void {
    routeExists(path, 'POST', this.routes)
    this.routes.push({ path, method: 'POST', handlers, regex: this.compileRegex(path) })
  }

  public put (path: string, ...handlers: any): void {
    routeExists(path, 'PUT', this.routes)
    this.routes.push({ path, method: 'PUT', handlers, regex: this.compileRegex(path) })
  }

  public patch (path: string, ...handlers: any): void {
    routeExists(path, 'PATCH', this.routes)
    this.routes.push({ path, method: 'PATCH', handlers, regex: this.compileRegex(path) })
  }

  public delete (path: string, ...handlers: any): void {
    routeExists(path, 'DELETE', this.routes)
    this.routes.push({ path, method: 'DELETE', handlers, regex: this.compileRegex(path) })
  }

  public options (path: string, ...handlers: any): void {
    routeExists(path, 'OPTIONS', this.routes)
    this.routes.push({ path, method: 'OPTIONS', handlers, regex: this.compileRegex(path) })
  }
}

export const App = (): VkrunApp => {
  return new AppSetup()
}
