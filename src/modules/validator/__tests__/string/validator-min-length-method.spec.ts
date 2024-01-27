import { validator } from '../../index'
import { InvalidParamError } from '../../../errors'

describe('Validator MinLength Method', () => {
  it('Should be able to validate the minLength method and return true if the value has the minimum number of characters', () => {
    const value = 'abcde'

    const sut = validator()
      .string()
      .minLength(5)

    expect(sut.validate(value)).toBeTruthy()
  })

  it('Should be able to validate the minLength method and return false if list is invalid', () => {
    const invalidList = [
      'abcd',
      false,
      new Date(),
      123,
      null,
      [],
      {},
      undefined
    ]

    const sut = validator()
      .string()
      .minLength(5)

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the minLength method when value is promise and return true if the value has the minimum number of characters', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('abcde')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .minLength(5)
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the minLength method when the value is a promise and return false if the value does not have the minimum number of characters', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('abcd')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .minLength(5)
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the minLength method and passedAll to equal true if the value has the minimum number of characters', () => {
    const value = 'abcde'

    const sut = validator()
      .string()
      .minLength(5)
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
        received: 'abcde'
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'string type',
        received: 'abcde'
      },
      {
        method: 'minLength',
        name: 'value_name',
        expect: 'value with a length greater than or equal to the limit',
        received: 'abcde'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength method and passedAll to equal false if the value does not have the minimum number of characters', () => {
    const value = 'abcd'

    const sut = validator()
      .string()
      .minLength(5)
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
        received: 'abcd'
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'string type',
        received: 'abcd'
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'minLength',
      type: 'invalid value',
      name: 'value_name',
      expect: 'value with a length greater than or equal to the limit',
      received: 'abcd',
      message: 'value_name must have a minimum of 5 characters!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength and passAll method as equal to true when it is not required and value is undefined', () => {
    const value = undefined

    const sut = validator()
      .string()
      .minLength(5)
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

  it('Should be able to validate the minLength method and passedAll to equal true if value is promise and has the minimum number of characters', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('abcde')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .minLength(5)
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
        received: 'abcde'
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'string type',
        received: 'abcde'
      },
      {
        method: 'minLength',
        expect: 'value with a length greater than or equal to the limit',
        name: 'value_name',
        received: 'abcde'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength method and passedAll to equal false if value is promise and does not have the minimum number of characters', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('abcd')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .minLength(5)
      .testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 'abcd'
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'string type',
        received: 'abcd'
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'minLength',
      type: 'invalid value',
      name: 'value_name',
      expect: 'value with a length greater than or equal to the limit',
      received: 'abcd',
      message: 'value_name must have a minimum of 5 characters!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength method and throw InvalidParamError if the value has the minimum number of characters', () => {
    const value = undefined

    const sut = (): void => validator()
      .string()
      .minLength(5)
      .throw(value, 'value_name', InvalidParamError)

    expect(sut).toThrow(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the minLength method and throw Error if the value is a promise and does not have the minimum number of characters', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('abcd')
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await validator()
      .string()
      .minLength(5)
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must have a minimum of 5 characters!')
  })

  /* eslint-disable */
  it('Should be able to throw an error if the maxLength method is called more than once', () => {
    const value = 'abcde'

    try {
      const sut: void = validator()
      .string()
      .minLength(5)
      .maxLength(5)
      // @ts-ignore
      .minLength(5)
    } catch (error: any) {
      const sut = error
      expect(sut.message).toEqual('minLength method has already been called!')
    }
  })

  it('Should be able to throw an error if the minLength method received invalid parameter', () => {
    try {
      validator()
        .string()
        // @ts-ignore
        .minLength(false)
    } catch (error: any) {
      const sut = error
      expect(sut.message).toEqual('vkrun: minLength method received invalid parameter!')
    }
  })
  /* eslint-enable */
})
