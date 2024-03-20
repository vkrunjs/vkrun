import * as util from '../../utils'

export const startSanitization = (params: any): void => {
  params.sanitizationActive = true
  const sanitizationInterval = params.request.setTimer(() => {
    for (const [sessionId, session] of params.sessions.entries()) {
      if (session) {
        const isExpired = util.isExpired(session.createdAt, session.expiresIn)
        if (isExpired) params.sessions.delete(sessionId)
      }
    }

    if (params.sessions.size === 0) {
      stopSanitization({ ...params, sanitizationInterval })
    }
  }, params.sanitizationEvery)
}

const stopSanitization = (params: any): void => {
  params.sanitizationActive = false
  if (params.sanitizationInterval) {
    clearInterval(params.sanitizationInterval)
    params.sanitizationInterval = null
  }
}
