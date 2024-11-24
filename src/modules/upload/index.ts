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

/**
 * @function upload
 *
 * The `upload` module is a middleware for handling file uploads in Vkrun. It provides disk and memory storage solutions for handling single and multiple file uploads. The module allows for flexible file handling, including size, extension validation, and custom file names.
 * It must be used in conjunction with the `parseData` middleware, where `formData` is enabled, to handle multipart/form-data requests for file uploads.
 *
 * The `upload` function provides methods for configuring file storage (disk or memory), and it can handle both single and multiple file uploads. It also allows for custom validation of file size, type, and other constraints like required fields and the number of files.
 *
 * **Usage Example:**
 * ```ts
 * import { App, upload } from 'vkrun/modules/upload'
 *
 * const app = App()
 *
 * // Disk storage setup with custom file naming
 * const diskStorage = upload.diskStorage({
 *   destination: 'path/to/store/files',
 *   filename: (file) => `custom-${file.fieldName}-${Date.now()}`
 * })
 *
 * // Memory storage setup
 * const memoryStorage = upload.memoryStorage()
 * ```
 * In the example, `diskStorage` defines where the files will be saved and allows for custom filenames.
 *
 * **Single File Upload Example:**
 * ```ts
 * const singleFileUpload = diskStorage.singleFile({
 *   fieldName: 'file',
 *   required: { enable: true, onError: (res) => res.status(400).json({ error: 'File is required!' }) },
 *   size: { value: 500000, onError: (res) => res.status(413).json({ error: 'File too large!' }) },
 *   extensions: { value: ['png', 'jpg'], onError: (res) => res.status(415).json({ error: 'Invalid file type!' }) }
 * })
 *
 * app.post('/upload-single', singleFileUpload, (req, res) => {
 *   res.status(200).json({ message: 'Single file uploaded successfully!', file: req.files })
 * })
 * ```
 *
 * **Multiple Files Upload Example:**
 * ```ts
 * const multipleFilesUpload = diskStorage.multipleFiles([
 *   {
 *     fieldName: 'images',
 *     min: { value: 2, onError: (res) => res.status(400).json({ error: 'At least 2 images required' }) },
 *     max: { value: 5, onError: (res) => res.status(400).json({ error: 'No more than 5 images allowed' }) },
 *     size: { value: 500000, onError: (res) => res.status(413).json({ error: 'One of the images is too large' }) },
 *     extensions: { value: ['jpg', 'png'], onError: (res) => res.status(415).json({ error: 'Invalid image format' }) }
 *   },
 *   {
 *     fieldName: 'documents',
 *     min: { value: 1, onError: (res) => res.status(400).json({ error: 'At least 1 document required' }) },
 *     max: { value: 3 },
 *     extensions: { value: ['pdf'], onError: (res) => res.status(415).json({ error: 'Invalid document format' }) }
 *   }
 * ])
 * ```
 *
 * @returns {UploadSetup} - Returns an instance of `UploadSetup` with methods for handling file uploads:
 *   - `diskStorage(options: UploadDiskStorageOptions): UploadDiskStorage`
 *   - `memoryStorage(options?: UploadMemoryStorageOptions): UploadMemoryStorage`
 *
 * **Methods Available:**
 * - **diskStorage(options)**: Configures storage for files to be saved on the disk.
 * - **memoryStorage(options)**: Configures memory storage for files (for temporary storage).
 *
 * Each of the storage methods (`diskStorage` and `memoryStorage`) provides:
 *   - `singleFile(config)`: Handles the upload of a single file.
 *   - `multipleFiles(fields)`: Handles the upload of multiple files with validations for each field.
 *
 * @param {UploadDiskStorageOptions | UploadMemoryStorageOptions} options - Configuration options for file storage.
 *
 * **File Validation:**
 * - **Required Field**: If a file is required and not provided, a custom error handler can be defined.
 * - **File Size Limit**: Allows setting the maximum file size (in bytes). If the file exceeds this size, an error is triggered.
 * - **File Extensions**: Enables file type validation, ensuring only specified file types are allowed (e.g., `.png`, `.jpg`).
 *
 * **Custom File Names:**
 * The filename can be customized using a function that generates a unique name based on the file properties and the current timestamp.
 * ```ts
 * const uploadWithCustomFilename = upload.diskStorage({
 *   destination: 'path/to/store/files',
 *   filename: (file) => `${file.fieldName}-${Date.now()}.${file.extension}`
 * })
 * ```

 * **File Data Structure:**
 * The uploaded file data is stored in `req.files` and contains details about each file:
 *
 * | Property      | Type     | Description                                                                                   |
 * |---------------|----------|-----------------------------------------------------------------------------------------------|
 * | `fieldName`   | `string` | The name of the form field associated with the uploaded file.                                 |
 * | `originalName`| `string` | The original name of the file as provided by the client before upload.                        |
 * | `filename`    | `string` | The name given to the file after it has been saved to disk or in memory.                      |
 * | `extension`   | `string` | The file extension (e.g., `txt`, `jpg`) extracted from the uploaded file.                     |
 * | `mimetype`    | `string` | The MIME type of the file, indicating the file type (e.g., `image/jpeg`, `text/plain`).       |
 * | `size`        | `number` | The size of the file in bytes.                                                                |
 * | `destination` | `string` | The path to the directory where the file is saved.                                            |
 * | `path`        | `string` | The full file path including filename and extension where the file is stored on disk.         |
 *
 * **Example Projects**:
 * For practical examples of how to use the `upload` module in different scenarios, check the following:
 * - [Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/upload)
 */
export const upload = new UploadSetup()
