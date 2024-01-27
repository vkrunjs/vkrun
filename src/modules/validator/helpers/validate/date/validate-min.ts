import { informativeMessage } from '../../../../location'
import { ErrorTest, SuccessTest } from '../../../../types'
import { formatYYYYDDMMHHMMSSMS, received } from '../../../../utils'

export const validateMinDate = ({
  value,
  valueName,
  dateToCompare,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  dateToCompare: Date
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const date = new Date(String(value))
  const isInvalidDate = isNaN(date.getTime())

  const expect = (): string => {
    if (value instanceof Date && dateToCompare instanceof Date) {
      return `${formatYYYYDDMMHHMMSSMS(value)} greater than or equal to ${formatYYYYDDMMHHMMSSMS(dateToCompare)}`
    } else {
      return `date ${valueName} greater than reference date`
    }
  }

  const handleAddFailed = (messageError: string): void => {
    callbackAddFailed({
      method: 'min',
      type: 'invalid value',
      name: valueName,
      expect: expect(),
      received: received(value),
      message: messageError
    })
  }

  if (isInvalidDate) {
    const message = informativeMessage.date.invalidValue
    const messageError = message
      .replace('[valueName]', valueName)
      .replace('[type]', 'date')
    handleAddFailed(messageError)
    return
  }

  const dateTimestamp = value.getTime()
  const dateToCompareTimestamp = dateToCompare.getTime()

  const deadlineExceeded = dateTimestamp < dateToCompareTimestamp && value.getMilliseconds() <= dateToCompare.getMilliseconds()

  if (deadlineExceeded) {
    const message = informativeMessage.date.min
    const messageError = message
      .replace('[valueName]', valueName)
      .replace('[value]', formatYYYYDDMMHHMMSSMS(value))
      .replace('[refDate]', formatYYYYDDMMHHMMSSMS(dateToCompare))
    handleAddFailed(messageError)
    return
  }

  callbackAddPassed({
    method: 'min',
    name: valueName,
    expect: expect(),
    received: value
  })
}
