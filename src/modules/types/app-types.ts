import * as http from 'http'
import * as type from '../types'

export type CreateServer = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

export interface VkrunApp {
  server: () => CreateServer
  use: (middleware: Record<string, any>) => void
  setTimer: (callback: () => void, ms: number) => NodeJS.Timeout
  clearTimers: () => void
  close: () => void
  parseData: (config?: type.ParseDataConfig) => void
  cors: (options?: type.SetCorsOptions) => void
  get: (path: string, ...handlers: any) => void
  head: (path: string, ...handlers: any) => void
  post: (path: string, ...handlers: any) => void
  put: (path: string, ...handlers: any) => void
  patch: (path: string, ...handlers: any) => void
  delete: (path: string, ...handlers: any) => void
  options: (path: string, ...handlers: any) => void
}
