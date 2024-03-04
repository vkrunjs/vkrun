import { app } from './modules/app'
import { schema, setLocation } from './modules/schema'
import { createLogger } from './modules/logger'
import { Router } from './modules/router'
import {
  parseData,
  cors,
  rateLimit,
  Session,
  validateRouteData
} from './modules/middleware'
import { jwt } from './modules/jwt'
export * from './modules/router/adapters'
export * from './modules/types'

export default app
export {
  cors,
  schema,
  setLocation,
  createLogger,
  Router,
  parseData,
  rateLimit,
  jwt,
  Session,
  validateRouteData
}
