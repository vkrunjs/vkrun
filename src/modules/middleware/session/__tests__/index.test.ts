import axios from 'axios'
import vkrun, {
  Session,
  Router,
  controllerAdapter,
  Controller,
  Request,
  Response
} from '../../../../index'
import { generateSecretKey } from '../helpers'
import * as util from '../../../utils'

const app = vkrun()
const secretKey = generateSecretKey()
const session = Session({ secretKey, sanitizationEvery: '5m' })
const router = Router()

class ExampleController implements Controller {
  public handle (request: Request, response: Response): any {
    response.status(200).json({ session: request.session })
  }
}

router.post('/session',
  session.create({ userId: 123, email: 'any@mail.com' }, { expiresIn: '15m' }),
  controllerAdapter(new ExampleController())
)

router.post('/protect', session.protect(), controllerAdapter(new ExampleController()))

app.use(router)
const server = app.server()

let sessionId: string
let sessionToken: string

const getCookies = (response: any): void => {
  const cookies: any = response.headers['set-cookie']

  cookies.forEach((cookie: string) => {
    if (cookie.startsWith('session-id=')) {
      sessionId = cookie.split('=')[1].split(';')[0]
    } else if (cookie.startsWith('session-token=')) {
      sessionToken = cookie.split('=')[1].split(';')[0]
    }
  })
}

describe('Session', () => {
  it('should be able to create session', async () => {
    server.listen(3799)

    await axios.post('http://localhost:3799/session')
      .then((response) => {
        getCookies(response)
        expect(response.status).toEqual(200)
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
        expect(util.isUUID(sessionId)).toBeTruthy()
        expect(typeof sessionToken).toEqual('string')
        expect(response.data.body).toEqual(undefined)
      }).catch((error: any) => {
        expect(error.message).toEqual(undefined)
      })

    server.close()
  })

  it('throw new Error when secret key is invalid', async () => {
    try {
      const router = Router()
      const session = Session({ secretKey: '123' })
      router.post('/session',
        session.create({ userId: 123, email: 'any@mail.com' }, { expiresIn: '15m' })
      )
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-session: the secret keys must be strings of 64 characters representing 32 bytes.')
    }
  })

  it('should be able to access a protected route with correct headers', async () => {
    server.listen(3798)

    await axios.post('http://localhost:3798/protect', {}, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        'X-Session-Id': sessionId
      }
    }).then((response) => {
      expect(response.status).toEqual(200)
      expect(response.data.session).toEqual({ userId: 123, email: 'any@mail.com' })
    }).catch((error: any) => {
      expect(error.message).toEqual(undefined)
    })

    server.close()
  })

  it('return unauthorized when session token is invalid', async () => {
    server.listen(3797)

    await axios.post('http://localhost:3797/protect', {}, {
      headers: {
        Authorization: 'Bearer 123',
        'X-Session-Id': sessionId
      }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch((error: any) => {
      expect(error.response.status).toEqual(401)
      expect(error.response.data).toEqual('Unauthorized')
    })

    server.close()
  })

  it('return unauthorized when session ID is invalid', async () => {
    server.listen(3796)

    await axios.post('http://localhost:3796/protect', {}, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        'X-Session-Id': '123'
      }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch((error: any) => {
      expect(error.response.status).toEqual(401)
      expect(error.response.data).toEqual('Unauthorized')
    })

    server.close()
  })

  it('return bad request when session id is not passed in headers', async () => {
    server.listen(3795)

    await axios.post('http://localhost:3795/protect', {}, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch((error: any) => {
      expect(error.response.status).toEqual(400)
      expect(error.response.data).toEqual('Invalid session ID')
    })

    server.close()
  })

  it('return unauthorized when session token is not passed in headers', async () => {
    server.listen(3794)

    await axios.post('http://localhost:3794/protect', {}, {
      headers: {
        'X-Session-Id': sessionId
      }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch((error: any) => {
      expect(error.response.status).toEqual(401)
      expect(error.response.data).toEqual('Unauthorized')
    })

    server.close()
  })

  it('return unauthorized when session token is expired', async () => {
    const app = vkrun()
    const secretKey = generateSecretKey()
    const session = Session({ secretKey, sanitizationEvery: '5m' })
    const router = Router()

    class ExampleController implements Controller {
      public handle (_request: Request, response: Response): any {
        response.status(200).end()
      }
    }

    router.post('/session',
      session.create({ userId: 123, email: 'any@mail.com' }, { expiresIn: 0 }),
      controllerAdapter(new ExampleController())
    )

    router.post('/protect', session.protect(), controllerAdapter(new ExampleController()))

    app.use(router)
    const server = app.server()

    server.listen(3793)

    await axios.post('http://localhost:3793/session')
      .then(async (response) => {
        getCookies(response)
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    await axios.post('http://localhost:3793/protect', {}, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        'X-Session-Id': sessionId
      }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch((error: any) => {
      expect(error.response.status).toEqual(401)
      expect(error.response.data).toEqual('Unauthorized')
    })

    server.close()
  })

  it('return unauthorized when session is expired', async () => {
    const app = vkrun()
    const secretKey = generateSecretKey()
    const session = Session({ secretKey, sanitizationEvery: 1 })
    const router = Router()

    class ExampleController implements Controller {
      public handle (_request: Request, response: Response): any {
        response.status(200).end()
      }
    }

    router.post('/session',
      session.create({ userId: 123, email: 'any@mail.com' }, { expiresIn: 1 }),
      controllerAdapter(new ExampleController())
    )

    router.post('/protect', session.protect(), controllerAdapter(new ExampleController()))

    app.use(router)
    const server = app.server()

    server.listen(3792)

    await axios.post('http://localhost:3792/session')
      .then(async (response) => {
        getCookies(response)
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    const delay = async (ms: number): Promise<void> => await new Promise<void>((resolve) => setTimeout(resolve, ms))

    await delay(1001)

    await axios.post('http://localhost:3792/protect', {}, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        'X-Session-Id': sessionId
      }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch((error: any) => {
      expect(error.response.status).toEqual(401)
      expect(error.response.data).toEqual('Unauthorized')
    })

    server.close()
  })

  it('should be able to update session', async () => {
    const sessionId = util.randomUUID()

    const app = vkrun()
    const secretKey = generateSecretKey()
    const session = Session({ secretKey, sanitizationEvery: '5m' })
    const router = Router()

    router.post('/session',
      session.create({ userId: 123, email: 'any@mail.com' }, { expiresIn: '15m', sessionId }),
      controllerAdapter(new ExampleController())
    )

    app.use(router)
    const server = app.server()

    server.listen(3781)

    await axios.post('http://localhost:3781/session')
      .then((response) => {
        expect(response.status).toEqual(200)
        const cookies: any = response.headers['set-cookie']
        cookies.forEach((cookie: string) => {
          if (cookie.startsWith('session-id=')) {
            expect(cookie.split('=')[1].split(';')[0]).toEqual(sessionId)
          }
        })
      }).catch((error: any) => {
        expect(error.message).toEqual(undefined)
      })

    await axios.post('http://localhost:3781/session')
      .then((response) => {
        expect(response.status).toEqual(200)
        const cookies: any = response.headers['set-cookie']
        cookies.forEach((cookie: string) => {
          if (cookie.startsWith('session-id=')) {
            expect(cookie.split('=')[1].split(';')[0]).toEqual(sessionId)
          }
        })
      }).catch((error: any) => {
        expect(error.message).toEqual(undefined)
      })

    server.close()
  })
})
