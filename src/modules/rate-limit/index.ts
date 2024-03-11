import * as type from '../types'

export class VkrunRateLimit {
  private readonly windowMs: number
  private readonly limit: number
  private readonly standardHeaders: boolean
  private readonly legacyHeaders: boolean
  private readonly notification?: (access: type.AccessData) => void
  private readonly minToNotification: number
  private readonly requests: type.RateLimitRequests

  constructor (config?: type.RateLimitConfig) {
    this.windowMs = config?.windowMs ?? 60 * 1000 // Default: 1 minute
    this.limit = config?.limit ?? 100
    this.standardHeaders = config?.standardHeaders ?? true
    this.legacyHeaders = config?.legacyHeaders ?? false
    this.notification = config?.notification
    this.minToNotification = config?.minToNotification ?? 0
    this.requests = new Map()
  }

  handle (request: type.Request, response: type.Response, next: type.NextFunction): void {
    const remoteAddress = request.socket?.remoteAddress
    const remoteFamily = request.socket?.remoteFamily ?? ''
    const userAgent = request.headers['user-agent'] ?? ''
    const key = `${remoteAddress}-${remoteFamily}`

    if (!remoteAddress) {
      response.setHeader('Content-Type', 'text/plain')
      response.statusCode = 400
      response.end('Missing Remote Address')
      return
    }

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

    setTimeout(() => {
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

export const rateLimit = (config?: type.RateLimitConfig): VkrunRateLimit => {
  return new VkrunRateLimit(config)
}
