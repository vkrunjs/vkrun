import { routeExists } from './helpers'
import { Route, VkrunRouter } from '../types'
import { compileRegex } from '../utils'

export class RouterSetup implements VkrunRouter {
  private readonly routes: Route[] = []

  public get (path: string, ...handlers: any): void {
    routeExists(path, 'GET', this.routes)
    this.routes.push({ path, method: 'GET', handlers, regex: compileRegex(path) })
  }

  public head (path: string, ...handlers: any): void {
    routeExists(path, 'HEAD', this.routes)
    this.routes.push({ path, method: 'HEAD', handlers, regex: compileRegex(path) })
  }

  public post (path: string, ...handlers: any): void {
    routeExists(path, 'POST', this.routes)
    this.routes.push({ path, method: 'POST', handlers, regex: compileRegex(path) })
  }

  public put (path: string, ...handlers: any): void {
    routeExists(path, 'PUT', this.routes)
    this.routes.push({ path, method: 'PUT', handlers, regex: compileRegex(path) })
  }

  public patch (path: string, ...handlers: any): void {
    routeExists(path, 'PATCH', this.routes)
    this.routes.push({ path, method: 'PATCH', handlers, regex: compileRegex(path) })
  }

  public delete (path: string, ...handlers: any): void {
    routeExists(path, 'DELETE', this.routes)
    this.routes.push({ path, method: 'DELETE', handlers, regex: compileRegex(path) })
  }

  public options (path: string, ...handlers: any): void {
    routeExists(path, 'OPTIONS', this.routes)
    this.routes.push({ path, method: 'OPTIONS', handlers, regex: compileRegex(path) })
  }

  public _routes (): Route[] {
    return this.routes
  }
}

export const Router = (): VkrunRouter => new RouterSetup()
