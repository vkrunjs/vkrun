import { parseMultipartFormData } from '../parse-multipart-form-data'
import * as type from '../../../../types'

describe('Parse Data - Parse Multipart Form Data', () => {
  it('Should parse body and return an object with the data if the body is not empty', () => {
    const request: any = {
      headers: {
        'content-type': 'multipart/form-data; boundary=--------------------------069109777880514251234306'
      },
      body: '----------------------------069109777880514251234306\r\n' +
      'Content-Disposition: form-data; name="string"\r\n' +
      '\r\n' +
      'any@mail.com\r\n' +
      '----------------------------069109777880514251234306\r\n' +
      'Content-Disposition: form-data; name="integer"\r\n' +
      '\r\n' +
      '123\r\n' +
      '----------------------------069109777880514251234306\r\n' +
      'Content-Disposition: form-data; name="float"\r\n' +
      '\r\n' +
      '1.56\r\n' +
      '----------------------------069109777880514251234306\r\n' +
      'Content-Disposition: form-data; name="boolean"\r\n' +
      '\r\n' +
      'true\r\n' +
      '----------------------------069109777880514251234306\r\n' +
      'Content-Disposition: form-data; name="date"\r\n' +
      '\r\n' +
      '2000-02-03T02:00:00.000Z\r\n' +
      '----------------------------069109777880514251234306\r\n' +
      'Content-Disposition: form-data; name="file"; filename="filename.txt"\r\n' +
      'Content-Type: text/plain\r\n' +
      '\r\n' +
      '----------------------------069109777880514251234306--'
    }

    const sut = parseMultipartFormData(request, false)

    expect(sut).toEqual({
      body: {
        string: 'any@mail.com',
        integer: 123,
        float: 1.56,
        boolean: true,
        date: new Date('2000-02-03T02:00:00.000Z')
      },
      files: [
        {
          fieldName: 'file',
          buffer: '',
          extension: 'txt',
          filename: 'filename.txt',
          mimetype: 'text/plain'
        }
      ]
    })
  })

  it('Should parse body and return an object with the data if the body is not empty with escape SQL', () => {
    const request: any = {
      headers: {
        'content-type': 'multipart/form-data; boundary=--------------------------041369582845125703494629'
      },
      body: '----------------------------041369582845125703494629\r\n' +
      'Content-Disposition: form-data; name="sql"\r\n' +
      '\r\n' +
      'SELECT * FROM USER;\r\n' +
      '----------------------------041369582845125703494629--'
    }

    const sut = parseMultipartFormData(request, true)

    expect(sut).toEqual({
      body: {
        sql: "'SELECT * FROM USER;'"
      },
      files: []
    })
  })

  it('Should parse body and return error if the body is empty', () => {
    const request: any = {
      headers: {},
      body: ''
    }

    const sut = (): {
      body: object
      files: type.File[]
    } => parseMultipartFormData(request, false)

    expect(sut).toThrow('Boundary not found')
  })
})
