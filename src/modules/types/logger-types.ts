export type LoggerLogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'

export type LoggerLogExtension = 'log' | 'txt' | 'json'

export interface VkrunLogger {
  /**
   * Logs an error message with `error` level.
   *
   * @param {any} message - The message to be logged at the `error` level. This can be an object, string, or any other type of value.
   *
   * @example
   * // Example usage
   * logger.error('Something went wrong!')
   * logger.error({ error: 'Failed to fetch data' })
   */
  error: (message: any) => void

  /**
   * Logs a warning message with `warn` level.
   *
   * @param {any} message - The message to be logged at the `warn` level. This can be an object, string, or any other type of value.
   *
   * @example
   * // Example usage
   * logger.warn('This is a warning')
   * logger.warn({ warning: 'Possible configuration issue' })
   */
  warn: (message: any) => void

  /**
   * Logs an informational message with `info` level.
   *
   * @param {any} message - The message to be logged at the `info` level. This can be an object, string, or any other type of value.
   *
   * @example
   * // Example usage
   * logger.info('System started successfully')
   * logger.info({ info: 'User logged in' })
   */
  info: (message: any) => void

  /**
   * Logs an HTTP related message with `http` level.
   *
   * @param {any} message - The message to be logged at the `http` level. This can be an object, string, or any other type of value.
   *
   * @example
   * // Example usage
   * logger.http('Received an HTTP request')
   * logger.http({ http: 'GET /api/users' })
   */
  http: (message: any) => void

  /**
   * Logs a verbose message with `verbose` level.
   *
   * @param {any} message - The message to be logged at the `verbose` level. This can be an object, string, or any other type of value.
   *
   * @example
   * // Example usage
   * logger.verbose('Detailed information about the request')
   * logger.verbose({ verbose: 'Full stack trace' })
   */
  verbose: (message: any) => void

  /**
   * Logs a debugging message with `debug` level.
   *
   * @param {any} message - The message to be logged at the `debug` level. This can be an object, string, or any other type of value.
   *
   * @example
   * // Example usage
   * logger.debug('Debugging issue with database connection')
   * logger.debug({ debug: 'Variable value is incorrect' })
   */
  debug: (message: any) => void

  /**
   * Logs a silly message with `silly` level.
   *
   * @param {any} message - The message to be logged at the `silly` level. This can be an object, string, or any other type of value.
   *
   * @example
   * // Example usage
   * logger.silly('This is a trivial log message')
   * logger.silly({ silly: 'Random log entry for testing' })
   */
  silly: (message: any) => void
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
  syslog: {
    enabled: boolean
    appName: string
    host: string
    port: number
    protocol: 'udp' | 'tcp'
    facility: number
  }
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
  syslog?: {
    enabled: boolean
    appName: string
    host: string
    port: number
    protocol: 'udp' | 'tcp'
    facility: number
  }
}
