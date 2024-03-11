import * as type from '../../types'

export const executeMiddleware = async (
  middleware: any,
  request: type.Request,
  response: type.Response,
  nextMiddleware: () => void
): Promise<void> => {
  if (typeof middleware?.handle === 'function' && middleware?.handle.length === 3) {
    await middleware.handle(request, response, nextMiddleware)
  } else if (typeof middleware === 'function' && middleware?.length === 3) {
    await middleware(request, response, nextMiddleware)
  } else {
    throw new Error('vkrun-router: method use received invalid middleware.')
  }
}
