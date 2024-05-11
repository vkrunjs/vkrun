import { setNoCacheHeaders } from './set-header/set-no-cache-headers'
import { setSecurityHeaders } from './set-header/set-security-headers'
import * as type from '../../types'

export const responseUnauthorized = (response: type.Response): void => {
  setNoCacheHeaders(response)
  setSecurityHeaders(response)
  response.setHeader('Content-Type', 'text/plain')
  response.setCookie('session-id', '', { maxAge: 0, expires: new Date(0).toUTCString() })
  response.setCookie('session-token', '', { maxAge: 0, expires: new Date(0).toUTCString() })
  response.statusCode = 401
  response.end('Unauthorized')
}
