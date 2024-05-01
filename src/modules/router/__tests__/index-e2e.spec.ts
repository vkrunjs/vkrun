import v from '../../../index'

describe('Router', () => {
  it('Should be able to call the route in the GET method', async () => {
    const app = v.App()
    const router = v.Router()

    router.get('/', (_request: v.Request, response: v.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET ok')
    })

    app.use(router)

    await v.superRequest(app).get('/').then((response) => {
      expect(response.statusCode).toEqual(200)
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

    await v.superRequest(app).head('/').then((response) => {
      expect(response.statusCode).toEqual(204)
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

    await v.superRequest(app).post('/').then((response) => {
      expect(response.statusCode).toEqual(200)
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

    await v.superRequest(app).put('/').then((response) => {
      expect(response.statusCode).toEqual(200)
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

    await v.superRequest(app).patch('/').then((response) => {
      expect(response.statusCode).toEqual(200)
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

    await v.superRequest(app).delete('/').then((response) => {
      expect(response.statusCode).toEqual(200)
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
      response.status(200).end('')
    })

    app.use(router)

    await v.superRequest(app).options('/').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(v.isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('0')
      expect(response.data).toEqual('')
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

    await v.superRequest(app).get('/').catch((error) => {
      expect(error.response.statusCode).toEqual(404)
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

    await v.superRequest(app).get('/route-without-handler').then((response) => {
      expect(response.statusCode).toEqual(204)
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

    await v.superRequest(app).get('/multiple-handlers').then((response) => {
      expect(response.statusCode).toEqual(200)
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

    await v.superRequest(app).get('/multiple-handlers').then((response) => {
      expect(response.statusCode).toEqual(200)
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

    await v.superRequest(app).get('/').catch((error) => {
      expect(error.response.statusCode).toEqual(500)
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

    await v.superRequest(app).get('/').catch((error) => {
      expect(error.response.statusCode).toEqual(500)
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

    await v.superRequest(app).get('/').catch((error) => {
      expect(error.response.statusCode).toEqual(500)
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

    await v.superRequest(app).get('/get').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('GET ok')
    })

    await v.superRequest(app).post('/post').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('POST ok')
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

    await v.superRequest(app).get('/get').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('GET ok')
    })

    await v.superRequest(app).post('/post').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('POST ok')
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

    await v.superRequest(app).get('/example-a').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('GET ok')
    })

    await v.superRequest(app).post('/example-b').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('POST ok')
    })

    await v.superRequest(app).get('/example-c').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('GET ok')
    })

    await v.superRequest(app).post('/example-d').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('POST ok')
    })

    app.close()
  })
})
