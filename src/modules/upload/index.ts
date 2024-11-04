import * as fs from 'fs'
import * as path from 'path'
import * as type from '../types'

export const upload: type.VkrunUpload = {
  diskStorage: (options: type.UploadDiskStorageOptions) => {
    const saveFileToDisk = (file: any): type.StorageFile => {
      const filename = options.filename ? options.filename(file) : file.filename
      const filepath = path.join(options.destination, filename)

      fs.mkdirSync(options.destination, { recursive: true })
      fs.writeFileSync(filepath, file.buffer)

      const fileStats = fs.statSync(filepath)
      return {
        fieldName: file.fieldName,
        originalName: file.fieldName,
        filename,
        extension: file.extension,
        mimetype: file.mimetype,
        destination: options.destination,
        path: filepath,
        size: fileStats.size
      }
    }

    return {
      singleFile: (config: type.UploadSingleFileConfig) => {
        return async (request: type.Request, response: type.Response, next: type.NextFunction) => {
          if (request.files && Array.isArray(request.files)) {
            const matchingFiles = request.files.filter(file => file.fieldName === config.fieldName)

            if (matchingFiles.length > 0) {
              request.files = [saveFileToDisk(matchingFiles[0])]
            } else {
              request.files = []

              if (config.required) {
                if (config.onError) {
                  return config.onError(response)
                } else {
                  return response.status(400).json({
                    statusCode: 400,
                    message: `file for field ${config.fieldName} is required!`
                  })
                }
              }
            }
          }
          next()
        }
      },

      multipleFiles: (fields?: type.UploadMultipleFilesFields) => {
        return async (request: type.Request, response: type.Response, next: type.NextFunction) => {
          const savedFiles: type.StorageFile[] = []

          if (request.files && Array.isArray(request.files)) {
            if (!fields) {
              request.files = request.files.map(saveFileToDisk)
            } else {
              for (const field of fields) {
                const { fieldName, min, max } = field
                const matchingFiles = request.files.filter(file => file.fieldName === fieldName)

                if (min && matchingFiles.length < min.count) {
                  if (min.onError) {
                    return min.onError(response)
                  } else {
                    return response.status(400).json({
                      statusCode: 400,
                      message: `minimum of ${min.count} files required for field ${fieldName}!`
                    })
                  }
                }

                if (max && matchingFiles.length > max.count) {
                  if (max.onError) {
                    return max.onError(response)
                  } else {
                    return response.status(400).json({
                      statusCode: 400,
                      message: `maximum of ${max.count} files allowed for field ${fieldName}!`
                    })
                  }
                }

                matchingFiles.forEach(file => savedFiles.push(saveFileToDisk(file)))
              }

              request.files = savedFiles
            }
          }

          next()
        }
      }
    }
  }
}
