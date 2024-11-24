import { NextFunction, Request, Response } from './router-types'

export interface VkrunRateLimitSetup {
  windowMs: number
  limit: number
  standardHeaders: boolean
  legacyHeaders: boolean
  minToNotification: number
  notification?: (access: RateLimitAccessData) => void
  handle: (request: Request, response: Response, next: NextFunction) => void
}

export interface RateLimitAccessData {
  remoteAddress: string
  remoteFamily: string
  userAgent: string
  exceeded: {
    count: number
    requests: RateLimitExceededRequest[]
  }
}

export type RateLimitRequests = Map<string, {
  count: number
  exceeded: {
    count: number
    requests: RateLimitExceededRequest[]
    notificationSent: boolean
  }
}>

export interface RateLimitExceededRequest {
  requestId?: string
  route?: string
  method?: string
}

export interface RateLimitConfig {
  /**
   * @param {number} [windowMs=60000] - The time window in milliseconds during which requests are counted.
   *                                      This value defines the period of time during which the number of requests will be monitored.
   *                                      The default value is 60,000 ms (1 minute).
   */
  windowMs?: number

  /**
   * @param {number} [limit=100] - The maximum number of requests allowed within the time window defined by `windowMs`.
   *                                This is the limit on how many requests a user can make before being blocked.
   *                                The default value is 100.
   */
  limit?: number

  /**
   * @param {boolean} [standardHeaders=true] - Whether to include the standard rate limit headers in the response.
   *                                           When enabled, the response will include the following headers:
   *                                           - `X-RateLimit-Limit`: The maximum number of requests allowed within the time window.
   *                                           - `X-RateLimit-Remaining`: The number of requests remaining in the current time window.
   *                                           - `X-RateLimit-Reset`: The time (in seconds) until the rate limit resets.
   *                                           The default value is `true`.
   */
  standardHeaders?: boolean

  /**
   * @param {boolean} [legacyHeaders=false] - Whether to include legacy rate limit headers in the response.
   *                                          When enabled, the response will include the following legacy headers:
   *                                          - `X-RateLimit-Limit-Legacy`: The rate limit for the time window (legacy).
   *                                          - `X-RateLimit-Remaining-Legacy`: The remaining requests for the time window (legacy).
   *                                          - `X-RateLimit-Reset-Legacy`: The reset time for the time window (legacy).
   *                                          The default value is `false`.
   */
  legacyHeaders?: boolean

  /**
   * @param {number} [minToNotification=0] - The minimum number of exceeded requests required to trigger a notification.
   *                                          If the number of exceeded requests reaches this value, the notification function will be called.
   *                                          The default value is 0, meaning the notification won't be triggered unless configured.
   */
  minToNotification?: number

  /**
   * @param {(access: RateLimitAccessData) => void} [notification] - A function that will be called when the rate limit is exceeded.
   *                                                              It receives a `RateLimitAccessData` object containing information about the exceeded access.
   *                                                              This function can be used to log alerts, send notifications, or take other actions.
   */
  notification?: (access: RateLimitAccessData) => void
}
