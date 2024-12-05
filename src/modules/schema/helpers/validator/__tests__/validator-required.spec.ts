import { schema } from '../../../index'

describe('Validator Required Method', () => {
  it('Should allow custom required error message for string validation', () => {
    const sut = schema({ message: '[valueName] is required new message!' })
      .test(undefined, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'required',
      type: 'missing value',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'undefined',
      message: 'value_name is required new message!'

    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })
})
