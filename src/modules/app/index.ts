import * as http from 'http'
import { VkrunRouter } from '../router'
import * as routerHelper from '../router/helpers'
import { customResponse } from '../router/helpers/custom-response'
import * as type from '../types'
import { loggerSanitizeInterval } from '../logger'
import { RouterHandler } from '../router/helpers/router-handler'
import { VkrunParseData } from '../parse-data'
import { cors } from '../cors'
import { rateLimit } from '../rate-limit'

class VkrunApp implements type.VkrunApp {
  private instance: 'server' | '_reqWithoutServer' | 'closed' | undefined
  private routes: type.Route[] = []
  private readonly routerHandler: RouterHandler
  private readonly globalMiddlewares: any[]
  private createdServer: any
  private timers: any[]
  private _parseData?: VkrunParseData

  constructor () {
    this.instance = undefined
    this.routerHandler = new RouterHandler()
    this.globalMiddlewares = []
    this.timers = []
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

  public server (): type.CreateServer {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.createdServer = http.createServer(async (request, response) => {
      this.instance = 'server'
      const _request = request as type.Request
      _request.setTimer = this.setTimer.bind(this)
      const _response = customResponse(response)
      await this.routerHandler.handleRequest(
        _request,
        _response,
        this.routes,
        this.globalMiddlewares
      )
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

  public async _reqWithoutServer (request: type.Request, response: type.Response): Promise<type.Response> {
    this.instance = '_reqWithoutServer'
    const _request = request
    _request.setTimer = this.setTimer.bind(this)
    this.createdServer = customResponse(response)
    // await this.router.handleRequest(
    //   request, this.createdServer, this.middlewares)
    await this.routerHandler.handleRequest(
      _request,
      this.createdServer,
      this.routes,
      this.globalMiddlewares
    )
    return this.createdServer
  }

  // Middleware management

  public use (middleware: Record<string, any>): void {
    if (middleware instanceof VkrunRouter) {
      this.routes = [...this.routes, ...middleware._routes()]
    } else {
      this.globalMiddlewares.push(middleware)
    }
  }

  // Parse data

  public parseData (config?: type.ParseDataConfig): void {
    if (!this._parseData) {
      this._parseData = new VkrunParseData(config)
      this.globalMiddlewares.unshift(this._parseData)
    }
  }

  // Cors

  public cors (options?: type.SetCorsOptions): void {
    this.globalMiddlewares.unshift(cors(options))
  }

  // Rate limit

  public rateLimit (config?: type.RateLimitConfig): void {
    this.globalMiddlewares.push(rateLimit(config))
  }

  // Routing

  public get (path: string, ...handlers: any): void {
    routerHelper.routeExists(path, 'GET', this.routes)
    this.routes.push({ path, method: 'GET', handlers })
  }

  public head (path: string, ...handlers: any): void {
    routerHelper.routeExists(path, 'HEAD', this.routes)
    this.routes.push({ path, method: 'HEAD', handlers })
  }

  public post (path: string, ...handlers: any): void {
    routerHelper.routeExists(path, 'POST', this.routes)
    this.routes.push({ path, method: 'POST', handlers })
  }

  public put (path: string, ...handlers: any): void {
    routerHelper.routeExists(path, 'PUT', this.routes)
    this.routes.push({ path, method: 'PUT', handlers })
  }

  public patch (path: string, ...handlers: any): void {
    routerHelper.routeExists(path, 'PATCH', this.routes)
    this.routes.push({ path, method: 'PATCH', handlers })
  }

  public delete (path: string, ...handlers: any): void {
    routerHelper.routeExists(path, 'DELETE', this.routes)
    this.routes.push({ path, method: 'DELETE', handlers })
  }

  public options (path: string, ...handlers: any): void {
    routerHelper.routeExists(path, 'OPTIONS', this.routes)
    this.routes.push({ path, method: 'OPTIONS', handlers })
  }
}

export const App = (): type.VkrunApp => {
  return new VkrunApp()
}
