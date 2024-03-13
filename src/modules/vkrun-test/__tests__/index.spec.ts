import { vkrunTest } from '..'
import { Router } from '../../router'
import vkrun from '../../..'
import { parseData } from '../../parse-data'
import * as util from '../../utils'
import * as type from '../../types'

describe('App', () => {
  it('Should request with POST method', async () => {
    const app = vkrun()
    const router = Router()
    router.post('/post', (request: type.Request, response: type.Response) => {
      response.status(200).json({ message: 'POST OK' })
    })

    app.use(parseData())
    app.use(router)

    const data = { email: 'any@gmail.com', password: '123' }
    const options = {
      headers: {
        'content-type': 'application/json'
      }
    }

    const sut = await vkrunTest(app).post('/post', data, options)

    expect(sut.statusCode).toEqual(200)
    expect(sut.statusText).toEqual('OK')
    expect(util.isUUID(sut.headers['request-id'])).toBeTruthy()
    expect(sut.headers['content-type']).toEqual('application/json')
    expect(sut.data).toEqual({ message: 'POST OK' })
  })

  it('Should request with GET method', async () => {
    const app = vkrun()
    const router = Router()
    router.get('/get', (request: type.Request, response: type.Response) => {
      response.status(200).json({ message: 'GET OK' })
    })

    app.use(parseData())
    app.use(router)

    const sut = await vkrunTest(app).get('/get')
    console.log({ sut })
    expect(sut.statusCode).toEqual(200)
    expect(sut.statusText).toEqual('OK')
    expect(util.isUUID(sut.headers['request-id'])).toBeTruthy()
    expect(sut.headers['content-type']).toEqual('application/json')
    expect(sut.data).toEqual({ message: 'GET OK' })
  })
})
