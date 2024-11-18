import { routeExists } from './helpers'
import { Route, VkrunRouter } from '../types'

export class RouterSetup implements VkrunRouter {
  private readonly routes: Route[] = []

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

  public _routes (): Route[] {
    return this.routes
  }
}

export const Router = (): VkrunRouter => new RouterSetup()
