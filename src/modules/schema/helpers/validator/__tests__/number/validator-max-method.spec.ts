import { schema } from '../../../../index'
import { AnyError } from '../../../../../errors'

describe('Validator Max Number Method', () => {
  it('Should be able to validate the max method and return true if the value is less than or equal to the reference', () => {
    expect(
      schema().number().max(5).validate(5)
    ).toBeTruthy()
    expect(
      schema().number().min(1).max(5).validate(5)
    ).toBeTruthy()
    expect(
      schema().number().float().max(5).validate(4.9)
    ).toBeTruthy()
    expect(
      schema().number().float().min(1).max(5).validate(4.9)
    ).toBeTruthy()
    expect(
      schema().number().integer().max(5).validate(5)
    ).toBeTruthy()
    expect(
      schema().number().integer().min(1).max(5).validate(5)
    ).toBeTruthy()
    expect(
      schema().number().negative().max(-1).validate(-5)
    ).toBeTruthy()
    expect(
      schema().number().negative().min(-5).max(-1).validate(-5)
    ).toBeTruthy()
    expect(
      schema().number().positive().max(5).validate(5)
    ).toBeTruthy()
    expect(
      schema().number().positive().min(1).max(5).validate(5)
    ).toBeTruthy()
  })

  it('Should be able to validate the max method and return false if list is invalid', () => {
    const invalidList = [
      5.5,
      6,
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
      .max(5)

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the max method when value is promise and return true if the value is less than or equal to the reference', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .max(5)
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the max method when value is promise and return false if the value is greater than to the reference', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(6)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .max(5)
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the max method and passedAll to equal true if the value is value less than or equal to the reference', () => {
    const value = 1

    const sut = schema()
      .number()
      .max(5)
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
        name: 'value_name',
        expect: 'number type',
        received: 1
      },
      {
        method: 'max',
        name: 'value_name',
        expect: 'value less than or equal to the reference',
        received: 1
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the max method and passedAll to equal false if the value is greater than to the reference', () => {
    const value = 5.5

    const sut = schema()
      .number()
      .max(5)
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
        received: 5.5
      },
      {
        method: 'number',
        name: 'value_name',
        expect: 'number type',
        received: 5.5
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'max',
      type: 'invalid value',
      name: 'value_name',
      expect: 'value less than or equal to the reference',
      received: 5.5,
      message: 'value_name must be less than or equal to 5!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the max and passAll method as equal to true when it is not required', () => {
    const value = undefined

    const sut = schema()
      .number()
      .max(5)
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

  it('Should be able to validate the max and passAll method as equal to true when it is nullable', () => {
    const value = null

    const sut = schema()
      .number()
      .max(5)
      .nullable()
      .test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'nullable',
      name: 'value_name',
      expect: 'the value can be null, but other than undefined',
      received: null
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the max method and passedAll to equal true if the value is promise with a smaller number than the reference', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .max(5)
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
        method: 'max',
        expect: 'value less than or equal to the reference',
        name: 'value_name',
        received: 1
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the max method and passedAll to equal false if the value is a promise and is not number', async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .max(5)
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
        method: 'max',
        type: 'invalid value',
        name: 'value_name',
        expect: 'value less than or equal to the reference',
        received: false,
        message: 'value_name must be less than or equal to 5!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the max method and throw AnyError if the value is not number', () => {
    const value = undefined

    const sut = (): void => schema()
      .number()
      .max(5)
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the max method and throw Error if the value is a promise and is not number', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('1.5')
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .number()
      .max(5)
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must be a number type!')
  })
})
