import * as type from '../types'

export const validateRouteData = (schema: type.DefaultReturn): any => {
  return (request: type.Request, response: type.Response, next: type.NextFunction) => {
    const routeData = {
      params: request.params,
      query: request.query,
      files: request.files,
      body: request.body,
      session: request.session
    }
    const test = schema.test(routeData, 'routeData')
    if (test.passedAll) {
      next()
    } else {
      response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private')
      response.setHeader('Pragma', 'no-cache')
      response.setHeader('Expires', '0')
      response.setHeader('X-Content-Type-Options', 'nosniff')
      response.setHeader('X-Frame-Options', 'DENY')
      response.setHeader('Content-Security-Policy', 'default-src \'self\'')
      response.setHeader('X-XSS-Protection', '1; mode=block')
      response.statusCode = 400
      response.end(test.errors[0].message)
    }
  }
}
