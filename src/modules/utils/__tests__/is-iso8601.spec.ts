import { isISO8601 } from '../is-iso8601'

describe('isISO8601', () => {
  it('Should return true for valid ISO 8601 date strings', () => {
    expect(isISO8601('2024-02-25T12:30:45Z')).toBeTruthy()
    expect(isISO8601('2024-02-25T12:30:45.123Z')).toBeTruthy()
    expect(isISO8601('2024-02-25T12:30:45.123456Z')).toBeTruthy()
  })

  it('Should return false for invalid ISO 8601 date strings', () => {
    expect(isISO8601('2024-02-25')).toBeFalsy()
    expect(isISO8601('2024-02-25T12:30:45')).toBeFalsy()
    expect(isISO8601('12:30:45Z')).toBeFalsy()
    expect(isISO8601('2024/02/25T12:30:45Z')).toBeFalsy()
    expect(isISO8601('2024-02-25T12:30:45.123')).toBeFalsy()
    expect(isISO8601('2024-02-25T12:30:45.123Z00:00')).toBeFalsy()
    expect(isISO8601('2024-02-25T12:30:45.123+02:00')).toBeFalsy()
  })

  it('Should return false for non-string values', () => {
    expect(isISO8601(2024)).toBeFalsy()
    expect(isISO8601(true)).toBeFalsy()
    expect(isISO8601(null)).toBeFalsy()
    expect(isISO8601(undefined)).toBeFalsy()
    expect(isISO8601({})).toBeFalsy()
    expect(isISO8601([])).toBeFalsy()
  })
})
