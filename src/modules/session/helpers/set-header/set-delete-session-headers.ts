import * as type from '../../../types'

export const setDeleteSessionHeaders = (response: type.Response): void => {
  response.clearCookie('session-id')
  response.clearCookie('session-toke')
}
