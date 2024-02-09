import * as fs from 'fs'
import * as path from 'path'
import { ConfigParams, CreateLog, SetConfigParams } from './types'

const configParams: ConfigParams = {
  logLevel: 'silly',
  strictLevel: false,
  print: {
    enabled: false,
    format: 'default',
    colors: {
      key: 'green',
      string: 'yellow',
      number: 'blue',
      boolean: 'purple',
      quotes: 'white'
    }
  },
  maxSizeLog: 1024 * 1024, // default 1MB
  maxDaysToStoreLogs: 7, // default 7 days
  filename: '',
  extension: 'log',
  path: ''
}
enum levels {
  error = 0,
  warn = 1,
  info = 2,
  http = 3,
  verbose = 4,
  debug = 5,
  silly = 6
}
// enum colors {
//   red = '\x1b[31m',
//   white = '\x1b[37m',
//   blue = '\x1b[34m',
//   yellow = '\x1b[33m',
//   green = '\x1b[32m',
// }

const config = (params: SetConfigParams): void => {
  if (params.level) configParams.logLevel = params.level
  if (params.strictLevel) configParams.strictLevel = params.strictLevel
  if (params.print) {
    if (params.print.enabled) configParams.print.enabled = params.print.enabled
    if (params.print.format) configParams.print.format = params.print.format
    if (params.print.colors) {
      if (params.print.colors.key) configParams.print.colors.key = params.print.colors.key
      if (params.print.colors.string) configParams.print.colors.string = params.print.colors.string
      if (params.print.colors.number) configParams.print.colors.number = params.print.colors.number
      if (params.print.colors.boolean) configParams.print.colors.boolean = params.print.colors.boolean
      if (params.print.colors.quotes) configParams.print.colors.quotes = params.print.colors.quotes
    }
  }
  if (params.maxSize) configParams.maxSizeLog = params.maxSize
  if (params.maxDaysToStore) configParams.maxDaysToStoreLogs = params.maxDaysToStore
  if (params.filename) configParams.filename = params.filename
  if (params.extension) configParams.extension = params.extension
  if (params.path) configParams.path = params.path
}

export const createLog = (data: CreateLog): void => {
  try {
    if (!configParams.path) return

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')

    if (!configParams.filename) {
      configParams.filename = `${year}-${month}-${day}.${configParams.extension}`
    }

    if (!fs.existsSync(configParams.path)) {
      fs.mkdirSync(configParams.path, { recursive: true })
    }

    const logFilePath = path.join(configParams.path, configParams.filename)
    const logData = {
      level: data.level,
      date: currentDate.toLocaleString(),
      message: data.message
    }

    if (configParams.extension === 'json') {
      let logs: any[] = []

      const fileExists = fs.existsSync(logFilePath)
      if (fileExists) {
        const fileContent = fs.readFileSync(logFilePath, 'utf-8')
        logs = JSON.parse(fileContent)
      }

      logs.push(logData)
      fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2))
    } else {
      if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, '')
      }

      const stats = fs.statSync(logFilePath)
      if (stats.size >= configParams.maxSizeLog) {
        console.error(colorizeJSON(JSON.stringify(`vkrun-logger: maximum log file size (${configParams.maxSizeLog} bytes) exceeded. New records will not be added.`, null, 2)))
        return
      }

      fs.appendFileSync(logFilePath, JSON.stringify(logData) + '\n')
    }

    if (
      (configParams.print && configParams.strictLevel && configParams.logLevel === data.level) ||
      (configParams.print && !configParams.strictLevel && levels[data.level] <= levels[configParams.logLevel])
    ) {
      if (configParams.print.format === 'default') {
        console.log(JSON.stringify(logData, null, 2))
      } else {
        console.log(colorizeJSON(JSON.stringify(logData, null, 2)))
      }
    }

    sanitizeLogs()
  } catch (error: any) {
    console.error(colorizeJSON(JSON.stringify({
      message: 'vkrun-logger: An error occurred while inserting data into the log file!',
      error: error.message
    }, null, 2)))
  }
}

const colorizeJSON = (jsonString: string): string => {
  jsonString = jsonString.replace(/"(\w+)"\s*:/g, '"\x1b[32m$1\x1b[0m":')
  jsonString = jsonString.replace(/"([^"]*)"/g, (_: string, p1: string) => {
    if (!p1.trim()) return _
    return '"\x1b[33m' + p1 + '\x1b[0m"'
  })
  jsonString = jsonString.replace(/\btrue\b/g, '\x1b[35mtrue\x1b[0m')
  jsonString = jsonString.replace(/\b\d+\b(?=(?:[^"]*"[^"]*")*[^"]*$)/g, '\x1b[34m$&\x1b[0m')
  return jsonString
}

const sanitizeLogs = (): void => {
  const logFiles = fs.readdirSync(configParams.path)

  if (logFiles.length > configParams.maxDaysToStoreLogs) {
    const sortedFiles = logFiles.map(fileName => ({
      name: fileName,
      date: fs.statSync(path.join(configParams.path, fileName)).birthtime
    })).sort((a, b) => a.date.getTime() - b.date.getTime()) // Comparação usando as datas completas

    const filesToRemove = sortedFiles.slice(0, logFiles.length - configParams.maxDaysToStoreLogs)
    filesToRemove.forEach(file => {
      fs.unlinkSync(path.join(configParams.path, file.name))
      console.log(`Arquivo de log removido: ${file.name}`)
    })
  }
}

setInterval(sanitizeLogs, 24 * 60 * 60 * 1000) // Uma vez por dia remove arquivos antigos

export const logger = {
  error: (message: any): void => createLog({ level: 'error', message }),
  warn: (message: any): void => createLog({ level: 'warn', message }),
  info: (message: any): void => createLog({ level: 'info', message }),
  http: (message: any): void => createLog({ level: 'http', message }),
  verbose: (message: any): void => createLog({ level: 'verbose', message }),
  debug: (message: any): void => createLog({ level: 'debug', message }),
  silly: (message: any): void => createLog({ level: 'silly', message }),
  config
}
