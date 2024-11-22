import * as http from 'http'
import { ParseDataConfig } from './parse-data-types'
import { CorsSetOptions } from './cors-types'
import { RateLimitConfig } from './rate-limit-types'
import { Request, Response } from './router-types'

export type AppCreateServer = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

export interface VkrunApp {
  server: () => AppCreateServer
  use: (middleware: Record<string, any>) => void
  clearTimers: () => void
  close: () => void
  error: (
    errorHandler: (error: any, request: Request, response: Response) => void
  ) => void
  parseData: (config?: ParseDataConfig) => void
  cors: (options?: CorsSetOptions) => void
  rateLimit: (config?: RateLimitConfig) => void
  get: (path: string, ...handlers: any) => void
  head: (path: string, ...handlers: any) => void
  post: (path: string, ...handlers: any) => void
  put: (path: string, ...handlers: any) => void
  patch: (path: string, ...handlers: any) => void
  delete: (path: string, ...handlers: any) => void
  options: (path: string, ...handlers: any) => void
}
