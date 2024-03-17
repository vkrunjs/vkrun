import { jwt } from '../jwt'
import * as helper from './helpers'
import * as util from '../utils'
import * as type from '../types'

class VkrunSession {
  private readonly secretKey: string | string[]
  private readonly sessions: type.Sessions = new Map()
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  private sanitizationActive: boolean = false
  private readonly sanitizationEvery: number = util.convertExpiresIn('5m') // used in the startSanitization function

  constructor (config: type.SessionConfig) {
    util.validateSecretKey(config.secretKey, 'session')
    this.secretKey = config.secretKey
    if (config.sanitizationEvery) {
      util.validateTimeFormat(config.sanitizationEvery, 'session')
      this.sanitizationEvery = util.convertExpiresIn(config.sanitizationEvery)
    }
  }

  public create (data: any, options: type.SessionCreateOptions) {
    return (request: type.Request, response: type.Response, next: type.NextFunction) => {
      util.validateTimeFormat(options.expiresIn, 'session')
      const { sessionId } = helper.getSessionCookies(request)

      if (this.sessions.has(sessionId)) {
        this.sessions.delete(sessionId)
      }

      let createdSessionId = util.randomUUID()
      if (options.sessionId) createdSessionId = options.sessionId

      const session = helper.createSession({ request, response, sessionId: createdSessionId, data, options, secretKey: this.secretKey })
      this.sessions.set(createdSessionId, session)

      if (!this.sanitizationActive) helper.startSanitization({ ...this, request })
      next()
    }
  }

  public protect () {
    return (request: type.Request, response: type.Response, next: type.NextFunction) => {
      this.handle(request, response, next)
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
      helper.responseUnauthorized(response)
    }
  }
}

export const Session = (config: type.SessionConfig): VkrunSession => new VkrunSession(config)
