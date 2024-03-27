import * as v from '../../../index'
import { generateSecretKey } from '../helpers'

const secretKey = generateSecretKey()
const session = v.Session({ secretKey, sanitizationEvery: '5m' })
const router = v.Router()

class ExampleController implements v.Controller {
  public handle (request: v.Request, response: v.Response): any {
    response.status(200).json({ session: request.session })
  }
}

router.post('/session',
  session.create({ userId: 123, email: 'any@mail.com' }, { expiresIn: '15m' }),
  v.controllerAdapter(new ExampleController())
)

router.post('/protect', session.protect(), v.controllerAdapter(new ExampleController()))

describe('Session', () => {
  let cookie: string
  let sessionId: string
  let sessionToken: string

  const getCookies = (response: any): void => {
    const setCookie = response.headers['set-cookie']

    setCookie.forEach((cookie: string) => {
      if (cookie.startsWith('session-id=')) {
        sessionId = cookie.split('=')[1].split(';')[0]
      } else if (cookie.startsWith('session-token=')) {
        sessionToken = cookie.split('=')[1].split(';')[0]
      }
    })
    cookie = `session-id=${sessionId};session-token=${sessionToken}`
  }

  const validateSessionSuccess = (response: any): void => {
    expect(response.statusCode).toEqual(200)
    expect(response.statusMessage).toEqual('OK')
    expect(Object.keys(response.headers).length).toEqual(10)
    expect(response.headers['content-security-policy']).toEqual("default-src 'self'; script-src 'self' 'unsafe-inline'")
    expect(response.headers['cache-control']).toEqual('no-store, no-cache, must-revalidate')
    expect(response.headers.expires).toEqual('0')
    expect(response.headers['x-xss-protection']).toEqual('1; mode=block')
    const arrCookies = response.headers['set-cookie'] as string[]
    expect(arrCookies.length).toEqual(2)
    expect(arrCookies[0].startsWith('session-id=')).toBeTruthy()
    expect(arrCookies[1].startsWith('session-token=')).toBeTruthy()
    expect(response.headers['content-type']).toEqual('application/json')
    expect(response.headers.connection).toEqual('close')
    expect(response.headers['content-length']).toEqual('2')
    expect(typeof sessionId).toEqual('string')
    expect(v.isUUID(sessionId)).toBeTruthy()
    expect(typeof sessionToken).toEqual('string')
    expect(response.data).toEqual({})
  }

  const validateSessionUnauthorized = (error: v.SuperRequestError): void => {
    expect(error.response.statusCode).toEqual(401)
    expect(error.response.statusMessage).toEqual('Unauthorized')
    expect(Object.keys(error.response.headers).length).toEqual(13)
    expect(v.isUUID(error.response.headers['request-id'])).toBeTruthy()
    expect(error.response.headers['cache-control']).toEqual('no-store, no-cache, must-revalidate, private')
    expect(error.response.headers.pragma).toEqual('no-cache')
    expect(error.response.headers.expires).toEqual('0')
    expect(error.response.headers['x-content-type-options']).toEqual('nosniff')
    expect(error.response.headers['x-frame-options']).toEqual('DENY')
    expect(error.response.headers['content-security-policy']).toEqual("default-src 'self'")
    expect(error.response.headers['x-xss-protection']).toEqual('1; mode=block')
    expect(error.response.headers['content-type']).toEqual('text/plain')
    expect(error.response.headers['set-cookie']).toEqual([
      'session-id=; HttpOnly=true; Max-Age=0; Path=/; Secure=true; SameSite=Strict; Priority=High; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'session-token=; HttpOnly=true; Max-Age=0; Path=/; Secure=true; SameSite=Strict; Priority=High; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    ])
    expect(v.isString(error.response.headers.date)).toBeTruthy()
    expect(error.response.headers.connection).toEqual('close')
    expect(error.response.headers['content-length']).toEqual('12')
    expect(error.response.data).toEqual('Unauthorized')
  }

  const validateProtectSuccess = (response: any): void => {
    expect(response.statusCode).toEqual(200)
    expect(response.statusMessage).toEqual('OK')
    expect(Object.keys(response.headers).length).toEqual(5)
    expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
    expect(response.headers['content-type']).toEqual('application/json')
    expect(v.isString(response.headers.date)).toBeTruthy()
    expect(response.headers.connection).toEqual('close')
    expect(response.headers['content-length']).toEqual('49')
    expect(response.data).toEqual({
      session: { userId: 123, email: 'any@mail.com' }
    })
  }

  it('Should be able to create session', async () => {
    const app = v.App()
    app.use(router)

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
    })

    app.close()
  })

  it('throw new Error when secret key is invalid', async () => {
    try {
      const router = v.Router()
      const session = v.Session({ secretKey: '123' })
      router.post('/session',
        session.create({ userId: 123, email: 'any@mail.com' }, { expiresIn: '15m' })
      )
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-session: the secret keys must be strings of 64 characters representing 32 bytes.')
    }
  })

  it('Should be able to access a protected route with correct headers', async () => {
    const app = v.App()
    app.use(router)

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
    })

    await v.superRequest(app).post('/protect', {}, {
      headers: { cookie }
    }).then((response) => {
      validateProtectSuccess(response)
    })

    app.close()
  })

  it('return unauthorized when session token is invalid', async () => {
    const app = v.App()
    app.use(router)

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
    })

    await v.superRequest(app).post('/protect', {}, {
      headers: { cookie: `session-id=${sessionId}; session-token=123` }
    }).catch((error: v.SuperRequestError) => {
      validateSessionUnauthorized(error)
    })

    app.close()
  })

  it('return unauthorized when session ID is invalid', async () => {
    const app = v.App()
    app.use(router)

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
    })

    await v.superRequest(app).post('/protect', {}, {
      headers: { cookie: `session-id=123; session-token=${sessionToken}` }
    }).catch((error: v.SuperRequestError) => {
      validateSessionUnauthorized(error)
    })

    app.close()
  })

  it('return bad request when session id is not passed in headers', async () => {
    const app = v.App()
    app.use(router)

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
    })

    await v.superRequest(app).post('/protect', {}, {
      headers: { cookie: `session-token=${sessionToken}` }
    }).catch((error: v.SuperRequestError) => {
      expect(error.response.statusCode).toEqual(400)
      expect(Object.keys(error.response.headers).length).toEqual(12)
      expect(v.isUUID(error.response.headers['request-id'])).toBeTruthy()
      expect(error.response.headers['cache-control']).toEqual('no-store, no-cache, must-revalidate, private')
      expect(error.response.headers.pragma).toEqual('no-cache')
      expect(error.response.headers.expires).toEqual('0')
      expect(error.response.headers['x-content-type-options']).toEqual('nosniff')
      expect(error.response.headers['x-frame-options']).toEqual('DENY')
      expect(error.response.headers['content-security-policy']).toEqual("default-src 'self'")
      expect(error.response.headers['x-xss-protection']).toEqual('1; mode=block')
      expect(error.response.headers['content-type']).toEqual('text/plain')
      expect(error.response.headers.connection).toEqual('close')
      expect(error.response.headers['content-length']).toEqual('18')
      expect(error.response.data).toEqual('Invalid session ID')
    })

    app.close()
  })

  it('return unauthorized when session token is not passed in headers', async () => {
    const app = v.App()
    app.use(router)

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
    })

    await v.superRequest(app).post('/protect', {}, {
      headers: { cookie: `session-id=${sessionId}` }
    }).catch((error: v.SuperRequestError) => {
      validateSessionUnauthorized(error)
    })

    app.close()
  })

  it('return unauthorized when session token is expired', async () => {
    const app = v.App()
    const secretKey = generateSecretKey()
    const session = v.Session({ secretKey, sanitizationEvery: '5m' })
    const router = v.Router()

    class ExampleController implements v.Controller {
      public handle (_request: v.Request, response: v.Response): any {
        response.status(200).end()
      }
    }

    router.post('/session',
      session.create({ userId: 123, email: 'any@mail.com' }, { expiresIn: 0 }),
      v.controllerAdapter(new ExampleController())
    )

    router.post('/protect', session.protect(), v.controllerAdapter(new ExampleController()))

    app.use(router)

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
    })

    await v.superRequest(app).post('/protect', {}, {
      headers: { cookie }
    }).catch((error: v.SuperRequestError) => {
      validateSessionUnauthorized(error)
    })

    app.close()
  })

  it('return unauthorized when session is expired', async () => {
    const app = v.App()
    const secretKey = generateSecretKey()
    const session = v.Session({ secretKey, sanitizationEvery: 1 })
    const router = v.Router()

    router.post('/session',
      session.create({ userId: 123, email: 'any@mail.com' }, { expiresIn: 1 }),
      v.controllerAdapter(new ExampleController())
    )

    router.post('/protect', session.protect(), v.controllerAdapter(new ExampleController()))

    app.use(router)

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
    })

    const delay = async (ms: number): Promise<void> => await new Promise<void>((resolve) => setTimeout(resolve, ms))

    await delay(1001)

    await v.superRequest(app).post('/protect', {}, {
      headers: { cookie }
    }).catch((error: v.SuperRequestError) => {
      validateSessionUnauthorized(error)
    })

    app.close()
  })

  it('Should be able to update session when passed session id', async () => {
    const sessionId = v.randomUUID()

    const app = v.App()
    const secretKey = generateSecretKey()
    const session = v.Session({ secretKey, sanitizationEvery: '5m' })
    const router = v.Router()

    router.post('/session',
      session.create({ userId: 123, email: 'any@mail.com' }, { expiresIn: '15m', sessionId }),
      v.controllerAdapter(new ExampleController())
    )

    app.use(router)

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
      const cookies: any = response.headers['set-cookie']
      cookies.forEach((cookie: string) => {
        if (cookie.startsWith('session-id=')) {
          expect(cookie.split('=')[1].split(';')[0]).toEqual(sessionId)
        }
      })
    })

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
      const cookies: any = response.headers['set-cookie']
      cookies.forEach((cookie: string) => {
        if (cookie.startsWith('session-id=')) {
          expect(cookie.split('=')[1].split(';')[0]).toEqual(sessionId)
        }
      })
    })

    app.close()
  })

  it('Should be able to update the session when it has the session ID and session token in the cookie', async () => {
    const app = v.App()
    app.use(router)

    await v.superRequest(app).post('/session').then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
    })

    await v.superRequest(app).post('/session', {}, {
      headers: { cookie }
    }).then((response) => {
      getCookies(response)
      validateSessionSuccess(response)
    })

    app.close()
  })
})
