import { schema } from '../../../../index'
import { AnyError } from '../../../../../errors'

describe('Validator Integer Method', () => {
  it('Should be able to validate the integer method and return true if the value is integer', () => {
    const value = 1

    const sut = schema()
      .number()
      .integer()
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the integer method and return false if list is invalid', () => {
    const invalidList = [
      1.5,
      '1',
      false,
      new Date(),
      null,
      [],
      {},
      undefined
    ]

    const sut = schema()
      .number()
      .integer()

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the integer method when value is promise and return true if the value is integer', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .integer()
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the integer method when value is promise and return false if the value is not integer', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1.5)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .integer()
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the integer method and passedAll to equal true if the value is integer', () => {
    const value = 1

    const sut = schema()
      .number()
      .integer()
      .test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(3)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 1
      },
      {
        method: 'number',
        expect: 'number type',
        name: 'value_name',
        received: 1
      },
      {
        method: 'integer',
        name: 'value_name',
        expect: 'integer type',
        received: 1
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the integer method and passedAll to equal false if the value is not integer', () => {
    const value = 1.5

    const sut = schema()
      .number()
      .integer()
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 1.5
      },
      {
        method: 'number',
        name: 'value_name',
        expect: 'number type',
        received: 1.5
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'integer',
      type: 'invalid value',
      name: 'value_name',
      expect: 'integer type',
      received: 1.5,
      message: 'value_name must be a integer!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should allow custom error message', () => {
    const value = 1.5

    const sut = schema()
      .number()
      .integer({ message: '[valueName] [value]!' })
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 1.5
      },
      {
        method: 'number',
        name: 'value_name',
        expect: 'number type',
        received: 1.5
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'integer',
      type: 'invalid value',
      name: 'value_name',
      expect: 'integer type',
      received: 1.5,
      message: 'value_name 1.5!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the integer and passAll method as equal to true when it is not required, undefined value and not integer', () => {
    const value = undefined

    const sut = schema()
      .number()
      .integer()
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

  it('Should be able to validate the integer method and passedAll to equal true if the value is promise of integer', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .integer()
      .testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(3)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 1
      },
      {
        method: 'number',
        expect: 'number type',
        name: 'value_name',
        received: 1
      },
      {
        method: 'integer',
        expect: 'integer type',
        name: 'value_name',
        received: 1
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the integer method and passedAll to equal false if the value is a promise and is not of integer', async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .integer()
      .testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: false
    }])
    expect(sut.errors).toEqual([
      {
        method: 'number',
        type: 'invalid value',
        name: 'value_name',
        expect: 'number type',
        received: false,
        message: 'value_name must be a number type!'
      },
      {
        method: 'integer',
        type: 'invalid value',
        name: 'value_name',
        expect: 'integer type',
        received: false,
        message: 'value_name must be a integer!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the integer method and throw AnyError if the value is not integer', () => {
    const value = undefined

    const sut = (): void => schema()
      .number()
      .integer()
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the integer method and throw Error if the value is a promise and is not integer', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1.5)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .number()
      .integer()
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must be a integer!')
  })
})
