import { setCorsHeaders } from '../set-cors-headers'

describe('setCorsHeaders', () => {
  it('should set headers if origin is *', async () => {
    const requestMock: any = {
      headers: {
        'Content-Type': 'application/json',
        origin: 'http://localhost:4000'
      }
    }

    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      headers: {}
    }

    const options = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: undefined,
      exposedHeaders: undefined,
      credentials: undefined,
      maxAge: undefined
    }

    setCorsHeaders(requestMock, responseMock, options)

    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS'
    })
  })

  it('should set headers when origin is an array and matches request origin', () => {
    const requestMock: any = {
      headers: {
        'Content-Type': 'application/json',
        origin: 'http://localhost:4000'
      }
    }

    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      headers: {}
    }

    const options = {
      origin: ['http://localhost:3000', 'http://localhost:4000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: undefined,
      exposedHeaders: undefined,
      credentials: undefined,
      maxAge: undefined
    }

    setCorsHeaders(requestMock, responseMock, options)

    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': 'http://localhost:4000',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS'
    })
  })

  it('should set headers when origin is an array and does not match request origin', () => {
    const requestMock: any = {
      headers: {
        'Content-Type': 'application/json',
        origin: 'http://localhost:3999'
      }
    }

    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      headers: {}
    }

    const options = {
      origin: ['http://localhost:3000', 'http://localhost:4000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: undefined,
      exposedHeaders: undefined,
      credentials: undefined,
      maxAge: undefined
    }

    setCorsHeaders(requestMock, responseMock, options)

    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': 'http://localhost:3000, http://localhost:4000',
      'Content-Type': 'text/plain'
    })
  })

  it('should set headers when origin is not an array and matches request origin', () => {
    const requestMock: any = {
      headers: {
        'Content-Type': 'application/json',
        origin: 'http://localhost:3999'
      }
    }

    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      headers: {}
    }

    const options = {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: undefined,
      exposedHeaders: undefined,
      credentials: undefined,
      maxAge: undefined
    }

    setCorsHeaders(requestMock, responseMock, options)

    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'text/plain'
    })
  })

  it('should set headers when origin is not an array and does not match request origin', () => {
    const requestMock: any = {
      headers: {
        'Content-Type': 'application/json',
        origin: 'http://localhost:3999'
      }
    }

    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      headers: {}
    }

    const options = {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: undefined,
      exposedHeaders: undefined,
      credentials: undefined,
      maxAge: undefined
    }

    setCorsHeaders(requestMock, responseMock, options)

    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'text/plain'
    })
  })

  it('should set headers when methods is an array', () => {
    const requestMock: any = {
      headers: {
        'Content-Type': 'application/json',
        origin: 'http://localhost:3999'
      }
    }

    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      headers: {}
    }

    const options = {
      origin: '*',
      methods: ['GET', 'POST', 'PUT'],
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: undefined,
      exposedHeaders: undefined,
      credentials: undefined,
      maxAge: undefined
    }

    setCorsHeaders(requestMock, responseMock, options)

    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT'
    })
  })

  it('should set other headers correctly', () => {
    const requestMock: any = {
      method: 'OPTIONS'
    }

    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      headers: {}
    }

    const options = {
      origin: '*',
      methods: ['GET', 'POST', 'PUT'],
      preflightNext: false,
      allowedHeaders: 'X-Custom-Header',
      exposedHeaders: 'X-Another-Custom-Header',
      credentials: true,
      maxAge: 3600
    }

    setCorsHeaders(requestMock, responseMock, options)

    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT',
      'Access-Control-Expose-Headers': 'X-Another-Custom-Header',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '3600',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Length': '0'
    })
    expect(responseMock.statusCode).toEqual(204)
  })

  it('should set other headers correctly with successStatus', () => {
    const requestMock: any = {
      method: 'OPTIONS'
    }

    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      headers: {}
    }

    const options = {
      origin: '*',
      methods: ['GET', 'POST', 'PUT'],
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: 'X-Custom-Header',
      exposedHeaders: 'X-Another-Custom-Header',
      credentials: true,
      maxAge: 3600
    }

    setCorsHeaders(requestMock, responseMock, options)

    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT',
      'Access-Control-Expose-Headers': 'X-Another-Custom-Header',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '3600',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Length': '0'
    })
    expect(responseMock.statusCode).toEqual(204)
  })
})
