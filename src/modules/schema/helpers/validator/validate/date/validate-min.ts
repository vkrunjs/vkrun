import { getLocation } from '../../../../../location'
import { SchemaDateMinConfig, SchemaValidateMethod } from '../../../../../types'
import { dateToString, isString, received } from '../../../../../utils'

export const validateMinDate = (
  params: SchemaValidateMethod & {
    config: SchemaDateMinConfig
  }
): void => {
  const {
    value,
    valueName,
    config,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const date = new Date(String(value))
  const isInvalidDate = isNaN(date.getTime())

  const expect = (): string => {
    if (value instanceof Date) {
      return `${dateToString(value, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC')} greater than or equal to ${dateToString(config.min, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC')}`
    } else {
      return 'date greater than or equal to reference date'
    }
  }

  if (isInvalidDate) {
    return
  }

  const dateTimestamp = value.getTime()
  const dateToCompareTimestamp = config.min.getTime()

  const deadlineExceeded = dateTimestamp < dateToCompareTimestamp && value.getMilliseconds() <= config.min.getMilliseconds()

  if (deadlineExceeded) {
    callbackAddFailed({
      method: 'min',
      type: 'invalid value',
      name: valueName,
      expect: expect(),
      received: received(value),
      message: (isString(config?.message) ? config.message : getLocation().schema.date.min)
        .replace('[value]', dateToString(value, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC'))
        .replace('[valueName]', valueName)
        .replace('[refDate]', dateToString(config.min, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC'))
    })
  } else {
    callbackAddPassed({
      method: 'min',
      name: valueName,
      expect: expect(),
      received: value
    })
  }
}
