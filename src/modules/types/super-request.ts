export interface SuperRequest {
  get: (path: any, options?: Record<string, any>) => Promise<SuperRequestSuccess>;
  post: (path: any, data?: Record<string, any> | string, options?: Record<string, any>) => Promise<SuperRequestSuccess>;
  put: (path: any, data?: Record<string, any> | string, options?: Record<string, any>) => Promise<SuperRequestSuccess>;
  patch: (path: any, data?: Record<string, any> | string, options?: Record<string, any>) => Promise<SuperRequestSuccess>;
  delete: (path: any, options?: Record<string, any>) => Promise<SuperRequestSuccess>;
  head: (path: any, options?: Record<string, any>) => Promise<SuperRequestSuccess>;
  options: (path: any, options?: Record<string, any>) => Promise<SuperRequestSuccess>;
}

export interface SuperRequestSuccess {
  statusCode: number;
  statusMessage: string;
  headers: Record<string, string>;
  data: any;
}

export interface SuperRequestError {
  response: SuperRequestSuccess;
}
