import { join } from 'path'
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import FormData from 'form-data'
import { upload } from '..'
import { isString, isUUID } from '../../utils'
import { Request, Response, RouterMemoryFile, RouterStorageFile } from '../../types'
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

  afterEach(() => {
    if (existsSync(uploadsPath)) {
      rmSync(uploadsPath, { recursive: true, force: true })
    }
  })

  it('Should save the file with a custom filename', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const customFilename = 'custom-name.txt'
    const middlewareUploads = upload.diskStorage({
      destination: uploadsPath,
      filename: () => customFilename
    }).singleFile({ fieldName: 'file' })

    router.post('/upload-custom-filename', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).json({ message: 'File uploaded with custom filename' })
    })

    app.use(router)

    const data = new FormData()
    data.append('file', Buffer.from('dummy content'), 'filename-a.txt')

    await superRequest(app).post('/upload-custom-filename', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.data.message).toBe('File uploaded with custom filename')

      const files = readdirSync(uploadsPath)
      expect(files).toContain(customFilename)
    }).catch((error) => {
      expect(error).toEqual(undefined)
    })

    app.close()
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
    }).then(response => validateSuccess(response)).catch((error) => {
      expect(error).toEqual(undefined)
    })

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
      required: { enable: true }
    })

    router.post('/upload', middlewareUploads, (request: Request, response: Response) => {
      requestFiles = request.files as RouterStorageFile[]
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()

    await superRequest(app).post('/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
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
      required: {
        enable: true,
        onError: (response: Response) => {
          return response.status(422).json({
            error: 'Custom error: file is required'
          })
        }
      }

    })

    router.post('/upload', middlewareUploads, (request: Request, response: Response) => {
      return response.status(200).end()
    })

    app.use(router)

    const data = new FormData()

    await superRequest(app).post('/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
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
    }).then(response => validateSuccess(response)).catch((error) => {
      expect(error).toEqual(undefined)
    })

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
          value: 2
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
    }).then((response) => {
      expect(response).toEqual(undefined)
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
          value: 1
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
    }).then((response) => {
      expect(response).toEqual(undefined)
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
          value: 1
        },
        max: {
          value: 2
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
    }).then(response => validateSuccess(response)).catch((error) => {
      expect(error).toEqual(undefined)
    })

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
          value: 2,
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
    }).then((response) => {
      expect(response).toEqual(undefined)
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
          value: 1,
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
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(422)
      expect(error.response.data.error).toBe('Custom error: Only 1 file allowed for file2')
    })

    app.close()
  })

  it('Should allow file upload when file size is within limit', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const maxSize = 10

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).singleFile({
      fieldName: 'file',
      size: {
        value: maxSize,
        onError: (response: Response) => {
          return response.status(413).json({
            error: `File exceeds maximum size of ${maxSize} bytes`
          })
        }
      }
    })

    router.post('/upload-size-allowed', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const filename = 'filename-a.txt'
    const filePath = join(__dirname, filename)

    const data = new FormData()
    data.append('file', readFileSync(filePath), filename)

    await superRequest(app).post('/upload-size-allowed', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      expect(response.statusCode).toEqual(200)
      expect(response.statusMessage).toEqual('OK')
    }).catch((error) => {
      expect(error).toEqual(undefined)
    })

    app.close()
  })

  it('Should reject file upload when file size exceeds limit', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const maxSize = 8

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).singleFile({
      fieldName: 'file',
      size: {
        value: maxSize,
        onError: (response: Response) => {
          return response.status(413).json({
            error: `File exceeds maximum size of ${maxSize} bytes`
          })
        }
      }
    })

    router.post('/upload-size-limit-exceeded', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const filename = 'filename-a.txt'
    const filePath = join(__dirname, filename)

    const data = new FormData()
    data.append('file', readFileSync(filePath), filename)

    await superRequest(app).post('/upload-size-limit-exceeded', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(413)
      expect(error.response.data.error).toBe(`File exceeds maximum size of ${maxSize} bytes`)
    })

    app.close()
  })

  it('Should allow multiple file upload within size limits', async () => {
    let requestFiles: RouterStorageFile[] = []

    const app = App()
    app.use(parseData())
    const router = Router()

    const maxSize = 10

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles([
      {
        fieldName: 'files',
        size: { value: maxSize }
      }
    ])

    router.post('/upload-multiple-size-ok', middlewareUploads, (request: Request<{ files: RouterStorageFile[] }>, response: Response) => {
      requestFiles = request.files
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('files', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')
    data.append('files', readFileSync(join(__dirname, 'filename-b.txt')), 'filename-b.txt')

    await superRequest(app).post('/upload-multiple-size-ok', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => validateSuccess(response)).catch((error) => {
      expect(error).toEqual(undefined)
    })

    expect(requestFiles.length).toEqual(2)
    app.close()
  })

  it('Should reject multiple file upload when one file exceeds size limit', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const maxSize = 8

    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles([
      {
        fieldName: 'files',
        size: {
          value: maxSize,
          onError: (response: Response) => {
            return response.status(413).json({
              error: `File exceeds maximum size of ${maxSize} bytes`
            })
          }
        }
      }
    ])

    router.post('/upload-multiple-size-exceed', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('files', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')
    data.append('files', readFileSync(join(__dirname, 'filename-b.txt')), 'filename-b.txt')

    await superRequest(app).post('/upload-multiple-size-exceed', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(413)
      expect(error.response.data.error).toBe(`File exceeds maximum size of ${maxSize} bytes`)
    })

    app.close()
  })

  it('Should reject single file upload with invalid extension', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const allowedExtensions = ['pdf']
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).singleFile({
      fieldName: 'file',
      extensions: {
        value: allowedExtensions,
        onError: (response: Response) => {
          return response.status(415).json({
            error: `Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`
          })
        }
      }
    })

    router.post('/upload-invalid-extension', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('file', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')

    await superRequest(app).post('/upload-invalid-extension', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(415)
      expect(error.response.data.error).toBe(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`)
    })

    app.close()
  })

  it('Should handle unexpected error in single file upload', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const middlewareUploads = upload.diskStorage({
      destination: '/invalid/path',
      onError: (response: Response) => response.status(500).json({ error: 'Unexpected server error' })
    }).singleFile({
      fieldName: 'file'
    })

    router.post('/upload-unexpected-error', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('file', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')

    await superRequest(app).post('/upload-unexpected-error', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(500)
      expect(error.response.data.error).toBe('Unexpected server error')
    })

    app.close()
  })

  it('Should handle unexpected error in multiple file upload', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const middlewareUploads = upload.diskStorage({
      destination: '/invalid/path',
      onError: (response: Response) => response.status(500).json({ error: 'Unexpected server error' })
    }).multipleFiles([
      { fieldName: 'files' }
    ])

    router.post('/upload-multiple-unexpected-error', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('files', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')
    data.append('files', readFileSync(join(__dirname, 'filename-b.txt')), 'filename-b.txt')

    await superRequest(app).post('/upload-multiple-unexpected-error', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(500)
      expect(error.response.data.error).toBe('Unexpected server error')
    })

    app.close()
  })

  it('Should handle unexpected error in single file upload', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const middlewareUploads = upload.diskStorage({
      destination: '/invalid/path',
      onError: (response: Response) => response.status(500).json({ error: 'Unexpected server error' })
    }).singleFile({
      fieldName: 'file'
    })

    router.post('/upload-unexpected-error', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('file', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')

    await superRequest(app).post('/upload-unexpected-error', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(500)
      expect(error.response.data.error).toBe('Unexpected server error')
    })

    app.close()
  })

  it('Should reject multiple file upload with invalid extension', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const allowedExtensions = ['pdf']
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles([
      {
        fieldName: 'files',
        extensions: {
          value: allowedExtensions,
          onError: (response: Response) => {
            return response.status(415).json({
              error: `Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`
            })
          }
        }
      }
    ])

    router.post('/upload-multiple-invalid-extension', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('files', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')

    await superRequest(app).post('/upload-multiple-invalid-extension', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(415)
      expect(error.response.data.error).toBe(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`)
    })

    app.close()
  })

  it('Should handle unexpected error in multiple file upload', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const middlewareUploads = upload.diskStorage({
      destination: '/invalid/path',
      onError: (response: Response) => response.status(500).json({ error: 'Unexpected server error' })
    }).multipleFiles([
      { fieldName: 'files' }
    ])

    router.post('/upload-multiple-unexpected-error', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('files', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')
    data.append('files', readFileSync(join(__dirname, 'filename-b.txt')), 'filename-b.txt')

    await superRequest(app).post('/upload-multiple-unexpected-error', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(500)
      expect(error.response.data.error).toBe('Unexpected server error')
    })

    app.close()
  })

  it('Should reject single file upload when MIME type is null', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const allowedExtensions = ['pdf', 'unknown']
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).singleFile({
      fieldName: 'file',
      extensions: {
        value: allowedExtensions,
        onError: (response: Response) => {
          return response.status(415).json({
            error: `Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`
          })
        }
      }
    })

    router.post('/upload-invalid-mime', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const pdfFilePath = join(__dirname, 'testfile.unknown')
    writeFileSync(pdfFilePath, 'dummy content')

    const data = new FormData()
    data.append('file', readFileSync(pdfFilePath), 'testfile.unknown')

    await superRequest(app).post('/upload-invalid-mime', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(415)
      expect(error.response.data.error).toBe(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`)
    })

    rmSync(pdfFilePath)
    app.close()
  })

  it('Should reject multiple file upload when one file has a null MIME type', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const allowedExtensions = ['pdf', 'unknown']
    const middlewareUploads = upload.diskStorage({ destination: uploadsPath }).multipleFiles([
      {
        fieldName: 'files',
        extensions: {
          value: allowedExtensions,
          onError: (response: Response) => {
            return response.status(415).json({
              error: `Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`
            })
          }
        }
      }
    ])

    router.post('/upload-multiple-invalid-mime', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const validFilePath = join(__dirname, 'validfile.pdf')
    const invalidMimeFilePath = join(__dirname, 'testfile.unknown')

    writeFileSync(validFilePath, 'PDF content')
    writeFileSync(invalidMimeFilePath, 'Unknown content')

    const data = new FormData()
    data.append('files', readFileSync(validFilePath), 'validfile.pdf')
    data.append('files', readFileSync(invalidMimeFilePath), 'testfile.unknown')

    await superRequest(app).post('/upload-multiple-invalid-mime', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.statusCode).toBe(415)
      expect(error.response.data.error).toBe(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`)
    })

    rmSync(validFilePath)
    rmSync(invalidMimeFilePath)
    app.close()
  })

  it('Should upload a single file to memory with a custom filename', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const customFilename = 'custom-memory.txt'
    const middlewareUploads = upload.memoryStorage({
      filename: () => customFilename
    }).singleFile({ fieldName: 'file' })

    router.post('/upload-memory-custom-filename', middlewareUploads, (request: Request, response: Response) => {
      const files = request.files as RouterMemoryFile[]
      expect(files[0].filename).toBe(customFilename)
      response.status(200).json({ message: 'File uploaded with custom filename in memory' })
    })

    app.use(router)

    const data = new FormData()
    data.append('file', Buffer.from('dummy content'), 'filename-a.txt')

    await superRequest(app).post('/upload-memory-custom-filename', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.data.message).toBe('File uploaded with custom filename in memory')
    }).catch((error) => {
      expect(error).toEqual(undefined)
    })

    app.close()
  })

  it('Should enforce required single file in memory', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const middlewareUploads = upload.memoryStorage({}).singleFile({
      fieldName: 'file',
      required: { enable: true }
    })

    router.post('/upload-memory-required', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()

    await superRequest(app).post('/upload-memory-required', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.data.message).toBe('file for field file is required!')
    })

    app.close()
  })

  it('Should enforce file size limit in memory storage', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const maxSize = 8

    const middlewareUploads = upload.memoryStorage({}).singleFile({
      fieldName: 'file',
      size: {
        value: maxSize,
        onError: (response: Response) => {
          return response.status(413).json({
            error: `File exceeds maximum size of ${maxSize} bytes`
          })
        }
      }
    })

    router.post('/upload-memory-size-limit', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const filename = 'filename-a.txt'
    const filePath = join(__dirname, filename)

    const data = new FormData()
    data.append('file', readFileSync(filePath), filename)

    await superRequest(app).post('/upload-memory-size-limit', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.data.error).toBe(`File exceeds maximum size of ${maxSize} bytes`)
    })

    app.close()
  })

  it('Should reject single file upload with invalid extension in memory', async () => {
    const app = App()
    app.use(parseData())
    const router = Router()

    const allowedExtensions = ['pdf']
    const middlewareUploads = upload.memoryStorage({}).singleFile({
      fieldName: 'file',
      extensions: {
        value: allowedExtensions,
        onError: (response: Response) => {
          return response.status(415).json({
            error: `Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`
          })
        }
      }
    })

    router.post('/upload-memory-invalid-extension', middlewareUploads, (request: Request, response: Response) => {
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('file', readFileSync(join(__dirname, 'filename-a.txt')), 'filename-a.txt')

    await superRequest(app).post('/upload-memory-invalid-extension', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response).toEqual(undefined)
    }).catch(error => {
      expect(error.response.data.error).toBe(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`)
    })

    app.close()
  })

  it('Should handle multiple files in memory within size limits', async () => {
    let requestFiles: RouterMemoryFile[] = []

    const app = App()
    app.use(parseData())
    const router = Router()

    const maxSize = 10

    const middlewareUploads = upload.memoryStorage({}).multipleFiles([
      {
        fieldName: 'files',
        size: { value: maxSize }
      }
    ])

    router.post('/upload-memory-multiple-size-ok', middlewareUploads, (request: Request, response: Response) => {
      requestFiles = request.files as RouterMemoryFile[]
      response.status(200).end()
    })

    app.use(router)

    const data = new FormData()
    data.append('files', Buffer.from('12345678'), 'filename-a.txt')
    data.append('files', Buffer.from('1234567'), 'filename-b.txt')

    await superRequest(app).post('/upload-memory-multiple-size-ok', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => validateSuccess(response)).catch((error) => {
      expect(error).toEqual(undefined)
    })

    expect(requestFiles.length).toEqual(2)
    app.close()
  })
})
