import fs from 'fs'
import * as path from 'path'
import { ConfigLogger } from './types'

export const sanitizeLogs = (config: ConfigLogger): void => {
  const logFolders = fs.readdirSync(config.path)
  const currentDate = new Date()

  logFolders.forEach(folderName => {
    if (isValidDateFolder(folderName)) {
      const folderDate = getDateFromFolderName(folderName, config)
      const expirationDate = new Date(currentDate.getTime() - config.daysToStoreLogs * 24 * 60 * 60 * 1000)
      expirationDate.setHours(0, 0, 0, 0)

      if (folderDate < expirationDate) {
        fs.rmSync(path.join(config.path, folderName), { recursive: true })
      }
    } else {
      const filePath = path.join(config.path, folderName)
      if (fs.existsSync(filePath)) {
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath)
        } else {
          fs.rmSync(filePath, { recursive: true })
        }
      }
    }
  })
}

const isValidDateFolder = (folderName: string): boolean => {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/
  return dateRegex.test(folderName)
}

const getDateFromFolderName = (folderName: string, config: ConfigLogger): Date => {
  let [month, day, year] = folderName.split('-').map(Number)
  if (config.dateType === 'DD-MM-YYYY') {
    [day, month, year] = folderName.split('-').map(Number)
  }
  return new Date(year, month - 1, day)
}
