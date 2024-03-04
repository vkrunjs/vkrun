import * as type from '../../types'

export const controllerAdapter = (controller: type.Controller): any => {
  return (request: type.Request, response: type.Response) => {
    controller.handle(request, response)
  }
}
