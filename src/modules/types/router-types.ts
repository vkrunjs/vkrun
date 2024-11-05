import { IncomingMessage, ServerResponse } from 'http'

export interface VkrunRouter {
  get: (path: string, ...handlers: any) => void
  post: (path: string, ...handlers: any) => void
  put: (path: string, ...handlers: any) => void
  patch: (path: string, ...handlers: any) => void
  delete: (path: string, ...handlers: any) => void
  head: (path: string, ...handlers: any) => void
  options: (path: string, ...handlers: any) => void
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface Request<T = any> extends IncomingMessage {
  requestId?: string
  route?: Route
  body: T extends { body: infer B } ? B : Record<string, string | number | boolean | Date> | JSON | string | undefined | any
  params: T extends { params: infer P } ? P : Record<string, string | number | boolean | Date> | undefined
  query: T extends { query: infer Q } ? Q : Record<string, string | number | boolean | Date> | undefined
  session?: any
  files: T extends { files: infer F } ? F : RouterFile[]
  setTimer: (callback: () => void, ms: number) => NodeJS.Timeout
}

export type Response = ServerResponse & RouterCustomResponseMethods

export interface RouterCustomResponseMethods {
  status: (status: number) => Response
  json: (data: object) => Response
  send: (data: any) => Response
  setCookie: (name: string, value: string, options?: RouterCookieOptions) => Response
  clearCookie: (name: string) => Response
  _body: any
}

export interface RouterCookieOptions {
  httpOnly?: boolean
  secure?: boolean
  expires?: string
  maxAge?: string | number
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None'
  domain?: string
  priority?: 'Low' | 'Medium' | 'High'
}

export interface RouterMemoryFile {
  fieldName: string
  filename: string
  extension: string
  mimetype: string
  buffer: Buffer
  size: number
}

export interface RouterStorageFile {
  fieldName: string
  originalName: string
  filename: string
  extension: string
  mimetype: string
  size: number
  destination: string
  path: string
}

export type RouterFile = RouterMemoryFile | RouterStorageFile

export interface ErrorHandlerMiddleware {
  handle: (error: any, request: Request, response: Response) => any
}

export interface Middleware {
  handle: (request: Request, response: Response, next: NextFunction) => any
}

export interface Controller {
  handle: (request: Request, response: Response) => any
}

export type RouterSendParam = ((cb?: () => void) => void) & ((chunk: any, cb?: () => void) => void) & ((chunk: any, encoding: BufferEncoding, cb?: () => void) => void)

export type NextFunction = () => void

export type RouteHandler = (req: Request, res: Response, next?: NextFunction) => void

export type RouteMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'

export interface Route {
  path: string
  method: RouteMethods
  handlers: RouteHandler[]
}

export interface ResponseHttpStatus {
  statusCode: number
  content: any
}
