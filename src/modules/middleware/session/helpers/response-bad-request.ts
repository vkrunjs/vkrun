import { setNoCacheHeaders } from './set-header/set-no-cache-headers'
import { setSecurityHeaders } from './set-header/set-security-headers'
import * as type from '../../../types'

export const responseBadRequest = (response: type.Response): void => {
  setNoCacheHeaders(response)
  setSecurityHeaders(response)
  response.setHeader('Content-Type', 'text/plain')
  response.statusCode = 400
  response.end('Invalid session ID')
}
