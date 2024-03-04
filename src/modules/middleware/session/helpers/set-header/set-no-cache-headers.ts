import * as type from '../../../../types'

export const setNoCacheHeaders = (response: type.Response): void => {
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  response.setHeader('Pragma', 'no-cache')
  response.setHeader('Expires', '0')
}
