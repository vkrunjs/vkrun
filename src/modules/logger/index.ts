import { LoggerSetConfig, VkrunLogger } from '../types'
import { isArray, isObject } from '../utils'
import { configLogger } from './helpers/config-logger'
import { createLog } from './helpers/create-log'

export let loggerSanitizeInterval: NodeJS.Timeout

export const LoggerSetup = (configParams: LoggerSetConfig): VkrunLogger => {
  const config = configLogger()

  /* eslint-disable */
  for (const key in configParams) {
    if (key === 'size' && configParams?.size) {
      config.size = (1024 * 1024) * configParams.size
    } else if (config.hasOwnProperty(key)) {
      // @ts-ignore
      const value = configParams[key]
      
      if (isObject(value) && !isArray(value) && value !== null) {
        // @ts-ignore
        config[key] = { ...config[key], ...value }
      } else {
        // @ts-ignore
        config[key] = value
      }
    }
  }
  /* eslint-enable */

  return {
    error: (message: any): void => { createLog({ level: 'error', config, message }) },
    warn: (message: any): void => { createLog({ level: 'warn', config, message }) },
    info: (message: any): void => { createLog({ level: 'info', config, message }) },
    http: (message: any): void => { createLog({ level: 'http', config, message }) },
    verbose: (message: any): void => { createLog({ level: 'verbose', config, message }) },
    debug: (message: any): void => { createLog({ level: 'debug', config, message }) },
    silly: (message: any): void => { createLog({ level: 'silly', config, message }) }
  }
}

/**
 * @function Logger
 *
 * The `Logger` function is designed to log messages at various log levels (`error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`).
 * It supports flexible configuration for log storage, log formats, and log level filtering.
 * **Usage:**
 * - Call the `Logger` function to create a logger instance with the desired configuration.
 * - The logger instance provides methods for logging messages at different levels.
 *
 * @param {LoggerSetConfig} configParams - Configuration parameters to customize the logger.
 *   This includes the log level, format (default or indented), date format, print options, log size, and file paths.
 *   These configurations allow the user to control log verbosity and the storage format.
 *
 * @returns {VkrunLogger} - Returns an instance of the `VkrunLogger` that includes methods for logging messages at
 *   different log levels (`error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`).
 *
 * @example
 * // Example usage of Logger with a custom configuration
 * const logger = Logger({
 *   level: 'error',
 *   daysToStoreLogs: 7,
 *   print: {
 *     enabled: true,
 *     format: 'default',
 *     colors: {
 *       key: 'yellow',
 *       string: 'green',
 *       number: 'blue',
 *       boolean: 'purple'
 *     }
 *   }
 * })
 *
 * // Log messages at different levels
 * logger.error('This is an error message')
 * logger.warn('This is a warning message')
 * logger.info('This is an informational message')
 *
 * @example
 * // Log with different levels
 * logger.error({ error: 'This is an error' })
 * logger.warn({ warning: 'This is a warning' })
 * logger.info({ info: 'This is info' })
 * logger.debug({ debug: 'This is debug' })
 * logger.verbose({ verbose: 'This is verbose' })
 * logger.silly({ silly: 'This is silly' })
 */
export const Logger = (configParams: LoggerSetConfig): VkrunLogger => {
  return LoggerSetup(configParams)
}
