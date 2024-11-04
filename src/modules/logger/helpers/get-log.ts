import { readFileSync } from 'fs'
import { LoggerLogExtension } from '../../types'

export const getLog = (format: 'default' | 'indented', extension: LoggerLogExtension): {
  year: number
  month: string
  day: string
  hour: string
  minutes: string
  seconds: string
  nextHour: string
  content: string[]
} => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  const hour = currentDate.getHours().toString().padStart(2, '0')
  const minutes = currentDate.getMinutes().toString().padStart(2, '0')
  const seconds = currentDate.getSeconds().toString().padStart(2, '0')
  const nextHour = (currentDate.getHours() + 1).toString().padStart(2, '0')

  const logFolderPath = `logs/${month}-${day}-${year}`
  const logFileName = `${hour}00-${nextHour}00.${extension}`
  const logFilePath = `${logFolderPath}/${logFileName}`

  let content = readFileSync(logFilePath, 'utf-8').split(/\r?\n/).slice(0, -1)
  if (format === 'indented') {
    const contentJSON = JSON.parse(readFileSync(logFilePath, 'utf-8'))
    content = contentJSON
  }

  return {
    year,
    month,
    day,
    hour,
    minutes,
    seconds,
    nextHour,
    content
  }
}
