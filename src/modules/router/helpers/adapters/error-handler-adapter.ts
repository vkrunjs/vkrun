import * as type from '../../../types'

export const errorHandleAdapter = (middleware: type.ErrorHandlerMiddleware): any => {
  return (error: any, request: type.Request, response: type.Response, next: type.NextFunction) => {
    middleware.handle(error, request, response, next)
  }
}
