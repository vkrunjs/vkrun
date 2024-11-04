import { Controller, Request, Response } from '../../../types'

export const controllerAdapter = (controller: Controller): any => {
  return async (request: Request, response: Response) => {
    await controller.handle(request, response)
  }
}
