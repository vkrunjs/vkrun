import { isNumber } from '../is-number'

describe('isNumber', () => {
  it('Should return true for number', () => {
    expect(isNumber(123)).toBeTruthy()
  })

  it('Should return false for string', () => {
    expect(isNumber('123')).toBeFalsy()
  })

  it('Should return false for boolean', () => {
    expect(isNumber(true)).toBeFalsy()
  })

  it('Should return false for array', () => {
    expect(isNumber([1, 2, 3])).toBeFalsy()
  })

  it('Should return false for object', () => {
    expect(isNumber({ key: 'value' })).toBeFalsy()
  })

  it('Should return false for null', () => {
    expect(isNumber(null)).toBeFalsy()
  })

  it('Should return false for undefined', () => {
    expect(isNumber(undefined)).toBeFalsy()
  })

  it('Should return false for NaN', () => {
    expect(isNumber(NaN)).toBeFalsy()
  })
})
