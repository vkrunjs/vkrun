export type Sessions = Map<string, SessionData>

export interface SessionData {
  createdAt: number
  expiresIn: number
  remoteAddress: string | undefined
  remoteFamily: string | undefined
  userAgent: string | undefined
  token: string
}

export interface SessionCreateOptions {
  sessionId?: string
  expiresIn: number | string
}

export interface SessionConfig {
  secretKey: string | string[]
  sanitizationEvery?: number | string
  httpOnly?: boolean
  secure?: boolean
  expires?: string
  maxAge?: number
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None'
  domain?: string
  priority?: 'Low' | 'Medium' | 'High'
}
