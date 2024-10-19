import v from '../../../index'
import path from 'path'

describe('Serve Static File - end to end testing using super request', () => {
  const validateSuccess = (response: any): void => {
    expect(response.statusCode).toEqual(200)
    expect(response.statusMessage).toEqual('OK')
    expect(Object.keys(response.headers).length).toEqual(5)
    expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
    expect(v.isString(response.headers.date)).toBeTruthy()
    expect(response.headers.connection).toEqual('close')
    expect(response.headers['content-length']).toEqual('9')
    expect(response.data).toEqual('Text file')
  }

  it('Should be able to serve static file', async () => {
    const app = v.App()
    const basePath = path.join(__dirname, 'files')
    app.get('/static/*', v.serveStaticFile(basePath))

    await v.superRequest(app).get('/static/doc/filename.txt').then((response) => {
      validateSuccess(response)
    })
    app.close()
  })

  it('Should return 404 for a non-existent file', async () => {
    const app = v.App()
    const basePath = path.join(__dirname, 'files')
    app.get('/static/*', v.serveStaticFile(basePath))

    await v.superRequest(app).get('/static/doc/nonexistent.txt').catch((error) => {
      expect(error.response.statusCode).toEqual(404)
      expect(error.response.statusMessage).toEqual('Not Found')
      expect(error.response.data).toEqual('404 - File Not Found')
    })

    app.close()
  })

  it('Should return 404 for an error parsing the request URL', async () => {
    const app = v.App()
    const basePath = path.join(__dirname, 'files')
    app.get('/static/*', v.serveStaticFile(basePath))

    await v.superRequest(app).get('/static/doc/%').catch((error) => {
      expect(error.response.statusCode).toEqual(404)
      expect(error.response.statusMessage).toEqual('Not Found')
      expect(error.response.data).toEqual('404 - Error Parsing File')
    })

    app.close()
  })
})
