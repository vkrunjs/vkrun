import axios from 'axios'
import vkrun, { Router, controllerAdapter, errorHandleAdapter, middlewareAdapter } from '../../../index'
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
    const server = app.server()
    server.listen(3699)

    await axios.get('http://localhost:3699/')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('GET ok')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Should be able to call the route in the HEAD method', async () => {
    const app = vkrun()
    const router = Router()

    router.head('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(204).end()
    })

    app.use(router)
    const server = app.server()
    server.listen(3698)

    await axios.head('http://localhost:3698/')
      .then((response) => {
        expect(response.status).toEqual(204)
        expect(response.headers['content-type']).toEqual('text/plain')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Should be able to call the route in the POST method', async () => {
    const app = vkrun()
    const router = Router()

    router.post('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('POST ok')
    })

    app.use(router)
    const server = app.server()
    server.listen(3697)

    await axios.post('http://localhost:3697/')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('POST ok')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Should be able to call the route in the PUT method', async () => {
    const app = vkrun()
    const router = Router()

    router.put('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('PUT ok')
    })

    app.use(router)
    const server = app.server()
    server.listen(3696)

    await axios.put('http://localhost:3696/')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('PUT ok')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Should be able to call the route in the PATCH method', async () => {
    const app = vkrun()
    const router = Router()

    router.patch('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('PATCH ok')
    })

    app.use(router)
    const server = app.server()
    server.listen(3695)

    await axios.patch('http://localhost:3695/')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('PATCH ok')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Should be able to call the route in the DELETE method', async () => {
    const app = vkrun()
    const router = Router()

    router.delete('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('DELETE ok')
    })

    app.use(router)
    const server = app.server()
    server.listen(3694)

    await axios.delete('http://localhost:3694/')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('DELETE ok')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Should be able to call the route in the OPTIONS method', async () => {
    const app = vkrun()
    const router = Router()

    router.options('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('OPTIONS ok')
    })

    app.use(router)
    const server = app.server()
    server.listen(3693)

    await axios.options('http://localhost:3693/')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('OPTIONS ok')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('throw new Error when duplicate route in GET method', async () => {
    try {
      const app = vkrun()
      const router = Router()

      router.get('/get-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      router.get('/get-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /get-route route is duplicated for GET method.')
    }
  })

  it('throw new Error when duplicate route in HEAD method', async () => {
    try {
      const app = vkrun()
      const router = Router()

      router.head('/head-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      router.head('/head-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /head-route route is duplicated for HEAD method.')
    }
  })

  it('throw new Error when duplicate route in POST method', async () => {
    try {
      const app = vkrun()
      const router = Router()

      router.post('/post-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      router.post('/post-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /post-route route is duplicated for POST method.')
    }
  })

  it('throw new Error when duplicate route in PUT method', async () => {
    try {
      const app = vkrun()
      const router = Router()

      router.put('/put-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      router.put('/put-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /put-route route is duplicated for PUT method.')
    }
  })

  it('throw new Error when duplicate route in PATCH method', async () => {
    try {
      const app = vkrun()
      const router = Router()

      router.patch('/patch-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      router.patch('/patch-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /patch-route route is duplicated for PATCH method.')
    }
  })

  it('throw new Error when duplicate route in DELETE method', async () => {
    try {
      const app = vkrun()
      const router = Router()

      router.delete('/delete-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      router.delete('/delete-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /delete-route route is duplicated for DELETE method.')
    }
  })

  it('throw new Error when duplicate route in OPTIONS method', async () => {
    try {
      const app = vkrun()
      const router = Router()

      router.options('/options-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      router.options('/options-route', (_request: type.Request, response: type.Response) => {
        response.status(200).end()
      })

      app.use(router)
    } catch (error: any) {
      expect(error.message).toEqual('vkrun-router: /options-route route is duplicated for OPTIONS method.')
    }
  })

  it('Return not found if the route does not exist', async () => {
    const app = vkrun()
    const router = Router()
    app.use(router)
    const server = app.server()
    server.listen(3692)

    await axios.get('http://localhost:3692/')
      .then((response) => {
        expect(response).toEqual(undefined)
      }).catch((error) => {
        expect(error.response.status).toEqual(404)
        expect(error.response.headers['content-type']).toEqual('text/plain')
        expect(error.response.headers['access-control-allow-origin']).toEqual('*')
        expect(error.response.data).toEqual('Not Found')
      })

    server.close()
  })

  it('Return no content if the route has no handler', async () => {
    const app = vkrun()
    const router = Router()
    router.get('/route-without-handler')
    app.use(router)
    const server = app.server()

    server.listen(3691)

    await axios.get('http://localhost:3691/route-without-handler')
      .then((response) => {
        expect(response.status).toEqual(204)
        expect(response.headers['content-type']).toEqual('text/plain')
        expect(response.headers['access-control-allow-origin']).toEqual('*')
        expect(response.data).toEqual('')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Should be able to manipulate multiple handlers with method handle', async () => {
    class ExampleMiddleware implements type.Middleware {
      public handle (_request: type.Request, _response: type.Response, next: type.NextFunction): void {
        next()
      }
    }

    class ExampleController implements type.Controller {
      public handle (_request: type.Request, response: type.Response): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(200).end('Return controller')
      }
    }

    const app = vkrun()
    const router = Router()
    router.get(
      '/multiple-handlers',
      middlewareAdapter(new ExampleMiddleware()),
      controllerAdapter(new ExampleController())
    )
    app.use(router)
    const server = app.server()

    server.listen(3690)

    await axios.get('http://localhost:3690/multiple-handlers')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toEqual('text/plain')
        expect(response.data).toEqual('Return controller')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('Should be able to manipulate multiple handler functions', async () => {
    const exampleMiddleware = (_request: type.Request, _response: type.Response, next: type.NextFunction): void => {
      next()
    }

    const exampleController = (_request: type.Request, response: type.Response): void => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('Return controller')
    }

    const app = vkrun()
    const router = Router()
    router.get('/multiple-handlers', exampleMiddleware, exampleController)
    app.use(router)
    const server = app.server()

    server.listen(3689)

    await axios.get('http://localhost:3689/multiple-handlers')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toEqual('text/plain')
        expect(response.data).toEqual('Return controller')
      }).catch((error) => {
        expect(error).toEqual(undefined)
      })

    server.close()
  })

  it('throw new Error when using invalid middleware with error handler with method handle', async () => {
    const invalidMiddleware = (): any => {}

    class ErrorMiddleware implements type.ErrorHandlerMiddleware {
      public handle (error: any, _request: type.Request, response: type.Response, _next: type.NextFunction): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(500).end(error.message)
      }
    }

    class ExampleController implements type.Controller {
      public handle (_request: type.Request, response: type.Response): void {
        response.setHeader('Content-Type', 'text/plain')
        response.status(200).end('Return controller')
      }
    }

    const app = vkrun()
    app.use(invalidMiddleware)
    app.use(errorHandleAdapter(new ErrorMiddleware()))
    const router = Router()
    router.get('/', controllerAdapter(new ExampleController()))
    app.use(router)
    const server = app.server()

    server.listen(3688)

    await axios.get('http://localhost:3688/')
      .then((response) => {
        expect(response).toEqual(undefined)
      }).catch((error) => {
        expect(error.response.status).toEqual(500)
        expect(error.response.headers['content-type']).toEqual('text/plain')
        expect(error.response.data).toEqual('vkrun-router: method use received invalid middleware.')
      })

    server.close()
  })

  it('throw new Error when using invalid middleware with error handler function', async () => {
    const invalidMiddleware = (): any => {}

    const errorMiddleware = (error: any, _request: type.Request, response: type.Response, _next: type.NextFunction): void => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(500).end(error.message)
    }

    const exampleController = (_request: type.Request, response: type.Response): void => {
      response.setHeader('Content-Type', 'text/plain')
      response.status(200).end('Return controller')
    }

    const app = vkrun()
    app.use(invalidMiddleware)
    app.use(errorMiddleware)
    const router = Router()
    router.get('/', exampleController)
    app.use(router)
    const server = app.server()

    server.listen(3687)

    await axios.get('http://localhost:3687/')
      .then((response) => {
        expect(response).toEqual(undefined)
      }).catch((error) => {
        expect(error.response.status).toEqual(500)
        expect(error.response.headers['content-type']).toEqual('text/plain')
        expect(error.response.data).toEqual('vkrun-router: method use received invalid middleware.')
      })

    server.close()
  })

  // testar app.use middleware handler e function, parse data e cors
})
