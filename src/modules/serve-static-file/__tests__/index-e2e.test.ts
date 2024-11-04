import axios from 'axios'
import { join } from 'path'
import { isString, isUUID } from '../../utils'
import { App } from '../../app'
import { serveStaticFile } from '..'

describe('Serve Static File - end to end testing using axios and app server', () => {
  const validateSuccess = (response: any): void => {
    expect(response.status).toEqual(200)
    expect(response.statusText).toEqual('OK')
    expect(Object.keys(response.headers).length).toEqual(5)
    expect(isUUID(response.headers['request-id'])).toBeTruthy()
    expect(isString(response.headers.date)).toBeTruthy()
    expect(response.headers.connection).toEqual('close')
    expect(response.headers['content-length']).toEqual('9')
    expect(response.data).toEqual('Text file')
  }

  it('Should be able to serve static file', async () => {
    const app = App()
    const basePath = join(__dirname, 'files')
    app.get('/static/*', serveStaticFile(basePath))

    app.server().listen(3199)

    await axios.get('http://localhost:3199/static/doc/filename.txt').then((response) => {
      validateSuccess(response)
    })

    app.close()
  })

  it('Should return 404 for a non-existent file', async () => {
    const app = App()
    const basePath = join(__dirname, 'files')
    app.get('/static/*', serveStaticFile(basePath))

    app.server().listen(3198)

    await axios.get('http://localhost:3198/static/doc/nonexistent.txt').catch((error) => {
      expect(error.response.status).toEqual(404)
      expect(error.response.data).toEqual('404 - File Not Found')
    })

    app.close()
  })

  it('Should return 404 for an error parsing the request URL', async () => {
    const app = App()
    const basePath = join(__dirname, 'files')
    app.get('/static/*', serveStaticFile(basePath))

    app.server().listen(3197)

    await axios.get('http://localhost:3197/static/doc/%').catch((error) => {
      expect(error.response.status).toEqual(404)
      expect(error.response.data).toEqual('404 - Error Parsing File')
    })

    app.close()
  })
})
