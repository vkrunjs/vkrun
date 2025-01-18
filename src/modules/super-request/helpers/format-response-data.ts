import { isString } from '../../utils'

export const formatResponseData = (response: Record<string, any>): JSON | string => {
  if (response.req.method === 'HEAD') return ''

  const contentType = response.headers?.['content-type']

  if (isString(contentType) && contentType.includes('application/json')) {
    return JSON.parse(response.data)
  }

  return response.data
}
