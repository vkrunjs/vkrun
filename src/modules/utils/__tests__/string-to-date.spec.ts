import { stringToDate } from '../string-to-date'

describe('stringToDate', () => {
  it('Should parse date in DD/MM/YYYY format', () => {
    expect(stringToDate('25/12/2023', 'DD/MM/YYYY')).toEqual(new Date(2023, 11, 25))
  })

  it('Should parse date in MM/DD/YYYY format', () => {
    expect(stringToDate('12/25/2023', 'MM/DD/YYYY')).toEqual(new Date(2023, 11, 25))
  })

  it('Should parse date in DD-MM-YYYY format', () => {
    expect(stringToDate('25-12-2023', 'DD-MM-YYYY')).toEqual(new Date(2023, 11, 25))
  })

  it('Should parse date in MM-DD-YYYY format', () => {
    expect(stringToDate('12-25-2023', 'MM-DD-YYYY')).toEqual(new Date(2023, 11, 25))
  })

  it('Should parse date in YYYY/MM/DD format', () => {
    expect(stringToDate('2023/12/25', 'YYYY/MM/DD')).toEqual(new Date(2023, 11, 25))
  })

  it('Should parse date in YYYY/DD/MM format', () => {
    expect(stringToDate('2023/25/12', 'YYYY/DD/MM')).toEqual(new Date(2023, 11, 25))
  })

  it('Should parse date in YYYY-MM-DD format', () => {
    expect(stringToDate('2023-12-25', 'YYYY-MM-DD')).toEqual(new Date(2023, 11, 25))
  })

  it('Should parse date in YYYY-DD-MM format', () => {
    expect(stringToDate('2023-25-12', 'YYYY-DD-MM')).toEqual(new Date(2023, 11, 25))
  })

  it('Should parse date with no specified format in local time', () => {
    const expectedDate = new Date(2023, 11, 25)
    const parsedDate = stringToDate('2023-12-25', 'YYYY-MM-DD')
    expect(parsedDate.getTime()).toEqual(expectedDate.getTime())
  })

  it('Should parse date with no specified format in UTC time', () => {
    const expectedDate = new Date(Date.UTC(2023, 11, 25))
    const parsedDate = stringToDate('2023-12-25', 'YYYY-MM-DD', 'UTC')
    expect(parsedDate.getTime()).toEqual(expectedDate.getTime())
  })

  it('Should return invalid date for invalid input', () => {
    const parsedDate = stringToDate('invalid', 'ISO8601')
    expect(isNaN(parsedDate.getTime())).toBeTruthy()
  })

  it('Should return invalid date for invalid input date', () => {
    const parsedDate = stringToDate('30/02/2023', 'DD/MM/YYYY')
    expect(isNaN(parsedDate.getTime())).toBeTruthy()
  })

  it('Should return invalid date for undefined type', () => {
    const parsedDate = stringToDate('2023-12-25', undefined as any)
    expect(isNaN(parsedDate.getTime())).toBeTruthy()
  })
})
