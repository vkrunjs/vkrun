import {
  RateLimitAccessData,
  NextFunction,
  RateLimitConfig,
  RateLimitRequests,
  Request,
  Response
} from '../types'

export class RateLimitSetup {
  private readonly windowMs: number
  private readonly limit: number
  private readonly standardHeaders: boolean
  private readonly legacyHeaders: boolean
  private readonly notification?: (access: RateLimitAccessData) => void
  private readonly minToNotification: number
  private readonly requests: RateLimitRequests

  constructor (config?: RateLimitConfig) {
    this.windowMs = config?.windowMs ?? 60 * 1000 // Default: 1 minute
    this.limit = config?.limit ?? 100
    this.standardHeaders = config?.standardHeaders ?? true
    this.legacyHeaders = config?.legacyHeaders ?? false
    this.notification = config?.notification
    this.minToNotification = config?.minToNotification ?? 0
    this.requests = new Map()
  }

  handle (request: Request, response: Response, next: NextFunction): void {
    const remoteAddress = request.socket.remoteAddress ?? '127.0.0.1'
    const remoteFamily = request.socket.remoteFamily ?? ''
    const userAgent = request.headers['user-agent'] ?? ''
    const key = `${remoteAddress}-${remoteFamily}`

    let requestInfo = this.requests.get(key)
    if (!requestInfo) {
      requestInfo = { count: 0, exceeded: { count: 0, requests: [], notificationSent: false } }
    }

    requestInfo.count++

    if (requestInfo.count <= this.limit) {
      this.requests.set(key, requestInfo)
    } else {
      requestInfo.exceeded.count++
      requestInfo.exceeded.requests.push({
        requestId: request.requestId,
        method: request.method,
        route: request.url
      })

      if (
        !requestInfo.exceeded.notificationSent &&
        this.notification &&
        requestInfo.exceeded.count >= this.minToNotification
      ) {
        this.notification({
          remoteAddress,
          remoteFamily,
          userAgent,
          exceeded: {
            count: requestInfo.exceeded.count,
            requests: requestInfo.exceeded.requests
          }
        })
        requestInfo.exceeded.notificationSent = true
      }

      this.requests.set(key, requestInfo)
      response.setHeader('Content-Type', 'text/plain')
      response.statusCode = 429
      response.end('Too Many Requests')
      return
    }

    request.setTimer(() => {
      this.requests.delete(key)
    }, this.windowMs)

    if (this.standardHeaders) {
      const remaining = Math.max(0, this.limit - requestInfo.count)
      const resetTime = Math.ceil((Date.now() + this.windowMs) / 1000)

      response.setHeader('X-RateLimit-Limit', String(this.limit))
      response.setHeader('X-RateLimit-Remaining', String(remaining))
      response.setHeader('X-RateLimit-Reset', String(resetTime))
    }

    if (this.legacyHeaders) {
      const remainingLegacy = Math.max(0, this.limit - requestInfo.count)
      const resetTimeLegacy = Math.ceil((Date.now() + this.windowMs) / 1000)

      response.setHeader('X-RateLimit-Limit-Legacy', String(this.limit))
      response.setHeader('X-RateLimit-Remaining-Legacy', String(remainingLegacy))
      response.setHeader('X-RateLimit-Reset-Legacy', String(resetTimeLegacy))
    }

    next()
  }
}

export const rateLimit = (config?: RateLimitConfig): RateLimitSetup => {
  return new RateLimitSetup(config)
}
