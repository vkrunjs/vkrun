import axios from 'axios'
import vkrun, { Router, parseData, validateRouteData, schema } from '../../../index'
import * as type from '../../types'

describe('Validate Route Data - end to end testing using axios and app server', () => {
  let server: any

  afterEach(() => {
    // close server if test fails or causes error
    if (server?.listening) {
      server.close()
    }
  })

  const schemaData = schema().object({
    params: schema().object({
      string: schema().string().email(),
      integer: schema().number().integer()
    }),
    query: schema().object({
      float: schema().number().float(),
      boolean: schema().boolean(),
      date: schema().date()
    }),
    files: schema().array().notRequired(),
    body: schema().object({
      string: schema().string().email(),
      integer: schema().number().integer(),
      float: schema().number().float(),
      boolean: schema().boolean(),
      date: schema().date()
    })
  })

  it('Should validate and successfully pass through the middleware', async () => {
    const app = vkrun()
    app.use(parseData())
    app.use(validateRouteData(schemaData))
    const router = Router()

    router.post('/params/:string/:integer/query', (request: type.Request, response: type.Response) => {
      const requestData = {
        query: request.query,
        params: request.params,
        files: request?.files,
        body: request.body
      }

      expect(requestData).toEqual({
        params: {
          string: 'any@mail.com',
          integer: 123
        },
        query: {
          float: 1.56,
          boolean: true,
          date: new Date('2000-02-03T02:00:00.000Z')
        },
        body: {
          string: 'any@mail.com',
          integer: 123,
          float: 1.56,
          boolean: true,
          date: new Date('2000-02-03T02:00:00.000Z')
        }
      })
      response.status(200).end('Success!')
    })

    app.use(router)
    server = app.server()
    server.listen(3499)

    const path = 'params/any@mail.com/123/query?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z'
    const data = {
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    }

    await axios.post(`http://localhost:3499/${path}`, data).then((response) => {
      expect(response.status).toEqual(200)
      expect(response.data).toEqual('Success!')
    })

    app.close()
  })

  it('Should validate and return bad request when it has any invalid data', async () => {
    const app = vkrun()
    app.use(parseData())
    app.use(validateRouteData(schemaData))
    const router = Router()

    router.post('/params/:string/:integer/query', (request: type.Request, response: type.Response) => {
      response.status(200).json({
        query: request.query,
        params: request.params,
        files: request?.files,
        body: request.body
      })
    })

    app.use(router)
    server = app.server()
    server.listen(3498)

    const path = 'params/any@mail.com/123/query?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z'
    const data = {
      string: 'any@', // Invalid email
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    }

    await axios.post(`http://localhost:3498/${path}`, data).catch((error) => {
      expect(error.response.data).toEqual('email any@ is invalid!')
    })

    app.close()
  })
})
