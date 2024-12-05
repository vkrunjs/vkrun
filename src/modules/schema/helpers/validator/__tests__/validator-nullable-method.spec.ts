import { schema } from '../../../index'

describe('Validator Nullable Method', () => {
  it('Should be able to validate the nullable and passAll method as equal to true when it is nullable and value is not undefined', () => {
    const objectSchema = schema().string().nullable()

    const sut = objectSchema.test(null, 'value_name')

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

  it('Should allow custom error message', () => {
    const objectSchema = schema()
      .string()
      .nullable({ message: '[valueName] [value] any message' })

    const sut = objectSchema.test(undefined, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'nullable',
        type: 'invalid value',
        name: 'value_name',
        expect: 'the value can be null, but other than undefined',
        received: 'undefined',
        message: 'value_name undefined any message'
      },
      {
        method: 'string',
        type: 'invalid value',
        name: 'value_name',
        expect: 'string type',
        received: 'undefined',
        message: 'value_name must be a string type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the nullable and passAll method as equal to false when it is nullable and value is undefined', () => {
    const objectSchema = schema().string().nullable()

    const sut = objectSchema.test(undefined, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'nullable',
        type: 'invalid value',
        name: 'value_name',
        expect: 'the value can be null, but other than undefined',
        received: 'undefined',
        message: 'value_name value can be null, but other than undefined!'
      },
      {
        method: 'string',
        type: 'invalid value',
        name: 'value_name',
        expect: 'string type',
        received: 'undefined',
        message: 'value_name must be a string type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the nullable and return true when value is string', () => {
    const objectSchema = schema().string().nullable()

    const sut = objectSchema.validate('any value')

    expect(sut).toBeTruthy()
  })
})
