import * as type from '../../../types'

export const controllerAdapter = (controller: type.Controller): any => {
  return async (request: type.Request, response: type.Response) => {
    await controller.handle(request, response)
  }
}
