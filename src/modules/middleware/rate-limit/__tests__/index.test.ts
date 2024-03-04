import * as http from 'http'
import axios from 'axios'
import vkrun, { rateLimit, Router, controllerAdapter } from '../../../../index'
import * as type from '../../../types'

class RateLimitController implements type.Controller {
  public handle (_request: type.Request, response: type.Response): any {
    response.status(200).send('rate limit')
  }
}

describe('Rate Limit', () => {
  it('Should be able to call any route with default standard headers', async () => {
    const app = vkrun()
    const rateLimitConfig = { windowMs: 15 * 60 * 1000, limit: 100 }
    app.use(rateLimit(rateLimitConfig))
    const router = Router()
    router.get('/rate-limit', controllerAdapter(new RateLimitController()))
    app.use(router)
    const server = app.server()

    server.listen(3899)

    await axios.get('http://localhost:3899/rate-limit')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.headers).toHaveProperty('x-ratelimit-limit')
        expect(response.headers).toHaveProperty('x-ratelimit-remaining')
        expect(response.headers).toHaveProperty('x-ratelimit-reset')
        expect(response.headers['x-ratelimit-limit']).toEqual(String(rateLimitConfig.limit))
        expect(response.headers['x-ratelimit-remaining']).toBeDefined()
        expect(response.headers['x-ratelimit-reset']).toBeDefined()
        expect(response.data).toEqual('rate limit')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Should be able to call any route with legacy headers', async () => {
    const app = vkrun()
    const rateLimitConfig = {
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: false,
      legacyHeaders: true
    }
    app.use(rateLimit(rateLimitConfig))
    const router = Router()
    router.get('/rate-limit', controllerAdapter(new RateLimitController()))
    app.use(router)
    const server = app.server()

    server.listen(3898)

    await axios.get('http://localhost:3898/rate-limit')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.headers).toHaveProperty('x-ratelimit-limit-legacy')
        expect(response.headers).toHaveProperty('x-ratelimit-remaining-legacy')
        expect(response.headers).toHaveProperty('x-ratelimit-reset-legacy')
        expect(response.headers['x-ratelimit-limit-legacy']).toEqual(String(rateLimitConfig.limit))
        expect(response.headers['x-ratelimit-remaining-legacy']).toBeDefined()
        expect(response.headers['x-ratelimit-reset-legacy']).toBeDefined()
        expect(response.data).toEqual('rate limit')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Should be able to call any route with standard headers and legacy headers', async () => {
    const app = vkrun()
    const rateLimitConfig = {
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: true,
      legacyHeaders: true
    }
    app.use(rateLimit(rateLimitConfig))
    const router = Router()
    router.get('/rate-limit', controllerAdapter(new RateLimitController()))
    app.use(router)
    const server = app.server()

    server.listen(3897)

    await axios.get('http://localhost:3897/rate-limit')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.headers).toHaveProperty('x-ratelimit-limit')
        expect(response.headers).toHaveProperty('x-ratelimit-remaining')
        expect(response.headers).toHaveProperty('x-ratelimit-reset')
        expect(response.headers['x-ratelimit-limit']).toEqual(String(rateLimitConfig.limit))
        expect(response.headers['x-ratelimit-remaining']).toBeDefined()
        expect(response.headers['x-ratelimit-reset']).toBeDefined()
        expect(response.headers).toHaveProperty('x-ratelimit-limit-legacy')
        expect(response.headers).toHaveProperty('x-ratelimit-remaining-legacy')
        expect(response.headers).toHaveProperty('x-ratelimit-reset-legacy')
        expect(response.headers['x-ratelimit-limit-legacy']).toEqual(String(rateLimitConfig.limit))
        expect(response.headers['x-ratelimit-remaining-legacy']).toBeDefined()
        expect(response.headers['x-ratelimit-reset-legacy']).toBeDefined()
        expect(response.data).toEqual('rate limit')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Return to many requests if limit is reached', async () => {
    const app = vkrun()
    const rateLimitConfig = { windowMs: 15 * 60 * 1000, limit: 1 }
    app.use(rateLimit(rateLimitConfig))
    const router = Router()
    router.get('/rate-limit', controllerAdapter(new RateLimitController()))
    app.use(router)
    const server = app.server()

    server.listen(3896)

    await axios.get('http://localhost:3896/rate-limit')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('rate limit')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    await axios.get('http://localhost:3896/rate-limit')
      .then((response) => {
        expect(response).toEqual(undefined)
      }).catch((error) => {
        expect(error.response.status).toEqual(429)
        expect(error.response.data).toEqual('Too Many Requests')
      })

    server.close()
  })

  it('Return to many requests if limit is reached and reset count requests', async () => {
    const app = vkrun()
    const rateLimitConfig = { windowMs: 50, limit: 1 }
    app.use(rateLimit(rateLimitConfig))
    const router = Router()
    router.get('/rate-limit', controllerAdapter(new RateLimitController()))
    app.use(router)
    const server = app.server()

    server.listen(3895)

    await axios.get('http://localhost:3895/rate-limit')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('rate limit')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    await axios.get('http://localhost:3895/rate-limit')
      .then((response) => {
        expect(response).toEqual(undefined)
      }).catch((error) => {
        expect(error.response.status).toEqual(429)
        expect(error.response.data).toEqual('Too Many Requests')
      })

    const delay = async (ms: number): Promise<void> => await new Promise<void>((resolve) => setTimeout(resolve, ms))

    await delay(100)

    await axios.get('http://localhost:3895/rate-limit')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('rate limit')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Return to many requests if limit is reached and call notification', async () => {
    let accessData: any
    const app = vkrun()
    const rateLimitConfig = {
      windowMs: 50,
      limit: 1,
      minToNotification: 1,
      notification: (access: type.AccessData) => {
        accessData = access
      }
    }
    app.use(rateLimit(rateLimitConfig))
    const router = Router()
    router.get('/rate-limit', controllerAdapter(new RateLimitController()))
    app.use(router)
    const server = app.server()

    server.listen(3894)

    await axios.get('http://localhost:3894/rate-limit')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('rate limit')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    await axios.get('http://localhost:3894/rate-limit')
      .then((response) => {
        expect(response).toEqual(undefined)
      }).catch((error) => {
        expect(error.response.status).toEqual(429)
        expect(error.response.data).toEqual('Too Many Requests')
      })

    expect(accessData).toEqual({
      remoteAddress: '::1',
      remoteFamily: 'IPv6',
      userAgent: 'axios/1.6.7',
      exceeded: {
        count: 1,
        requests: [{
          method: 'GET',
          route: '/rate-limit'
        }]
      }
    })

    server.close()
  })

  it('Return bad request if remote address is missing', async () => {
    const rateLimitConfig = { windowMs: 15 * 60 * 1000, limit: 100 }
    const socketMock = { remoteAddress: undefined, remoteFamily: 'IPv6' }
    const requestMock: any = {
      socket: socketMock,
      headers: { 'user-agent': null },
      _httpMessage: {}
    }
    const server = http.createServer((_request: any, response: any) => {
      rateLimit(rateLimitConfig).handle(requestMock, response, () => {})
    })

    server.listen(3893)

    await axios.get('http://localhost:3893/rate-limit').then((response) => {
      expect(response).toEqual(undefined)
    }).catch((error: any) => {
      expect(error.response.status).toEqual(400)
      expect(error.response.data).toEqual('Missing Remote Address')
    })

    server.close()
  })

  it('Should be able to call any route with default config', async () => {
    const app = vkrun()
    app.use(rateLimit())
    const router = Router()
    router.get('/rate-limit', controllerAdapter(new RateLimitController()))
    app.use(router)
    const server = app.server()

    server.listen(3892)

    await axios.get('http://localhost:3892/rate-limit')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.headers).toHaveProperty('x-ratelimit-limit')
        expect(response.headers).toHaveProperty('x-ratelimit-remaining')
        expect(response.headers).toHaveProperty('x-ratelimit-reset')
        expect(response.headers['x-ratelimit-limit']).toEqual(String(100))
        expect(response.headers['x-ratelimit-remaining']).toBeDefined()
        expect(response.headers['x-ratelimit-reset']).toBeDefined()
        expect(response.data).toEqual('rate limit')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Return bad request if socket and user agent is missing', async () => {
    const requestMock: any = {
      socket: undefined,
      headers: { 'user-agent': undefined },
      _httpMessage: {}
    }
    const server = http.createServer((_request: any, response: any) => {
      rateLimit().handle(requestMock, response, () => {})
    })

    server.listen(3891)

    await axios.get('http://localhost:3891/rate-limit').then((response) => {
      expect(response).toEqual(undefined)
    }).catch((error: any) => {
      expect(error.response.status).toEqual(400)
      expect(error.response.data).toEqual('Missing Remote Address')
    })

    server.close()
  })
})
