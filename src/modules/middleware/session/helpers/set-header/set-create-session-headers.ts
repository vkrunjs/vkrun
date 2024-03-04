import * as type from '../../../../types'

export const setCreateSessionHeaders = (response: type.Response, sessionId: string, token: string): void => {
  response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'")
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
  response.setHeader('Expires', '0')
  response.setHeader('X-XSS-Protection', '1; mode=block')
  response.setCookie('session-id', sessionId, { sameSite: 'Strict', priority: 'High' })
  response.setCookie('session-token', token, { sameSite: 'Strict', priority: 'High' })
}
