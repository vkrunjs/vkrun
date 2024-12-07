import { LoggerConfig } from '../../types'

export const configLogger = (): LoggerConfig => {
  return {
    level: 'silly',
    format: 'default',
    dateType: 'MM-DD-YYYY',
    print: {
      enabled: true,
      format: 'default',
      colors: {
        key: 'green',
        string: 'yellow',
        number: 'blue',
        boolean: 'purple'
      }
    },
    size: (1024 * 1024) * 20, // default 20MB
    daysToStoreLogs: 7, // default 7 days
    filename: '',
    extension: 'log',
    path: 'logs',
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      verbose: 4,
      debug: 5,
      silly: 6
    },
    colors: {
      red: '\x1b[31m',
      white: '\x1b[37m',
      blue: '\x1b[34m',
      yellow: '\x1b[33m',
      green: '\x1b[32m',
      purple: '\x1b[35m',
      reset: '\x1b[0m'
    },
    syslog: {
      enabled: false,
      appName: '',
      host: '',
      port: 0,
      protocol: 'udp',
      facility: 1
    }
  }
}
