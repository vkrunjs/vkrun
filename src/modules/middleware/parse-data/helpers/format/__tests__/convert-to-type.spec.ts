import { convertToType } from '../convert-to-type'

describe('Parse Data - Convert To Type', () => {
  it('Should convert a valid string representation of an integer to a number', () => {
    const sut = convertToType('123')
    expect(sut).toEqual(123)
  })

  it('Should convert a valid string representation of a floating-point number to a number', () => {
    const sut = convertToType('3.14')
    expect(sut).toEqual(3.14)
  })

  it('Should convert a valid string representation of "true" to boolean true', () => {
    const sut = convertToType('true')
    expect(sut).toEqual(true)
  })

  it('Should convert a valid string representation of "false" to boolean false', () => {
    const sut = convertToType('false')
    expect(sut).toEqual(false)
  })

  it('Should convert a valid ISO8601 date string to a Date object', () => {
    const sut = convertToType('2000-02-03T02:00:00.000Z')
    expect(sut).toEqual(new Date('2000-02-03T02:00:00.000Z'))
  })

  it('Should return the input value if it does not match any of the conversion conditions', () => {
    const sut = convertToType('not-a-valid-value')
    expect(sut).toEqual('not-a-valid-value')
  })
})
