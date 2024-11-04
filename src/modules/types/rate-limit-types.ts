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
  windowMs?: number
  limit?: number
  standardHeaders?: boolean
  legacyHeaders?: boolean
  minToNotification?: number
  notification?: (access: RateLimitAccessData) => void
}
