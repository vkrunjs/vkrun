import { NextFunction, Request, Response } from './router-types'

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
  onError?: (response: Response) => Response | undefined
}

export type UploadSingleFile = (config: UploadSingleFileConfig) => (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<Response | undefined>

export type UploadMultipleFilesFields = Array<{
  fieldName: string
  min?: {
    count: number
    onError?: (response: Response) => Response | undefined
  }
  max?: {
    count: number
    onError?: (response: Response) => Response | undefined
  }
}>

export type UploadMultipleFiles = (fields?: UploadMultipleFilesFields) => (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<Response | undefined>
