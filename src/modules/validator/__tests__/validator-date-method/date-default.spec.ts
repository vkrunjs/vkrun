import { validator } from '../../index'
import { InvalidParamError } from '../../../errors'

describe('Validator Date (default) Method', () => {
  // Should be able to validate the date method and return passedAll to equal false if the value is not correct date
  it('Should be able to validate the date method and return true if the value is of type default date', () => {
    const value = new Date()

    const sut = validator()
      .date()
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return false if the value is not of type default date', () => {
    const value = '27/11/21'

    const sut = validator()
      .date()
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method when value is promise and return true if the value is of type default date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date())
        }, 100)
      })
    }

    const sut = await validator()
      .date()
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method when value is promise and return false if the value is not of type default date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('27/11/21')
        }, 100)
      })
    }

    const sut = await validator()
      .date()
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is of type default date', () => {
    const value = new Date('2000-02-03T02:00:00.000Z')

    const sut = validator()
      .date()
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
        expect: 'date type ISO8601',
        name: 'value_name',
        received: new Date('2000-02-03T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is not of type default date', () => {
    const value = '27/11/21'

    const sut = validator()
      .date()
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
      expect: 'date type ISO8601',
      received: '27/11/21',
      message: 'the date value_name is not in the format ISO8601!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type default date', () => {
    const value = undefined

    const sut = validator()
      .date()
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

  it('Should be able to validate the date method and passedAll to equal true if the value is promise of type default date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-02-03T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await validator()
      .date()
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
        expect: 'date type ISO8601',
        name: 'value_name',
        received: new Date('2000-02-03T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type default date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('27/11/21')
        }, 100)
      })
    }

    const sut = await validator()
      .date()
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
      expect: 'date type ISO8601',
      received: '27/11/21',
      message: 'the date value_name is not in the format ISO8601!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and throw InvalidParamError if the value is not of type default date', () => {
    const value = undefined

    const sut = (): void => validator()
      .date()
      .throw(value, 'value_name', InvalidParamError)

    expect(sut).toThrow(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the date method and throw Error if the value is a promise and is not of type default date', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await validator()
      .date()
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('the date value_name is not in the format ISO8601!')
  })
})
