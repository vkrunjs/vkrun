import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { formatYYYYDDMMHHMMSSMS, received } from '../../../utils'

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
        return `array index at date ${formatYYYYDDMMHHMMSSMS(value)} less than or equal to ${formatYYYYDDMMHHMMSSMS(dateToCompare)}`
      } else {
        return 'array index at date less than or equal to reference date'
      }
    } else {
      if (value instanceof Date) {
        return `${formatYYYYDDMMHHMMSSMS(value)} greater than or equal to ${formatYYYYDDMMHHMMSSMS(dateToCompare)}`
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
      .replace('[value]', formatYYYYDDMMHHMMSSMS(value))
      .replace('[valueName]', valueName)
      .replace('[refDate]', formatYYYYDDMMHHMMSSMS(dateToCompare))

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
