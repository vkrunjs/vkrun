import { schema } from '../../../../index'
import { AnyError } from '../../../../../errors'

describe('Validator Negative Method', () => {
  it('Should be able to validate the negative method and return true if the value is negative', () => {
    expect(
      schema().number().negative().validate(-1)
    ).toBeTruthy()

    expect(
      schema().number().float().min(-10).max(-1).negative().validate(-1.5)
    ).toBeTruthy()
    expect(
      schema().number().float().min(-10).negative().validate(-1.5)
    ).toBeTruthy()
    expect(
      schema().number().float().max(-1).min(-10).negative().validate(-1.5)
    ).toBeTruthy()
    expect(
      schema().number().float().max(-1).negative().validate(-1.5)
    ).toBeTruthy()
    expect(
      schema().number().float().negative().validate(-1.5)
    ).toBeTruthy()

    expect(
      schema().number().integer().min(-10).max(-1).negative().validate(-2)
    ).toBeTruthy()
    expect(
      schema().number().integer().min(-10).negative().validate(-2)
    ).toBeTruthy()
    expect(
      schema().number().integer().max(-1).min(-10).negative().validate(-2)
    ).toBeTruthy()
    expect(
      schema().number().integer().max(-1).negative().validate(-2)
    ).toBeTruthy()
    expect(
      schema().number().integer().negative().validate(-2)
    ).toBeTruthy()

    expect(
      schema().number().min(-10).float().max(-1).negative().validate(-4.5)
    ).toBeTruthy()
    expect(
      schema().number().min(-10).float().negative().validate(-4.5)
    ).toBeTruthy()
    expect(
      schema().number().min(-10).integer().max(-1).negative().validate(-5)
    ).toBeTruthy()
    expect(
      schema().number().min(-10).integer().negative().validate(-5)
    ).toBeTruthy()
    expect(
      schema().number().min(-10).max(-1).float().negative().validate(-4.5)
    ).toBeTruthy()
    expect(
      schema().number().min(-10).max(-1).integer().negative().validate(-5)
    ).toBeTruthy()
    expect(
      schema().number().min(-10).max(-1).negative().validate(-5)
    ).toBeTruthy()
    expect(
      schema().number().min(-10).negative().validate(-4.5)
    ).toBeTruthy()

    expect(
      schema().number().max(-1).float().min(-10).negative().validate(-4.5)
    ).toBeTruthy()
    expect(
      schema().number().max(-1).float().negative().validate(-4.5)
    ).toBeTruthy()
    expect(
      schema().number().max(-1).integer().min(-10).negative().validate(-5)
    ).toBeTruthy()
    expect(
      schema().number().max(-1).integer().negative().validate(-5)
    ).toBeTruthy()
    expect(
      schema().number().max(-1).min(-10).float().negative().validate(-4.5)
    ).toBeTruthy()
    expect(
      schema().number().max(-1).min(-10).integer().negative().validate(-5)
    ).toBeTruthy()
    expect(
      schema().number().max(-1).min(-10).negative().validate(-5)
    ).toBeTruthy()
    expect(
      schema().number().max(-1).negative().validate(-4.5)
    ).toBeTruthy()
  })

  it('Should be able to validate the negative method and return false if list is invalid', () => {
    const invalidList = [
      5.5,
      6,
      '-1',
      false,
      new Date(),
      null,
      [],
      {},
      undefined
    ]

    const sut = schema()
      .number()
      .negative()

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the negative method when value is promise and return true if the value is negative', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(-1)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .negative()
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the negative method when value is promise and return false if the value is positive', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .negative()
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the negative method and passedAll to equal true if the value is negative', () => {
    const value = -1

    const sut = schema()
      .number()
      .negative()
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
        received: -1
      },
      {
        method: 'number',
        name: 'value_name',
        expect: 'number type',
        received: -1
      },
      {
        method: 'negative',
        name: 'value_name',
        expect: 'negative number',
        received: -1
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the negative method and passedAll to equal false if the value is negative', () => {
    const value = 4.5

    const sut = schema()
      .number()
      .negative()
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
        received: 4.5
      },
      {
        method: 'number',
        name: 'value_name',
        expect: 'number type',
        received: 4.5
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'negative',
      type: 'invalid value',
      name: 'value_name',
      expect: 'negative number',
      received: 4.5,
      message: 'value_name must be negative!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the negative and passAll method as equal to true when it is not required', () => {
    const value = undefined

    const sut = schema()
      .number()
      .negative()
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

  it('Should be able to validate the negative and passAll method as equal to true when it is nullable', () => {
    const value = null

    const sut = schema()
      .number()
      .negative()
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

  it('Should be able to validate the negative method and passedAll to equal true if the value is promise with a smaller number than the reference', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(-1)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .negative()
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
        received: -1
      },
      {
        method: 'number',
        expect: 'number type',
        name: 'value_name',
        received: -1
      },
      {
        method: 'negative',
        expect: 'negative number',
        name: 'value_name',
        received: -1
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the negative method and passedAll to equal false if the value is a promise and is not number', async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .negative()
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
        method: 'negative',
        type: 'invalid value',
        name: 'value_name',
        expect: 'negative number',
        received: false,
        message: 'value_name must be negative!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the negative method and throw AnyError if the value is not number', () => {
    const value = undefined

    const sut = (): void => schema()
      .number()
      .negative()
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the negative method and throw Error if the value is a promise and is not number', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('1.5')
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .number()
      .negative()
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must be a number type!')
  })
})
