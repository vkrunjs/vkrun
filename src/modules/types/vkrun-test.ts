export interface VkrunTest {
  get: (path: any, options?: Record<string, any>) => Promise<VkrunTestCreateMethod>
  post: (path: any, data: Record<string, any>, options?: Record<string, any>) => Promise<VkrunTestCreateMethod>
  put: (path: any, data: Record<string, any>, options?: Record<string, any>) => Promise<VkrunTestCreateMethod>
  patch: (path: any, data: Record<string, any>, options?: Record<string, any>) => Promise<VkrunTestCreateMethod>
  delete: (path: any, options?: Record<string, any>) => Promise<VkrunTestCreateMethod>
  head: (path: any, options?: Record<string, any>) => Promise<VkrunTestCreateMethod>
  options: (path: any, options?: Record<string, any>) => Promise<VkrunTestCreateMethod>
}

export interface VkrunTestCreateMethod {
  statusCode: number
  headers: Record<string, string>
  data: any
  statusText: string
}
