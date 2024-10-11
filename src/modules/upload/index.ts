import * as fs from 'fs'
import * as path from 'path'
import * as type from '../types'

export const upload = {
  diskStorage: (
    options: {
      destination: string
      filename?: (file: {
        filename: string
        extension: string
        mimetype: string
      }) => string
    }
  ) => {
    return async (request: type.Request, _response: type.Response, next: type.NextFunction) => {
      request.on('data', (chunk) => {
        console.log({ chunk })
      })

      fs.mkdirSync(options.destination, { recursive: true })

      const saveFileToDisk = (file: any): type.StorageFile => {
        const filename = options.filename ? options.filename(file) : file.filename
        const filepath = path.join(options.destination, filename)

        fs.writeFileSync(filepath, file.buffer)

        const fileStats = fs.statSync(filepath)
        return {
          filename,
          extension: file.extension,
          mimetype: file.mimetype,
          destination: options.destination,
          path: filepath,
          size: fileStats.size
        }
      }

      if (request.files && Array.isArray(request.files)) {
        request.files = request.files.map(saveFileToDisk)
      }

      next()
    }
  }
}
