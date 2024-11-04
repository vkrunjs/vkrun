import { Request, Response, NextFunction } from './router-types'

export type LoggerLogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'

export type LoggerLogExtension = 'log' | 'txt' | 'json'

export interface VkrunLogger {
  error: (message: any) => void
  warn: (message: any) => void
  info: (message: any) => void
  http: (message: any) => void
  verbose: (message: any) => void
  debug: (message: any) => void
  silly: (message: any) => void
  middleware: () => (request: Request, response: Response, next: NextFunction) => void
}

export interface LoggerLog {
  level: LoggerLogLevel
  config: LoggerConfig
  message: any
}

export type LoggerPrintColor = 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple' | 'reset'
export interface LoggerPrintColors {
  key: LoggerPrintColor
  string: LoggerPrintColor
  number: LoggerPrintColor
  boolean: LoggerPrintColor
}

export interface LoggerConfig {
  level: LoggerLogLevel
  format: 'default' | 'indented'
  dateType: 'DD-MM-YYYY' | 'MM-DD-YYYY'
  print: {
    enabled: boolean
    format: 'default' | 'indented'
    colors: LoggerPrintColors
  }
  size: number
  daysToStoreLogs: number
  filename: string
  extension: LoggerLogExtension
  path: string
  levels: {
    error: 0
    warn: 1
    info: 2
    http: 3
    verbose: 4
    debug: 5
    silly: 6
  }
  colors: LoggerColors
}

export interface LoggerColors {
  red: '\x1b[31m'
  white: '\x1b[37m'
  blue: '\x1b[34m'
  yellow: '\x1b[33m'
  green: '\x1b[32m'
  purple: '\x1b[35m'
  reset: '\x1b[0m'
}

export type LoggerSetPrintColors = 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'

export interface LoggerSetConfig {
  level?: LoggerLogLevel
  format?: 'default' | 'indented'
  dateType?: 'DD-MM-YYYY' | 'MM-DD-YYYY'
  print?: {
    enabled?: boolean
    format?: 'default' | 'indented'
    colors?: {
      key?: LoggerSetPrintColors
      string?: LoggerSetPrintColors
      number?: LoggerSetPrintColors
      boolean?: LoggerSetPrintColors
    }
  }
  size?: number
  daysToStoreLogs?: number
  extension?: LoggerLogExtension
  path?: string
}
