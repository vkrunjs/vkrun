export const formatResponseData = (response: Record<string, any>): JSON | string => {
  if (response.req.method === 'HEAD') return ''
  if (response.headers && response.headers['content-type'] === 'application/json') {
    return JSON.parse(response.data)
  } else return response.data
}
