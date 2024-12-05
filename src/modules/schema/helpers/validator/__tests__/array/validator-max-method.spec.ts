import { schema } from '../../../../../../index'

describe('Validator Array Max Method', () => {
  it('Should be able to validate the max method and return true if the list has the maximum value', () => {
    const sut = schema().array(schema()).max({ max: 1 }).validate(['string'])
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the max method and return true if the list does not have the maximum value', () => {
    const sut = schema().array(schema()).max({ max: 2 }).validate(['string', 'string', 'string'])
    expect(sut).toBeFalsy()
  })

  it('Should allow custom error message', () => {
    const value = [{ message: 'any' }, { message: 'any' }]

    const sut = schema()
      .array(schema())
      .max({ max: 1, message: '[valueName] [value] [max] any message!' })
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
        received: [
          { message: 'any' },
          { message: 'any' }
        ]
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'array type',
        received: [
          { message: 'any' },
          { message: 'any' }
        ]
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'array type',
        received: [
          { message: 'any' },
          { message: 'any' }
        ]
      }
    ])
    expect(sut.errors).toEqual([
      {
        method: 'max',
        type: 'invalid value',
        name: 'value_name',
        expect: 'the list must have the maximum number of items',
        received: [
          { message: 'any' },
          { message: 'any' }
        ],
        message: 'value_name [{"message":"any"},{"message":"any"}] 1 any message!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })
})
