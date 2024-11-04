import { mkdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'
import {
  NextFunction,
  Request,
  Response,
  RouterStorageFile,
  UploadDiskStorageOptions,
  UploadMultipleFilesFields,
  UploadSingleFileConfig,
  VkrunUpload
} from '../types'
import { isArray } from '../utils'

export const upload: VkrunUpload = {
  diskStorage: (options: UploadDiskStorageOptions) => {
    const saveFileToDisk = (file: any): RouterStorageFile => {
      const filename = options.filename ? options.filename(file) : file.filename
      const filepath = join(options.destination, filename)

      mkdirSync(options.destination, { recursive: true })
      writeFileSync(filepath, file.buffer)

      const fileStats = statSync(filepath)
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
      singleFile: (config: UploadSingleFileConfig) => {
        return async (request: Request, response: Response, next: NextFunction) => {
          if (request.files && isArray(request.files)) {
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

      multipleFiles: (fields?: UploadMultipleFilesFields) => {
        return async (request: Request, response: Response, next: NextFunction) => {
          const savedFiles: RouterStorageFile[] = []

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
