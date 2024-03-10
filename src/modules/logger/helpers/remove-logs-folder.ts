import fs from 'fs'

export const removeLogsFolder = async (): Promise<void> => {
  if (fs.existsSync('logs')) {
    await fs.promises.rm('logs', { recursive: true })
  }
}
