import { schema } from '../../../../index'
import { AnyError } from '../../../../../errors'

describe('Validator Date (DD-MM-YYYY and DD/MM/YYYY) Method', () => {
  it('Should be able to validate the date method and return true if the value is of type DD-MM-YYYY date', () => {
    const value = '30-12-2000'

    const sut = schema()
      .date('DD-MM-YYYY')
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is of type DD/MM/YYYY date', () => {
    const value = '30/12/2000'

    const sut = schema()
      .date('DD/MM/YYYY')
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return false if the value is not of type DD-MM-YYYY date', () => {
    const value = '12-30-2000'

    const sut = schema()
      .date('DD-MM-YYYY')
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and return false if the value is not of type DD/MM/YYYY date', () => {
    const value = '12/30/2000'

    const sut = schema()
      .date('DD/MM/YYYY')
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method when value is promise and return true if the value is of type DD-MM-YYYY date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('30-12-2000')
        }, 100)
      })
    }

    const sut = await schema()
      .date('DD-MM-YYYY')
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method when value is promise and return true if the value is of type DD/MM/YYYY date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve('30/12/2000')
        }, 100)
      })
    }

    const sut = await schema()
      .date('DD/MM/YYYY')
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method when value is promise and return false if the value is not of type DD-MM-YYYY date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date())
        }, 100)
      })
    }

    const sut = await schema()
      .date('DD-MM-YYYY')
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method when value is promise and return false if the value is not of type DD/MM/YYYY date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date())
        }, 100)
      })
    }

    const sut = await schema()
      .date('DD/MM/YYYY')
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is of type DD-MM-YYYY date', () => {
    const value = '30-12-2000'

    const sut = schema()
      .date('DD-MM-YYYY')
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
        received: '30-12-2000'
      },
      {
        method: 'date',
        expect: 'DD-MM-YYYY date type',
        name: 'value_name',
        received: '30-12-2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is of type DD/MM/YYYY date', () => {
    const value = '30/12/2000'

    const sut = schema()
      .date('DD/MM/YYYY')
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
        received: '30/12/2000'
      },
      {
        method: 'date',
        expect: 'DD/MM/YYYY date type',
        name: 'value_name',
        received: '30/12/2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is not of type DD-MM-YYYY date', () => {
    const value = new Date('2000-02-03T02:00:00.000Z')

    const sut = schema()
      .date('DD-MM-YYYY')
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
      expect: 'DD-MM-YYYY date type',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name is not in the format DD-MM-YYYY!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is not of type DD/MM/YYYY date', () => {
    const value = new Date('2000-02-03T02:00:00.000Z')

    const sut = schema()
      .date('DD/MM/YYYY')
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
      expect: 'DD/MM/YYYY date type',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name is not in the format DD/MM/YYYY!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type DD-MM-YYYY date', () => {
    const value = undefined

    const sut = schema()
      .date('DD-MM-YYYY')
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

  it('Should be able to validate the date and passAll method as equal to true when it is not required, undefined value and not of type DD/MM/YYYY date', () => {
    const value = undefined

    const sut = schema()
      .date('DD/MM/YYYY')
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

  it('Should be able to validate the date method and passedAll to equal true if the value is promise of type DD-MM-YYYY date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('30-12-2000')
        }, 100)
      })
    }

    const sut = await schema()
      .date('DD-MM-YYYY')
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
        received: '30-12-2000'
      },
      {
        method: 'date',
        expect: 'DD-MM-YYYY date type',
        name: 'value_name',
        received: '30-12-2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal true if the value is promise of type DD/MM/YYYY date', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve): any => {
        setTimeout(() => {
          resolve('30/12/2000')
        }, 100)
      })
    }

    const sut = await schema()
      .date('DD/MM/YYYY')
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
        received: '30/12/2000'
      },
      {
        method: 'date',
        expect: 'DD/MM/YYYY date type',
        name: 'value_name',
        received: '30/12/2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type DD-MM-YYYY date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-02-03T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await schema()
      .date('DD-MM-YYYY')
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
      expect: 'DD-MM-YYYY date type',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name is not in the format DD-MM-YYYY!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and passedAll to equal false if the value is a promise and is not of type DD/MM/YYYY date', async () => {
    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-02-03T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await schema()
      .date('DD/MM/YYYY')
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
      expect: 'DD/MM/YYYY date type',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name is not in the format DD/MM/YYYY!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and throw AnyError if the value is not of type DD-MM-YYYY date', () => {
    const value = undefined

    const sut = (): void => schema()
      .date('DD-MM-YYYY')
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the date method and throw AnyError if the value is not of type DD/MM/YYYY date', () => {
    const value = undefined

    const sut = (): void => schema()
      .date('DD/MM/YYYY')
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the date method and throw Error if the value is a promise and is not of type DD-MM-YYYY date', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .date('DD-MM-YYYY')
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('the date value_name is not in the format DD-MM-YYYY!')
  })

  it('Should be able to validate the date method and throw Error if the value is a promise and is not of type DD/MM/YYYY date', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .date('DD/MM/YYYY')
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('the date value_name is not in the format DD/MM/YYYY!')
  })
})
