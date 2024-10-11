import path from 'path'
import fs from 'fs'
import axios from 'axios'
import v from '../../../index'
import FormData from 'form-data'
import { upload } from '..'
import * as type from '../../types'

describe('Upload - end to end testing using axios and app server', () => {
  let server: any

  afterEach(() => {
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

  it('Should be able to create file', async () => {
    let requestFiles: type.StorageFile[] = []

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    const uploadsPath = path.join(__dirname, 'uploads')

    const middlewareUploads = upload.diskStorage({
      destination: uploadsPath
    })

    router.post('/upload', middlewareUploads, (request: v.Request, response: v.Response) => {
      requestFiles = request.files as type.StorageFile[]
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3399)

    const filename = 'filename-b.txt'
    const filePath = path.join(__dirname, filename)

    const data = new FormData()
    const fileBuffer = fs.readFileSync(filePath)
    data.append('file', fileBuffer, filename)

    await axios.post('http://localhost:3399/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    const fileExists = fs.existsSync(requestFiles[0].path)
    expect(fileExists).toBeTruthy()
    const savedFileContent = fs.readFileSync(requestFiles[0].path, 'utf-8')
    expect(savedFileContent).toEqual('Text file')

    fs.rmSync(requestFiles[0].destination, { recursive: true, force: true })

    expect(requestFiles).toEqual([{
      filename: 'filename-b.txt',
      extension: 'txt',
      mimetype: 'text/plain',
      destination: uploadsPath,
      path: path.join(uploadsPath, filename),
      size: 9
    }])
  })

  it('Should be able to create file with new filename', async () => {
    let requestFiles: type.StorageFile[] = []

    const app = v.App()
    app.use(v.parseData())
    const router = v.Router()

    const uploadsPath = path.join(__dirname, 'uploads')
    let newFilename = ''

    const middlewareUploads = upload.diskStorage({
      destination: uploadsPath,
      filename: (file) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        newFilename = `${file.filename}-${uniqueSuffix}.${file.extension}`
        return newFilename
      }
    })

    router.post('/upload', middlewareUploads, (request: v.Request, response: v.Response) => {
      requestFiles = request.files as type.StorageFile[]
      response.status(200).end()
    })

    app.use(router)
    server = app.server()
    server.listen(3398)

    const filename = 'filename-b.txt'
    const filePath = path.join(__dirname, filename)

    const data = new FormData()
    const fileBuffer = fs.readFileSync(filePath)
    data.append('file', fileBuffer, filename)

    await axios.post('http://localhost:3398/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      validateHeaderSuccess(response)
    })

    app.close()

    const fileExists = fs.existsSync(requestFiles[0].path)
    expect(fileExists).toBeTruthy()
    const savedFileContent = fs.readFileSync(requestFiles[0].path, 'utf-8')
    expect(savedFileContent).toEqual('Text file')

    fs.rmSync(requestFiles[0].destination, { recursive: true, force: true })

    expect(requestFiles).toEqual([{
      filename: newFilename,
      extension: 'txt',
      mimetype: 'text/plain',
      destination: uploadsPath,
      path: path.join(uploadsPath, newFilename),
      size: 9
    }])
  })
})
