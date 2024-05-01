import v from '../../../index'
import axios from 'axios'

describe('Router', () => {
  let server: any

  afterEach(() => {
    // close server if test fails or causes error
    if (server?.listening) {
      server.close()
    }
  })

  it('Should be able to call the route in the GET method', async () => {
    const app = v.App()
    const router = v.Router()

    router.get('/', (_request: v.Request, response: v.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET ok')
    })

    app.use(router)
    server = app.server()
    server.listen(3699)

    await axios.get('http://localhost:3699/').then((response) => {
      expect(response.status).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(v.isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('6')
      expect(response.data).toEqual('GET ok')
    })

    app.close()
  })

  it('Should be able to call the route in the HEAD method', async () => {
    const app = v.App()
    const router = v.Router()

    router.head('/', (_request: v.Request, response: v.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(204).end('HEAD ok')
    })

    app.use(router)
    server = app.server()
    server.listen(3698)

    await axios.head('http://localhost:3698/').then((response) => {
      expect(response.status).toEqual(204)
      expect(Object.keys(response.headers).length).toEqual(4)
      expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(v.isString(response.headers.date)).toBeTruthy()
      expect(response.headers.connection).toEqual('close')
      expect(response.data).toEqual('')
    })

    app.close()
  })

  it('Should be able to call the route in the POST method', async () => {
    const app = v.App()
    const router = v.Router()

    router.post('/', (_request: v.Request, response: v.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('POST ok')
    })

    app.use(router)
    server = app.server()
    server.listen(3697)

    await axios.post('http://localhost:3697/').then((response) => {
      expect(response.status).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(v.isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('7')
      expect(response.data).toEqual('POST ok')
    })

    app.close()
  })

  it('Should be able to call the route in the PUT method', async () => {
    const app = v.App()
    const router = v.Router()

    router.put('/', (_request: v.Request, response: v.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('PUT ok')
    })

    app.use(router)
    server = app.server()
    server.listen(3696)

    await axios.put('http://localhost:3696/').then((response) => {
      expect(response.status).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(v.isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('6')
      expect(response.data).toEqual('PUT ok')
    })

    app.close()
  })

  it('Should be able to call the route in the PATCH method', async () => {
    const app = v.App()
    const router = v.Router()

    router.patch('/', (_request: v.Request, response: v.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('PATCH ok')
    })

    app.use(router)
    server = app.server()
    server.listen(3695)

    await axios.patch('http://localhost:3695/').then((response) => {
      expect(response.status).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(v.isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('8')
      expect(response.data).toEqual('PATCH ok')
    })

    app.close()
  })

  it('Should be able to call the route in the DELETE method', async () => {
    const app = v.App()
    const router = v.Router()

    router.delete('/', (_request: v.Request, response: v.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('DELETE ok')
    })

    app.use(router)
    server = app.server()
    server.listen(3694)

    await axios.delete('http://localhost:3694/').then((response) => {
      expect(response.status).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(v.isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('9')
      expect(response.data).toEqual('DELETE ok')
    })

    app.close()
  })

  it('Should be able to call the route in the OPTIONS method', async () => {
    const app = v.App()
    const router = v.Router()

    router.options('/', (_request: v.Request, response: v.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('OPTIONS ok')
    })

    app.use(router)
    server = app.server()
    server.listen(3693)

    await axios.options('http://localhost:3693/').then((response) => {
      expect(response.status).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(v.isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('10')
      expect(response.data).toEqual('OPTIONS ok')
    })

    app.close()
  })

  it('throw new Error when duplicate route in GET method', async () => {
    try {
      const app = v.App()
      const router = v.Router()

      router.get('/get-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      router.get('/get-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /get-route route is duplicated for GET method.')
    }
  })

  it('throw new Error when duplicate route in HEAD method', async () => {
    try {
      const app = v.App()
      const router = v.Router()

      router.head('/head-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      router.head('/head-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /head-route route is duplicated for HEAD method.')
    }
  })

  it('throw new Error when duplicate route in POST method', async () => {
    try {
      const app = v.App()
      const router = v.Router()

      router.post('/post-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      router.post('/post-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /post-route route is duplicated for POST method.')
    }
  })

  it('throw new Error when duplicate route in PUT method', async () => {
    try {
      const app = v.App()
      const router = v.Router()

      router.put('/put-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      router.put('/put-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /put-route route is duplicated for PUT method.')
    }
  })

  it('throw new Error when duplicate route in PATCH method', async () => {
    try {
      const app = v.App()
      const router = v.Router()

      router.patch('/patch-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      router.patch('/patch-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /patch-route route is duplicated for PATCH method.')
    }
  })

  it('throw new Error when duplicate route in DELETE method', async () => {
    try {
      const app = v.App()
      const router = v.Router()

      router.delete('/delete-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      router.delete('/delete-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /delete-route route is duplicated for DELETE method.')
    }
  })

  it('throw new Error when duplicate route in OPTIONS method', async () => {
    try {
      const app = v.App()
      const router = v.Router()

      router.options('/options-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      router.options('/options-route', (_request: v.Request, response: v.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /options-route route is duplicated for OPTIONS method.')
    }
  })

  it('Return not found if the route does not exist', async () => {
    const app = v.App()
    const router = v.Router()
    app.use(router)
    server = app.server()
    server.listen(3692)

    await axios.get('http://localhost:3692/').catch((error) => {
      expect(error.response.status).toEqual(404)
      expect(error.response.headers['content-type']).toEqual('text/plain')
      expect(error.response.headers['access-control-allow-origin']).toEqual('*')
      expect(error.response.data).toEqual('Not Found')
    })

    app.close()
  })

  it('Return no content if the route has no handler', async () => {
    const app = v.App()
    const router = v.Router()
    router.get('/route-without-handler')
    app.use(router)
    server = app.server()

    server.listen(3691)

    await axios.get('http://localhost:3691/route-without-handler').then((response) => {
      expect(response.status).toEqual(204)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers['access-control-allow-origin']).toEqual('*')
      expect(response.data).toEqual('')
    })

    app.close()
  })

  it('Should be able to manipulate multiple handlers with method handle', async () => {
    class ExampleMiddleware implements v.Middleware {
      public handle (_request: v.Request, _response: v.Response, next: v.NextFunction): void {
        next()
      }
    }

    class ExampleController implements v.Controller {
      public handle (_request: v.Request, response: v.Response): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(200).end('Return controller')
      }
    }

    const app = v.App()
    const router = v.Router()
    router.get(
      '/multiple-handlers',
      v.middlewareAdapter(new ExampleMiddleware()),
      v.controllerAdapter(new ExampleController())
    )
    app.use(router)
    server = app.server()

    server.listen(3690)

    await axios.get('http://localhost:3690/multiple-handlers').then((response) => {
      expect(response.status).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('Return controller')
    })

    app.close()
  })

  it('Should be able to manipulate multiple handler functions', async () => {
    const exampleMiddleware = (_request: v.Request, _response: v.Response, next: v.NextFunction): void => {
      next()
    }

    const exampleController = (_request: v.Request, response: v.Response): void => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('Return controller')
    }

    const app = v.App()
    const router = v.Router()
    router.get('/multiple-handlers', exampleMiddleware, exampleController)
    app.use(router)
    server = app.server()

    server.listen(3689)

    await axios.get('http://localhost:3689/multiple-handlers').then((response) => {
      expect(response.status).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('Return controller')
    })

    app.close()
  })

  it('throw new Error when using invalid middleware with error handler with method handle', async () => {
    const invalidMiddleware = (): any => {}

    class ErrorMiddleware implements v.ErrorHandlerMiddleware {
      public handle (error: any, _request: v.Request, response: v.Response, _next: v.NextFunction): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(500).end(error.message)
      }
    }

    class ExampleController implements v.Controller {
      public handle (_request: v.Request, response: v.Response): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(200).end('Return controller')
      }
    }

    const app = v.App()
    app.use(invalidMiddleware)
    app.use(v.errorHandleAdapter(new ErrorMiddleware()))
    const router = v.Router()
    router.get('/', v.controllerAdapter(new ExampleController()))
    app.use(router)
    server = app.server()

    server.listen(3688)

    await axios.get('http://localhost:3688/').catch((error) => {
      expect(error.response.status).toEqual(500)
      expect(error.response.headers['content-type']).toEqual('text/plain')
      expect(error.response.data).toEqual('vkrun-router: method use received invalid middleware.')
    })

    app.close()
  })

  it('throw new Error when using invalid middleware with error handler function', async () => {
    const invalidMiddleware = (): any => {}

    const errorMiddleware = (error: any, _request: v.Request, response: v.Response, _next: v.NextFunction): void => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(500).end(error.message)
    }

    const exampleController = (_request: v.Request, response: v.Response): void => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('Return controller')
    }

    const app = v.App()
    app.use(invalidMiddleware)
    app.use(errorMiddleware)
    const router = v.Router()
    router.get('/', exampleController)
    app.use(router)
    server = app.server()

    server.listen(3687)

    await axios.get('http://localhost:3687/').catch((error) => {
      expect(error.response.status).toEqual(500)
      expect(error.response.headers['content-type']).toEqual('text/plain')
      expect(error.response.data).toEqual('vkrun-router: method use received invalid middleware.')
    })

    app.close()
  })

  it('Should respond error message if response is in invalid format and has ErrorHandler middleware', async () => {
    const invalidMiddleware = (_request: v.Request, response: v.Response, _next: v.NextFunction): void => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(500).write({ message: 'ok' })
    }

    class ErrorMiddleware implements v.ErrorHandlerMiddleware {
      public handle (error: Error, _request: v.Request, response: v.Response, _next: v.NextFunction): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(500).end(error.message)
      }
    }

    class ExampleController implements v.Controller {
      public handle (_request: v.Request, response: v.Response): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(200).end('Return controller')
      }
    }

    const app = v.App()
    app.use(invalidMiddleware)
    app.use(v.errorHandleAdapter(new ErrorMiddleware()))
    const router = v.Router()
    router.get('/', v.controllerAdapter(new ExampleController()))
    app.use(router)
    server = app.server()

    server.listen(3686)

    await axios.get('http://localhost:3686/').catch((error) => {
      expect(error.response.status).toEqual(500)
      expect(error.response.headers['content-type']).toEqual('text/plain')
      expect(error.response.data).toEqual('The "chunk" argument must be of type string or an instance of Buffer or Uint8Array. Received an instance of Object')
    })

    app.close()
  })

  it('Should be able to use multiple Router instances', async () => {
    const app = v.App()
    const routerA = v.Router()
    const routerB = v.Router()

    routerA.get('/get', (_request: v.Request, response: v.Response) => {
      response.status(200).send('GET ok')
    })

    routerB.post('/post', (_request: v.Request, response: v.Response) => {
      response.status(200).send('POST ok')
    })

    app.use(routerA)
    app.use(routerB)

    server = app.server()
    server.listen(3685)

    await axios.get('http://localhost:3685/get').catch((error) => {
      expect(error.response.status).toEqual(200)
      expect(error.response.data).toEqual('GET ok')
    })

    await axios.post('http://localhost:3685/post').catch((error) => {
      expect(error.response.status).toEqual(200)
      expect(error.response.data).toEqual('POST ok')
    })

    app.close()
  })

  it('Should be able to create routes directly from the App instance', async () => {
    const app = v.App()

    app.get('/get', (_request: v.Request, response: v.Response) => {
      response.status(200).send('GET ok')
    })

    app.post('/post', (_request: v.Request, response: v.Response) => {
      response.status(200).send('POST ok')
    })

    server = app.server()
    server.listen(3684)

    await axios.get('http://localhost:3684/get').catch((error) => {
      expect(error.response.status).toEqual(200)
      expect(error.response.data).toEqual('GET ok')
    })

    await axios.post('http://localhost:3684/post').catch((error) => {
      expect(error.response.status).toEqual(200)
      expect(error.response.data).toEqual('POST ok')
    })

    app.close()
  })

  it('Should be able to work with multiple router instances and routes created directly in the App', async () => {
    const app = v.App()
    const routerA = v.Router()
    const routerB = v.Router()

    routerA.get('/example-a', (_request: v.Request, response: v.Response) => {
      response.status(200).send('GET ok')
    })

    routerB.post('/example-b', (_request: v.Request, response: v.Response) => {
      response.status(200).send('POST ok')
    })

    app.use(routerA)
    app.use(routerB)

    app.get('/example-c', (_request: v.Request, response: v.Response) => {
      response.status(200).send('GET ok')
    })

    app.post('/example-d', (_request: v.Request, response: v.Response) => {
      response.status(200).send('POST ok')
    })

    server = app.server()
    server.listen(3683)

    await axios.get('http://localhost:3683/example-a').catch((error) => {
      expect(error.response.status).toEqual(200)
      expect(error.response.data).toEqual('GET ok')
    })

    await axios.post('http://localhost:3683/example-b').catch((error) => {
      expect(error.response.status).toEqual(200)
      expect(error.response.data).toEqual('POST ok')
    })

    await axios.get('http://localhost:3683/example-c').catch((error) => {
      expect(error.response.status).toEqual(200)
      expect(error.response.data).toEqual('GET ok')
    })

    await axios.post('http://localhost:3683/example-d').catch((error) => {
      expect(error.response.status).toEqual(200)
      expect(error.response.data).toEqual('POST ok')
    })

    app.close()
  })
})
