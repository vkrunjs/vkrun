import * as type from '.'

export interface VkrunUpload {
  diskStorage: (
    options: {
      destination: string
      filename?: (file: {
        filename: string
        extension: string
        mimetype: string
      }) => string
    }
  ) => (
    request: type.Request,
    response: type.Response,
    next: type.NextFunction
  ) => Promise<void>
}
