import { validator } from '../../../index'
import { InvalidParamError } from '../../../../errors'

describe('Validator Array String Method', () => {
  it('Should be able to validate the array method and return true if the value is of type string', () => {
    const value = ['string']

    const sut = validator()
      .array()
      .string()
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the array method and return false if list is invalid', () => {
    const invalidList = [
      false,
      new Date(),
      123,
      null,
      [],
      {},
      undefined
    ]

    const sut = validator().array().string()

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the array method when value is promise and return true if the value is of type string', async () => {
    const value = async (): Promise<string[]> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(['string'])
        }, 100)
      })
    }

    const sut = await validator()
      .array()
      .string()
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the array method when value is promise and return false if the value is not of type string', async () => {
    const value = async (): Promise<boolean[]> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve([false])
        }, 100)
      })
    }

    const sut = await validator()
      .array()
      .string()
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the array method and passedAll to equal true if the value is of type string', () => {
    const value = ['string']

    const sut = validator()
      .array()
      .string()
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
        received: ['string']
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'array type',
        received: ['string']
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'array index in string type',
        index: 0,
        received: 'string'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the array method and passedAll to equal false if the value is not of type string', () => {
    const value = ['string', false]

    const sut = validator()
      .array()
      .string()
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(3)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(4)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: ['string', false]
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'array type',
        received: ['string', false]
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'array index in string type',
        index: 0,
        received: 'string'
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'value_name',
      expect: 'array index in string type',
      index: 1,
      received: false,
      message: 'value_name must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the array method and passAll method as equal to true when it is not required and value is undefined', () => {
    const value = undefined

    const sut = validator()
      .array()
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

  it('Should be able to validate the array method and passedAll to equal true if the value is promise of type string', async () => {
    const value = async (): Promise<string[]> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(['string'])
        }, 100)
      })
    }

    const sut = await validator()
      .array()
      .string()
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
        received: [
          'string'
        ]
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'array type',
        received: [
          'string'
        ]
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'array index in string type',
        index: 0,
        received: 'string'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the array method and passedAll to equal false if the value is a promise and is not of type string', async () => {
    const value = async (): Promise<boolean[]> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve([false])
        }, 100)
      })
    }

    const sut = await validator()
      .array()
      .string()
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
        received: [false]
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'array type',
        received: [false]
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'value_name',
      expect: 'array index in string type',
      index: 0,
      received: false,
      message: 'value_name must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the array method and throw InvalidParamError if the value is not of type string', () => {
    const value = undefined

    const sut = (): void => validator()
      .array()
      .string()
      .throw(value, 'value_name', InvalidParamError)

    expect(sut).toThrow(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the array method and throw Error if the value is a promise and is not of type string', async () => {
    const value = async (): Promise<null[]> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve([null])
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await validator()
      .array()
      .string()
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must be a string type!')
  })
})
