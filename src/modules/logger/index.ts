import { configLogger } from './config-logger'
import { createLog } from './create-log'
import { sanitizeLogs } from './sanitize-logs'
import { CreateLogger, SetConfigLogger } from './types'

export const createLogger = (configParams: SetConfigLogger): CreateLogger => {
  const config = configLogger()

  /* eslint-disable */
  for (const key in configParams) {
    if (key === 'size' && configParams?.size) {
      config.size = (1024 * 1024) * configParams.size
    } else {
      if (config.hasOwnProperty(key)) {
        // @ts-ignore
        config[key] = configParams[key]
      }
    }
  }
  /* eslint-enable */

  if (config.daysToStoreLogs > 0) {
    setInterval(() => sanitizeLogs(config), config.daysToStoreLogs * 24 * 60 * 60 * 1000)
  }

  return {
    error: (message: any): void => createLog({ level: 'error', config, message }),
    warn: (message: any): void => createLog({ level: 'warn', config, message }),
    info: (message: any): void => createLog({ level: 'info', config, message }),
    http: (message: any): void => createLog({ level: 'http', config, message }),
    verbose: (message: any): void => createLog({ level: 'verbose', config, message }),
    debug: (message: any): void => createLog({ level: 'debug', config, message }),
    silly: (message: any): void => createLog({ level: 'silly', config, message })
  }
}
