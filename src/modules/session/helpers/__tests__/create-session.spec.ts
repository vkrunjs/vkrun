import { createSession } from '../create-session'
import { generateSecretKey } from '../generate-secret-key'
import * as util from '../../../utils'

describe('Session - Create Session', () => {
  it('Should be able to create session', () => {
    const requestMock: any = {
      socket: { remoteAddress: '127.0.0.1', remoteFamily: 'IPV6' },
      headers: { 'user-agent': 'MockRequest' }
    }
    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      setCookie: (name: string, value: string, options?: any) => {
        const cookie = `${name}=${value}`
        responseMock.setHeader('Set-Cookie', cookie)
      },
      headers: {}
    }

    const sessionId = '123'
    const secretKey = generateSecretKey()
    const data = { userId: 123, email: 'any@mail.com' }

    const sut = createSession({
      request: requestMock,
      response: responseMock,
      sessionId,
      data,
      options: {},
      secretKey,
      expiresIn: '15m'
    })

    expect(util.isNumber(sut.createdAt)).toBeTruthy()
    expect(sut.expiresIn).toEqual(900000)
    expect(sut.remoteAddress).toEqual('127.0.0.1')
    expect(sut.remoteFamily).toEqual('IPV6')
    expect(sut.userAgent).toEqual('MockRequest')
    expect(util.isString(sut.token)).toBeTruthy()
  })

  it('Should be able to create session with undefined remoteAddress, remoteFamily and user agent', () => {
    const requestMock: any = {
      socket: {},
      headers: {}
    }
    const responseMock: any = {
      setHeader: (name: string, value: string) => {
        responseMock.headers[name] = value
      },
      setCookie: (name: string, value: string, options?: any) => {
        const cookie = `${name}=${value}`
        responseMock.setHeader('Set-Cookie', cookie)
      },
      headers: {}
    }

    const sessionId = '123'
    const secretKey = generateSecretKey()
    const data = { userId: 123, email: 'any@mail.com' }

    const sut = createSession({
      request: requestMock,
      response: responseMock,
      sessionId,
      data,
      options: {},
      secretKey,
      expiresIn: '15m'
    })

    expect(util.isNumber(sut.createdAt)).toBeTruthy()
    expect(sut.expiresIn).toEqual(900000)
    expect(sut.remoteAddress).toEqual(undefined)
    expect(sut.remoteFamily).toEqual(undefined)
    expect(sut.userAgent).toEqual(undefined)
    expect(util.isString(sut.token)).toBeTruthy()
  })
})
