import { ServerResponse } from 'http'
import * as util from '../utils'
import * as type from '../types'

export const customResponse = (_response: ServerResponse): type.Response => {
  const response = _response as type.Response

  response.status = function (status: number): type.Response {
    this.statusCode = status
    return this
  }

  response.json = function (body: object): void {
    this.setHeader('Content-Type', 'application/json')
    if (util.isObject(body)) {
      response._body = body
      this.end(JSON.stringify(body))
    } else {
      response._body = {}
      this.end(JSON.stringify({}))
    }
  }

  response.send = function (body: any): void {
    const hasHeadersContentType = response.hasHeader('content-type')
    response._body = body

    if (hasHeadersContentType) this.end(body)
    else {
      response.setHeader('Content-Type', 'text/plain')
      this.end(body.toString())
    }
  }

  response.setCookie = function (name: string, value: string, options?: type.CookieOptions): void {
    const existingCookies = this.getHeader('Set-Cookie') as string[] | undefined
    const defaultOptions: type.CookieOptions = {
      httpOnly: true,
      maxAge: 3600,
      path: '/',
      secure: true
    }

    let cookies: string[] = []

    if (existingCookies) {
      cookies = existingCookies.slice()
    }

    let cookie = `${name}=${value}`

    if (options) {
      if (options.httpOnly !== undefined) {
        defaultOptions.httpOnly = options.httpOnly
      }
      if (options.maxAge !== undefined) {
        defaultOptions.maxAge = options.maxAge
      }
      if (options.path !== undefined) {
        defaultOptions.path = options.path
      }
      if (options.secure !== undefined) {
        defaultOptions.secure = options.secure
      }
      if (options.sameSite !== undefined) {
        defaultOptions.sameSite = options.sameSite
      }
      if (options.domain !== undefined) {
        defaultOptions.domain = options.domain
      }
      if (options.priority !== undefined) {
        defaultOptions.priority = options.priority
      }
    }

    cookie += `; HttpOnly=${defaultOptions.httpOnly}; Max-Age=${defaultOptions.maxAge}; Path=${defaultOptions.path}; Secure=${defaultOptions.secure}`

    if (defaultOptions.sameSite) {
      cookie += `; SameSite=${defaultOptions.sameSite}`
    }
    if (defaultOptions.domain) {
      cookie += `; Domain=${defaultOptions.domain}`
    }
    if (defaultOptions.priority) {
      cookie += `; Priority=${defaultOptions.priority}`
    }

    cookies.push(cookie)

    this.setHeader('Set-Cookie', cookies)
  }

  return response
}
