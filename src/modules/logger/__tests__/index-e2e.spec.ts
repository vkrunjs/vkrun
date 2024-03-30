import v from '../../../index'
import { Logger } from '..'
import { getLog } from '../helpers/get-log'
import { removeLogsFolder } from '../helpers/remove-logs-folder'

describe('Logger Middleware - end to end testing using super request', () => {
  beforeEach(async () => { await removeLogsFolder() })
  afterEach(async () => { await removeLogsFolder() })

  it('Should create a log with middleware', async () => {
    const app = v.App()
    const logger = Logger({ level: 'http' })
    const router = v.Router()
    app.use(v.parseData())
    app.use(logger.middleware())
    app.use(router)

    const data = {
      array: ['string', true, false, 123, 1.56, new Date('2000-02-03T02:00:00.000Z')],
      object: {
        key: 'string'
      }
    }

    router.post('/:string/:integer/query', (_request: v.Request, response: v.Response) => {
      response.status(200).json({ result: 'ok' })
    })

    const path = '/any@mail.com/123/query?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z'

    await v.superRequest(app).post(path, data).then((response) => {
      expect(response.statusCode).toEqual(200)
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

    expect(request.socket).toEqual({})

    const header = request.header
    expect(header['content-type']).toEqual('application/json')

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
  })
})
