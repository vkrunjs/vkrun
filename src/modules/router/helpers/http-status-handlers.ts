import { ResponseHttpStatus } from '../../types'

export const httpStatus = {
  // 100 - CONTINUE
  continue: (content: any): ResponseHttpStatus => ({
    statusCode: 100,
    content
  }),

  // 101 - SWITCHING_PROTOCOLS
  switchingProtocols: (content: any): ResponseHttpStatus => ({
    statusCode: 101,
    content
  }),

  // 200 - OK
  ok: (content: any): ResponseHttpStatus => ({
    statusCode: 200,
    content
  }),

  // 201 - CREATED
  created: (content: any): ResponseHttpStatus => ({
    statusCode: 201,
    content
  }),

  // 202 - ACCEPTED
  accepted: (content: any): ResponseHttpStatus => ({
    statusCode: 202,
    content
  }),

  // 203 - NON_AUTHORITATIVE_INFORMATION
  nonAuthoritativeInformation: (content: any): ResponseHttpStatus => ({
    statusCode: 203,
    content
  }),

  // 204 - NO_CONTENT
  noContent: (content: any): ResponseHttpStatus => ({
    statusCode: 204,
    content
  }),

  // 205 - RESET_CONTENT
  resetContent: (content: any): ResponseHttpStatus => ({
    statusCode: 205,
    content
  }),

  // 206 - PARTIAL_CONTENT
  partialContent: (content: any): ResponseHttpStatus => ({
    statusCode: 206,
    content
  }),

  // 300 - MULTIPLE_CHOICES
  multipleChoices: (content: any): ResponseHttpStatus => ({
    statusCode: 300,
    content
  }),

  // 301 - MOVED_PERMANENTLY
  movedPermanently: (content: any): ResponseHttpStatus => ({
    statusCode: 301,
    content
  }),

  // 302 - MOVED_TEMPORARILY
  movedTemporarily: (content: any): ResponseHttpStatus => ({
    statusCode: 302,
    content
  }),

  // 303 - SEE_OTHER
  seeOther: (content: any): ResponseHttpStatus => ({
    statusCode: 303,
    content
  }),

  // 304 - NOT_MODIFIED
  notModified: (content: any): ResponseHttpStatus => ({
    statusCode: 304,
    content
  }),

  // 305 - USE_PROXY
  useProxy: (content: any): ResponseHttpStatus => ({
    statusCode: 305,
    content
  }),

  // 307 - TEMPORARY_REDIRECT
  temporaryRedirect: (content: any): ResponseHttpStatus => ({
    statusCode: 307,
    content
  }),

  // 308 - PERMANENT_REDIRECT
  permanentRedirect: (content: any): ResponseHttpStatus => ({
    statusCode: 308,
    content
  }),

  // 400 - BAD_REQUEST
  badRequest: (content: any): ResponseHttpStatus => ({
    statusCode: 400,
    content
  }),

  // 401 - UNAUTHORIZED
  unauthorized: (content: any): ResponseHttpStatus => ({
    statusCode: 401,
    content
  }),

  // 402 - PAYMENT_REQUIRED
  paymentRequired: (content: any): ResponseHttpStatus => ({
    statusCode: 402,
    content
  }),

  // 403 - FORBIDDEN
  forbidden: (content: any): ResponseHttpStatus => ({
    statusCode: 403,
    content
  }),

  // 404 - NOT_FOUND
  notFound: (content: any): ResponseHttpStatus => ({
    statusCode: 404,
    content
  }),

  // 405 - METHOD_NOT_ALLOWED
  methodNotAllowed: (content: any): ResponseHttpStatus => ({
    statusCode: 405,
    content
  }),

  // 406 - NOT_ACCEPTABLE
  notAcceptable: (content: any): ResponseHttpStatus => ({
    statusCode: 406,
    content
  }),

  // 407 - PROXY_AUTHENTICATION_REQUIRED
  proxyAuthenticationRequired: (content: any): ResponseHttpStatus => ({
    statusCode: 407,
    content
  }),

  // 408 - REQUEST_TIMEOUT
  requestTimeout: (content: any): ResponseHttpStatus => ({
    statusCode: 408,
    content
  }),

  // 409 - CONFLICT
  conflict: (content: any): ResponseHttpStatus => ({
    statusCode: 409,
    content
  }),

  // 410 - GONE
  gone: (content: any): ResponseHttpStatus => ({
    statusCode: 410,
    content
  }),

  // 411 - LENGTH_REQUIRED
  lengthRequired: (content: any): ResponseHttpStatus => ({
    statusCode: 411,
    content
  }),

  // 412 - PRECONDITION_FAILED
  preconditionFailed: (content: any): ResponseHttpStatus => ({
    statusCode: 412,
    content
  }),

  // 413 - REQUEST_TOO_LONG
  requestTooLong: (content: any): ResponseHttpStatus => ({
    statusCode: 413,
    content
  }),

  // 414 - REQUEST_URI_TOO_LONG
  requestURITooLong: (content: any): ResponseHttpStatus => ({
    statusCode: 414,
    content
  }),

  // 415 - UNSUPPORTED_MEDIA_TYPE
  unsupportedMediaType: (content: any): ResponseHttpStatus => ({
    statusCode: 415,
    content
  }),

  // 416 - REQUESTED_RANGE_NOT_SATISFIABLE
  requestedRangeNotSatisfiable: (content: any): ResponseHttpStatus => ({
    statusCode: 416,
    content
  }),

  // 417 - EXPECTATION_FAILED
  expectationFailed: (content: any): ResponseHttpStatus => ({
    statusCode: 417,
    content
  }),

  // 418 - IM_A_TEAPOT
  imATeapot: (content: any): ResponseHttpStatus => ({
    statusCode: 418,
    content
  }),

  // 419 - INSUFFICIENT_SPACE_ON_RESOURCE
  insufficientSpaceOnResource: (content: any): ResponseHttpStatus => ({
    statusCode: 419,
    content
  }),

  // 420 - METHOD_FAILURE
  methodFailure: (content: any): ResponseHttpStatus => ({
    statusCode: 420,
    content
  }),

  // 421 - MISDIRECTED_REQUEST
  misdirectedRequest: (content: any): ResponseHttpStatus => ({
    statusCode: 421,
    content
  }),

  // 422 - UNPROCESSABLE_ENTITY
  unprocessableEntity: (content: any): ResponseHttpStatus => ({
    statusCode: 422,
    content
  }),

  // 423 - LOCKED
  locked: (content: any): ResponseHttpStatus => ({
    statusCode: 423,
    content
  }),

  // 424 - FAILED_DEPENDENCY
  failedDependency: (content: any): ResponseHttpStatus => ({
    statusCode: 424,
    content
  }),

  // 426 - UPGRADE_REQUIRED
  upgradeRequired: (content: any): ResponseHttpStatus => ({
    statusCode: 426,
    content
  }),

  // 428 - PRECONDITION_REQUIRED
  preconditionRequired: (content: any): ResponseHttpStatus => ({
    statusCode: 428,
    content
  }),

  // 429 - TOO_MANY_REQUESTS
  tooManyRequests: (content: any): ResponseHttpStatus => ({
    statusCode: 429,
    content
  }),

  // 431 - REQUEST_HEADER_FIELDS_TOO_LARGE
  requestHeaderFieldsTooLarge: (content: any): ResponseHttpStatus => ({
    statusCode: 431,
    content
  }),

  // 451 - UNAVAILABLE_FOR_LEGAL_REASONS
  unavailableForLegalReasons: (content: any): ResponseHttpStatus => ({
    statusCode: 451,
    content
  }),

  // 500 - INTERNAL_SERVER_ERROR
  internalServerError: (content: any): ResponseHttpStatus => ({
    statusCode: 500,
    content
  }),

  // 501 - NOT_IMPLEMENTED
  notImplemented: (content: any): ResponseHttpStatus => ({
    statusCode: 501,
    content
  }),

  // 502 - BAD_GATEWAY
  badGateway: (content: any): ResponseHttpStatus => ({
    statusCode: 502,
    content
  }),

  // 503 - SERVICE_UNAVAILABLE
  serviceUnavailable: (content: any): ResponseHttpStatus => ({
    statusCode: 503,
    content
  }),

  // 504 - GATEWAY_TIMEOUT
  gatewayTimeout: (content: any): ResponseHttpStatus => ({
    statusCode: 504,
    content
  }),

  // 505 - HTTP_VERSION_NOT_SUPPORTED
  httpVersionNotSupported: (content: any): ResponseHttpStatus => ({
    statusCode: 505,
    content
  }),

  // 507 - INSUFFICIENT_STORAGE
  insufficientStorage: (content: any): ResponseHttpStatus => ({
    statusCode: 507,
    content
  }),

  // 511 - NETWORK_AUTHENTICATION_REQUIRED
  networkAuthenticationRequired: (content: any): ResponseHttpStatus => ({
    statusCode: 511,
    content
  })
}
