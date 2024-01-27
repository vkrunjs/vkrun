import { validator } from '../../index'
import { InvalidParamError } from '../../../errors'

describe('Validator MinWord Method', () => {
  it('Should be able to validate the minWord method and return true if the value has the minimum words', () => {
    const value = 'Full Name'

    const sut = validator()
      .string()
      .minWord(2)

    expect(sut.validate(value)).toBeTruthy()
  })

  it('Should be able to validate the minWord method and return false if list is invalid', () => {
    const invalidList = [
      'Full',
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
      .minWord(2)

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the minWord method when value is promise and return true if the value has the minimum words', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('Full Name')
        }, 100)
      })
    }

    const test = await validator()
      .string()
      .minWord(2)
      .validateAsync(value())

    expect(test).toBeTruthy()
  })

  it('Should be able to validate the minWord method when the value is a promise and return false if the value does not have the minimum words', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('Full')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .minWord(2)
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the minWord method and passedAll to equal true if the value has the minimum words', () => {
    const value = 'Full Name'

    const sut = validator()
      .string()
      .minWord(2)
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
        received: 'Full Name'
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'string type',
        received: 'Full Name'
      },
      {
        method: 'minWord',
        name: 'value_name',
        expect: 'must have a minimum of words',
        received: 'Full Name'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minWord method and passedAll to equal false if the value does not have the minimum words', () => {
    const value = 'Full'

    const sut = validator()
      .string()
      .minWord(2)
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
        received: 'Full'
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'string type',
        received: 'Full'
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'minWord',
      type: 'invalid value',
      name: 'value_name',
      expect: 'must have a minimum of words',
      received: 'Full',
      message: 'value_name must have at least 2 words!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minWord and passAll method as equal to true when it is not required and value is undefined', () => {
    const value = undefined

    const sut = validator()
      .string()
      .minWord(2)
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

  it('Should be able to validate the minWord method and passedAll to equal true if value is promise and has the minimum words', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('Full Name')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .minWord(2)
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
        received: 'Full Name'
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'string type',
        received: 'Full Name'
      },
      {
        method: 'minWord',
        name: 'value_name',
        expect: 'must have a minimum of words',
        received: 'Full Name'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minWord method and passedAll to equal false if value is promise and does not have the minimum words', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('Full')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .minWord(2)
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
        received: 'Full'
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'string type',
        received: 'Full'
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'minWord',
      type: 'invalid value',
      name: 'value_name',
      expect: 'must have a minimum of words',
      received: 'Full',
      message: 'value_name must have at least 2 words!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minWord method and throw InvalidParamError if the value has the minimum words', () => {
    const value = undefined

    const sut = (): void => validator()
      .string()
      .minWord(2)
      .throw(value, 'value_name', InvalidParamError)

    expect(sut).toThrow(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the minWord method and throw Error if the value is a promise and does not have the minimum words', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('Full')
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await validator()
      .string()
      .minWord(2)
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must have at least 2 words!')
  })

  /* eslint-disable */
  it('Should be able to throw an error if the minWord method is called more than once', () => {
    const value = 'Full Name'

    try {
      const sut: void = validator()
      .string()
      .minWord(2)
      .maxLength(5)
      // @ts-ignore
      .minWord(5)
    } catch (error: any) {
      const sut = error
      expect(sut.message).toEqual('minWord method has already been called!')
    }
  })

  it('Should be able to throw an error if the minWord method received invalid parameter', () => {
    try {
      validator()
        .string()
        // @ts-ignore
        .minWord(false)
    } catch (error: any) {
      const sut = error
      expect(sut.message).toEqual('vkrun: minWord method received invalid parameter!')
    }
  })
  /* eslint-enable */
})
