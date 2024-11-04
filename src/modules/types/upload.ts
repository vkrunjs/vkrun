import * as type from '.'

export interface VkrunUpload {
  diskStorage: (options: UploadDiskStorageOptions) => {
    singleFile: UploadSingleFile
    multipleFiles: UploadMultipleFiles
  }
}

export interface UploadDiskStorageOptions {
  destination: string
  filename?: (file: {
    filename: string
    extension: string
    mimetype: string
  }) => string
}

export interface UploadSingleFileConfig {
  fieldName: string
  required?: boolean
  onError?: (response: type.Response) => type.Response | undefined
}

export type UploadSingleFile = (config: UploadSingleFileConfig) => (
  request: type.Request,
  response: type.Response,
  next: type.NextFunction
) => Promise<type.Response | undefined>

export type UploadMultipleFilesFields = Array<{
  fieldName: string
  min?: {
    count: number
    onError?: (response: type.Response) => type.Response | undefined
  }
  max?: {
    count: number
    onError?: (response: type.Response) => type.Response | undefined
  }
}>

export type UploadMultipleFiles = (fields?: UploadMultipleFilesFields) => (
  request: type.Request,
  response: type.Response,
  next: type.NextFunction
) => Promise<type.Response | undefined>
