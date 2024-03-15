import * as http from 'http'
import { VkrunRouter } from '../router'
import { customResponse } from '../router/helpers/custom-response'
import * as type from '../types'

export const app = (): type.App => {
  let instance: 'server' | 'serverMock' | 'closed' | undefined
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
  }

  const server = (): type.CreateServer => {
    if (instance === 'closed') {
      throw new Error('vkrun-app: app server is closed.')
    } else if (instance === 'server' || instance === 'serverMock') {
      throw new Error('vkrun-app: app server is already instantiated.')
    }
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

  const serverMock = async (request: type.Request, response: type.Response): Promise<type.Response> => {
    if (instance === 'closed') throw new Error('vkrun-app: app server is closed.')
    instance = 'serverMock'
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
    if (instance === 'server') {
      createdServer.close()
    } else {
      createdServer = null
    }
    timers.forEach(timerId => clearTimeout(timerId))
    timers = []
    instance = 'closed'
  }

  return { server, use, serverMock, close, setTimer, clearTimers }
}
