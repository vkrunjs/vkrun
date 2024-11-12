import { ServerResponse, createServer } from 'http'
import { RouterCookieOptions } from '../../types'

declare module 'http' {
  interface ServerResponse {
    status: (status: number) => ServerResponse
    json: (data: object) => ServerResponse
    send: (data: any) => ServerResponse
    setCookie: (name: string, value: string, options?: RouterCookieOptions) => ServerResponse
    clearCookie: (name: string) => ServerResponse
    _body: any
  }
}

ServerResponse.prototype.status = function (status: number): ServerResponse {
  this.statusCode = status
  return this
}

ServerResponse.prototype.json = function (body: object): ServerResponse {
  this.setHeader('Content-Type', 'application/json')
  this.end(JSON.stringify(body))
  return this
}

ServerResponse.prototype.send = function (body: any): ServerResponse {
  if (!this.hasHeader('Content-Type')) {
    this.setHeader('Content-Type', 'text/plain')
  }
  this.end(body.toString())
  return this
}

ServerResponse.prototype.setCookie = function (name: string, value: string, options: RouterCookieOptions = {}): ServerResponse {
  let cookie = `${name}=${value}`
  if (options.httpOnly) cookie += '; HttpOnly'
  if (options.secure) cookie += '; Secure'
  if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`
  if (options.sameSite) cookie += `; SameSite=${options.sameSite}`

  const existingCookies = this.getHeader('Set-Cookie') ?? []
  this.setHeader('Set-Cookie', Array.isArray(existingCookies) ? [...existingCookies, cookie] : [cookie])
  return this
}

ServerResponse.prototype.clearCookie = function (name: string): ServerResponse {
  const expiredCookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  const existingCookies = this.getHeader('Set-Cookie') ?? []
  this.setHeader('Set-Cookie', Array.isArray(existingCookies) ? [...existingCookies, expiredCookie] : [expiredCookie])
  return this
}

export { ServerResponse, createServer }
