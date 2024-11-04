import { join } from 'path'
import { existsSync, readFileSync, rmSync } from 'fs'
import FormData from 'form-data'
import { upload } from '..'
import { isString, isUUID } from '../../utils'
import { Request, Response, RouterStorageFile } from '../../types'
import { App } from '../../app'
import { parseData } from '../../parse-data'
import { Router } from '../../router'
import { superRequest } from '../../super-request'

describe('Upload - end-to-end testing using super request', () => {
  const uploadsPath = join(__dirname, 'uploads')

  const validateSuccess = (response: any): void => {
    expect(response.statusCode).toEqual(200)
    expect(response.statusMessage).toEqual('OK')
    expect(Object.keys(response.headers).length).toEqual(4)
    expect(isUUID(response.headers['request-id'])).toBeTruthy()
    expect(isString(response.headers.date)).toBeTruthy()
    expect(response.headers.connection).toEqual('close')
    expect(response.headers['content-length']).toEqual('0')
    expect(response.data).toEqual('')
  }

  // Cleanup uploaded files after each test
  afterEach(() => {
    if (existsSync(uploadsPath)) {
      rmSync(uploadsPath, { recursive: true, force: true })
    }
  })

  it('Should upload a single file without required or onError', async () => {
    let requestFiles: RouterStorageFile[] = []

    const app = App()
    app.use(parseData())
    const router = Router()

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).singleFile({ fieldName: 'file' })

    router.post('/upload', middlewareUploads, (request: Request, response: Response) => {
      requestFiles = request.files as RouterStorageFile[]
      response.status(200).end()
    })

    app.use(router)

    const filename = 'filename-a.txt'
    const filePath = join(__dirname, filename)

    const data = new FormData()
    data.append('file', readFileSync(filePath), filename)

    await superRequest(app).post('/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => validateSuccess(response))

    expect(requestFiles.length).toEqual(1)
    app.close()
  })

  it('Should enforce required single file without onError', async () => {
    let requestFiles: RouterStorageFile[] = []

    const app = App()
    app.use(parseData())
    const router = Router()

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).singleFile({
      fieldName: 'file',
      required: true
    })

    router.post('/upload', middlewareUploads, (request: Request, response: Response) => {
      requestFiles = request.files as RouterStorageFile[]
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData() // No file attached to simulate missing required file

    await superRequest(app).post('/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).catch((error) => {
      expect(error.response.data.message).toBe('file for field file is required!')
    })

    expect(requestFiles.length).toEqual(0)
    app.close()
  })

  it('Should enforce required single file with custom onError', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).singleFile({
      fieldName: 'file',
      required: true,
      onError: (response: Response) => {
        return response.status(422).json({
          error: 'Custom error: file is required'
        })
      }
    })

    router.post('/upload', middlewareUploads, (request: Request, response: Response) => {
      return response.status(200).end()
    })

    app.use(router)

    const data = new FormData() // No file attached to simulate missing required file

    await superRequest(app).post('/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).catch(error => expect(error.response.data.error).toBe('Custom error: file is required'))

    app.close()
  })

  it('Should handle multiple files without min/max or onError', async () => {
    let requestFiles: RouterStorageFile[] = []

    const app = App()
    app.use(parseData())
    const router = Router()

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles()

    router.post('/upload-multiple', middlewareUploads, (request: Request, response: Response) => {
      requestFiles = request.files as RouterStorageFile[]
      return response.status(200).end()
    })

    app.use(router)

    const filenames = ['filename-a.txt', 'filename-b.txt', 'filename-c.txt']
    const data = new FormData()
    filenames.forEach(filename => data.append('file', readFileSync(join(__dirname, filename)), filename))

    await superRequest(app).post('/upload-multiple', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => validateSuccess(response))

    expect(requestFiles.length).toEqual(3)
    app.close()
  })

  it('Should enforce min on multiple files without custom onError for field file1', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const fields = [
      {
        fieldName: 'file1',
        min: {
          count: 2
        }
      }
    ]
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles(fields)

    router.post('/upload-with-min', middlewareUploads, (request: Request, response: Response) => {
      return response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('file1', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')

    await superRequest(app).post('/upload-with-min', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).catch(error => {
      expect(error.response.statusCode).toBe(400)
      expect(error.response.data.message).toBe('minimum of 2 files required for field file1!')
    })

    app.close()
  })

  it('Should enforce max on multiple files without custom onError for field file2', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const fields = [
      {
        fieldName: 'file2',
        max: {
          count: 1
        }
      }
    ]
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles(fields)

    router.post('/upload-with-max', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('file2', readFileSync(join(__dirname, 'filename-b.txt')), 'filename-b.txt')
    data.append('file2', readFileSync(join(__dirname, 'filename-c.txt')), 'filename-c.txt')

    await superRequest(app).post('/upload-with-max', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).catch(error => {
      expect(error.response.statusCode).toBe(400)
      expect(error.response.data.message).toBe('maximum of 1 files allowed for field file2!')
    })

    app.close()
  })

  it('Should save multiple files with matching field names when within min/max limits', async () => {
    let requestFiles: RouterStorageFile[] = []

    const app = App()
    app.use(parseData())
    const router = Router()

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

    router.post('/upload-with-limits', middlewareUploads, (request: Request, response: Response) => {
      requestFiles = request.files as RouterStorageFile[]
      response.status(200).end()
    })

    app.use(router)

    const filenames = ['filename-a.txt', 'filename-b.txt']
    const data = new FormData()
    filenames.forEach(filename => data.append('file1', readFileSync(join(__dirname, filename)), filename))

    await superRequest(app).post('/upload-with-limits', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => validateSuccess(response))

    expect(requestFiles.length).toEqual(2)
    app.close()
  })

  it('Should enforce min on multiple files with custom onError', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const fields = [
      {
        fieldName: 'file1',
        min: {
          count: 2,
          onError: (response: Response) => {
            return response.status(422).json({
              error: 'Custom error: Minimum 2 files required for file1'
            })
          }
        }
      }
    ]
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles(fields)

    router.post('/upload-with-min-custom', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('file1', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')

    await superRequest(app).post('/upload-with-min-custom', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).catch(error => {
      expect(error.response.statusCode).toBe(422)
      expect(error.response.data.error).toBe('Custom error: Minimum 2 files required for file1')
    })

    app.close()
  })

  it('Should enforce max on multiple files with custom onError', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const fields = [
      {
        fieldName: 'file2',
        max: {
          count: 1,
          onError: (response: Response) => {
            return response.status(422).json({
              error: 'Custom error: Only 1 file allowed for file2'
            })
          }
        }
      }
    ]
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles(fields)

    router.post('/upload-with-max-custom', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('file2', readFileSync(join(__dirname, 'filename-b.txt')), 'filename-b.txt')
    data.append('file2', readFileSync(join(__dirname, 'filename-c.txt')), 'filename-c.txt')

    await superRequest(app).post('/upload-with-max-custom', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).catch(error => {
      expect(error.response.statusCode).toBe(422)
      expect(error.response.data.error).toBe('Custom error: Only 1 file allowed for file2')
    })

    app.close()
  })
})
