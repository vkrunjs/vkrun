import { readFileSync } from 'fs'
import { basename, join } from 'path'
import { mime } from '../mime'
import { Request, Response } from '../types'

export const serveStaticFile = (basePath: string) => {
  return (request: Request, response: Response) => {
    try {
      const routePath = request?.route?.path ?? ''
      const url = request?.url ?? ''
      const encodedFileName = url.replace(routePath.replace('*', ''), '')
      const filenamePath = decodeURIComponent(encodedFileName)
      const filename = basename(filenamePath)
      const fullPath = join(basePath, filenamePath)

      try {
        const data = readFileSync(fullPath)
        const extension = filename.split('.').pop() ?? ''
        const mimeType = mime.type(extension) ?? 'application/octet-stream'

        response.setHeader('Content-Type', mimeType)
        return response.status(200).end(data)
      } catch (err) {
        response.setHeader('Content-Type', 'text/plain')
        return response.status(404).send('404 - File Not Found')
      }
    } catch (error) {
      response.setHeader('Content-Type', 'text/plain')
      return response.status(404).send('404 - Error Parsing File')
    }
  }
}
