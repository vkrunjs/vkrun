import { StringToDateTypes } from '../types'

export const stringToDate = (
  stringDate: string,
  type: StringToDateTypes,
  timestamp?: 'UTC' | 'local'
): Date => {
  let year: number = 0
  let month: number = 0
  let day: number = 0

  const invalidDate = (): boolean => {
    const invalidDay = day < 1 || day > new Date(year, month, 0).getDate()
    const invalidMonth = month < 1 || month > 12
    const invalidYear = month === 0
    return invalidDay || invalidMonth || invalidYear
  }

  if (type === 'ISO8601') {
    return new Date(stringDate)
  } else if (type === 'DD/MM/YYYY') {
    [day, month, year] = stringDate.split('/').map(Number)
  } else if (type === 'MM/DD/YYYY') {
    [month, day, year] = stringDate.split('/').map(Number)
  } else if (type === 'DD-MM-YYYY') {
    [day, month, year] = stringDate.split('-').map(Number)
  } else if (type === 'MM-DD-YYYY') {
    [month, day, year] = stringDate.split('-').map(Number)
  } else if (type === 'YYYY/MM/DD') {
    [year, month, day] = stringDate.split('/').map(Number)
  } else if (type === 'YYYY/DD/MM') {
    [year, day, month] = stringDate.split('/').map(Number)
  } else if (type === 'YYYY-MM-DD') {
    [year, month, day] = stringDate.split('-').map(Number)
  } else if (type === 'YYYY-DD-MM') {
    [year, day, month] = stringDate.split('-').map(Number)
  } else {
    return new Date('invalid date')
  }

  if (invalidDate()) return new Date('invalid date')

  if (!timestamp || timestamp === 'local') {
    return new Date(year, month - 1, day)
  } else {
    return new Date(Date.UTC(year, month - 1, day)) // UTC
  }
}
