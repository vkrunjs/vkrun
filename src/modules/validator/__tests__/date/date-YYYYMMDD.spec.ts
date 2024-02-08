import { schema } from '../../../schema/index'
import { AnyError } from '../../../errors'

describe('Validator Date (YYYY-MM-DD and YYYY/MM/DD) Method', () => {
  it('Should be able to validate the date method and return true if the value is of type YYYY-MM-DD date', () => {
    const value = '2000-12-30'

    const sut = schema()
      .date('YYYY-MM-DD')
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is of type YYYY/MM/DD date', () => {
    const value = '2000/12/30'

    const sut = schema()
      .date('YYYY/MM/DD')
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return false if the value is not of type YYYY-MM-DD date', () => {
    const value = '2000-30-12'

    const sut = schema()
      .date('YYYY-MM-DD')
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and return false if the value is not of type YYYY/MM/DD date', () => {
    const value = '2000/30/12'

    const sut = schema()
      .date('YYYY/MM/DD')
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method when value is promise and return true if the value is of type YYYY-MM-DD date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('2000-12-30')
        }, 100)
      })
    }

    const sut = await schema()
      .date('YYYY-MM-DD')
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method when value is promise and return true if the value is of type YYYY/MM/DD date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve('2000/12/30')
        }, 100)
      })
    }

    const sut = await schema()
      .date('YYYY/MM/DD')
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method when value is promise and return false if the value is not of type YYYY-MM-DD date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('2000-30-12')
        }, 100)
      })
    }

    const sut = await schema()
      .date('YYYY-MM-DD')
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method when value is promise and return false if the value is not of type YYYY/MM/DD date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve('2000/30/12')
        }, 100)
      })
    }

    const sut = await schema()
      .date('YYYY/MM/DD')
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is of type YYYY-MM-DD date', () => {
    const value = '2000-12-30'

    const sut = schema()
      .date('YYYY-MM-DD')
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
        received: '2000-12-30'
      },
      {
        method: 'date',
        expect: 'YYYY-MM-DD date type',
        name: 'value_name',
        received: '2000-12-30'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is of type YYYY/MM/DD date', () => {
    const value = '2000/12/30'

    const sut = schema()
      .date('YYYY/MM/DD')
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
        received: '2000/12/30'
      },
      {
        method: 'date',
        expect: 'YYYY/MM/DD date type',
        name: 'value_name',
        received: '2000/12/30'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is not of type YYYY-MM-DD date', () => {
    const value = '2000-30-12'

    const sut = schema()
      .date('YYYY-MM-DD')
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '2000-30-12'
    }])
    expect(sut.errors).toEqual([{
      method: 'date',
      type: 'invalid value',
      name: 'value_name',
      expect: 'YYYY-MM-DD date type',
      received: '2000-30-12',
      message: 'the date value_name is not in the format YYYY-MM-DD!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is not of type YYYY/MM/DD date', () => {
    const value = '2000/30/12'

    const sut = schema()
      .date('YYYY/MM/DD')
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '2000/30/12'
    }])
    expect(sut.errors).toEqual([{
      method: 'date',
      type: 'invalid value',
      name: 'value_name',
      expect: 'YYYY/MM/DD date type',
      received: '2000/30/12',
      message: 'the date value_name is not in the format YYYY/MM/DD!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type YYYY-MM-DD date', () => {
    const value = undefined

    const sut = schema()
      .date('YYYY-MM-DD')
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

  it('Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type YYYY/MM/DD date', () => {
    const value = undefined

    const sut = schema()
      .date('YYYY/MM/DD')
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

  it('Should be able to validate the date method and passedAll to equal true if the value is promise of type YYYY-MM-DD date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('2000-12-30')
        }, 100)
      })
    }

    const sut = await schema()
      .date('YYYY-MM-DD')
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
        received: '2000-12-30'
      },
      {
        method: 'date',
        expect: 'YYYY-MM-DD date type',
        name: 'value_name',
        received: '2000-12-30'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is promise of type YYYY/MM/DD date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve('2000/12/30')
        }, 100)
      })
    }

    const sut = await schema()
      .date('YYYY/MM/DD')
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
        received: '2000/12/30'
      },
      {
        method: 'date',
        expect: 'YYYY/MM/DD date type',
        name: 'value_name',
        received: '2000/12/30'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type YYYY-MM-DD date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-02-03T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await schema()
      .date('YYYY-MM-DD')
      .testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: new Date('2000-02-03T02:00:00.000Z')
    }])
    expect(sut.errors).toEqual([{
      method: 'date',
      type: 'invalid value',
      name: 'value_name',
      expect: 'YYYY-MM-DD date type',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name is not in the format YYYY-MM-DD!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type YYYY/MM/DD date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-02-03T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await schema()
      .date('YYYY/MM/DD')
      .testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: new Date('2000-02-03T02:00:00.000Z')
    }])
    expect(sut.errors).toEqual([{
      method: 'date',
      type: 'invalid value',
      name: 'value_name',
      expect: 'YYYY/MM/DD date type',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name is not in the format YYYY/MM/DD!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and throw AnyError if the value is not of type YYYY-MM-DD date', () => {
    const value = undefined

    const sut = (): void => schema()
      .date('YYYY-MM-DD')
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the date method and throw AnyError if the value is not of type YYYY/MM/DD date', () => {
    const value = undefined

    const sut = (): void => schema()
      .date('YYYY/MM/DD')
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the date method and throw Error if the value is a promise and is not of type YYYY-MM-DD date', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .date('YYYY-MM-DD')
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('the date value_name is not in the format YYYY-MM-DD!')
  })

  it('Should be able to validate the date method and throw Error if the value is a promise and is not of type YYYY/MM/DD date', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .date('YYYY/MM/DD')
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('the date value_name is not in the format YYYY/MM/DD!')
  })
})
