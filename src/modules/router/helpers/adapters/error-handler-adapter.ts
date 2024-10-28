import * as type from '../../../types'

export const errorHandleAdapter = (middleware: type.ErrorHandlerMiddleware) => {
  return (error: any, request: type.Request, response: type.Response) => {
    middleware.handle(error, request, response)
  }
}
