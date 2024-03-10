import { configLogger } from './helpers/config-logger'
import { createLog } from './helpers/create-log'
import { sanitizeLogs } from './helpers/sanitize-logs'
import * as type from '../types'

export const createLogger = (configParams: type.SetConfigLogger): type.CreateLogger => {
  const config = configLogger()

  /* eslint-disable */
  for (const key in configParams) {
    if (key === 'size' && configParams?.size) {
      config.size = (1024 * 1024) * configParams.size
    } else {
      if (config.hasOwnProperty(key)) {
        // @ts-ignore
        config[key] = configParams[key]
      }
    }
  }
  /* eslint-enable */

  if (config.daysToStoreLogs > 0) {
    setInterval(() => { sanitizeLogs(config) }, config.daysToStoreLogs * 24 * 60 * 60 * 1000)
  }

  const middleware = (): (_request: type.Request, response: type.Response, next: type.NextFunction) => void => {
    return (_request: type.Request, response: type.Response, next: type.NextFunction) => {
      response.on('finish', () => {
        createLog({
          level: 'http',
          config,
          message: {
            request: {
              /* eslint-disable */
              // @ts-ignore
              requestId: response.req.requestId,
              /* eslint-enable */
              url: response.req.url,
              method: response.req.method,
              socket: {
                remoteAddress: response.req.socket.remoteAddress,
                remotePort: response.req.socket.remotePort
              },
              header: response.req.headers,
              /* eslint-disable */
              // @ts-expect-error
              body: response.req.body,
              // @ts-expect-error
              params: response.req.params,
              // @ts-expect-error
              query: response.req.query,
              // @ts-expect-error
              files: response.req.files
              /* eslint-enable */
            },
            response: {
              statusCode: response.statusCode,
              statusMessage: response.statusMessage,
              headers: response.getHeaders(),
              body: response._body
            }
          }
        })
      })

      next()
    }
  }

  return {
    error: (message: any): void => { createLog({ level: 'error', config, message }) },
    warn: (message: any): void => { createLog({ level: 'warn', config, message }) },
    info: (message: any): void => { createLog({ level: 'info', config, message }) },
    http: (message: any): void => { createLog({ level: 'http', config, message }) },
    verbose: (message: any): void => { createLog({ level: 'verbose', config, message }) },
    debug: (message: any): void => { createLog({ level: 'debug', config, message }) },
    silly: (message: any): void => { createLog({ level: 'silly', config, message }) },
    middleware
  }
}
