import * as type from '../../types'

export const httpStatus = {
  // 100 - CONTINUE
  continue: (body: any): type.ResponseHttpStatus => ({
    statusCode: 100,
    body
  }),

  // 101 - SWITCHING_PROTOCOLS
  switchingProtocols: (body: any): type.ResponseHttpStatus => ({
    statusCode: 101,
    body
  }),

  // 200 - OK
  ok: (body: any): type.ResponseHttpStatus => ({
    statusCode: 200,
    body
  }),

  // 201 - CREATED
  created: (body: any): type.ResponseHttpStatus => ({
    statusCode: 201,
    body
  }),

  // 202 - ACCEPTED
  accepted: (body: any): type.ResponseHttpStatus => ({
    statusCode: 202,
    body
  }),

  // 203 - NON_AUTHORITATIVE_INFORMATION
  nonAuthoritativeInformation: (body: any): type.ResponseHttpStatus => ({
    statusCode: 203,
    body
  }),

  // 204 - NO_CONTENT
  noContent: (body: any): type.ResponseHttpStatus => ({
    statusCode: 204,
    body
  }),

  // 205 - RESET_CONTENT
  resetContent: (body: any): type.ResponseHttpStatus => ({
    statusCode: 205,
    body
  }),

  // 206 - PARTIAL_CONTENT
  partialContent: (body: any): type.ResponseHttpStatus => ({
    statusCode: 206,
    body
  }),

  // 300 - MULTIPLE_CHOICES
  multipleChoices: (body: any): type.ResponseHttpStatus => ({
    statusCode: 300,
    body
  }),

  // 301 - MOVED_PERMANENTLY
  movedPermanently: (body: any): type.ResponseHttpStatus => ({
    statusCode: 301,
    body
  }),

  // 302 - MOVED_TEMPORARILY
  movedTemporarily: (body: any): type.ResponseHttpStatus => ({
    statusCode: 302,
    body
  }),

  // 303 - SEE_OTHER
  seeOther: (body: any): type.ResponseHttpStatus => ({
    statusCode: 303,
    body
  }),

  // 304 - NOT_MODIFIED
  notModified: (body: any): type.ResponseHttpStatus => ({
    statusCode: 304,
    body
  }),

  // 305 - USE_PROXY
  useProxy: (body: any): type.ResponseHttpStatus => ({
    statusCode: 305,
    body
  }),

  // 307 - TEMPORARY_REDIRECT
  temporaryRedirect: (body: any): type.ResponseHttpStatus => ({
    statusCode: 307,
    body
  }),

  // 308 - PERMANENT_REDIRECT
  permanentRedirect: (body: any): type.ResponseHttpStatus => ({
    statusCode: 308,
    body
  }),

  // 400 - BAD_REQUEST
  badRequest: (body: any): type.ResponseHttpStatus => ({
    statusCode: 400,
    body
  }),

  // 401 - UNAUTHORIZED
  unauthorized: (body: any): type.ResponseHttpStatus => ({
    statusCode: 401,
    body
  }),

  // 402 - PAYMENT_REQUIRED
  paymentRequired: (body: any): type.ResponseHttpStatus => ({
    statusCode: 402,
    body
  }),

  // 403 - FORBIDDEN
  forbidden: (body: any): type.ResponseHttpStatus => ({
    statusCode: 403,
    body
  }),

  // 404 - NOT_FOUND
  notFound: (body: any): type.ResponseHttpStatus => ({
    statusCode: 404,
    body
  }),

  // 405 - METHOD_NOT_ALLOWED
  methodNotAllowed: (body: any): type.ResponseHttpStatus => ({
    statusCode: 405,
    body
  }),

  // 406 - NOT_ACCEPTABLE
  notAcceptable: (body: any): type.ResponseHttpStatus => ({
    statusCode: 406,
    body
  }),

  // 407 - PROXY_AUTHENTICATION_REQUIRED
  proxyAuthenticationRequired: (body: any): type.ResponseHttpStatus => ({
    statusCode: 407,
    body
  }),

  // 408 - REQUEST_TIMEOUT
  requestTimeout: (body: any): type.ResponseHttpStatus => ({
    statusCode: 408,
    body
  }),

  // 409 - CONFLICT
  conflict: (body: any): type.ResponseHttpStatus => ({
    statusCode: 409,
    body
  }),

  // 410 - GONE
  gone: (body: any): type.ResponseHttpStatus => ({
    statusCode: 410,
    body
  }),

  // 411 - LENGTH_REQUIRED
  lengthRequired: (body: any): type.ResponseHttpStatus => ({
    statusCode: 411,
    body
  }),

  // 412 - PRECONDITION_FAILED
  preconditionFailed: (body: any): type.ResponseHttpStatus => ({
    statusCode: 412,
    body
  }),

  // 413 - REQUEST_TOO_LONG
  requestTooLong: (body: any): type.ResponseHttpStatus => ({
    statusCode: 413,
    body
  }),

  // 414 - REQUEST_URI_TOO_LONG
  requestURITooLong: (body: any): type.ResponseHttpStatus => ({
    statusCode: 414,
    body
  }),

  // 415 - UNSUPPORTED_MEDIA_TYPE
  unsupportedMediaType: (body: any): type.ResponseHttpStatus => ({
    statusCode: 415,
    body
  }),

  // 416 - REQUESTED_RANGE_NOT_SATISFIABLE
  requestedRangeNotSatisfiable: (body: any): type.ResponseHttpStatus => ({
    statusCode: 416,
    body
  }),

  // 417 - EXPECTATION_FAILED
  expectationFailed: (body: any): type.ResponseHttpStatus => ({
    statusCode: 417,
    body
  }),

  // 418 - IM_A_TEAPOT
  imATeapot: (body: any): type.ResponseHttpStatus => ({
    statusCode: 418,
    body
  }),

  // 419 - INSUFFICIENT_SPACE_ON_RESOURCE
  insufficientSpaceOnResource: (body: any): type.ResponseHttpStatus => ({
    statusCode: 419,
    body
  }),

  // 420 - METHOD_FAILURE
  methodFailure: (body: any): type.ResponseHttpStatus => ({
    statusCode: 420,
    body
  }),

  // 421 - MISDIRECTED_REQUEST
  misdirectedRequest: (body: any): type.ResponseHttpStatus => ({
    statusCode: 421,
    body
  }),

  // 422 - UNPROCESSABLE_ENTITY
  unprocessableEntity: (body: any): type.ResponseHttpStatus => ({
    statusCode: 422,
    body
  }),

  // 423 - LOCKED
  locked: (body: any): type.ResponseHttpStatus => ({
    statusCode: 423,
    body
  }),

  // 424 - FAILED_DEPENDENCY
  failedDependency: (body: any): type.ResponseHttpStatus => ({
    statusCode: 424,
    body
  }),

  // 426 - UPGRADE_REQUIRED
  upgradeRequired: (body: any): type.ResponseHttpStatus => ({
    statusCode: 426,
    body
  }),

  // 428 - PRECONDITION_REQUIRED
  preconditionRequired: (body: any): type.ResponseHttpStatus => ({
    statusCode: 428,
    body
  }),

  // 429 - TOO_MANY_REQUESTS
  tooManyRequests: (body: any): type.ResponseHttpStatus => ({
    statusCode: 429,
    body
  }),

  // 431 - REQUEST_HEADER_FIELDS_TOO_LARGE
  requestHeaderFieldsTooLarge: (body: any): type.ResponseHttpStatus => ({
    statusCode: 431,
    body
  }),

  // 451 - UNAVAILABLE_FOR_LEGAL_REASONS
  unavailableForLegalReasons: (body: any): type.ResponseHttpStatus => ({
    statusCode: 451,
    body
  }),

  // 500 - INTERNAL_SERVER_ERROR
  internalServerError: (body: any): type.ResponseHttpStatus => ({
    statusCode: 500,
    body
  }),

  // 501 - NOT_IMPLEMENTED
  notImplemented: (body: any): type.ResponseHttpStatus => ({
    statusCode: 501,
    body
  }),

  // 502 - BAD_GATEWAY
  badGateway: (body: any): type.ResponseHttpStatus => ({
    statusCode: 502,
    body
  }),

  // 503 - SERVICE_UNAVAILABLE
  serviceUnavailable: (body: any): type.ResponseHttpStatus => ({
    statusCode: 503,
    body
  }),

  // 504 - GATEWAY_TIMEOUT
  gatewayTimeout: (body: any): type.ResponseHttpStatus => ({
    statusCode: 504,
    body
  }),

  // 505 - HTTP_VERSION_NOT_SUPPORTED
  httpVersionNotSupported: (body: any): type.ResponseHttpStatus => ({
    statusCode: 505,
    body
  }),

  // 507 - INSUFFICIENT_STORAGE
  insufficientStorage: (body: any): type.ResponseHttpStatus => ({
    statusCode: 507,
    body
  }),

  // 511 - NETWORK_AUTHENTICATION_REQUIRED
  networkAuthenticationRequired: (body: any): type.ResponseHttpStatus => ({
    statusCode: 511,
    body
  })
}
