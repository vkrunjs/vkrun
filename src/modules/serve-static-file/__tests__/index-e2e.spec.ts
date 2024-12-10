import { join } from 'path'
import { isBuffer, isString, isUUID } from '../../utils'
import { App } from '../../app'
import { serveStaticFile } from '..'
import { superRequest } from '../../super-request'

describe('Serve Static File - end to end testing using super request', () => {
  const validateSuccess = (response: any): void => {
    expect(response.statusCode).toEqual(200)
    expect(response.statusMessage).toEqual('OK')
    expect(Object.keys(response.headers).length).toEqual(5)
    expect(isUUID(response.headers['request-id'])).toBeTruthy()
    expect(isString(response.headers.date)).toBeTruthy()
    expect(response.headers.connection).toEqual('close')
    expect(response.headers['content-length']).toEqual('9')
    expect(isBuffer(response.data)).toBeTruthy()
  }

  it('Should be able to serve static file', async () => {
    const app = App()
    const basePath = join(__dirname, 'files')
    app.get('/static/*', serveStaticFile(basePath))

    await superRequest(app).get('/static/doc/filename.txt').then((response) => {
      validateSuccess(response)
    })
    app.close()
  })

  it('Should return 404 for a non-existent file', async () => {
    const app = App()
    const basePath = join(__dirname, 'files')
    app.get('/static/*', serveStaticFile(basePath))

    await superRequest(app).get('/static/doc/nonexistent.txt').catch((error) => {
      expect(error.response.statusCode).toEqual(404)
      expect(error.response.statusMessage).toEqual('Not Found')
      expect(error.response.data).toEqual('404 - File Not Found')
    })

    app.close()
  })

  it('Should return 404 for an error parsing the request URL', async () => {
    const app = App()
    const basePath = join(__dirname, 'files')
    app.get('/static/*', serveStaticFile(basePath))

    await superRequest(app).get('/static/doc/%').catch((error) => {
      expect(error.response.statusCode).toEqual(404)
      expect(error.response.statusMessage).toEqual('Not Found')
      expect(error.response.data).toEqual('404 - Error Parsing File')
    })

    app.close()
  })
})
