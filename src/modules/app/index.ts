import * as http from 'http'
import { VkrunRouter } from '../router'
import { customResponse } from '../router/helpers/custom-response'
import * as type from '../types'

export const app = (): type.App => {
  let router: VkrunRouter
  const middlewares: any[] = []

  const server = (): type.CreateServer => {
    return http.createServer((request, response) => {
      const _response = customResponse(response)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.handleRequest(request, _response, middlewares)
    })
  }

  const serverMock = async (request: type.Request, response: type.Response): Promise<type.Response> => {
    const _response = customResponse(response)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await router.handleRequest(request, _response, middlewares)
    return response
  }

  const use = (middleware: Record<string, any>): void => {
    if (middleware instanceof VkrunRouter) {
      router = middleware
    } else {
      middlewares.push(middleware)
    }
  }

  return { server, use, serverMock }
}
