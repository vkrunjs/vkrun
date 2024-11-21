import { schema } from '../../../index'
import { AnyError } from '../../../../errors'

describe('Validator Function Method', () => {
  it('Should be able to validate the function method and return true if the value is of type function', () => {
    const valueIsFunction = (): void => {}

    const sut = schema()
      .function()
      .validate(valueIsFunction)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the function method and return false if list is invalid', () => {
    const invalidList = [
      'invalid-uuid-57b73598-8764-4ad0-a76a-679bb6640eb1',
      new Date(),
      123,
      null,
      [],
      {},
      undefined
    ]

    const sut = schema().function()

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the function method when value is promise and return true if the value is of type function', async () => {
    const value = async (): Promise<() => void> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(() => {})
        }, 100)
      })
    }

    const sut = await schema()
      .function()
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the function method when value is promise and return false if the value is not of type function', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('string')
        }, 100)
      })
    }

    const sut = await schema()
      .function()
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the function method and passedAll to equal true if the value is of type function', () => {
    const value = (): void => {}

    const sut = schema()
      .function()
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
        received: value
      },
      {
        method: 'function',
        expect: 'function type',
        name: 'value_name',
        index: undefined,
        received: value
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the function method and passedAll to equal false if the value is not of type function', () => {
    const value = 1

    const sut = schema()
      .function()
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 1
    }])
    expect(sut.errors).toEqual([{
      method: 'function',
      type: 'invalid value',
      name: 'value_name',
      expect: 'function type',
      received: 1,
      message: 'value_name must be a function type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the function method and passAll to equal true when it is not required, undefined value and not of type function', () => {
    const value = undefined

    const sut = schema()
      .function()
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

  it('Should be able to validate the function method and passedAll to equal true if value is promise of type function', async () => {
    const value = async (): Promise<() => void> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(() => {})
        }, 100)
      })
    }

    const sut = await schema()
      .function()
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
        received: expect.any(Function)
      },
      {
        method: 'function',
        expect: 'function type',
        name: 'value_name',
        received: expect.any(Function)
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the function method and passedAll to equal false if value is a promise and is not of type function', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('string')
        }, 100)
      })
    }

    const sut = await schema()
      .function()
      .testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'string'
    }])
    expect(sut.errors).toEqual([{
      method: 'function',
      type: 'invalid value',
      name: 'value_name',
      expect: 'function type',
      received: 'string',
      message: 'value_name must be a function type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the function method and throw AnyError if the value is not of type function', () => {
    const value = undefined

    const sut = (): void => schema()
      .function()
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the function method and throw Error if the value is a promise and is not of type function', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .function()
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must be a function type!')
  })
})
