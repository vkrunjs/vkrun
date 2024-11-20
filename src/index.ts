import { App } from './modules/app'
import { schema, setLocation } from './modules/schema'
import { Logger } from './modules/logger'
import { Router } from './modules/router'
import { httpStatus } from './modules/router/helpers/http-status-handlers'
import { parseData } from './modules/parse-data'
import { cors } from './modules/cors'
import { rateLimit } from './modules/rate-limit'
import { jwt } from './modules/jwt'
import { superRequest } from './modules/super-request'
import { upload } from './modules/upload'
import { swaggerBuilder } from './modules/swagger-builder'
import { mime } from './modules/mime'
import { serveStaticFile } from './modules/serve-static-file'

export default App

export * from './modules/router/helpers/adapters'
export * from './modules/utils'
export * from './modules/types'

export {
  App,
  cors,
  schema,
  setLocation,
  Logger,
  Router,
  httpStatus,
  parseData,
  rateLimit,
  jwt,
  superRequest,
  upload,
  swaggerBuilder,
  mime,
  serveStaticFile
}
