import fs from 'fs'
import path from 'path'
import * as type from '../types'
import { mime } from '../mime'

export const serveStaticFile = (basePath: string) => {
  return (request: type.Request, response: type.Response) => {
    try {
      const routePath = request?.route?.path ?? ''
      const url = request?.url ?? ''
      const encodedFileName = url.replace(routePath.replace('*', ''), '')
      const filenamePath = decodeURIComponent(encodedFileName)
      const filename = path.basename(filenamePath) // 'filename.txt'
      const fullPath = path.join(basePath, filenamePath)

      try {
        const data = fs.readFileSync(fullPath) // Lê o arquivo de forma síncrona
        const extension = filename.split('.').pop() ?? ''
        const mimeType = mime.type(extension) ?? 'application/octet-stream'

        response.setHeader('Content-Type', mimeType)
        return response.status(200).end(data) // Envia o conteúdo do arquivo como resposta
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
