import { Request, Response, NextFunction } from './router-types'

export type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'

export type LogExtension = 'log' | 'txt' | 'json'

export interface CreateLogger {
  error: (message: any) => void
  warn: (message: any) => void
  info: (message: any) => void
  http: (message: any) => void
  verbose: (message: any) => void
  debug: (message: any) => void
  silly: (message: any) => void
  middleware: () => (request: Request, response: Response, next: NextFunction) => void
}

export interface Log {
  level: LogLevel
  config: ConfigLogger
  message: any
}

export type PrintColor = 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple' | 'reset'
export interface PrintColors {
  key: PrintColor
  string: PrintColor
  number: PrintColor
  boolean: PrintColor
}

export interface ConfigLogger {
  level: LogLevel
  format: 'default' | 'indented'
  dateType: 'DD-MM-YYYY' | 'MM-DD-YYYY'
  print: {
    enabled: boolean
    format: 'default' | 'indented'
    colors: PrintColors
  }
  size: number
  daysToStoreLogs: number
  filename: string
  extension: LogExtension
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
  colors: Colors
}

export interface Colors {
  red: '\x1b[31m'
  white: '\x1b[37m'
  blue: '\x1b[34m'
  yellow: '\x1b[33m'
  green: '\x1b[32m'
  purple: '\x1b[35m'
  reset: '\x1b[0m'
}

export type SetPrintColors = 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'

export interface SetConfigLogger {
  level?: LogLevel
  format?: 'default' | 'indented'
  dateType?: 'DD-MM-YYYY' | 'MM-DD-YYYY'
  print?: {
    enabled?: boolean
    format?: 'default' | 'indented'
    colors?: {
      key?: SetPrintColors
      string?: SetPrintColors
      number?: SetPrintColors
      boolean?: SetPrintColors
    }
  }
  size?: number
  daysToStoreLogs?: number
  extension?: LogExtension
  path?: string
}
