import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { isArray } from '../utils'
import { mime } from '../mime'
import {
  NextFunction,
  Request,
  Response,
  RouterFile,
  RouterMemoryFile,
  RouterStorageFile,
  UploadDiskStorage,
  UploadDiskStorageOptions,
  UploadMemoryStorage,
  UploadMemoryStorageOptions,
  UploadMultipleFilesFields,
  UploadSingleFileConfig,
  VkrunUpload
} from '../types'

class UploadSetup implements VkrunUpload {
  public diskStorage (options: UploadDiskStorageOptions): UploadDiskStorage {
    return {
      singleFile: (config) => this.fileHandler(config, options, this.saveFileToDisk(options)),
      multipleFiles: (fields) => this.multipleFilesHandler(fields, options, this.saveFileToDisk(options))
    }
  }

  public memoryStorage (options?: UploadMemoryStorageOptions): UploadMemoryStorage {
    return {
      singleFile: (config) => this.fileHandler(config, options ?? {}, this.createMemoryFile(options ?? {})),
      multipleFiles: (fields) => this.multipleFilesHandler(fields, options ?? {}, this.createMemoryFile(options ?? {}))
    }
  }

  private fileHandler (
    config: UploadSingleFileConfig,
    options: UploadDiskStorageOptions | UploadMemoryStorageOptions,
    saveFile: (file: RouterMemoryFile) => RouterFile
  ) {
    return async (request: Request, response: Response, next: NextFunction) => {
      try {
        if (request.files && isArray(request.files)) {
          const matchingFiles = request.files.filter((file) => file.fieldName === config.fieldName)

          if (matchingFiles.length > 0) {
            const file = matchingFiles[0]

            if (!this.validateFile(file, config, response, options)) return
            request.files = [saveFile(file)]
          } else {
            request.files = []
            if (config.required?.enable) {
              return this.handleError(
                response,
                `file for field ${config.fieldName} is required!`,
                options,
                config.required.onError
              )
            }
          }
        }
        next()
      } catch (error: any) {
        return this.handleError(response, `unexpected error: ${error?.message}`, options)
      }
    }
  }

  private multipleFilesHandler (
    fields: UploadMultipleFilesFields | undefined,
    options: UploadDiskStorageOptions | UploadMemoryStorageOptions,
    saveFile: (file: RouterMemoryFile) => RouterFile
  ) {
    return async (request: Request, response: Response, next: NextFunction) => {
      try {
        const savedFiles: RouterFile[] = []

        if (request.files && Array.isArray(request.files)) {
          if (!fields) {
            request.files = request.files.map(saveFile)
          } else {
            for (const field of fields) {
              const matchingFiles = request.files.filter((file) => file.fieldName === field.fieldName)

              if (!this.validateFileCount(field, matchingFiles, response, options)) return

              for (const file of matchingFiles) {
                if (!this.validateFile(file, field, response, options)) return
                savedFiles.push(saveFile(file))
              }
            }
            request.files = savedFiles
          }
        }
        next()
      } catch (error: any) {
        return this.handleError(response, `unexpected error: ${error?.message}`, options)
      }
    }
  }

  private validateFile (
    file: RouterFile,
    config: UploadSingleFileConfig | UploadMultipleFilesFields[number],
    response: Response,
    options: UploadDiskStorageOptions | UploadMemoryStorageOptions
  ): boolean {
    if (config.extensions) {
      const mimeType = mime.type(file.extension)
      if (!config.extensions.value.includes(file.extension) || !mimeType) {
        this.handleError(
          response,
          `invalid file type for field ${config.fieldName}. Allowed types: ${config.extensions.value.join(', ')}`,
          options,
          config.extensions.onError
        )
        return false
      }
    }

    if (config.size && file.size > config.size.value) {
      this.handleError(
        response,
        `file size exceeds limit for field ${config.fieldName}. Maximum allowed: ${config.size.value} bytes`,
        options,
        config.size.onError
      )
      return false
    }
    return true
  }

  private validateFileCount (
    field: UploadMultipleFilesFields[number],
    matchingFiles: RouterFile[],
    response: Response,
    options: UploadDiskStorageOptions | UploadMemoryStorageOptions
  ): boolean {
    if (field.min && matchingFiles.length < field.min.value) {
      this.handleError(
        response,
        `minimum of ${field.min.value} files required for field ${field.fieldName}!`,
        options,
        field.min.onError
      )
      return false
    }

    if (field.max && matchingFiles.length > field.max.value) {
      this.handleError(
        response,
        `maximum of ${field.max.value} files allowed for field ${field.fieldName}!`,
        options,
        field.max.onError
      )
      return false
    }
    return true
  }

  private handleError (
    response: Response,
    message: string,
    options: UploadDiskStorageOptions | UploadMemoryStorageOptions,
    onError?: (res: Response) => Response | undefined
  ): Response | undefined {
    return onError ? onError(response) : options.onError ? options.onError(response) : response.status(400).json({ statusCode: 400, message })
  }

  private saveFileToDisk (options: UploadDiskStorageOptions) {
    return (file: RouterMemoryFile): RouterStorageFile => {
      const filename = options.filename ? options.filename(file) : file.filename
      const filepath = join(options.destination, filename)

      mkdirSync(options.destination, { recursive: true })
      writeFileSync(filepath, file.buffer)

      return {
        fieldName: file.fieldName,
        originalName: file.fieldName,
        filename,
        extension: file.extension,
        mimetype: file.mimetype,
        destination: options.destination,
        path: filepath,
        size: file.size
      }
    }
  }

  private createMemoryFile (options: UploadMemoryStorageOptions) {
    return (file: RouterMemoryFile): RouterMemoryFile => {
      const filename = options.filename ? options.filename(file) : file.filename

      return {
        fieldName: file.fieldName,
        filename,
        extension: file.extension,
        mimetype: file.mimetype,
        buffer: file.buffer,
        size: file.size
      }
    }
  }
}

export const upload = new UploadSetup()
