import * as util from '../../utils'
import * as type from '../../types'

export const getSessionCookies = (request: type.Request): {
  sessionId: string
  sessionToken: string
} => {
  const cookiesString = request.headers.cookie
  let sessionId: string = ''
  let sessionToken: string = ''

  if (util.isString(cookiesString)) {
    const cookies = cookiesString.replaceAll(' ', '').split(';')
    cookies.forEach((cookie: string) => {
      if (cookie.startsWith('session-id=')) {
        sessionId = cookie.split('=')[1]
      } else if (cookie.startsWith('session-token=')) {
        sessionToken = cookie.split('=')[1]
      }
    })
  }

  return { sessionId, sessionToken }
}
