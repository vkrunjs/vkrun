import path from 'path'
import fs from 'fs'
import v from '../../../index'
import FormData from 'form-data'

describe('Super Request - end to end testing', () => {
  const validateSuccess = (response: any): void => {
    expect(response.statusCode).toEqual(200)
    expect(response.statusMessage).toEqual('OK')
    expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
    expect(response.headers.connection).toEqual('close')
  }

  it('Should parse form data body in POST method', async () => {
    let requestBody: any
    let requestFiles: any

    const app = v.App()
    app.parseData()

    app.post('/body-post', (request: v.Request, response: v.Response) => {
      requestBody = request.body
      requestFiles = request.files
      response.status(200).end()
    })

    const fileContent = 'Text file'
    const fileName = 'filename.txt'
    const filePath = path.join(__dirname, fileName)

    fs.writeFileSync(filePath, fileContent)

    const data = new FormData()
    data.append('string', 'any@mail.com')
    data.append('integer', String(123))
    data.append('float', String(1.56))
    data.append('boolean', String(true))
    data.append('date', new Date('2000-02-03T02:00:00.000Z').toISOString())

    const fileBuffer = fs.readFileSync(filePath)
    data.append('file', fileBuffer, fileName)
    console.log('data instanceof FormData ', data instanceof FormData)

    const response = await v.superRequest(app).post('/body-post', data)

    fs.unlinkSync(filePath)

    fs.writeFileSync(filePath, requestFiles[0].buffer)
    const fileExists = fs.existsSync(filePath)
    expect(fileExists).toBeTruthy()
    const savedFileContent = fs.readFileSync(filePath, 'utf-8')
    expect(savedFileContent).toEqual(fileContent)
    fs.unlinkSync(filePath)

    validateSuccess(response)
    expect(requestBody).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    })
    expect(requestFiles[0].filename).toEqual('filename.txt')
    expect(requestFiles[0].mimetype).toEqual('text/plain')
    expect(requestFiles[0].extension).toEqual('txt')

    app.close()
  })

  it('Should parse query parameters correctly', async () => {
    let requestQuery

    const app = v.App()
    app.parseData()

    app.get('/query', (req: v.Request, res: v.Response) => {
      requestQuery = req.query
      res.status(200).end()
    })

    const query = 'name=John&age=30&boolean=true'
    const response = await v.superRequest(app).get(`/query?${query}`)

    validateSuccess(response)
    expect(requestQuery).toEqual({ name: 'John', age: 30, boolean: true })

    app.close()
  })

  it('Should parse JSON body in POST method', async () => {
    let requestBody

    const app = v.App()
    app.parseData()

    app.post('/json', (req: v.Request, res: v.Response) => {
      requestBody = req.body
      res.status(200).end()
    })

    const data = { name: 'John', age: 30, isAdmin: true }

    const response = await v.superRequest(app).post('/json', data, {
      headers: { 'Content-Type': 'application/json' }
    })

    validateSuccess(response)
    expect(requestBody).toEqual(data)

    app.close()
  })

  it('Should parse URL encoded body in POST method', async () => {
    let requestBody

    const app = v.App()
    app.parseData()

    app.post('/urlencoded', (req: v.Request, res: v.Response) => {
      requestBody = req.body
      res.status(200).end()
    })

    const urlencoded = 'name=John&age=30&isAdmin=true'
    const response = await v.superRequest(app).post('/urlencoded', urlencoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    validateSuccess(response)
    expect(requestBody).toEqual({ name: 'John', age: 30, isAdmin: true })

    app.close()
  })

  it('Should handle PUT requests', async () => {
    let requestBody

    const app = v.App()
    app.parseData()

    app.put('/update', (req: v.Request, res: v.Response) => {
      requestBody = req.body
      res.status(200).end()
    })

    const data = { name: 'Updated Name', age: 31 }

    const response = await v.superRequest(app).put('/update', data, {
      headers: { 'Content-Type': 'application/json' }
    })

    validateSuccess(response)
    expect(requestBody).toEqual(data)

    app.close()
  })

  it('Should handle PATCH requests', async () => {
    let requestBody

    const app = v.App()
    app.parseData()

    app.patch('/modify', (req: v.Request, res: v.Response) => {
      requestBody = req.body
      res.status(200).end()
    })

    const data = { age: 32 }

    const response = await v.superRequest(app).patch('/modify', data, {
      headers: { 'Content-Type': 'application/json' }
    })

    validateSuccess(response)
    expect(requestBody).toEqual(data)

    app.close()
  })

  it('Should handle DELETE requests', async () => {
    const app = v.App()
    app.parseData()

    app.delete('/delete/:id', (req: v.Request, res: v.Response) => {
      res.status(200).json({ deletedId: req?.params?.id })
    })

    const response = await v.superRequest(app).delete('/delete/1')

    expect(response.statusCode).toEqual(200)
    expect(response.data).toEqual({ deletedId: 1 })

    app.close()
  })

  it('Should handle HEAD requests', async () => {
    const app = v.App()

    app.head('/info', (req: v.Request, res: v.Response) => {
      res.setHeader('X-Custom-Header', 'CustomValue')
      res.status(200).end()
    })

    const response = await v.superRequest(app).head('/info')

    expect(response.statusCode).toEqual(200)
    expect(response.headers['x-custom-header']).toEqual('CustomValue')

    app.close()
  })

  it('Should handle OPTIONS requests', async () => {
    const app = v.App()

    app.options('/options', (req: v.Request, res: v.Response) => {
      res.setHeader('Allow', 'GET,POST,OPTIONS')
      res.status(204).end()
    })

    const response = await v.superRequest(app).options('/options')
    console.log(JSON.stringify(response, null, 2))
    expect(response.statusCode).toEqual(204)
    expect(response.headers.allow).toEqual('GET,POST,OPTIONS')

    app.close()
  })

  it('Should handle non-existent route with 404', async () => {
    const app = v.App()

    await v.superRequest(app).get('/non-existent').catch((error) => {
      expect(error.response.statusCode).toEqual(404)
      expect(error.response.statusMessage).toEqual('Not Found')
    })

    app.close()
  })
})
