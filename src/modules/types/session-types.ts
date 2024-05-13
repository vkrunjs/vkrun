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
}

export interface SessionCookieOptions {
  httpOnly?: boolean
  secure?: boolean
  maxAge?: number
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None'
  domain?: string
  priority?: 'Low' | 'Medium' | 'High'
}

export interface SetSessionCookieOptions {
  httpOnly?: boolean
  secure?: boolean
  expiresIn?: string
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None'
  domain?: string
  priority?: 'Low' | 'Medium' | 'High'
}

export interface SessionConfig extends SetSessionCookieOptions {
  secretKey?: string | string[]
  sanitizationEvery?: number | string
  expiresIn?: string
}
