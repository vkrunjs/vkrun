import { isString } from '../is-string'

describe('isString', () => {
  it('Should return true for string', () => {
    expect(isString('hello')).toBeTruthy()
  })

  it('Should return true for empty string', () => {
    expect(isString('')).toBeTruthy()
  })

  it('Should return false for number', () => {
    expect(isString(123)).toBeFalsy()
  })

  it('Should return false for boolean', () => {
    expect(isString(true)).toBeFalsy()
  })

  it('Should return false for array', () => {
    expect(isString([1, 2, 3])).toBeFalsy()
  })

  it('Should return false for object', () => {
    expect(isString({ a: 1 })).toBeFalsy()
  })

  it('Should return false for null', () => {
    expect(isString(null)).toBeFalsy()
  })

  it('Should return false for undefined', () => {
    expect(isString(undefined)).toBeFalsy()
  })

  it('Should return false for symbol', () => {
    expect(isString(Symbol('test'))).toBeFalsy()
  })
})
