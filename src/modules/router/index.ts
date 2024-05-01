import * as type from '../types'
import * as helper from './helpers'

export class VkrunRouter {
  private readonly routes: type.Route[] = []

  public get (path: string, ...handlers: any): void {
    helper.routeExists(path, 'GET', this.routes)
    this.routes.push({ path, method: 'GET', handlers })
  }

  public head (path: string, ...handlers: any): void {
    helper.routeExists(path, 'HEAD', this.routes)
    this.routes.push({ path, method: 'HEAD', handlers })
  }

  public post (path: string, ...handlers: any): void {
    helper.routeExists(path, 'POST', this.routes)
    this.routes.push({ path, method: 'POST', handlers })
  }

  public put (path: string, ...handlers: any): void {
    helper.routeExists(path, 'PUT', this.routes)
    this.routes.push({ path, method: 'PUT', handlers })
  }

  public patch (path: string, ...handlers: any): void {
    helper.routeExists(path, 'PATCH', this.routes)
    this.routes.push({ path, method: 'PATCH', handlers })
  }

  public delete (path: string, ...handlers: any): void {
    helper.routeExists(path, 'DELETE', this.routes)
    this.routes.push({ path, method: 'DELETE', handlers })
  }

  public options (path: string, ...handlers: any): void {
    helper.routeExists(path, 'OPTIONS', this.routes)
    this.routes.push({ path, method: 'OPTIONS', handlers })
  }

  public _routes (): type.Route[] {
    return this.routes
  }
}

export const Router = (): VkrunRouter => new VkrunRouter()
