import { existsSync, promises } from 'fs'

export const removeLogsFolder = async (): Promise<void> => {
  if (existsSync('logs')) {
    await promises.rm('logs', { recursive: true })
  }
}
