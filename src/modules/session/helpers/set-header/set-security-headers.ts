import * as type from '../../../types'

export const setSecurityHeaders = (response: type.Response): void => {
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.setHeader('X-Frame-Options', 'DENY')
  response.setHeader('Content-Security-Policy', 'default-src \'self\'')
  response.setHeader('X-XSS-Protection', '1; mode=block')
}
