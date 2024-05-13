import { jwt } from '../jwt'
import * as helper from './helpers'
import * as util from '../utils'
import * as type from '../types'

export class VkrunSession {
  private readonly secretKey: string | string[]
  private readonly expiresIn: string
  private readonly sessions: type.Sessions = new Map()
  private readonly cookieOptions: type.SessionCookieOptions
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  private sanitizationActive: boolean = false
  private readonly sanitizationEvery: number | string = util.convertExpiresIn('5m') // used in the startSanitization function

  constructor (config: type.SessionConfig) {
    this.secretKey = config.secretKey ?? helper.generateSecretKey()
    this.expiresIn = config.expiresIn ?? '1h'
    util.validateSecretKey(this.secretKey, 'session')
    util.validateTimeFormat(this.expiresIn, 'session')
    this.cookieOptions = {
      httpOnly: config?.httpOnly !== undefined ? config.httpOnly : true,
      secure: config?.secure !== undefined ? config.httpOnly : true,
      maxAge: config?.expiresIn !== undefined ? util.convertExpiresIn(config.expiresIn, 'S') : 3600,
      path: config?.path ?? '/',
      sameSite: config?.sameSite ?? 'None',
      domain: config?.domain,
      priority: config?.priority
    }
    if (config.sanitizationEvery) {
      util.validateTimeFormat(config.sanitizationEvery, 'session')
      this.sanitizationEvery = util.convertExpiresIn(config.sanitizationEvery)
    }
  }

  public signIn (
    request: type.Request,
    response: type.Response,
    data: any,
    options?: type.SessionCreateOptions
  ): void {
    const { sessionId } = helper.getSessionCookies(request)
    options = { ...options, ...this.cookieOptions }

    if (this.sessions.has(sessionId)) {
      this.sessions.delete(sessionId)
    }

    let createdSessionId = util.randomUUID()
    if (options.sessionId) createdSessionId = options.sessionId

    const session = helper.createSession({
      request,
      response,
      sessionId: createdSessionId,
      data,
      options,
      secretKey: this.secretKey,
      expiresIn: this.expiresIn
    })
    this.sessions.set(createdSessionId, session)
    if (!this.sanitizationActive) helper.startSanitization({ ...this, request })
  }

  public signOut (request: type.Request, response: type.Response): void {
    const { sessionId } = helper.getSessionCookies(request)

    if (this.sessions.has(sessionId)) {
      helper.setDeleteSessionHeaders(response)
      this.sessions.delete(sessionId)
    }
  }

  public protectRouteMiddleware () {
    return (request: type.Request, response: type.Response, next: type.NextFunction) => {
      this.handle(request, response, next)
    }
  }

  public signOutMiddleware () {
    return (request: type.Request, response: type.Response, next: type.NextFunction) => {
      const { sessionId } = helper.getSessionCookies(request)

      if (this.sessions.has(sessionId)) {
        helper.setDeleteSessionHeaders(response)
        this.sessions.delete(sessionId)
      }

      if (next) next()
      response.status(200).end()
    }
  }

  private handle (request: type.Request, response: type.Response, next: type.NextFunction): void {
    const { sessionId, sessionToken } = helper.getSessionCookies(request)

    if (!sessionId) {
      helper.responseBadRequest(response)
      return
    }

    const session = this.sessions.get(sessionId)

    if (!util.isUUID(sessionId) || !session || util.isExpired(session.createdAt, session.expiresIn)) {
      helper.responseUnauthorized(response)
      return
    }

    const isValidToken = sessionToken === session.token
    const isValidRemoteAddress = request.socket.remoteAddress === session.remoteAddress
    const isValidRemoteFamily = request.socket.remoteFamily === session.remoteFamily
    const isValidUserAgent = request.headers['user-agent'] === session.userAgent

    if (isValidRemoteAddress && isValidRemoteFamily && isValidUserAgent && isValidToken) {
      if (session.token) {
        request.session = jwt.decrypt(session.token, this.secretKey)
      }

      next()
    } else {
      helper.setDeleteSessionHeaders(response)
      helper.responseUnauthorized(response)
    }
  }
}

export const Session = (config: type.SessionConfig): VkrunSession => new VkrunSession(config)
