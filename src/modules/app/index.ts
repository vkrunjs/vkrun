import * as http from 'http'
import { VkrunRouter } from '../router'
import { customResponse } from '../router/helpers/custom-response'
import * as type from '../types'

export const app = (): type.App => {
  let router: VkrunRouter
  const middlewares: any[] = []

  const server = (): type.CreateServer => {
    return http.createServer((request, _response) => {
      const response = customResponse(_response)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.handleRequest(request, response, middlewares)
    })
  }

  const use = (middleware: Record<string, any>): void => {
    if (middleware instanceof VkrunRouter) {
      router = middleware
    } else {
      middlewares.push(middleware)
    }
  }

  return { server, use }
}
