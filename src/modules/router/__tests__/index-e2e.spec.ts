import { Router } from '..'
import { App } from '../../app'
import { superRequest } from '../../super-request'
import { Controller, ErrorHandlerMiddleware, Middleware, NextFunction, Request, Response } from '../../types'
import { isString, isUUID } from '../../utils'
import { controllerAdapter, errorHandleAdapter, middlewareAdapter } from '../helpers/adapters'

describe('Router', () => {
  it('Should be able to call the route in the GET method', async () => {
    const app = App()
    const router = Router()

    router.get('/', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET ok')
    })

    app.use(router)

    await superRequest(app).get('/').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('6')
      expect(response.data).toEqual('GET ok')
    })

    app.close()
  })

  it('Should be able to call the route in the HEAD method', async () => {
    const app = App()
    const router = Router()

    router.head('/', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(204).end('HEAD ok')
    })

    app.use(router)

    await superRequest(app).head('/').then((response) => {
      expect(response.statusCode).toEqual(204)
      expect(Object.keys(response.headers).length).toEqual(4)
      expect(isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(isString(response.headers.date)).toBeTruthy()
      expect(response.headers.connection).toEqual('close')
      expect(response.data).toEqual('')
    })

    app.close()
  })

  it('Should be able to call the route in the POST method', async () => {
    const app = App()
    const router = Router()

    router.post('/', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('POST ok')
    })

    app.use(router)

    await superRequest(app).post('/').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('7')
      expect(response.data).toEqual('POST ok')
    })

    app.close()
  })

  it('Should be able to call the route in the PUT method', async () => {
    const app = App()
    const router = Router()

    router.put('/', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('PUT ok')
    })

    app.use(router)

    await superRequest(app).put('/').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('6')
      expect(response.data).toEqual('PUT ok')
    })

    app.close()
  })

  it('Should be able to call the route in the PATCH method', async () => {
    const app = App()
    const router = Router()

    router.patch('/', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('PATCH ok')
    })

    app.use(router)

    await superRequest(app).patch('/').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('8')
      expect(response.data).toEqual('PATCH ok')
    })

    app.close()
  })

  it('Should be able to call the route in the DELETE method', async () => {
    const app = App()
    const router = Router()

    router.delete('/', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('DELETE ok')
    })

    app.use(router)

    await superRequest(app).delete('/').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('9')
      expect(response.data).toEqual('DELETE ok')
    })

    app.close()
  })

  it('Should be able to call the route in the OPTIONS method', async () => {
    const app = App()
    const router = Router()

    router.options('/', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('')
    })

    app.use(router)

    await superRequest(app).options('/').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(Object.keys(response.headers).length).toEqual(5)
      expect(isUUID(response.headers['request-id'])).toBeTruthy()
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers.connection).toEqual('close')
      expect(isString(response.headers.date)).toBeTruthy()
      expect(response.headers['content-length']).toEqual('0')
      expect(response.data).toEqual('')
    })

    app.close()
  })

  it('throw new Error when duplicate route in GET method', async () => {
    try {
      const app = App()
      const router = Router()

      router.get('/get-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      router.get('/get-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /get-route route is duplicated for GET method.')
    }
  })

  it('throw new Error when duplicate route in HEAD method', async () => {
    try {
      const app = App()
      const router = Router()

      router.head('/head-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      router.head('/head-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /head-route route is duplicated for HEAD method.')
    }
  })

  it('throw new Error when duplicate route in POST method', async () => {
    try {
      const app = App()
      const router = Router()

      router.post('/post-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      router.post('/post-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /post-route route is duplicated for POST method.')
    }
  })

  it('throw new Error when duplicate route in PUT method', async () => {
    try {
      const app = App()
      const router = Router()

      router.put('/put-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      router.put('/put-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /put-route route is duplicated for PUT method.')
    }
  })

  it('throw new Error when duplicate route in PATCH method', async () => {
    try {
      const app = App()
      const router = Router()

      router.patch('/patch-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      router.patch('/patch-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /patch-route route is duplicated for PATCH method.')
    }
  })

  it('throw new Error when duplicate route in DELETE method', async () => {
    try {
      const app = App()
      const router = Router()

      router.delete('/delete-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      router.delete('/delete-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /delete-route route is duplicated for DELETE method.')
    }
  })

  it('throw new Error when duplicate route in OPTIONS method', async () => {
    try {
      const app = App()
      const router = Router()

      router.options('/options-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      router.options('/options-route', (_request: Request, response: Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /options-route route is duplicated for OPTIONS method.')
    }
  })

  it('Return not found if the route does not exist', async () => {
    const app = App()
    const router = Router()
    app.use(router)

    await superRequest(app).get('/').catch((error) => {
      expect(error.response.statusCode).toEqual(404)
      expect(error.response.headers['content-type']).toEqual('text/plain')
      expect(error.response.headers['access-control-allow-origin']).toEqual('*')
      expect(error.response.data).toEqual('Not Found')
    })

    app.close()
  })

  it('Return no content if the route has no handler', async () => {
    const app = App()
    const router = Router()
    router.get('/route-without-handler')
    app.use(router)

    await superRequest(app).get('/route-without-handler').then((response) => {
      expect(response.statusCode).toEqual(204)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.headers['access-control-allow-origin']).toEqual('*')
      expect(response.data).toEqual('')
    })

    app.close()
  })

  it('Should be able to manipulate multiple handlers with method handle', async () => {
    class ExampleMiddleware implements Middleware {
      public handle (_request: Request, _response: Response, next: NextFunction): void {
        next()
      }
    }

    class ExampleController implements Controller {
      public handle (_request: Request, response: Response): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(200).end('Return controller')
      }
    }

    const app = App()
    const router = Router()
    router.get(
      '/multiple-handlers',
      middlewareAdapter(new ExampleMiddleware()),
      controllerAdapter(new ExampleController())
    )
    app.use(router)

    await superRequest(app).get('/multiple-handlers').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('Return controller')
    })

    app.close()
  })

  it('Should be able to manipulate multiple handler functions', async () => {
    const exampleMiddleware = (_request: Request, _response: Response, next: NextFunction): void => {
      next()
    }

    const exampleController = (_request: Request, response: Response): void => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('Return controller')
    }

    const app = App()
    const router = Router()
    router.get('/multiple-handlers', exampleMiddleware, exampleController)
    app.use(router)

    await superRequest(app).get('/multiple-handlers').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('Return controller')
    })

    app.close()
  })

  it('throw new Error when using invalid middleware with error handler with method handle', async () => {
    const invalidMiddleware = (): any => {}

    class ErrorMiddleware implements ErrorHandlerMiddleware {
      public handle (error: any, _request: Request, response: Response): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(500).end(error.message)
      }
    }

    class ExampleController implements Controller {
      public handle (_request: Request, response: Response): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(200).end('Return controller')
      }
    }

    const app = App()
    app.use(invalidMiddleware)
    app.error(errorHandleAdapter(new ErrorMiddleware()))
    const router = Router()
    router.get('/', controllerAdapter(new ExampleController()))
    app.use(router)

    await superRequest(app).get('/').catch((error) => {
      expect(error.response.statusCode).toEqual(500)
      expect(error.response.headers['content-type']).toEqual('text/plain')
      expect(error.response.data).toEqual('vkrun-router: method use received invalid middleware.')
    })

    app.close()
  })

  it('throw new Error when using invalid middleware with error handler function', async () => {
    const invalidMiddleware = (): any => {}

    const errorMiddleware = (error: any, _request: Request, response: Response): void => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(500).end(error.message)
    }

    const exampleController = (_request: Request, response: Response): void => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('Return controller')
    }

    const app = App()
    app.use(invalidMiddleware)
    app.error(errorMiddleware)
    const router = Router()
    router.get('/', exampleController)
    app.use(router)

    await superRequest(app).get('/').catch((error) => {
      expect(error.response.statusCode).toEqual(500)
      expect(error.response.headers['content-type']).toEqual('text/plain')
      expect(error.response.data).toEqual('vkrun-router: method use received invalid middleware.')
    })

    app.close()
  })

  it('Should be able to use multiple Router instances', async () => {
    const app = App()
    const routerA = Router()
    const routerB = Router()

    routerA.get('/get', (_request: Request, response: Response) => {
      response.status(200).send('GET ok')
    })

    routerB.post('/post', (_request: Request, response: Response) => {
      response.status(200).send('POST ok')
    })

    app.use(routerA)
    app.use(routerB)

    await superRequest(app).get('/get').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('GET ok')
    })

    await superRequest(app).post('/post').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('POST ok')
    })

    app.close()
  })

  it('Should be able to create routes directly from the App instance', async () => {
    const app = App()

    app.get('/get', (_request: Request, response: Response) => {
      response.status(200).send('GET ok')
    })

    app.post('/post', (_request: Request, response: Response) => {
      response.status(200).send('POST ok')
    })

    await superRequest(app).get('/get').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('GET ok')
    })

    await superRequest(app).post('/post').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('POST ok')
    })

    app.close()
  })

  it('Should be able to work with multiple router instances and routes created directly in the App', async () => {
    const app = App()
    const routerA = Router()
    const routerB = Router()

    routerA.get('/example-a', (_request: Request, response: Response) => {
      response.status(200).send('GET ok')
    })

    routerB.post('/example-b', (_request: Request, response: Response) => {
      response.status(200).send('POST ok')
    })

    app.use(routerA)
    app.use(routerB)

    app.get('/example-c', (_request: Request, response: Response) => {
      response.status(200).send('GET ok')
    })

    app.post('/example-d', (_request: Request, response: Response) => {
      response.status(200).send('POST ok')
    })

    await superRequest(app).get('/example-a').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('GET ok')
    })

    await superRequest(app).post('/example-b').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('POST ok')
    })

    await superRequest(app).get('/example-c').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('GET ok')
    })

    await superRequest(app).post('/example-d').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('POST ok')
    })

    app.close()
  })

  it('Should handle route with * in GET method', async () => {
    const app = App()
    const router = Router()

    // Define a route with a wildcard
    router.get('/wildcard/*', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET wildcard ok')
    })

    app.use(router)

    await superRequest(app).get('/wildcard/test').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('GET wildcard ok')
    })

    await superRequest(app).get('/wildcard/another/test').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('GET wildcard ok')
    })

    app.close()
  })

  it('Should handle route with * in POST method', async () => {
    const app = App()
    const router = Router()

    // Define a route with a wildcard for POST requests
    router.post('/api/v1/*', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('POST wildcard ok')
    })

    app.use(router)

    await superRequest(app).post('/api/v1/test').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('POST wildcard ok')
    })

    await superRequest(app).post('/api/v1/another/route').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('POST wildcard ok')
    })

    app.close()
  })

  it('Should handle multiple levels of * in route', async () => {
    const app = App()
    const router = Router()

    // Define a route with multiple wildcard levels
    router.get('/products/*/details/*', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET multi-wildcard ok')
    })

    app.use(router)

    await superRequest(app).get('/products/123/details/456').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('GET multi-wildcard ok')
    })

    await superRequest(app).get('/products/abc/details/def').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('GET multi-wildcard ok')
    })

    app.close()
  })

  it('Should handle route with * in DELETE method', async () => {
    const app = App()
    const router = Router()

    // Define a route with a wildcard for DELETE requests
    router.delete('/remove/*', (_request: Request, response: Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('DELETE wildcard ok')
    })

    app.use(router)

    await superRequest(app).delete('/remove/123').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('DELETE wildcard ok')
    })

    await superRequest(app).delete('/remove/some/path').then((response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toEqual('text/plain')
      expect(response.data).toEqual('DELETE wildcard ok')
    })

    app.close()
  })
})
