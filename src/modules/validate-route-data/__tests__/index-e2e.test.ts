import axios from 'axios'
import v from '../../../index'
import * as type from '../../types'

describe('Validate Route Data - end to end testing using axios and app server', () => {
  let server: any

  afterEach(() => {
    // close server if test fails or causes error
    if (server?.listening) {
      server.close()
    }
  })

  const schemaData = v.schema().object({
    params: v.schema().object({
      string: v.schema().string().email(),
      integer: v.schema().number().integer()
    }),
    query: v.schema().object({
      float: v.schema().number().float(),
      boolean: v.schema().boolean(),
      date: v.schema().date()
    }),
    files: v.schema().array().notRequired(),
    body: v.schema().object({
      string: v.schema().string().email(),
      integer: v.schema().number().integer(),
      float: v.schema().number().float(),
      boolean: v.schema().boolean(),
      date: v.schema().date()
    })
  })

  it('Should validate and successfully pass through the middleware', async () => {
    const app = v.App()
    app.use(v.parseData())
    app.use(v.validateRouteData(schemaData))
    const router = v.Router()

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
    const app = v.App()
    app.use(v.parseData())
    app.use(v.validateRouteData(schemaData))
    const router = v.Router()

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
