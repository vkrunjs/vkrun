import { validator } from '../index'
import { InvalidParamError } from '../../errors'

describe('Validator Float Method', () => {
  it('Should be able to validate the float method and return true if the value is float', () => {
    const value = 1.5

    const sut = validator()
      .number()
      .float()
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the float method and return false if list is invalid', () => {
    const invalidList = [
      1,
      '1',
      false,
      new Date(),
      null,
      [],
      {},
      undefined
    ]

    const sut = validator()
      .number()
      .float()

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the float method when value is promise and return true if the value is float', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1.5)
        }, 100)
      })
    }

    const sut = await validator()
      .number()
      .float()
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the float method when value is promise and return false if the value is not float', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    }

    const sut = await validator()
      .number()
      .float()
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the float method and passedAll to equal true if the value is float', () => {
    const value = 1.5

    const sut = validator()
      .number()
      .float()
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
        received: 1.5
      },
      {
        method: 'number',
        expect: 'number type',
        name: 'value_name',
        received: 1.5
      },
      {
        method: 'float',
        name: 'value_name',
        expect: 'float type',
        received: 1.5
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the float method and passedAll to equal false if the value is not float', () => {
    const value = 1

    const sut = validator()
      .number()
      .float()
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
        received: 1
      },
      {
        method: 'number',
        name: 'value_name',
        expect: 'number type',
        received: 1
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'float',
      type: 'invalid value',
      name: 'value_name',
      expect: 'float type',
      received: 1,
      message: 'value_name must be a number and float!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the float and passAll method as equal to true when it is not required, undefined value and not float', () => {
    const value = undefined

    const sut = validator()
      .number()
      .float()
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

  it('Should be able to validate the float method and passedAll to equal true if the value is promise of float', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1.5)
        }, 100)
      })
    }

    const sut = await validator()
      .number()
      .float()
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
        received: 1.5
      },
      {
        method: 'number',
        expect: 'number type',
        name: 'value_name',
        received: 1.5
      },
      {
        method: 'float',
        expect: 'float type',
        name: 'value_name',
        received: 1.5
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the float method and passedAll to equal false if the value is a promise and is not of float', async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 100)
      })
    }

    const sut = await validator()
      .number()
      .float()
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
        method: 'float',
        type: 'invalid value',
        name: 'value_name',
        expect: 'float type',
        received: false,
        message: 'value_name must be a number and float!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the float method and throw InvalidParamError if the value is not float', () => {
    const value = undefined

    const sut = (): void => validator()
      .number()
      .float()
      .throw(value, 'value_name', InvalidParamError)

    expect(sut).toThrow(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the float method and throw Error if the value is a promise and is not float', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await validator()
      .number()
      .float()
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must be a number and float!')
  })
})
