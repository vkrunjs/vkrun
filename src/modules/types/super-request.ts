export interface SuperRequest {
  get: (path: any, options?: Record<string, any>) => Promise<SuperRequestMethod>
  post: (path: any, data: Record<string, any> | string, options?: Record<string, any>) => Promise<SuperRequestMethod>
  put: (path: any, data: Record<string, any> | string, options?: Record<string, any>) => Promise<SuperRequestMethod>
  patch: (path: any, data: Record<string, any> | string, options?: Record<string, any>) => Promise<SuperRequestMethod>
  delete: (path: any, options?: Record<string, any>) => Promise<SuperRequestMethod>
  head: (path: any, options?: Record<string, any>) => Promise<SuperRequestMethod>
  options: (path: any, options?: Record<string, any>) => Promise<SuperRequestMethod>
}

export interface SuperRequestMethod {
  statusCode: number
  statusMessage: string
  headers: Record<string, string>
  data: any
}
