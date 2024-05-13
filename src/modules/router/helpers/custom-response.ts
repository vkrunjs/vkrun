import { ServerResponse } from 'http'
import * as util from '../../utils'
import * as type from '../../types'

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

    let cookies: string[] = []

    if (existingCookies) {
      cookies = existingCookies.slice()
    }

    let cookie = `${name}=${value}`

    if (options?.httpOnly) {
      cookie += `; HttpOnly=${options.httpOnly}`
    }
    if (options?.maxAge) {
      cookie += `; Max-Age=${options.maxAge}`
    }
    if (options?.path) {
      cookie += `; Path=${options.path}`
    }
    if (options?.secure) {
      cookie += `; Secure=${options.secure}`
    }
    if (options?.sameSite) {
      cookie += `; SameSite=${options.sameSite}`
    }
    if (options?.domain) {
      cookie += `; Domain=${options.domain}`
    }
    if (options?.priority) {
      cookie += `; Priority=${options.priority}`
    }
    if (options?.expires) {
      cookie += `; Expires=${options.expires}`
    }

    cookies.push(cookie)

    this.setHeader('Set-Cookie', cookies)
  }

  response.clearCookie = function (name: string): void {
    const existingCookies = this.getHeader('Set-Cookie') as string[] | undefined
    let cookies: string[] = []

    if (existingCookies) {
      cookies = existingCookies.slice()
    }

    const removedCookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    cookies.push(removedCookie)
    this.setHeader('Set-Cookie', cookies)
  }

  return response
}
