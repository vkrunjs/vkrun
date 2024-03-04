import { formatObjectValues } from '../format-object-values'

describe('Parse Data - Format Object Values', () => {
  it('Should format object values without escape SQL', () => {
    const value = {
      date: '2000-02-03T02:00:00.000Z',
      truthy: 'true',
      fal: 'false',
      integer: '123',
      float: '5.56',
      string: 'string',
      sql: 'SELECT * FROM USER;',
      array: [
        '2000-02-03T02:00:00.000Z',
        'true',
        'false',
        '5.56',
        'SELECT * FROM USER;'
      ],
      object: {
        date: '2000-02-03T02:00:00.000Z',
        truthy: 'true',
        fal: 'false',
        integer: '123',
        float: '5.56',
        string: 'string',
        sql: 'SELECT * FROM USER;',
        array: [
          '2000-02-03T02:00:00.000Z',
          'true',
          'false',
          '5.56',
          'SELECT * FROM USER;'
        ]
      }
    }

    const sut = formatObjectValues(value, false)

    expect(sut).toEqual({
      date: new Date('2000-02-03T02:00:00.000Z'),
      truthy: true,
      fal: false,
      integer: 123,
      float: 5.56,
      string: 'string',
      sql: 'SELECT * FROM USER;',
      array: [
        new Date('2000-02-03T02:00:00.000Z'),
        true,
        false,
        5.56,
        'SELECT * FROM USER;'
      ],
      object: {
        date: new Date('2000-02-03T02:00:00.000Z'),
        truthy: true,
        fal: false,
        integer: 123,
        float: 5.56,
        string: 'string',
        sql: 'SELECT * FROM USER;',
        array: [
          new Date('2000-02-03T02:00:00.000Z'),
          true,
          false,
          5.56,
          'SELECT * FROM USER;'
        ]
      }
    })
  })

  it('Should format object values with escape SQL', () => {
    const value = {
      date: '2000-02-03T02:00:00.000Z',
      truthy: 'true',
      fal: 'false',
      integer: '123',
      float: '5.56',
      string: 'string',
      sql: 'SELECT * FROM USER;',
      array: [
        '2000-02-03T02:00:00.000Z',
        'true',
        'false',
        '5.56',
        'SELECT * FROM USER;'
      ],
      object: {
        date: '2000-02-03T02:00:00.000Z',
        truthy: 'true',
        fal: 'false',
        integer: '123',
        float: '5.56',
        string: 'string',
        sql: 'SELECT * FROM USER;',
        array: [
          '2000-02-03T02:00:00.000Z',
          'true',
          'false',
          '5.56',
          'SELECT * FROM USER;'
        ]
      }
    }

    const sut = formatObjectValues(value, true)

    expect(sut).toEqual({
      date: new Date('2000-02-03T02:00:00.000Z'),
      truthy: true,
      fal: false,
      integer: 123,
      float: 5.56,
      string: 'string',
      sql: "'SELECT * FROM USER;'",
      array: [
        new Date('2000-02-03T02:00:00.000Z'),
        true,
        false,
        5.56,
        "'SELECT * FROM USER;'"
      ],
      object: {
        date: new Date('2000-02-03T02:00:00.000Z'),
        truthy: true,
        fal: false,
        integer: 123,
        float: 5.56,
        string: 'string',
        sql: "'SELECT * FROM USER;'",
        array: [
          new Date('2000-02-03T02:00:00.000Z'),
          true,
          false,
          5.56,
          "'SELECT * FROM USER;'"
        ]
      }
    })
  })
})
