import { isBoolean } from '../is-boolean'

describe('isBoolean', () => {
  it('Should return true for boolean values', () => {
    expect(isBoolean(true)).toBeTruthy()
    expect(isBoolean(false)).toBeTruthy()
  })

  it('Should return false for non-boolean values', () => {
    expect(isBoolean(undefined)).toBeFalsy()
    expect(isBoolean(null)).toBeFalsy()
    expect(isBoolean(0)).toBeFalsy()
    expect(isBoolean(1)).toBeFalsy()
    expect(isBoolean('true')).toBeFalsy()
    expect(isBoolean('false')).toBeFalsy()
    expect(isBoolean([])).toBeFalsy()
    expect(isBoolean({})).toBeFalsy()
    expect(isBoolean(() => {})).toBeFalsy()
  })
})
