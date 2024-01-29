import { validator } from '../../index'
import { InvalidParamError } from '../../../errors'

describe('Validator UUID Method', () => {
  it('Should be able to validate the UUID method and return true if list is valid', () => {
    const validList = [
      '550e8400-e29b-41d4-a716-446655440000',
      '123e4567-e89b-12d3-a456-426614174001',
      '09876543-0123-4567-89ab-cdef01234567',
      'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      '6fa459ea-ee8a-3ca4-894e-db77e160355e',
      '57b73598-8764-4ad0-a76a-679bb6640eb1',
      '4e074085-7f07-4f9e-aa10-055c7f96cf8a',
      '550e8400-e29b-41d4-a716-446655440000',
      '67f2c5c2-ae2c-4c4e-83ac-cc18eadd68f4',
      'fe1db6e1-38a9-4c44-8b7b-3d0c25d58d09'
    ]

    const sut = validator()
      .string()
      .UUID()

    expect(validList.every((value) => sut.validate(value))).toBeTruthy()
  })

  it('Should be able to validate the UUID method and return false if list is invalid', () => {
    const invalidList = [
      'invalid-uuid-57b73598-8764-4ad0-a76a-679bb6640eb1',
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
      .UUID()

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the UUID method when value is promise and return true if the value is a valid UUID format', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('550e8400-e29b-41d4-a716-446655440000')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .UUID()
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the UUID method when value is promise and return false if the value is a invalid UUID format', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('123')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .UUID()
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the UUID method and passedAll to equal true if the value is a valid UUID format', () => {
    const value = '550e8400-e29b-41d4-a716-446655440000'

    const sut = validator()
      .string()
      .UUID()
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
        received: '550e8400-e29b-41d4-a716-446655440000'
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'string type',
        received: '550e8400-e29b-41d4-a716-446655440000'
      },
      {
        method: 'UUID',
        name: 'value_name',
        expect: 'format UUID',
        received: '550e8400-e29b-41d4-a716-446655440000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the UUID method and passedAll to equal false if the value is a invalid UUID format', () => {
    const value = false

    const sut = validator()
      .string()
      .UUID()
      .test(value, 'value_name')

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
        method: 'string',
        type: 'invalid value',
        name: 'value_name',
        expect: 'string type',
        received: false,
        message: 'value_name must be a string type!'
      },
      {
        method: 'UUID',
        type: 'invalid value',
        name: 'value_name',
        expect: 'format UUID',
        received: false,
        message: 'value_name must be a UUID type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the UUID and passAll method as equal to true when it is not required and value is undefined', () => {
    const value = undefined

    const sut = validator()
      .string()
      .UUID()
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

  it('Should be able to validate the UUID method and passedAll to equal true if value is promise in valid UUID format', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('550e8400-e29b-41d4-a716-446655440000')
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .UUID()
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
        received: '550e8400-e29b-41d4-a716-446655440000'
      },
      {
        method: 'string',
        name: 'value_name',
        expect: 'string type',
        received: '550e8400-e29b-41d4-a716-446655440000'
      },
      {
        method: 'UUID',
        expect: 'format UUID',
        name: 'value_name',
        received: '550e8400-e29b-41d4-a716-446655440000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the UUID method and passedAll to equal false if value is promise in invalid UUID format', async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 100)
      })
    }

    const sut = await validator()
      .string()
      .UUID()
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
        method: 'string',
        type: 'invalid value',
        name: 'value_name',
        expect: 'string type',
        received: false,
        message: 'value_name must be a string type!'
      },
      {
        method: 'UUID',
        type: 'invalid value',
        name: 'value_name',
        expect: 'format UUID',
        received: false,
        message: 'value_name must be a UUID type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the UUID method and throw InvalidParamError if the value is a valid UUID format', () => {
    const value = undefined

    const sut = (): void => validator()
      .string()
      .UUID()
      .throw(value, 'value_name', InvalidParamError)

    expect(sut).toThrow(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the UUID method and throw Error if the value is a promise and is a invalid UUID format', async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve('any_email@domain')
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await validator()
      .string()
      .UUID()
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must be a UUID type!')
  })
})
