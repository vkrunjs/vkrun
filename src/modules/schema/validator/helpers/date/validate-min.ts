import { informativeMessage } from '../../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { dateToString, received } from '../../../../utils'

export const validateMinDate = ({
  value,
  valueName,
  dateToCompare,
  indexArray,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  dateToCompare: Date
  indexArray: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const date = new Date(String(value))
  const isInvalidDate = isNaN(date.getTime())

  const expect = (): string => {
    if (indexArray !== undefined) {
      if (value instanceof Date) {
        return `array index at date ${dateToString(value, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC')} less than or equal to ${dateToString(dateToCompare, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC')}`
      } else {
        return 'array index at date less than or equal to reference date'
      }
    } else {
      if (value instanceof Date) {
        return `${dateToString(value, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC')} greater than or equal to ${dateToString(dateToCompare, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC')}`
      } else {
        return 'date greater than or equal to reference date'
      }
    }
  }

  const message = {
    expect: expect(),
    error: informativeMessage.date.invalidValue
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
      .replace('[type]', 'date')
  }

  const handleAddFailed = (): void => {
    callbackAddFailed({
      method: 'min',
      type: 'invalid value',
      name: valueName,
      expect: expect(),
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }

  if (isInvalidDate) {
    handleAddFailed()
    return
  }

  const dateTimestamp = value.getTime()
  const dateToCompareTimestamp = dateToCompare.getTime()

  const deadlineExceeded = dateTimestamp < dateToCompareTimestamp && value.getMilliseconds() <= dateToCompare.getMilliseconds()

  if (deadlineExceeded) {
    message.error = informativeMessage.date.min
      .replace('[value]', dateToString(value, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC'))
      .replace('[valueName]', valueName)
      .replace('[refDate]', dateToString(dateToCompare, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC'))

    handleAddFailed()
    return
  }

  callbackAddPassed({
    method: 'min',
    name: valueName,
    expect: expect(),
    index: indexArray,
    received: value
  })
}
