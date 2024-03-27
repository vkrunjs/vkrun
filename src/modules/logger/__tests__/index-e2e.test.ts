import v from '../../../index'
import axios from 'axios'
import { createLogger } from '..'
import { getLog } from '../helpers/get-log'
import { removeLogsFolder } from '../helpers/remove-logs-folder'

describe('Logger Middleware - end to end testing using axios and app server', () => {
  let server: any

  beforeEach(async () => { await removeLogsFolder() })

  afterEach(async () => {
    await removeLogsFolder()

    // close server if test fails or causes error
    if (server?.listening) {
      server.close()
    }
  })

  it('Should create a log with middleware', async () => {
    const app = v.App()
    const logger = createLogger({ level: 'http' })
    const router = v.Router()
    app.use(v.parseData())
    app.use(logger.middleware())
    app.use(router)

    server = app.server()

    const data = {
      array: ['string', true, false, 123, 1.56, new Date('2000-02-03T02:00:00.000Z')],
      object: {
        key: 'string'
      }
    }

    router.post('/:string/:integer/query', (_request: v.Request, response: v.Response) => {
      response.status(200).json({ result: 'ok' })
    })

    server.listen(3699)

    const url = 'http://localhost:3699/any@mail.com/123/query?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z'

    await axios.post(url, data).then((response) => {
      expect(response.status).toEqual(200)
    })

    app.close()

    const log = getLog('default', 'log')
    const receivedLog = JSON.parse(log.content[0])

    expect(receivedLog.level).toEqual('http')
    expect(receivedLog.date).toEqual(`${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}`)

    const request = receivedLog.message.request
    expect(v.isUUID(request.requestId)).toBeTruthy()
    expect(request.url).toEqual('/any@mail.com/123/query?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z')
    expect(request.method).toEqual('POST')

    const socket = request.socket
    expect(socket.remoteAddress).toEqual('::1')
    expect(v.isNumber(socket.remotePort)).toBeTruthy()

    const header = request.header
    expect(header.accept).toEqual('application/json, text/plain, */*')
    expect(header['content-type']).toEqual('application/json')
    expect(header['user-agent']).toEqual('axios/1.6.7')
    expect(header['content-length']).toEqual('93')
    expect(header['accept-encoding']).toEqual('gzip, compress, deflate, br')
    expect(header.host).toEqual('localhost:3699')
    expect(header.connection).toEqual('close')

    const body = request.body
    expect(body).toEqual({
      array: ['string', true, false, 123, 1.56, '2000-02-03T02:00:00.000Z'],
      object: { key: 'string' }
    })

    const params = request.params
    expect(params).toEqual({
      string: 'any@mail.com',
      integer: 123
    })

    const query = request.query
    expect(query).toEqual({
      float: 1.56,
      boolean: true,
      date: '2000-02-03T02:00:00.000Z'
    })

    const response = receivedLog.message.response
    expect(response.statusCode).toEqual(200)
    expect(response.statusMessage).toEqual('OK')
    expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
    expect(response.body).toEqual({ result: 'ok' })
  })
})
