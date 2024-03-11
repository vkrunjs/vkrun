import { cors, VkrunCors } from '..'
import * as type from '../../types'

describe('cors', () => {
  it('Should create a CORS with default options', () => {
    const requestMock: any = {
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    }

    const responseMock: any = {
      headers: {},
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      end: jest.fn()
    }

    const nextMock: any = jest.fn()

    const vkrunCors = cors()
    vkrunCors.handle(requestMock, responseMock, nextMock)

    expect(vkrunCors).toBeInstanceOf(VkrunCors)
    expect(responseMock.end).not.toHaveBeenCalled()
    expect(nextMock).toHaveBeenCalled()
    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS'
    })
    expect(responseMock.statusCode).toEqual(undefined)
  })

  it('Should create a CORS with origin options not is *', () => {
    const requestMock: any = {
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    }

    const responseMock: any = {
      headers: {},
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      end: jest.fn()
    }

    const nextMock: any = jest.fn()

    const options: type.SetCorsOptions = {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: 'Content-Type, Authorization',
      exposedHeaders: 'X-Another-Custom-Header',
      credentials: true,
      maxAge: 3600
    }

    const vkrunCors = cors(options)
    vkrunCors.handle(requestMock, responseMock, nextMock)

    expect(vkrunCors).toBeInstanceOf(VkrunCors)
    expect(responseMock.end).not.toHaveBeenCalled()
    expect(nextMock).toHaveBeenCalled()
    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      'Access-Control-Expose-Headers': 'X-Another-Custom-Header',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '3600'
    })
    expect(responseMock.statusCode).toEqual(undefined)
  })

  it('Should return response.end() if origin header is not found in array', () => {
    const requestMock: any = {
      method: 'GET',
      headers: {
        origin: 'http://localhost:4000',
        'Content-Type': 'application/json'
      }
    }

    const responseMock: any = {
      headers: {},
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      end: jest.fn()
    }

    const nextMock: any = jest.fn()

    const options: type.SetCorsOptions = {
      origin: ['http://localhost:3000', 'http://localhost:5000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: 'Content-Type, Authorization',
      exposedHeaders: 'X-Another-Custom-Header',
      credentials: true,
      maxAge: 3600
    }

    const vkrunCors = cors(options)
    vkrunCors.handle(requestMock, responseMock, nextMock)

    expect(responseMock.end).toHaveBeenCalled()
    expect(nextMock).not.toHaveBeenCalled()
    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': 'http://localhost:3000, http://localhost:5000',
      'Content-Type': 'text/plain'
    })
    expect(responseMock.statusCode).toEqual(403)
  })

  it('Should return response.end() if origin header does not match single origin', () => {
    const requestMock: any = {
      method: 'GET',
      headers: {
        origin: 'http://localhost:4000',
        'Content-Type': 'application/json'
      }
    }

    const responseMock: any = {
      headers: {},
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      end: jest.fn()
    }

    const nextMock: any = jest.fn()

    const options: type.SetCorsOptions = {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: 'Content-Type, Authorization',
      exposedHeaders: 'X-Another-Custom-Header',
      credentials: true,
      maxAge: 3600
    }

    const vkrunCors = cors(options)
    vkrunCors.handle(requestMock, responseMock, nextMock)

    expect(responseMock.end).toHaveBeenCalled()
    expect(nextMock).not.toHaveBeenCalled()
    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'text/plain'
    })
    expect(responseMock.statusCode).toEqual(403)
  })

  it('Should call next() if preflightNext is true', () => {
    const requestMock: any = {
      method: 'OPTIONS',
      headers: {
        origin: 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    }

    const responseMock: any = {
      headers: {},
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      end: jest.fn()
    }

    const nextMock: any = jest.fn()

    const options: type.SetCorsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: true,
      successStatus: 204,
      allowedHeaders: 'Content-Type, Authorization',
      exposedHeaders: 'X-Another-Custom-Header',
      credentials: true,
      maxAge: 3600
    }

    const vkrunCors = cors(options)
    vkrunCors.handle(requestMock, responseMock, nextMock)

    expect(responseMock.end).not.toHaveBeenCalled()
    expect(nextMock).toHaveBeenCalled()
    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': 'X-Another-Custom-Header',
      'Access-Control-Max-Age': '3600',
      'Content-Length': '0'
    })
    expect(responseMock.statusCode).toEqual(204)
  })

  it('Should call response.end() if preflightNext is false', () => {
    const requestMock: any = {
      method: 'OPTIONS',
      headers: {
        origin: 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    }

    const responseMock: any = {
      headers: {},
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      end: jest.fn()
    }

    const nextMock: any = jest.fn()

    const options: type.SetCorsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: 'Content-Type, Authorization',
      exposedHeaders: 'X-Another-Custom-Header',
      credentials: true,
      maxAge: 3600
    }

    const vkrunCors = cors(options)
    vkrunCors.handle(requestMock, responseMock, nextMock)

    expect(responseMock.end).toHaveBeenCalled()
    expect(nextMock).not.toHaveBeenCalled()
    expect(responseMock.headers).toEqual({
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': 'X-Another-Custom-Header',
      'Access-Control-Max-Age': '3600',
      'Content-Length': '0'
    })
    expect(responseMock.statusCode).toEqual(204)
  })
})
