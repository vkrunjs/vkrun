import { isBigInt } from '../is-big-int'

describe('isBigInt', () => {
  it('Should return false for a regular number', () => {
    expect(isBigInt(123)).toBeFalsy()
  })

  it('Should return false for a string', () => {
    expect(isBigInt('123')).toBeFalsy()
  })

  it('Should return false for a boolean', () => {
    expect(isBigInt(true)).toBeFalsy()
  })

  it('Should return false for an array', () => {
    expect(isBigInt([1, 2, 3])).toBeFalsy()
  })

  it('Should return false for an object', () => {
    expect(isBigInt({ key: 'value' })).toBeFalsy()
  })

  it('Should return false for null', () => {
    expect(isBigInt(null)).toBeFalsy()
  })

  it('Should return false for undefined', () => {
    expect(isBigInt(undefined)).toBeFalsy()
  })

  it('Should return true for a positive bigint', () => {
    expect(isBigInt(123n)).toBeTruthy()
  })

  it('Should return true for a negative bigint', () => {
    expect(isBigInt(-123n)).toBeTruthy()
  })

  it('Should return false for NaN (not applicable for bigint)', () => {
    expect(isBigInt(NaN)).toBeFalsy()
  })

  it('Should return true for a large bigint', () => {
    expect(isBigInt(1234567890123456789012345678901234567890n)).toBeTruthy()
  })
})
