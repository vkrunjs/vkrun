export interface AccessData {
  remoteAddress: string
  remoteFamily: string
  userAgent: string
  exceeded: {
    count: number
    requests: ExceededRequest[]
  }
}

export type RateLimitRequests = Map<string, {
  count: number
  exceeded: {
    count: number
    requests: ExceededRequest[]
    notificationSent: boolean
  }
}>

export interface ExceededRequest {
  route?: string
  method?: string
}

export interface RateLimitConfig {
  windowMs?: number
  limit?: number
  standardHeaders?: boolean
  legacyHeaders?: boolean
  minToNotification?: number
  notification?: (access: AccessData) => void
}
