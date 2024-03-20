import { jwt } from '../../jwt'
import * as util from '../../utils'
import * as type from '../../types'
import { setCreateSessionHeaders } from './set-header/set-create-session-headers'

export const createSession = (params: {
  request: type.Request
  response: type.Response
  sessionId: string
  data: any
  options: type.SessionCreateOptions
  secretKey: string | string[]
}): type.SessionData => {
  const { request, response, sessionId, data, options, secretKey } = params
  util.validateTimeFormat(options.expiresIn, 'session')
  const token = jwt.encrypt(data, { secretKey, expiresIn: options.expiresIn })
  setCreateSessionHeaders(response, sessionId, token)
  return {
    createdAt: Date.now(),
    expiresIn: util.convertExpiresIn(options.expiresIn),
    remoteAddress: request.socket.remoteAddress,
    remoteFamily: request.socket.remoteFamily,
    userAgent: request.headers['user-agent'],
    token
  }
}
