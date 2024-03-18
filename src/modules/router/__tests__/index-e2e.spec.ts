import vkrun, {
  Router,
  controllerAdapter,
  errorHandleAdapter,
  middlewareAdapter,
  superRequest
} from '../../../index'
import * as util from '../../utils'
import * as type from '../../types'

describe('Router', () => {
  it('Should be able to call the route in the GET method', async () => {
    const app = vkrun()
    const router = Router()

    router.get('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('GET ok')
    })

    app.use(router)

    await superRequest(app).get('/')
      .then((response) => {
        expect(response.statusCode).toEqual(200)
        expect(Object.keys(response.headers).length).toEqual(5)
        expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
        expect(response.headers['content-type']).toEqual('text/plain')
        expect(response.headers.connection).toEqual('close')
        expect(util.isString(response.headers.date)).toBeTruthy()
        expect(response.headers['content-length']).toEqual('6')
        expect(response.data).toEqual('GET ok')
      })

    app.close()
  })

  it('Should be able to call the route in the HEAD method', async () => {
    const app = vkrun()
    const router = Router()

    router.head('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(204).end('HEAD ok')
    })

    app.use(router)

    await superRequest(app).head('/')
      .then((response) => {
        expect(response.statusCode).toEqual(204)
        expect(Object.keys(response.headers).length).toEqual(4)
        expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
        expect(response.headers['content-type']).toEqual('text/plain')
        expect(util.isString(response.headers.date)).toBeTruthy()
        expect(response.headers.connection).toEqual('close')
        expect(response.data).toEqual('')
      })

    app.close()
  })

  it('Should be able to call the route in the POST method', async () => {
    const app = vkrun()
    const router = Router()

    router.post('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('POST ok')
    })

    app.use(router)

    await superRequest(app).post('/')
      .then((response) => {
        expect(response.statusCode).toEqual(200)
        expect(Object.keys(response.headers).length).toEqual(5)
        expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
        expect(response.headers['content-type']).toEqual('text/plain')
        expect(response.headers.connection).toEqual('close')
        expect(util.isString(response.headers.date)).toBeTruthy()
        expect(response.headers['content-length']).toEqual('7')
        expect(response.data).toEqual('POST ok')
      })

    app.close()
  })

  it('Should be able to call the route in the PUT method', async () => {
    const app = vkrun()
    const router = Router()

    router.put('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('PUT ok')
    })

    app.use(router)

    await superRequest(app).put('/')
      .then((response) => {
        expect(response.statusCode).toEqual(200)
        expect(Object.keys(response.headers).length).toEqual(5)
        expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
        expect(response.headers['content-type']).toEqual('text/plain')
        expect(response.headers.connection).toEqual('close')
        expect(util.isString(response.headers.date)).toBeTruthy()
        expect(response.headers['content-length']).toEqual('6')
        expect(response.data).toEqual('PUT ok')
      })

    app.close()
  })

  it('Should be able to call the route in the PATCH method', async () => {
    const app = vkrun()
    const router = Router()

    router.patch('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('PATCH ok')
    })

    app.use(router)

    await superRequest(app).patch('/')
      .then((response) => {
        expect(response.statusCode).toEqual(200)
        expect(Object.keys(response.headers).length).toEqual(5)
        expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
        expect(response.headers['content-type']).toEqual('text/plain')
        expect(response.headers.connection).toEqual('close')
        expect(util.isString(response.headers.date)).toBeTruthy()
        expect(response.headers['content-length']).toEqual('8')
        expect(response.data).toEqual('PATCH ok')
      })

    app.close()
  })

  it('Should be able to call the route in the DELETE method', async () => {
    const app = vkrun()
    const router = Router()

    router.delete('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('DELETE ok')
    })

    app.use(router)

    await superRequest(app).delete('/')
      .then((response) => {
        expect(response.statusCode).toEqual(200)
        expect(Object.keys(response.headers).length).toEqual(5)
        expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
        expect(response.headers['content-type']).toEqual('text/plain')
        expect(response.headers.connection).toEqual('close')
        expect(util.isString(response.headers.date)).toBeTruthy()
        expect(response.headers['content-length']).toEqual('9')
        expect(response.data).toEqual('DELETE ok')
      })

    app.close()
  })

  it('Should be able to call the route in the OPTIONS method', async () => {
    const app = vkrun()
    const router = Router()

    router.options('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('OPTIONS ok')
    })

    app.use(router)

    await superRequest(app).options('/')
      .then((response) => {
        expect(response.statusCode).toEqual(200)
        expect(Object.keys(response.headers).length).toEqual(5)
        expect(util.isUUID(response.headers['request-id'])).toBeTruthy()
        expect(response.headers['content-type']).toEqual('text/plain')
        expect(response.headers.connection).toEqual('close')
        expect(util.isString(response.headers.date)).toBeTruthy()
        expect(response.headers['content-length']).toEqual('10')
        expect(response.data).toEqual('OPTIONS ok')
      })

    app.close()
  })
  // parei aqui
  // it('throw new Error when duplicate route in GET method', async () => {
  //   try {
  //     const app = vkrun()
  //     const router = Router()

  //     router.get('/get-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     router.get('/get-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     app.use(router)
  //   } catch (error: any) {
  //     expect(error.message).toEqual('vkrun-router: /get-route route is duplicated for GET method.')
  //   }
  // })

  // it('throw new Error when duplicate route in HEAD method', async () => {
  //   try {
  //     const app = vkrun()
  //     const router = Router()

  //     router.head('/head-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     router.head('/head-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     app.use(router)
  //   } catch (error: any) {
  //     expect(error.message).toEqual('vkrun-router: /head-route route is duplicated for HEAD method.')
  //   }
  // })

  // it('throw new Error when duplicate route in POST method', async () => {
  //   try {
  //     const app = vkrun()
  //     const router = Router()

  //     router.post('/post-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     router.post('/post-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     app.use(router)
  //   } catch (error: any) {
  //     expect(error.message).toEqual('vkrun-router: /post-route route is duplicated for POST method.')
  //   }
  // })

  // it('throw new Error when duplicate route in PUT method', async () => {
  //   try {
  //     const app = vkrun()
  //     const router = Router()

  //     router.put('/put-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     router.put('/put-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     app.use(router)
  //   } catch (error: any) {
  //     expect(error.message).toEqual('vkrun-router: /put-route route is duplicated for PUT method.')
  //   }
  // })

  // it('throw new Error when duplicate route in PATCH method', async () => {
  //   try {
  //     const app = vkrun()
  //     const router = Router()

  //     router.patch('/patch-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     router.patch('/patch-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     app.use(router)
  //   } catch (error: any) {
  //     expect(error.message).toEqual('vkrun-router: /patch-route route is duplicated for PATCH method.')
  //   }
  // })

  // it('throw new Error when duplicate route in DELETE method', async () => {
  //   try {
  //     const app = vkrun()
  //     const router = Router()

  //     router.delete('/delete-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     router.delete('/delete-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     app.use(router)
  //   } catch (error: any) {
  //     expect(error.message).toEqual('vkrun-router: /delete-route route is duplicated for DELETE method.')
  //   }
  // })

  // it('throw new Error when duplicate route in OPTIONS method', async () => {
  //   try {
  //     const app = vkrun()
  //     const router = Router()

  //     router.options('/options-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     router.options('/options-route', (_request: type.Request, response: type.Response) => {
  //       response.status(200).end()
  //     })

  //     app.use(router)
  //   } catch (error: any) {
  //     expect(error.message).toEqual('vkrun-router: /options-route route is duplicated for OPTIONS method.')
  //   }
  // })

  // it('Return not found if the route does not exist', async () => {
  //   const app = vkrun()
  //   const router = Router()
  //   app.use(router)

  //   await superRequest(app).get('/').catch((error) => {
  //     expect(error.response.statusCode).toEqual(404)
  //     expect(error.response.headers['content-type']).toEqual('text/plain')
  //     expect(error.response.headers['access-control-allow-origin']).toEqual('*')
  //     expect(error.response.data).toEqual('Not Found')
  //   })

  //   app.close()
  // })

  // it('Return no content if the route has no handler', async () => {
  //   const app = vkrun()
  //   const router = Router()
  //   router.get('/route-without-handler')
  //   app.use(router)

  //   await superRequest(app).get('/route-without-handler')
  //     .then((response) => {
  //       expect(response.statusCode).toEqual(204)
  //       expect(response.headers['content-type']).toEqual('text/plain')
  //       expect(response.headers['access-control-allow-origin']).toEqual('*')
  //       expect(response.data).toEqual('')
  //     })

  //   app.close()
  // })

  // it('Should be able to manipulate multiple handlers with method handle', async () => {
  //   class ExampleMiddleware implements type.Middleware {
  //     public handle (_request: type.Request, _response: type.Response, next: type.NextFunction): void {
  //       next()
  //     }
  //   }

  //   class ExampleController implements type.Controller {
  //     public handle (_request: type.Request, response: type.Response): void {
  //       response.setHeader('Content-Type', 'text/plain')
  //       response.status(200).end('Return controller')
  //     }
  //   }

  //   const app = vkrun()
  //   const router = Router()
  //   router.get(
  //     '/multiple-handlers',
  //     middlewareAdapter(new ExampleMiddleware()),
  //     controllerAdapter(new ExampleController())
  //   )
  //   app.use(router)

  //   await superRequest(app).get('/multiple-handlers')
  //     .then((response) => {
  //       expect(response.statusCode).toEqual(200)
  //       expect(response.headers['content-type']).toEqual('text/plain')
  //       expect(response.data).toEqual('Return controller')
  //     })

  //   app.close()
  // })

  // it('Should be able to manipulate multiple handler functions', async () => {
  //   const exampleMiddleware = (_request: type.Request, _response: type.Response, next: type.NextFunction): void => {
  //     next()
  //   }

  //   const exampleController = (_request: type.Request, response: type.Response): void => {
  //     response.setHeader('Content-Type', 'text/plain')
  //     response.status(200).end('Return controller')
  //   }

  //   const app = vkrun()
  //   const router = Router()
  //   router.get('/multiple-handlers', exampleMiddleware, exampleController)
  //   app.use(router)

  //   await superRequest(app).get('/multiple-handlers')
  //     .then((response) => {
  //       expect(response.statusCode).toEqual(200)
  //       expect(response.headers['content-type']).toEqual('text/plain')
  //       expect(response.data).toEqual('Return controller')
  //     })

  //   app.close()
  // })

  // it('throw new Error when using invalid middleware with error handler with method handle', async () => {
  //   const invalidMiddleware = (): any => {}

  //   class ErrorMiddleware implements type.ErrorHandlerMiddleware {
  //     public handle (error: any, _request: type.Request, response: type.Response, _next: type.NextFunction): void {
  //       response.setHeader('Content-Type', 'text/plain')
  //       response.status(500).end(error.message)
  //     }
  //   }

  //   class ExampleController implements type.Controller {
  //     public handle (_request: type.Request, response: type.Response): void {
  //       response.setHeader('Content-Type', 'text/plain')
  //       response.status(200).end('Return controller')
  //     }
  //   }

  //   const app = vkrun()
  //   app.use(invalidMiddleware)
  //   app.use(errorHandleAdapter(new ErrorMiddleware()))
  //   const router = Router()
  //   router.get('/', controllerAdapter(new ExampleController()))
  //   app.use(router)

  //   await superRequest(app).get('/').catch((error) => {
  //     expect(error.response.statusCode).toEqual(500)
  //     expect(error.response.headers['content-type']).toEqual('text/plain')
  //     expect(error.response.data).toEqual('vkrun-router: method use received invalid middleware.')
  //   })

  //   app.close()
  // })

  // it('throw new Error when using invalid middleware with error handler function', async () => {
  //   const invalidMiddleware = (): any => {}

  //   const errorMiddleware = (error: any, _request: type.Request, response: type.Response, _next: type.NextFunction): void => {
  //     response.setHeader('Content-Type', 'text/plain')
  //     response.status(500).end(error.message)
  //   }

  //   const exampleController = (_request: type.Request, response: type.Response): void => {
  //     response.setHeader('Content-Type', 'text/plain')
  //     response.status(200).end('Return controller')
  //   }

  //   const app = vkrun()
  //   app.use(invalidMiddleware)
  //   app.use(errorMiddleware)
  //   const router = Router()
  //   router.get('/', exampleController)
  //   app.use(router)

  //   await superRequest(app).get('/').catch((error) => {
  //     expect(error.response.statusCode).toEqual(500)
  //     expect(error.response.headers['content-type']).toEqual('text/plain')
  //     expect(error.response.data).toEqual('vkrun-router: method use received invalid middleware.')
  //   })

  //   app.close()
  // })

  // it('Should respond error message if response is in invalid format and has ErrorHandler middleware', async () => {
  //   const invalidMiddleware = (_request: type.Request, response: type.Response, _next: type.NextFunction): void => {
  //     response.setHeader('Content-Type', 'text/plain')
  //     response.status(500).write({ message: 'ok' })
  //   }

  //   class ErrorMiddleware implements type.ErrorHandlerMiddleware {
  //     public handle (error: Error, _request: type.Request, response: type.Response, _next: type.NextFunction): void {
  //       response.setHeader('Content-Type', 'text/plain')
  //       response.status(500).end(error.message)
  //     }
  //   }

  //   class ExampleController implements type.Controller {
  //     public handle (_request: type.Request, response: type.Response): void {
  //       response.setHeader('Content-Type', 'text/plain')
  //       response.status(200).end('Return controller')
  //     }
  //   }

  //   const app = vkrun()
  //   app.use(invalidMiddleware)
  //   app.use(errorHandleAdapter(new ErrorMiddleware()))
  //   const router = Router()
  //   router.get('/', controllerAdapter(new ExampleController()))
  //   app.use(router)

  //   await superRequest(app).get('/').catch((error) => {
  //     expect(error.response.statusCode).toEqual(500)
  //     expect(error.response.headers['content-type']).toEqual('text/plain')
  //     expect(error.response.data).toEqual('The "chunk" argument must be of type string or an instance of Buffer or Uint8Array. Received an instance of Object')
  //   })

  //   app.close()
  // })
})
