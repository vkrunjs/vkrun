import { NextFunction, Request, Response } from './router-types'

export interface VkrunUpload {
  diskStorage: (options: UploadDiskStorageOptions) => {
    singleFile: UploadSingleFile
    multipleFiles: UploadMultipleFiles
  }
  memoryStorage: (options?: UploadMemoryStorageOptions) => {
    singleFile: UploadSingleFile
    multipleFiles: UploadMultipleFiles
  }
}

export interface UploadDiskStorage {
  singleFile: UploadSingleFile
  multipleFiles: UploadMultipleFiles
}

export interface UploadMemoryStorage {
  singleFile: UploadSingleFile
  multipleFiles: UploadMultipleFiles
}

export interface UploadDiskStorageOptions {
  destination: string
  filename?: (file: {
    filename: string
    extension: string
    mimetype: string
  }) => string
  onError?: (response: Response) => Response | undefined
}

export interface UploadMemoryStorageOptions {
  filename?: (file: {
    filename: string
    extension: string
    mimetype: string
  }) => string
  onError?: (response: Response) => Response | undefined
}

export interface UploadSingleFileConfig {
  fieldName: string
  required?: {
    enable: boolean
    onError?: (response: Response) => Response | undefined
  }
  size?: {
    value: number
    onError?: (response: Response) => Response | undefined
  }
  extensions?: {
    value: string[]
    onError?: (response: Response) => Response | undefined
  }
}

export type UploadSingleFile = (config: UploadSingleFileConfig) => (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<Response | undefined>

export type UploadMultipleFilesFields = Array<{
  fieldName: string
  min?: {
    value: number
    onError?: (response: Response) => Response | undefined
  }
  max?: {
    value: number
    onError?: (response: Response) => Response | undefined
  }
  size?: {
    value: number
    onError?: (response: Response) => Response | undefined
  }
  extensions?: {
    value: string[]
    onError?: (response: Response) => Response | undefined
  }
}>

export type UploadMultipleFiles = (fields?: UploadMultipleFilesFields) => (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<Response | undefined>
