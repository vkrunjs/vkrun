import v from '../../../index'
import * as util from '../../utils'
import * as type from '../../types'

describe('Cors - end to end testing using super request', () => {
  it('Should return status 200 when default cors', async () => {
    const app = v.App()
    app.use(v.cors())
    const router = v.Router()

    router.get('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET ok')
    })

    app.use(router)

    await v.superRequest(app).get('/').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('GET ok')
      expect(Object.keys(response.headers).length).toEqual(7)
      expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['access-control-allow-origin']).toEqual('*')
      expect(response.headers['access-control-allow-methods']).toEqual('GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS')
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(util.isString(response.headers.date)).toBeTruthy()
      expect(response.headers.connection).toEqual('close')
      expect(response.headers['content-length']).toEqual('6')
    })

    app.close()
  })

  it('Should return status 403 if the request origin is not in the origin options', async () => {
    const app = v.App()
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
    app.use(v.cors(options))
    const router = v.Router()

    router.get('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET ok')
    })

    app.use(router)

    await v.superRequest(app).get('/').catch((error: any) => {
      expect(error.response.statusCode).toEqual(403)
      expect(Object.keys(error.response.headers).length).toEqual(6)
      expect(util.isUUID(error.response.headers['request-id'])).toBeTruthy()
      expect(error.response.headers['access-control-allow-origin']).toEqual('http://localhost:3000')
      expect(error.response.headers['content-type']).toEqual('text/plain')
      expect(util.isString(error.response.headers.date)).toBeTruthy()
      expect(error.response.headers.connection).toEqual('close')
      expect(error.response.headers['content-length']).toEqual('0')
      expect(error.response.data).toEqual('')
    })

    app.close()
  })

  it('Should return status 403 if the request origin is not in the origin array options', async () => {
    const app = v.App()
    const options: type.SetCorsOptions = {
      origin: ['http://localhost:3000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: 'Content-Type, Authorization',
      exposedHeaders: 'X-Another-Custom-Header',
      credentials: true,
      maxAge: 3600
    }
    app.use(v.cors(options))
    const router = v.Router()

    router.get('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET ok')
    })

    app.use(router)

    await v.superRequest(app).get('/').catch((error: any) => {
      expect(error.response.statusCode).toEqual(403)
      expect(error.response.data).toEqual('')
      expect(Object.keys(error.response.headers).length).toEqual(6)
      expect(util.isUUID(error.response.headers['request-id'])).toBeTruthy()
      expect(error.response.headers['access-control-allow-origin']).toEqual('http://localhost:3000')
      expect(error.response.headers['content-type']).toEqual('text/plain')
      expect(util.isString(error.response.headers.date)).toBeTruthy()
      expect(error.response.headers.connection).toEqual('close')
      expect(error.response.headers['content-length']).toEqual('0')
    })

    app.close()
  })

  it('Should return status 204 when method is OPTIONS and valid origin', async () => {
    const app = v.App()
    const options: type.SetCorsOptions = {
      origin: 'http://localhost:3596',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
      preflightNext: false,
      successStatus: 204,
      allowedHeaders: 'Content-Type, Authorization',
      exposedHeaders: 'X-Another-Custom-Header',
      credentials: true,
      maxAge: 3600
    }
    app.use(v.cors(options))
    const router = v.Router()

    router.get('/route', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET ok')
    })

    app.use(router)

    await v.superRequest(app).options('/route', {
      headers: {
        Origin: 'http://localhost:3596'
      }
    }).then((response) => {
      expect(response.statusCode).toEqual(204)
      expect(response.data).toEqual('')
      expect(Object.keys(response.headers).length).toEqual(10)
      expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['access-control-allow-origin']).toEqual('http://localhost:3596')
      expect(response.headers['access-control-allow-methods']).toEqual('GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS')
      expect(response.headers['access-control-expose-headers']).toEqual('X-Another-Custom-Header')
      expect(response.headers['access-control-allow-credentials']).toEqual('true')
      expect(response.headers['access-control-max-age']).toEqual('3600')
      expect(response.headers['access-control-allow-headers']).toEqual('Content-Type, Authorization')
      expect(util.isString(response.headers.date)).toBeTruthy()
      expect(response.headers.connection).toEqual('close')
      expect(response.headers['content-length']).toEqual('0')
    })

    app.close()
  })

  it('Should add default CORS options handler when route does not have OPTIONS method defined', async () => {
    const app = v.App()
    app.use(v.cors())
    const router = v.Router()

    router.get('/', (_request: type.Request, response: type.Response) => {
      response.status(200).json({ message: 'GET ok' })
    })

    app.use(router)

    await v.superRequest(app).options('/').then((response) => {
      expect(response.statusCode).toEqual(204)
      expect(response.data).toEqual('')
      expect(Object.keys(response.headers).length).toEqual(7)
      expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['access-control-allow-origin']).toEqual('*')
      expect(response.headers['access-control-allow-methods']).toEqual('GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS')
      expect(response.headers['access-control-allow-headers']).toEqual('Content-Type, Authorization')
      expect(util.isString(response.headers.date)).toBeTruthy()
      expect(response.headers.connection).toEqual('close')
      expect(response.headers['content-length']).toEqual('0')
    })

    app.close()
  })

  it('Should use custom CORS options handler when route has OPTIONS method defined', async () => {
    const app = v.App()
    app.use(v.cors())
    const router = v.Router()

    router.get('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET ok')
    })

    router.options('/', (_request: type.Request, response: type.Response) => {
      response.status(200).end()
    })

    app.use(router)

    await v.superRequest(app).options('/').then((response) => {
      expect(response.statusCode).toEqual(204)
      expect(response.data).toEqual('')
      expect(Object.keys(response.headers).length).toEqual(7)
      expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['access-control-allow-origin']).toEqual('*')
      expect(response.headers['access-control-allow-methods']).toEqual('GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS')
      expect(response.headers['access-control-allow-headers']).toEqual('Content-Type, Authorization')
      expect(util.isString(response.headers.date)).toBeTruthy()
      expect(response.headers.connection).toEqual('close')
      expect(response.headers['content-length']).toEqual('0')
    })

    app.close()
  })

  it('Should use custom CORS options handler when route has OPTIONS method defined and preflightNext is false', async () => {
    const app = v.App()
    app.use(v.cors({ preflightNext: true }))
    const router = v.Router()

    router.get('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET ok')
    })

    router.options('/', (_request: type.Request, response: type.Response) => {
      response.status(200).end('OPTIONS ok')
    })

    app.use(router)

    await v.superRequest(app).options('/').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(7)
      expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['access-control-allow-origin']).toEqual('*')
      expect(response.headers['access-control-allow-methods']).toEqual('GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS')
      expect(response.headers['access-control-allow-headers']).toEqual('Content-Type, Authorization')
      expect(util.isString(response.headers.date)).toBeTruthy()
      expect(response.headers.connection).toEqual('close')
      expect(response.headers['content-length']).toEqual('10')
      expect(response.data).toEqual('')
    })

    app.close()
  })
})
