import { schema } from '../../../index'

describe('Validator NotOneOf Method', () => {
  it('Should be able to validate notOneOf and return true if the value is not equal to any comparison value', () => {
    const value = 'hi'
    const comparisonItems = ['hello', 'world']

    const sut = schema()
      .notOneOf(comparisonItems)
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate notOneOf and return false if the value is equal to any comparison value', () => {
    const value = 'hello'
    const comparisonItems = ['hello', 'world']

    const sut = schema()
      .notOneOf(comparisonItems)
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the notOneOf method when value is a promise and return true if the value is not equal to any comparison value', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('hi')
        }, 100)
      })
    }
    const comparisonItems = ['hello', 'world']

    const sut = await schema()
      .notOneOf(comparisonItems)
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the notOneOf method when value is a promise and return false if the value is equal to any comparison value', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('hello')
        }, 100)
      })
    }

    const comparisonItems = ['hello', 'world']

    const sut = await schema()
      .notOneOf(comparisonItems)
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the notOneOf method and passedAll to equal true if the value is not equal to any comparison value', () => {
    const comparisonItems = ['hello', 'world']
    const value = 'hi'

    const sut = schema()
      .notOneOf(comparisonItems)
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
        received: 'hi'
      },
      {
        method: 'notOneOf',
        name: 'value_name',
        expect: 'value does not match',
        received: 'hi'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the notOneOf method and passedAll to equal false if the value is equal to any comparison value', () => {
    const comparisonItems = ['hello', 'world']
    const value = 'hello'

    const sut = schema()
      .notOneOf(comparisonItems)
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'hello'
    }])
    expect(sut.errors).toEqual([{
      method: 'notOneOf',
      type: 'invalid value',
      name: 'value_name',
      expect: 'value does not match',
      received: 'hello',
      message: 'value cannot have a matches!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })
})
