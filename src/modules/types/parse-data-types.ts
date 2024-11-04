import { NextFunction, Request, Response } from './router-types'

export interface VkrunParseData {
  handle: (request: Request, response: Response, next: NextFunction) => Promise<void>
}

export interface ParseDataConfig {
  urlencoded?: boolean
  params?: boolean
  query?: boolean
  json?: boolean
  formData?: boolean
  escapeSQL?: boolean
}
