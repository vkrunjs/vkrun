import * as http from 'http'
import { VkrunRouter } from '../router'
import { customResponse } from '../router/helpers/custom-response'
import * as type from '../types'
import { loggerSanitizeInterval } from '../logger'

export const app = (): type.App => {
  let instance: 'server' | '_reqWithoutServer' | 'closed' | undefined
  let router: VkrunRouter
  const middlewares: any[] = []
  let createdServer: any
  let timers: any[] = []

  const setTimer = (callback: () => void, ms: number): NodeJS.Timeout => {
    const timeout = setTimeout(callback, ms)
    timers.push(timeout)
    return timeout
  }

  const clearTimers = (): void => {
    timers.forEach(timerId => clearTimeout(timerId))
    timers = []
    if (loggerSanitizeInterval) clearInterval(loggerSanitizeInterval)
  }

  const server = (): type.CreateServer => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    createdServer = http.createServer(async (request, response) => {
      instance = 'server'
      const _request = request as type.Request
      _request.setTimer = setTimer
      const _response = customResponse(response)
      await router.handleRequest(_request, _response, middlewares)
    })

    return createdServer
  }

  const _reqWithoutServer = async (request: type.Request, response: type.Response): Promise<type.Response> => {
    instance = '_reqWithoutServer'
    const _request = request
    _request.setTimer = setTimer
    createdServer = customResponse(response)
    await router.handleRequest(request, createdServer, middlewares)
    return createdServer
  }

  const use = (middleware: Record<string, any>): void => {
    if (middleware instanceof VkrunRouter) {
      router = middleware
    } else {
      middlewares.push(middleware)
    }
  }

  const close = (): void => {
    if (instance === 'server') createdServer.close()
    createdServer = null
    clearTimers()
    instance = 'closed'
  }

  return { server, use, _reqWithoutServer, close, setTimer, clearTimers }
}
