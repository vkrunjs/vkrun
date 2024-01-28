import { validator } from '../index'
import { InvalidParamError } from '../../errors'

describe('Validator Equal Method', () => {
  it('Should be able to validate the equal method and return true if the value is equal to the comparison value', () => {
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

    const sut = validator()
      .equal(valueToCompare)
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the equal method and return false if the value is not equal to the comparison value', () => {
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
        c: 2,
        d: [1, 2, 3]
      },
      e: false, // invalid value
      f: false,
      g: undefined
    }]

    const sut = validator()
      .equal(valueToCompare)
      .validate(value)

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the equal method when value is promise and return true if the value is equal to the comparison value', async () => {
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
          resolve(valueToCompare)
        }, 100)
      })
    }

    const sut = await validator()
      .equal(valueToCompare)
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the equal method when value is promise and return false if the value is not equal to the comparison value', async () => {
    const valueToCompare = [1, 2, 3]

    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve([1, 2, 3, 4])
        }, 100)
      })
    }

    const sut = await validator()
      .equal(valueToCompare)
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the equal method and passedAll to equal true if the value is equal to the comparison value', () => {
    const valueToCompare = true
    const value = valueToCompare

    const sut = validator()
      .equal(valueToCompare)
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
        received: true
      },
      {
        method: 'equal',
        name: 'value_name',
        expect: true,
        received: true
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the equal method and passedAll to equal false if the value is not equal to the comparison value', () => {
    const valueToCompare = 1
    const value = 2

    const sut = validator()
      .equal(valueToCompare)
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 2
    }])
    expect(sut.errors).toEqual([{
      method: 'equal',
      type: 'invalid value',
      name: 'value_name',
      expect: 1,
      received: 2,
      message: 'value does not match!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the equal and passAll method as equal to true when it is not required and the value is undefined', () => {
    const valueToCompare = 1
    const value = undefined

    const sut = validator()
      .equal(valueToCompare)
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

  it('Should be able to validate the equal method and passedAll to equal true if the value is promise and equal to the comparison value', async () => {
    const valueToCompare = 'string'

    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('string')
        }, 100)
      })
    }

    const sut = await validator()
      .equal(valueToCompare)
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
        method: 'equal',
        name: 'value_name',
        expect: 'string',
        received: 'string'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the equal method and passedAll to equal false if the value is a promise and is not equal to the comparison value', async () => {
    const valueToCompare = true

    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('string')
        }, 100)
      })
    }

    const sut = await validator()
      .equal(valueToCompare)
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
      method: 'equal',
      type: 'invalid value',
      name: 'value_name',
      expect: true,
      received: 'string',
      message: 'value does not match!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the equal method and throw InvalidParamError if the value is not equal to the comparison value', () => {
    const valueToCompare = true
    const value = undefined

    const sut = (): void => validator()
      .equal(valueToCompare)
      .throw(value, 'value_name', InvalidParamError)

    expect(sut).toThrow(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the equal method and throw Error if the value is a promise and is not of type boolean', async () => {
    const valueToCompare = true

    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await validator()
      .equal(valueToCompare)
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value does not match!')
  })
})
