import { parseJSON } from '../parse-json'

describe('Parse Data - Parse JSON', () => {
  it('Should parse body and return an object with the data if the body is not empty', () => {
    const request: any = {
      headers: {
        'content-type': 'application/json'
      },
      body: '{"string":"any@mail.com","integer":123,"float":1.56,"boolean":true,"date":"2000-02-03T02:00:00.000Z","array":["string",true,false,123,1.56,"2000-02-03T02:00:00.000Z"],"object":{"key":"string"}}'
    }

    const sut = parseJSON(request, false)

    expect(sut).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z'),
      array: ['string', true, false, 123, 1.56, new Date('2000-02-03T02:00:00.000Z')],
      object: {
        key: 'string'
      }
    })
  })

  it('Should parse body and return an object with the data if the body is not empty with escape SQL', () => {
    const request: any = {
      headers: {
        'content-type': 'application/json'
      },
      body: '{"sql":"SELECT * FROM USER;"}'
    }

    const sut = parseJSON(request, true)

    expect(sut).toEqual({
      sql: "'SELECT * FROM USER;'"
    })
  })

  it('Throw error if body is not JSON string', () => {
    const request: any = {
      headers: {
        'content-type': 'application/json'
      },
      body: ''
    }

    const sut = (): JSON => parseJSON(request, false)

    expect(sut).toThrow('Unexpected end of JSON input')
  })
})
