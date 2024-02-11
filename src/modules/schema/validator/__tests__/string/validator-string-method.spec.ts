import { schema } from '../../../index'
import { AnyError } from '../../../../errors'

describe('Validator String Method', () => {
  it('Should be able to validate the string method and return true if the value is of type string', () => {
    const value = 'string'

    const sut = schema()
      .string()
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the string method and return false if list is invalid', () => {
    const invalidList = [
      false,
      new Date(),
      123,
      null,
      [],
      {},
      undefined
    ]

    const sut = schema().string()

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the string method when value is promise and return true if the value is of type string', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('string')
        }, 100)
      })
    }

    const sut = await schema()
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

    const sut = await schema()
      .string()
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the string method and passedAll to equal true if the value is of type string', () => {
    const value = 'string'

    const sut = schema()
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

    const sut = schema()
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

    const sut = schema()
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

    const sut = await schema()
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

    const sut = await schema()
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

  it('Should be able to validate the string method and throw AnyError if the value is not of type string', () => {
    const value = undefined

    const sut = (): void => schema()
      .string()
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the string method and throw Error if the value is a promise and is not of type string', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .string()
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must be a string type!')
  })

  it('Should be able to validate the string method and throw Error if the error class does not extend Error', () => {
    class ClassNotExtendError extends Event {
      constructor (message: string) {
        super(`invalid param: ${message}`)
      }
    }

    const sut = (): void => schema()
      .string()
      .throw(undefined, 'value_name', new ClassNotExtendError(''))

    expect(sut).toThrow('vkrun: provided class does not extend Error!')
  })
})
