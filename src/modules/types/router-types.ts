import { IncomingMessage, ServerResponse } from 'http'

export interface VkrunRouter {
  get: (path: string, ...handlers: any) => void
  post: (path: string, ...handlers: any) => void
  put: (path: string, ...handlers: any) => void
  patch: (path: string, ...handlers: any) => void
  delete: (path: string, ...handlers: any) => void
  options: (path: string, ...handlers: any) => void
}

export interface Request<
  Body = Record<string, string | number | boolean | Date> | JSON | string | undefined | any,
  Params = Record<string, string | number | boolean | Date> | undefined,
  Query = Record<string, string | number | boolean | Date> | undefined,
  Files = File[] | undefined
> extends IncomingMessage {
  requestId?: string
  route?: Route
  body: Body
  params: Params
  query: Query
  session?: any
  files: Files
  setTimer: (callback: () => void, ms: number) => NodeJS.Timeout
}

export type Response = ServerResponse & CustomResponseMethods

export interface CustomResponseMethods {
  status: (status: number) => Response
  json: (data: object) => void
  send: (data: any) => void
  setCookie: (name: string, value: string, options?: CookieOptions) => void
  clearCookie: (name: string) => void
  _body: any
}

export interface CookieOptions {
  httpOnly?: boolean
  secure?: boolean
  expires?: string
  maxAge?: string | number
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None'
  domain?: string
  priority?: 'Low' | 'Medium' | 'High'
}

export interface MemoryFile {
  filename: string
  extension: string
  mimetype: string
  buffer: Buffer
}

export interface StorageFile {
  filename: string
  extension: string
  mimetype: string
  size: number
  destination: string
  path: string
}

export type File = MemoryFile | StorageFile

export interface ErrorHandlerMiddleware {
  handle: (error: any, request: Request, response: Response, next: NextFunction) => any
}

export interface Middleware {
  handle: (request: Request, response: Response, next: NextFunction) => any
}

export interface Controller {
  handle: (request: Request, response: Response) => any
}

export type SendParam = ((cb?: () => void) => void) & ((chunk: any, cb?: () => void) => void) & ((chunk: any, encoding: BufferEncoding, cb?: () => void) => void)

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
  body: any
}
