import { validator } from '../index'
import { InvalidParamError } from '../../errors'

describe('Validator String Method', () => {
  it('Should be able to validate the string method and return true if the value is of type string', () => {
    const value = 'string'

    const sut = validator()
      .string()
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the string method and return false if the value is not of type string', () => {
    const value = false

    const sut = validator()
      .string()
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the string method when value is promise and return true if the value is of type string', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('string')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the string method when value is promise and return false if the value is not of type string', async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the string method and passedAll to equal true if the value is of type string', () => {
    const value = 'string'

    const sut = validator()
      .string()
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
        received: 'string'
      },
      {
        method: 'string',
        expect: 'string type',
        name: 'value_name',
        received: 'string'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the string method and passedAll to equal false if the value is not of type string', () => {
    const value = false

    const sut = validator()
      .string()
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: false
    }])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'value_name',
      expect: 'string type',
      received: false,
      message: 'value_name must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the string and passAll method as equal to true when it is not required, undefined value and not of type string', () => {
    const value = undefined

    const sut = validator()
      .string()
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

  it('Should be able to validate the string method and passedAll to equal true if the value is promise of type string', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('string')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
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
        received: 'string'
      },
      {
        method: 'string',
        expect: 'string type',
        name: 'value_name',
        received: 'string'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the string method and passedAll to equal false if the value is a promise and is not of type string', async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: false
    }])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'value_name',
      expect: 'string type',
      received: false,
      message: 'value_name must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the string method and throw InvalidParamError if the value is not of type string', () => {
    const value = undefined

    const sut = (): void => validator()
      .string()
      .throw(value, 'value_name', InvalidParamError)

    expect(sut).toThrow(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the string method and throw Error if the value is a promise and is not of type string', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await validator()
      .string()
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must be a string type!')
  })
})
