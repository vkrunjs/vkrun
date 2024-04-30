import * as type from '../types'
import * as helper from './helpers'

export class VkrunRouter {
  private readonly routes: type.Route[] = []

  public get (path: string, ...handlers: any): void {
    if (helper.routeExists(path, 'GET', this.routes)) {
      console.error(`vkrun-router: ${path} route is duplicated for GET method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for GET method.`)
    }
    this.routes.push({ path, method: 'GET', handlers })
  }

  public head (path: string, ...handlers: any): void {
    if (helper.routeExists(path, 'HEAD', this.routes)) {
      console.error(`vkrun-router: ${path} route is duplicated for HEAD method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for HEAD method.`)
    }
    this.routes.push({ path, method: 'HEAD', handlers })
  }

  public post (path: string, ...handlers: any): void {
    if (helper.routeExists(path, 'POST', this.routes)) {
      console.error(`vkrun-router: ${path} route is duplicated for POST method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for POST method.`)
    }
    this.routes.push({ path, method: 'POST', handlers })
  }

  public put (path: string, ...handlers: any): void {
    if (helper.routeExists(path, 'PUT', this.routes)) {
      console.error(`vkrun-router: ${path} route is duplicated for PUT method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for PUT method.`)
    }
    this.routes.push({ path, method: 'PUT', handlers })
  }

  public patch (path: string, ...handlers: any): void {
    if (helper.routeExists(path, 'PATCH', this.routes)) {
      console.error(`vkrun-router: ${path} route is duplicated for PATCH method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for PATCH method.`)
    }
    this.routes.push({ path, method: 'PATCH', handlers })
  }

  public delete (path: string, ...handlers: any): void {
    if (helper.routeExists(path, 'DELETE', this.routes)) {
      console.error(`vkrun-router: ${path} route is duplicated for DELETE method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for DELETE method.`)
    }
    this.routes.push({ path, method: 'DELETE', handlers })
  }

  public options (path: string, ...handlers: any): void {
    if (helper.routeExists(path, 'OPTIONS', this.routes)) {
      console.error(`vkrun-router: ${path} route is duplicated for OPTIONS method.`)
      throw new Error(`vkrun-router: ${path} route is duplicated for OPTIONS method.`)
    }
    this.routes.push({ path, method: 'OPTIONS', handlers })
  }

  public _routes (): type.Route[] {
    return this.routes
  }
}

export const Router = (): VkrunRouter => new VkrunRouter()
