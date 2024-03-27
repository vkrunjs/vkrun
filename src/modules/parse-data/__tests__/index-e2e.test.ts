import * as v from '../../../index'
import * as http from 'http'
import { readFileSync, unlinkSync, writeFileSync } from 'fs'
import FormData from 'form-data'
import axios from 'axios'
import path from 'path'

describe('Parse Data - end to end testing using axios and app server', () => {
  let server: any

  afterEach(() => {
    // close server if test fails or causes error
    if (server?.listening) {
      server.close()
    }
  })

  const validateHeaderSuccess = (response: any): void => {
    expect(response.status).toEqual(200)
    expect(Object.keys(response.headers).length).toEqual(4)
    expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
    expect(v.isString(response.headers.date)).toBeTruthy()
    expect(response.headers.connection).toEqual('close')
    expect(response.headers['content-length']).toEqual('0')
    expect(response.data).toEqual('')
  }

  it('Should be able to parse query url', async () => {
    let requestQuery

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.get('/query', (request: v.Request, response: v.Response) => {
      requestQuery = request.query
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3999)

    const query = 'string=any@mail.com&integer=123&float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z'
    await axios.get(`http://localhost:3999/query?${query}`).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestQuery).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    })
  })

  it('Should be able to parse params url', async () => {
    let requestParams

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.get('/params/:string/:integer/:float/:boolean/:date', (request: v.Request, response: v.Response) => {
      requestParams = request.params
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3998)

    await axios.get('http://localhost:3998/params/any@mail.com/123/1.56/true/2000-02-03T02:00:00.000Z').then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestParams).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    })
  })

  it('Should be able to parse the JSON body in the POST method', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.post('/body-post', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3997)

    const data = {
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z'),
      array: ['string', true, false, 123, 1.56, new Date('2000-02-03T02:00:00.000Z')],
      object: {
        key: 'string'
      }
    }

    await axios.post('http://localhost:3997/body-post', data).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual(data)
  })

  it('Should be able to parse the JSON body in the PUT method', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.put('/body-put', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3996)

    const data = {
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    }

    await axios.put('http://localhost:3996/body-put', data).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual(data)
  })

  it('Should be able to parse the JSON body in the PATCH method', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.patch('/body-patch', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3995)

    const data = {
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    }

    await axios.patch('http://localhost:3995/body-patch', data).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual(data)
  })

  it('Should be able to parse the urlencoded body in the POST method', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.post('/body-post', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3994)

    const urlencoded = 'string=any%40mail.com&integer=123&float=1.56&boolean=true&date=2000-02-03T02%3A00%3A00.000Z'

    await axios.post('http://localhost:3994/body-post', urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    })
  })

  it('Should be able to parse the urlencoded body in the PUT method', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.put('/body-put', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3993)

    const urlencoded = 'string=any%40mail.com&integer=123&float=1.56&boolean=true&date=2000-02-03T02%3A00%3A00.000Z'

    await axios.put('http://localhost:3993/body-put', urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    })
  })

  it('Should be able to parse the urlencoded body in the PATCH method', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.patch('/body-patch', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3993)

    const urlencoded = 'string=any%40mail.com&integer=123&float=1.56&boolean=true&date=2000-02-03T02%3A00%3A00.000Z'

    await axios.patch('http://localhost:3993/body-patch', urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    })
  })

  it('Should be able to parse the form data body in the POST method', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.post('/body-post', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3992)

    const fileContent = 'Text file'
    const fileName = 'filename.txt'
    const filePath = path.join(__dirname, fileName)

    writeFileSync(filePath, fileContent)

    const data = new FormData()
    data.append('string', 'any@mail.com')
    data.append('integer', String(123))
    data.append('float', String(1.56))
    data.append('boolean', String(true))
    data.append('date', new Date('2000-02-03T02:00:00.000Z').toISOString())

    const fileBuffer = readFileSync(filePath)

    data.append('file', fileBuffer, fileName)

    await axios.post('http://localhost:3992/body-post', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      validateHeaderSuccess(response)
    }).finally(() => {
      unlinkSync(filePath)
    })

    app.close()

    expect(requestBody).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    })
  })

  it('Should be able to parse the form data body in the PUT method', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.put('/body-put', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3991)

    const data = new FormData()
    data.append('string', 'any@mail.com')
    data.append('integer', String(123))
    data.append('float', String(1.56))
    data.append('boolean', String(true))
    data.append('date', new Date('2000-02-03T02:00:00.000Z').toISOString())

    await axios.put('http://localhost:3991/body-put', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    })
  })

  it('Should be able to parse the form data body in the PATCH method', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.patch('/body-patch', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3990)

    const data = new FormData()
    data.append('string', 'any@mail.com')
    data.append('integer', String(123))
    data.append('float', String(1.56))
    data.append('boolean', String(true))
    data.append('date', new Date('2000-02-03T02:00:00.000Z').toISOString())

    await axios.patch('http://localhost:3990/body-patch', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    })
  })

  it('Should be able to use a string body in the POST, PUT, or PATCH method when not providing a content type supported by the data analysis module', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.post('/body-post', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3989)

    const data = {
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    }

    await axios.post('http://localhost:3989/body-post', data, {
      headers: { 'Content-Type': 'text/plain' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual(JSON.stringify(data))
  })

  it('Should be able to parse a string and parse it if there is SQL when the content type is JSON', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData({ escapeSQL: true }))
    const router = v.Router()

    router.post('/body-post', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3988)

    const data = { sql: 'SELECT * FROM USER;' }

    await axios.post('http://localhost:3988/body-post', data).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual({ sql: "'SELECT * FROM USER;'" })
  })

  it('Should be able to parse a string and parse it if there is SQL when the content type is urlencoded', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData({ escapeSQL: true }))
    const router = v.Router()

    router.post('/body-post', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3987)

    const urlencoded = 'sql=SELECT * FROM USER;'

    await axios.post('http://localhost:3987/body-post', urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual({ sql: "'SELECT * FROM USER;'" })
  })

  it('Should be able to parse a string and parse it if there is SQL when the content type is form data', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData({ escapeSQL: true }))
    const router = v.Router()

    router.post('/body-post', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3986)

    const data = new FormData()
    data.append('sql', 'SELECT * FROM USER;')

    await axios.post('http://localhost:3986/body-post', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual({ sql: "'SELECT * FROM USER;'" })
  })

  it('Should be able to parse a string and parse it if there is SQL with others content types', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData({ escapeSQL: true }))
    const router = v.Router()

    router.post('/body-post', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3986)

    const data = 'SELECT * FROM USER;'

    await axios.post('http://localhost:3986/body-post', data, {
      headers: { 'Content-Type': 'text/plain' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual("'SELECT * FROM USER;'")
  })

  it('Should be able to parse the query if there is SQL', async () => {
    let requestQuery

    const app = v.App()
    app.use(v.parseData({ escapeSQL: true }))
    const router = v.Router()

    router.get('/query', (request: v.Request, response: v.Response) => {
      requestQuery = request.query
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3985)

    const query = 'sql=SELECT * FROM USER;'
    await axios.get(`http://localhost:3985/query?${query}`).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestQuery).toEqual({ sql: "'SELECT * FROM USER;'" })
  })

  it('Should be able to parse the params if there is SQL', async () => {
    let requestQuery

    const app = v.App()
    app.use(v.parseData({ escapeSQL: true }))
    const router = v.Router()

    router.get('/:sql', (request: v.Request, response: v.Response) => {
      requestQuery = request.params
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3984)

    const data = 'SELECT * FROM USER;'
    await axios.get(`http://localhost:3984/${data}`).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestQuery).toEqual({ sql: "'SELECT%20*%20FROM%20USER;'" })
  })

  it('Return bad request if invalid request data', async () => {
    const requestMock: any = {
      socket: {},
      headers: { 'Content-Type': 'application/json' },
      _httpMessage: {},
      body: ''
    }

    const server = http.createServer((_request: any, response: any) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      v.parseData().handle(requestMock, response, () => {})
    })
    server.listen(3983)

    const data = ''

    await axios.post('http://localhost:3983/body-post', data, {
      headers: { 'Content-Type': 'application/json' }
    }).catch((error) => {
      expect(error.response.status).toEqual(400)
      expect(error.response.data).toEqual('Invalid Request Data')
    })

    server.close()
  })

  it('Should be able to return undefined body if request body is empty and content type is multipart/form-data', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    router.post('/body-post', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3982)

    await axios.post('http://localhost:3982/body-post', '', {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual(undefined)
  })

  it('Should be able to return string json body if all config parse data is false', async () => {
    let requestBody

    const app = v.App()
    app.use(v.parseData({
      urlencoded: false,
      params: false,
      query: false,
      json: false,
      formData: false,
      escapeSQL: false
    }))
    const router = v.Router()

    router.post('/', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3981)

    const data = {
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z'),
      array: ['string', true, false, 123, 1.56, new Date('2000-02-03T02:00:00.000Z')],
      object: {
        key: 'string'
      }
    }

    await axios.post('http://localhost:3981/', data, {
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    expect(requestBody).toEqual('{"string":"any@mail.com","integer":123,"float":1.56,"boolean":true,"date":"2000-02-03T02:00:00.000Z","array":["string",true,false,123,1.56,"2000-02-03T02:00:00.000Z"],"object":{"key":"string"}}')
  })
})
