import { parseParams } from '../parse-params'

describe('Parse Data - Parse Params', () => {
  it('Should parse the url and return an object with the data if the url has the parameters', () => {
    const request: any = {
      url: '/any@mail.com/123/1.56/true/2000-02-03T02:00:00.000Z',
      route: {
        path: '/:string/:integer/:float/:boolean/:date',
        method: 'GET',
        handlers: [() => {}]
      }
    }

    const sut = parseParams(request, false)

    expect(sut).toEqual({
      boolean: true,
      date: new Date('2000-02-03T02:00:00.000Z'),
      float: 1.56,
      integer: 123,
      string: 'any@mail.com'
    })
  })

  it('Should parse the url and return an object with the data if the url has the parameters with escape SQL', () => {
    const request: any = {
      url: '/SELECT * FROM USER;',
      route: {
        path: '/:sql',
        method: 'GET',
        handlers: [() => {}]
      }
    }

    const sut = parseParams(request, true)

    expect(sut).toEqual({
      sql: "'SELECT * FROM USER;'"
    })
  })

  it('Should parse the url and return an object empty if the url is empty', () => {
    const request: any = {
      url: '',
      route: {
        path: '/:param',
        method: 'GET',
        handlers: [() => {}]
      }
    }

    const sut = parseParams(request, false)

    expect(sut).toEqual({})
  })

  it('Should parse the url and return an object empty if the url is undefined', () => {
    const request: any = {
      url: undefined,
      route: {
        path: '/:param',
        method: 'GET',
        handlers: [() => {}]
      }
    }

    const sut = parseParams(request, false)

    expect(sut).toEqual({})
  })
})
