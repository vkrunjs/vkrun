import { schema } from '../../../../index'
import { AnyError } from '../../../../../errors'

describe('Validator Min Date Method', () => {
  it('Should be able to validate the min method and return true if the date is greater than the reference date', () => {
    const date = new Date('2000-02-04T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const sut = schema()
      .date()
      .min(refDate)

    expect(sut.validate(date)).toBeTruthy()
  })

  it('Should be able to validate the min method and return false if list is invalid', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')

    const invalidList = [
      new Date('2000-02-03T02:00:00.000Z'),
      new Date('2000-02-04T02:00:00.000Z')
    ]

    const dateSchema = schema().date()

    expect(invalidList.every(
      (sut) => dateSchema
        .min(sut)
        .validate(date))
    ).toBeFalsy()
  })

  it('Should be able to validate the min method when value is promise and return true if the date is greater than the reference date', async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const date = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-02-03T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await schema()
      .date()
      .min(refDate)
      .validateAsync(date())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the min method when the value is a promise and return true if the date is less than the reference date', async () => {
    const refDate = new Date('2000-02-03T02:00:00.000Z')
    const date = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-02-02T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await schema()
      .date()
      .min(refDate)
      .validateAsync(date())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the min method and passedAll to equal true if the date is greater than the reference date', () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = schema()
      .date()
      .min(refDate)
      .test(date, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(3)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: new Date('2000-02-03T02:00:00.000Z')
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'ISO8601 date type',
        received: new Date('2000-02-03T02:00:00.000Z')
      },
      {
        method: 'min',
        name: 'value_name',
        expect: '2000/02/03 02:00:00.000 greater than or equal to 2000/02/02 02:00:00.000',
        received: new Date('2000-02-03T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the min method and passedAll to equal false if the date is less than the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const sut = schema()
      .date()
      .min(refDate)
      .test(date, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: new Date('2000-02-02T02:00:00.000Z')
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'ISO8601 date type',
        received: new Date('2000-02-02T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'min',
      type: 'invalid value',
      name: 'value_name',
      expect: '2000/02/02 02:00:00.000 greater than or equal to 2000/02/03 02:00:00.000',
      received: new Date('2000-02-02T02:00:00.000Z'),
      message: 'the value_name 2000/02/02 02:00:00.000 must be greater than or equal to the 2000/02/03 02:00:00.000!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the min and passAll method as equal to true when it is not required and value is undefined', () => {
    const date = undefined
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = schema()
      .date()
      .min(refDate)
      .notRequired()
      .test(date, 'value_name')

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

  it('Should be able to validate the min and passAll method as equal to false if value is undefined', () => {
    const date = undefined
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = schema()
      .date()
      .min(refDate)
      .test(date, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(3)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 'undefined',
        message: 'value_name is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'value_name',
        expect: 'ISO8601 date type',
        received: 'undefined',
        message: 'the date value_name is not in the format ISO8601!'
      },
      {
        method: 'min',
        type: 'invalid value',
        name: 'value_name',
        expect: 'date greater than or equal to reference date',
        received: 'undefined',
        message: 'the date value_name is not in the format date!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the min method and passedAll to equal true if value is promise and greater than the reference date', async () => {
    const refDate = new Date('2000-03-02T02:00:00.000Z')
    const date = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-03-02T02:00:00.001Z'))
        }, 100)
      })
    }

    const sut = await schema()
      .date()
      .min(refDate)
      .testAsync(date(), 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(3)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: new Date('2000-03-02T02:00:00.001Z')
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'ISO8601 date type',
        received: new Date('2000-03-02T02:00:00.001Z')
      },
      {
        method: 'min',
        name: 'value_name',
        expect: '2000/03/02 02:00:00.001 greater than or equal to 2000/03/02 02:00:00.000',
        received: new Date('2000-03-02T02:00:00.001Z')
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the min method and passedAll to equal false if value is promise and less than the reference date', async () => {
    const refDate = new Date('2000-03-02T02:00:00.001Z')
    const date = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-03-02T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = await schema()
      .date()
      .min(refDate)
      .testAsync(date(), 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: new Date('2000-03-02T02:00:00.000Z')
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'ISO8601 date type',
        received: new Date('2000-03-02T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'min',
      type: 'invalid value',
      name: 'value_name',
      expect: '2000/03/02 02:00:00.000 greater than or equal to 2000/03/02 02:00:00.001',
      received: new Date('2000-03-02T02:00:00.000Z'),
      message: 'the value_name 2000/03/02 02:00:00.000 must be greater than or equal to the 2000/03/02 02:00:00.001!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the min method and throw AnyError if the value is undefined', () => {
    const date = undefined
    const refDate = new Date('2000-03-02T02:00:00.000Z')

    const sut = (): void => schema()
      .date()
      .min(refDate)
      .throw(date, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the min method and throw Error if the value is a promise and less than the reference date', async () => {
    const refDate = new Date('2000-03-02T02:00:00.001Z')
    const date = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date('2000-03-02T02:00:00.000Z'))
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .date()
      .min(refDate)
      .throwAsync(date(), 'value_name')

    await expect(sut).rejects.toThrow('the value_name 2000/03/02 02:00:00.000 must be greater than or equal to the 2000/03/02 02:00:00.001!')
  })

  /* eslint-disable */
  it('Should be able to throw an error if the min method is called more than once', () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    try {
      const sut: void = schema()
      .date()
      .min(refDate)
      .max(refDate)
      // @ts-ignore
      .min(refDate)
    } catch (error: any) {
      const sut = error
      expect(sut.message).toEqual('min method has already been called!')
    }
  })
  
  it('Should be able to throw an error if the max method received invalid parameter', () => {
    try {
      schema()
        .date()
        // @ts-ignore
        .min(false)
    } catch (error: any) {
      const sut = error
      expect(sut.message).toEqual('vkrun-schema: min method received invalid parameter!')
    }
  })
  /* eslint-enable */
})
