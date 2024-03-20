import { responseBadRequest } from '../response-bad-request'

describe('Session - Response Bad Request', () => {
  it('Should be able to response bad request with session bad request headers', () => {
    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      headers: {},
      data: undefined,
      end: (data: any) => {
        responseMock.data = data
        return responseMock
      }
    }

    responseBadRequest(responseMock)

    expect(responseMock.statusCode).toEqual(400)
    expect(responseMock.headers).toEqual({
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      Pragma: 'no-cache',
      Expires: '0',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'",
      'X-XSS-Protection': '1; mode=block',
      'Content-Type': 'text/plain'
    })
    expect(responseMock.data).toEqual('Invalid session ID')
  })
})
