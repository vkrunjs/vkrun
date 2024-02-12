import { StringToDateTypes } from './types'

export const stringToDate = (stringDate: string, type?: StringToDateTypes): Date => {
  let year: number = 0
  let month: number = 0
  let day: number = 0

  const invalidDate = (): boolean => {
    const invalidDay = day < 1 || day > new Date(year, month, 0).getDate()
    const invalidMonth = month < 1 || month > 12
    const invalidYear = month === 0
    return invalidDay || invalidMonth || invalidYear
  }

  if (type === 'DD/MM/YYYY') {
    [day, month, year] = String(stringDate).split('/').map(Number)
  } else if (type === 'MM/DD/YYYY') {
    [month, day, year] = String(stringDate).split('/').map(Number)
  } else if (type === 'DD-MM-YYYY') {
    [day, month, year] = String(stringDate).split('-').map(Number)
  } else if (type === 'MM-DD-YYYY') {
    [month, day, year] = String(stringDate).split('-').map(Number)
  } else if (type === 'YYYY/MM/DD') {
    [year, month, day] = String(stringDate).split('/').map(Number)
  } else if (type === 'YYYY/DD/MM') {
    [year, day, month] = String(stringDate).split('/').map(Number)
  } else if (type === 'YYYY-MM-DD') {
    [year, month, day] = String(stringDate).split('-').map(Number)
  } else if (type === 'YYYY-DD-MM') {
    [year, day, month] = String(stringDate).split('-').map(Number)
  } else {
    const date = new Date(stringDate)
    if (isNaN(date.getTime())) return new Date('invalid date')
    return date
  }

  if (invalidDate()) return new Date('invalid date')
  return new Date(year, month - 1, day)
}
