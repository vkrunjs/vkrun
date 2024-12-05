import { schema } from '../../../index'

describe('Validator NotEqual Method', () => {
  it('Should be able to validate the notEqual method and return true if the value is not equal to the comparison value', () => {
    const valueToCompare = [{
      a: 1,
      b: {
        c: 2,
        d: [1, 2, 3]
      },
      e: 'string',
      f: false,
      g: undefined
    }]
    const value = [{
      a: 1,
      b: {
        c: 3, // different value
        d: [1, 2, 3]
      },
      e: 'string',
      f: false,
      g: undefined
    }]

    const sut = schema()
      .notEqual(valueToCompare)
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the notEqual method and return false if the value is equal to the comparison value', () => {
    const valueToCompare = [{
      a: 1,
      b: {
        c: 2,
        d: [1, 2, 3]
      },
      e: 'string',
      f: false,
      g: undefined
    }]

    const value = valueToCompare

    const sut = schema()
      .notEqual(valueToCompare)
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the notEqual method when value is a promise and return true if the value is not equal to the comparison value', async () => {
    const valueToCompare = {
      a: 1,
      b: {
        c: 2,
        d: [1, 2, 3]
      },
      e: 'string',
      f: false,
      g: undefined
    }

    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            a: 1,
            b: {
              c: 3, // different value
              d: [1, 2, 3]
            },
            e: 'string',
            f: false,
            g: undefined
          })
        }, 100)
      })
    }

    const sut = await schema()
      .notEqual(valueToCompare)
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the notEqual method when value is a promise and return false if the value is equal to the comparison value', async () => {
    const valueToCompare = [1, 2, 3]

    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve([1, 2, 3])
        }, 100)
      })
    }

    const sut = await schema()
      .notEqual(valueToCompare)
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the notEqual method and passedAll to equal true if the value is not equal to the comparison value', () => {
    const valueToCompare = true
    const value = false

    const sut = schema()
      .notEqual(valueToCompare)
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
        received: false
      },
      {
        method: 'notEqual',
        name: 'value_name',
        expect: true,
        received: false
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the notEqual method and passedAll to equal false if the value is equal to the comparison value', () => {
    const valueToCompare = 1
    const value = 1

    const sut = schema()
      .notEqual(valueToCompare)
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
      method: 'notEqual',
      type: 'invalid value',
      name: 'value_name',
      expect: 1,
      received: 1,
      message: 'value may not match!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should allow custom error message', () => {
    const valueToCompare = 1
    const value = 1

    const sut = schema()
      .notEqual(valueToCompare, { message: '[valueName] [value]!' })
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
      method: 'notEqual',
      type: 'invalid value',
      name: 'value_name',
      expect: 1,
      received: 1,
      message: 'value_name 1!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })
})
