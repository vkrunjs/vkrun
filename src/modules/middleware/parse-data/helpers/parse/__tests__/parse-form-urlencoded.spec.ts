import { parseFormUrlEncoded } from '../parse-form-urlencoded'

describe('Parse Data - Parse Form UrlEncoded', () => {
  it('Should parse body and return an object with the data if the body is not empty', () => {
    const request: any = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: 'string=any%40mail.com&integer=123&float=1.56&boolean=true&date=2000-02-03T02%3A00%3A00.000Z'
    }

    const sut = parseFormUrlEncoded(request, false)

    expect(sut).toEqual({
      string: 'any@mail.com',
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z')
    })
  })

  it('Should parse body and return an object with the data if the body is not empty with escape SQL', () => {
    const request: any = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: 'sql=SELECT * FROM USER;'
    }

    const sut = parseFormUrlEncoded(request, true)

    expect(sut).toEqual({
      sql: "'SELECT * FROM USER;'"
    })
  })

  it('Should parse body and return an object empty if the body is empty', () => {
    const request: any = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: ''
    }

    const sut = parseFormUrlEncoded(request, false)

    expect(sut).toEqual({})
  })
})
