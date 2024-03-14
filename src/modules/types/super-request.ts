export interface SuperRequest {
  get: (path: any, options?: Record<string, any>) => Promise<SuperRequestCreateMethod>
  post: (path: any, data: Record<string, any>, options?: Record<string, any>) => Promise<SuperRequestCreateMethod>
  put: (path: any, data: Record<string, any>, options?: Record<string, any>) => Promise<SuperRequestCreateMethod>
  patch: (path: any, data: Record<string, any>, options?: Record<string, any>) => Promise<SuperRequestCreateMethod>
  delete: (path: any, options?: Record<string, any>) => Promise<SuperRequestCreateMethod>
  head: (path: any, options?: Record<string, any>) => Promise<SuperRequestCreateMethod>
  options: (path: any, options?: Record<string, any>) => Promise<SuperRequestCreateMethod>
}

export interface SuperRequestCreateMethod {
  statusCode: number
  headers: Record<string, string>
  data: any
  statusText: string
}
