export type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'

export type LogExtension = 'log' | 'txt' | 'json'

export interface CreateLog {
  level: LogLevel
  message: any
}

export interface ConfigParams {
  logLevel: LogLevel
  strictLevel: boolean
  print: {
    enabled: boolean
    format: 'default' | 'indented'
    colors: {
      key: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      string: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      number: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      boolean: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      quotes: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
    }
  }
  maxSizeLog: number
  maxDaysToStoreLogs: number
  filename: string
  extension: LogExtension
  path: string
}

export interface SetConfigParams {
  level?: LogLevel
  strictLevel?: boolean
  print?: {
    enabled?: boolean
    format?: 'default' | 'indented'
    colors?: {
      key?: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      string?: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      number?: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      boolean?: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      quotes?: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
    }
  }
  maxSize?: number
  maxDaysToStore?: number
  filename?: string
  extension?: LogExtension
  path?: string
}
