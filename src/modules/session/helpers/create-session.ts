import { jwt } from '../../jwt'
import * as util from '../../utils'
import * as type from '../../types'
import { setCreateSessionHeaders } from './set-header/set-create-session-headers'

export const createSession = (params: {
  request: type.Request
  response: type.Response
  sessionId: string
  data: any
  secretKey: string | string[]
  expiresIn: string
  options: type.SessionCreateOptions & type.SessionCookieOptions
}): type.SessionData => {
  const { request, response, sessionId, data, options, secretKey } = params
  const expiresIn = util.convertExpiresIn(params.expiresIn ?? '1h', 'S')
  const token = jwt.encrypt(data, { secretKey, expiresIn })
  const cookieOptions = {
    httpOnly: options.httpOnly,
    secure: options.secure,
    maxAge: options.maxAge,
    path: options.path,
    sameSite: options.sameSite,
    domain: options.domain,
    priority: options.priority
  }
  setCreateSessionHeaders(response, sessionId, token, cookieOptions)
  return {
    createdAt: Date.now(),
    expiresIn: util.convertExpiresIn(expiresIn),
    remoteAddress: request.socket.remoteAddress,
    remoteFamily: request.socket.remoteFamily,
    userAgent: request.headers['user-agent'],
    token
  }
}
