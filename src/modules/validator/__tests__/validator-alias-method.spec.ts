import { validator } from '../index'

describe('Validator Alias Method', () => {
  it('Should be able to validate the alias method change value name', () => {
    const sut = validator()
      .alias('new_value_name')
      .test(true, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'new_value_name',
      expect: 'value other than undefined',
      received: true
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })
})
