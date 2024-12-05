import { schema } from '../../../../../../index'

describe('Validator Array Min Method', () => {
  it('Should be able to validate the min method and return true if the list has the minimum value', () => {
    const sut = schema().array(schema()).min({ min: 1 }).validate(['string'])
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the min method and return true if the list does not have the minimum value', () => {
    const sut = schema().array(schema()).min({ min: 2 }).validate(['string'])
    expect(sut).toBeFalsy()
  })

  it('Should allow custom error message', () => {
    const value = [false]

    const sut = schema()
      .array(schema())
      .min({ min: 2, message: '[valueName] [value] [min] any message!' })
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
      method: 'min',
      type: 'invalid value',
      name: 'value_name',
      expect: 'the list must have the minimum number of items',
      received: [false],
      message: 'value_name [false] 2 any message!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })
})
