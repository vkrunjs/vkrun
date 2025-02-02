import { schema } from '../../../../index'
import { AnyError } from '../../../../../errors'

describe('Validator Date (ISO8601) Method', () => {
  it('Should be able to validate the date method and return true if the value is of type ISO8601 date', () => {
    const value = new Date()

    const sut = schema()
      .date({ type: 'ISO8601' })
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if list is valid', () => {
    const validList = [
      new Date(),
      new Date('2020-01-01T00:00:00+02:00'),
      new Date('2020-01-01T00:00:00.123+02:00'),
      new Date('2020-01-01T00:00:00.123+0200'),
      new Date('2020-01-01T00:00:00Z')
    ]

    const sut = schema().date({ type: 'ISO8601' })

    expect(validList.every((value) => sut.validate(value))).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is a date string of type ISO8601 date', () => {
    const value = new Date().toISOString()

    const sut = schema()
      .date({ type: 'ISO8601' })
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return false if the value is not of type ISO8601 date', () => {
    const value = '27/11/21'

    const sut = schema()
      .date({ type: 'ISO8601' })
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method when value is promise and return true if the value is of type ISO8601 date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date())
        }, 100)
      })
    }

    const sut = await schema()
      .date({ type: 'ISO8601' })
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method when value is promise and return false if the value is not of type ISO8601 date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('27/11/21')
        }, 100)
      })
    }

    const sut = await schema()
      .date({ type: 'ISO8601' })
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is of type ISO8601 date', () => {
    const value = new Date('2000-02-03T02:00:00.000Z')

    const sut = schema()
      .date({ type: 'ISO8601' })
      .test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: new Date('2000-02-03T02:00:00.000Z')
      },
      {
        method: 'date',
        expect: 'ISO8601 date type',
        name: 'value_name',
        received: new Date('2000-02-03T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is not of type ISO8601 date', () => {
    const value = '27/11/21'

    const sut = schema()
      .date({ type: 'ISO8601' })
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '27/11/21'
    }])
    expect(sut.errors).toEqual([{
      method: 'date',
      type: 'invalid value',
      name: 'value_name',
      expect: 'ISO8601 date type',
      received: '27/11/21',
      message: 'the date value_name is not in the format ISO8601!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type ISO8601 date', () => {
    const value = undefined

    const sut = schema()
      .date({ type: 'ISO8601' })
      .notRequired()
      .test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'value_name',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is promise of type ISO8601 date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-02-03T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await schema()
      .date({ type: 'ISO8601' })
      .testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: new Date('2000-02-03T02:00:00.000Z')
      },
      {
        method: 'date',
        expect: 'ISO8601 date type',
        name: 'value_name',
        received: new Date('2000-02-03T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type ISO8601 date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('27/11/21')
        }, 100)
      })
    }

    const sut = await schema()
      .date({ type: 'ISO8601' })
      .testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '27/11/21'
    }])
    expect(sut.errors).toEqual([{
      method: 'date',
      type: 'invalid value',
      name: 'value_name',
      expect: 'ISO8601 date type',
      received: '27/11/21',
      message: 'the date value_name is not in the format ISO8601!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and throw AnyError if the value is not of type ISO8601 date', () => {
    const value = undefined

    const sut = (): void => schema()
      .date({ type: 'ISO8601' })
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the date method and throw Error if the value is a promise and is not of type ISO8601 date', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .date({ type: 'ISO8601' })
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('the date value_name is not in the format ISO8601!')
  })
})
