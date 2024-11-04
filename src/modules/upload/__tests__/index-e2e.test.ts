import path from 'path'
import fs from 'fs'
import axios from 'axios'
import v from '../../../index'
import FormData from 'form-data'
import { upload } from '..'
import * as type from '../../types'

describe('Upload - end-to-end testing using axios and app server', () => {
  const uploadsPath = path.join(__dirname, 'uploads')
  let server: any

  const validateHeaderSuccess = (response: any): void => {
    expect(response.status).toEqual(200)
    expect(Object.keys(response.headers).length).toEqual(4)
    expect(v.isUUID(response.headers['request-id'])).toBeTruthy()
    expect(v.isString(response.headers.date)).toBeTruthy()
    expect(response.headers.connection).toEqual('close')
    expect(response.headers['content-length']).toEqual('0')
    expect(response.data).toEqual('')
  }

  afterEach(() => {
    if (server?.listening) {
      server.close()
    }
    if (fs.existsSync(uploadsPath)) {
      fs.rmSync(uploadsPath, { recursive: true, force: true })
    }
  })

  it('Should upload a single file without required or onError', async () => {
    let requestFiles: type.StorageFile[] = []

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).singleFile({ fieldName: 'file' })

    router.post('/upload', middlewareUploads, (request: v.Request, response: v.Response) => {
      requestFiles = request.files as type.StorageFile[]
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3400)

    const filename = 'filename-a.txt'
    const filePath = path.join(__dirname, filename)

    const data = new FormData()
    data.append('file', fs.readFileSync(filePath), filename)

    await axios.post('http://localhost:3400/upload', data, {
      headers: data.getHeaders()
    }).then(response => validateHeaderSuccess(response))

    expect(requestFiles.length).toEqual(1)
  })

  it('Should enforce required single file without onError', async () => {
    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).singleFile({
      fieldName: 'file',
      required: true
    })

    router.post('/upload', middlewareUploads, (request: v.Request, response: v.Response) => {
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3401)

    const data = new FormData() // No file attached

    await axios.post('http://localhost:3401/upload', data, {
      headers: data.getHeaders()
    }).catch(error => {
      expect(error.response.status).toBe(400)
      expect(error.response.data.message).toBe('file for field file is required!')
    })
  })

  it('Should enforce required single file with custom onError', async () => {
    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).singleFile({
      fieldName: 'file',
      required: true,
      onError: (response: type.Response) => {
        return response.status(422).json({
          error: 'Custom error: file is required'
        })
      }
    })

    router.post('/upload', middlewareUploads, (request: v.Request, response: v.Response) => {
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3402)

    const data = new FormData() // No file attached

    await axios.post('http://localhost:3402/upload', data, {
      headers: data.getHeaders()
    }).catch(error => {
      expect(error.response.status).toBe(422)
      expect(error.response.data.error).toBe('Custom error: file is required')
    })
  })

  it('Should enforce min on multiple files without custom onError for field file1', async () => {
    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    const fields = [
      {
        fieldName: 'file1',
        min: {
          count: 2
        }
      }
    ]
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles(fields)

    router.post('/upload-with-min', middlewareUploads, (request: v.Request, response: v.Response) => {
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3403)

    const data = new FormData()
    data.append('file1', fs.readFileSync(path.join(__dirname, 'filename-a.txt')), 'filename-a.txt')

    await axios.post('http://localhost:3403/upload-with-min', data, {
      headers: data.getHeaders()
    }).catch(error => {
      expect(error.response.status).toBe(400)
      expect(error.response.data.message).toBe('minimum of 2 files required for field file1!')
    })
  })

  it('Should enforce max on multiple files without custom onError for field file2', async () => {
    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    const fields = [
      {
        fieldName: 'file2',
        max: {
          count: 1
        }
      }
    ]
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles(fields)

    router.post('/upload-with-max', middlewareUploads, (request: v.Request, response: v.Response) => {
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3404)

    const data = new FormData()
    data.append('file2', fs.readFileSync(path.join(__dirname, 'filename-b.txt')), 'filename-b.txt')
    data.append('file2', fs.readFileSync(path.join(__dirname, 'filename-c.txt')), 'filename-c.txt')

    await axios.post('http://localhost:3404/upload-with-max', data, {
      headers: data.getHeaders()
    }).catch(error => {
      expect(error.response.status).toBe(400)
      expect(error.response.data.message).toBe('maximum of 1 files allowed for field file2!')
    })
  })

  it('Should save multiple files with matching field names when within min/max limits', async () => {
    let requestFiles: type.StorageFile[] = []

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    const fields = [
      {
        fieldName: 'file1',
        min: {
          count: 1
        },
        max: {
          count: 2
        }
      }
    ]
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles(fields)

    router.post('/upload-with-limits', middlewareUploads, (request: v.Request, response: v.Response) => {
      requestFiles = request.files as type.StorageFile[]
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3405)

    const filenames = ['filename-a.txt', 'filename-b.txt']
    const data = new FormData()
    filenames.forEach(filename => data.append('file1', fs.readFileSync(path.join(__dirname, filename)), filename))

    await axios.post('http://localhost:3405/upload-with-limits', data, {
      headers: data.getHeaders()
    }).then(response => validateHeaderSuccess(response))

    expect(requestFiles.length).toEqual(2)
  })

  it('Should enforce min on multiple files with custom onError', async () => {
    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    const fields = [
      {
        fieldName: 'file1',
        min: {
          count: 2,
          onError: (response: type.Response) => {
            return response.status(422).json({
              error: 'Custom error: Minimum 2 files required for file1'
            })
          }
        }
      }
    ]
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles(fields)

    router.post('/upload-with-min-custom', middlewareUploads, (request: v.Request, response: v.Response) => {
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3406)

    const data = new FormData()
    data.append('file1', fs.readFileSync(path.join(__dirname, 'filename-a.txt')), 'filename-a.txt')

    await axios.post('http://localhost:3406/upload-with-min-custom', data, {
      headers: data.getHeaders()
    }).catch(error => {
      expect(error.response.status).toBe(422)
      expect(error.response.data.error).toBe('Custom error: Minimum 2 files required for file1')
    })
  })

  it('Should enforce max on multiple files with custom onError', async () => {
    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    const fields = [
      {
        fieldName: 'file2',
        max: {
          count: 1,
          onError: (response: type.Response) => {
            return response.status(422).json({
              error: 'Custom error: Only 1 file allowed for file2'
            })
          }
        }
      }
    ]
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles(fields)

    router.post('/upload-with-max-custom', middlewareUploads, (request: v.Request, response: v.Response) => {
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3407)

    const data = new FormData()
    data.append('file2', fs.readFileSync(path.join(__dirname, 'filename-b.txt')), 'filename-b.txt')
    data.append('file2', fs.readFileSync(path.join(__dirname, 'filename-c.txt')), 'filename-c.txt')

    await axios.post('http://localhost:3407/upload-with-max-custom', data, {
      headers: data.getHeaders()
    }).catch(error => {
      expect(error.response.status).toBe(422)
      expect(error.response.data.error).toBe('Custom error: Only 1 file allowed for file2')
    })
  })
})
