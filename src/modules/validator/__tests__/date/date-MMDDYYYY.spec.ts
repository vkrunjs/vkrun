import { validator } from '../../index'
import { InvalidParamError } from '../../../errors'

describe('Validator Date (MM-DD-YYYY and MM/DD/YYYY) Method', () => {
  it('Should be able to validate the date method and return true if the value is of type MM-DD-YYYY date', () => {
    const value = '12-30-2000'

    const sut = validator()
      .date('MM-DD-YYYY')
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is of type MM/DD/YYYY date', () => {
    const value = '12/30/2000'

    const sut = validator()
      .date('MM/DD/YYYY')
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return false if the value is not of type MM-DD-YYYY date', () => {
    const value = '30-12-2000'

    const sut = validator()
      .date('MM-DD-YYYY')
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and return false if the value is not of type MM/DD/YYYY date', () => {
    const value = '30/12/2000'

    const sut = validator()
      .date('MM/DD/YYYY')
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method when value is promise and return true if the value is of type MM-DD-YYYY date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('12-30-2000')
        }, 100)
      })
    }

    const sut = await validator()
      .date('MM-DD-YYYY')
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method when value is promise and return true if the value is of type MM/DD/YYYY date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve('12/30/2000')
        }, 100)
      })
    }

    const sut = await validator()
      .date('MM/DD/YYYY')
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method when value is promise and return false if the value is not of type MM-DD-YYYY date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date())
        }, 100)
      })
    }

    const sut = await validator()
      .date('MM-DD-YYYY')
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method when value is promise and return false if the value is not of type MM/DD/YYYY date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date())
        }, 100)
      })
    }

    const sut = await validator()
      .date('MM/DD/YYYY')
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is of type MM-DD-YYYY date', () => {
    const value = '12-30-2000'

    const sut = validator()
      .date('MM-DD-YYYY')
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
        received: '12-30-2000'
      },
      {
        method: 'date',
        expect: 'MM-DD-YYYY date type',
        name: 'value_name',
        received: '12-30-2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is of type MM/DD/YYYY date', () => {
    const value = '12/30/2000'

    const sut = validator()
      .date('MM/DD/YYYY')
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
        received: '12/30/2000'
      },
      {
        method: 'date',
        expect: 'MM/DD/YYYY date type',
        name: 'value_name',
        received: '12/30/2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is not of type MM-DD-YYYY date', () => {
    const value = new Date('2000-02-03T02:00:00.000Z')

    const sut = validator()
      .date('MM-DD-YYYY')
      .test(value, 'value_name')

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
      expect: 'MM-DD-YYYY date type',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name is not in the format MM-DD-YYYY!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is not of type MM/DD/YYYY date', () => {
    const value = new Date('2000-02-03T02:00:00.000Z')

    const sut = validator()
      .date('MM/DD/YYYY')
      .test(value, 'value_name')

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
      expect: 'MM/DD/YYYY date type',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name is not in the format MM/DD/YYYY!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type MM-DD-YYYY date', () => {
    const value = undefined

    const sut = validator()
      .date('MM-DD-YYYY')
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

  it('Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type MM/DD/YYYY date', () => {
    const value = undefined

    const sut = validator()
      .date('MM/DD/YYYY')
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

  it('Should be able to validate the date method and passedAll to equal true if the value is promise of type MM-DD-YYYY date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('12-30-2000')
        }, 100)
      })
    }

    const sut = await validator()
      .date('MM-DD-YYYY')
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
        received: '12-30-2000'
      },
      {
        method: 'date',
        expect: 'MM-DD-YYYY date type',
        name: 'value_name',
        received: '12-30-2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is promise of type MM/DD/YYYY date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve('12/30/2000')
        }, 100)
      })
    }

    const sut = await validator()
      .date('MM/DD/YYYY')
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
        received: '12/30/2000'
      },
      {
        method: 'date',
        expect: 'MM/DD/YYYY date type',
        name: 'value_name',
        received: '12/30/2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type MM-DD-YYYY date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-02-03T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await validator()
      .date('MM-DD-YYYY')
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
      expect: 'MM-DD-YYYY date type',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name is not in the format MM-DD-YYYY!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type MM/DD/YYYY date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-02-03T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await validator()
      .date('MM/DD/YYYY')
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
      expect: 'MM/DD/YYYY date type',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name is not in the format MM/DD/YYYY!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and throw InvalidParamError if the value is not of type MM-DD-YYYY date', () => {
    const value = undefined

    const sut = (): void => validator()
      .date('MM-DD-YYYY')
      .throw(value, 'value_name', InvalidParamError)

    expect(sut).toThrow(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the date method and throw InvalidParamError if the value is not of type MM/DD/YYYY date', () => {
    const value = undefined

    const sut = (): void => validator()
      .date('MM/DD/YYYY')
      .throw(value, 'value_name', InvalidParamError)

    expect(sut).toThrow(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the date method and throw Error if the value is a promise and is not of type MM-DD-YYYY date', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await validator()
      .date('MM-DD-YYYY')
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('the date value_name is not in the format MM-DD-YYYY!')
  })

  it('Should be able to validate the date method and throw Error if the value is a promise and is not of type MM/DD/YYYY date', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await validator()
      .date('MM/DD/YYYY')
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('the date value_name is not in the format MM/DD/YYYY!')
  })
})
