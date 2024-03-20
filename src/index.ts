import { app } from './modules/app'
import { schema, setLocation } from './modules/schema'
import { createLogger } from './modules/logger'
import { Router } from './modules/router'
import { parseData } from './modules/parse-data'
import { cors } from './modules/cors'
import { rateLimit } from './modules/rate-limit'
import { Session } from './modules/session'
import { validateRouteData } from './modules/validate-route-data'
import { jwt } from './modules/jwt'
import { superRequest } from './modules/super-request'
export * from './modules/router/helpers/adapters'
export * from './modules/types'

export {
  app,
  cors,
  schema,
  setLocation,
  createLogger,
  Router,
  parseData,
  rateLimit,
  jwt,
  Session,
  validateRouteData,
  superRequest
}

export default app
