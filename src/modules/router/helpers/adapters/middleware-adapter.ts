import * as type from '../../../types'

export const middlewareAdapter = (middleware: type.Middleware): any => {
  return (request: type.Request, response: type.Response, next: type.NextFunction) => {
    middleware.handle(request, response, next)
  }
}
